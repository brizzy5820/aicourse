import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import AdminConfig from './pages/AdminConfig';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  Layers,
  Briefcase,
  Award,
  ShieldCheck,
  Terminal,
  Cpu,
  Plus,
  X,
  CreditCard,
  Lock,
  Settings,
  ChevronRight,
  ChevronLeft,
  BookOpen,
  UserCheck,
  Menu,
  Volume2,
  VolumeX,
  Code2,
  Monitor,
  Eye,
  Search,
  ChevronDown,
  Rocket,
  Check,
  Copy,
  RefreshCw,
  ChevronUp,
} from 'lucide-react';
import { DEFAULT_PRODUCT_CONFIG, SAMPLE_SECOND_PRODUCT_CONFIG } from './config/productConfig';

const ICON_MAP = {
  Briefcase,
  UserCheck,
  Rocket,
  Award,
  Terminal,
  Cpu,
  Sparkles,
  BookOpen,
  Layers,
};

const getBrandAccentClasses = (color) => {
  if (color === 'purple') {
    return {
      text: 'text-[#7C3AED]',
      bg: 'bg-[#7C3AED]',
      bgSoft: 'bg-[#F3E8FF]',
      border: 'border-[#DDD6FE]',
    };
  }
  return {
    text: 'text-[#2563EB]',
    bg: 'bg-[#2563EB]',
    bgSoft: 'bg-[#EFF6FF]',
    border: 'border-[#BFDBFE]',
  };
};

export default function App() {
  const [config, setConfig] = useState(DEFAULT_PRODUCT_CONFIG);
  const [isScrolled, setIsScrolled] = useState(false);

// Argon Hero Slider State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHeroPaused, setIsHeroPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);
  const [slideCycleKey, setSlideCycleKey] = useState(0);
  // Per-slide progress tracking (each slide remembers its completed progress)
  const [slideProgressArray, setSlideProgressArray] = useState(() => 
    Array(config.heroSlides?.length || 0).fill(0)
  );
  // Refs for interval to avoid stale closures
  const currentSlideRef = useRef(0);
  currentSlideRef.current = currentSlide;

  const videoRefs = useRef([]);
  const elapsedRef = useRef(0);
  const timerRef = useRef(null);
  const SLIDE_DURATION = 5000; // 6.5s timeout per slide

  // Curriculum State
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [showAllPhases, setShowAllPhases] = useState(false);

  // Modals & Navigation State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('details');
  const [checkoutForm, setCheckoutForm] = useState({
    fullName: '',
    email: '',
    selectedTrack: 'The Freelancer Path',
  });
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);
  const [addProjectModalOpen, setAddProjectModalOpen] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    category: 'Web Application',
    outcomeMetric: '',
    summary: '',
    techStack: 'React, Tailwind, Supabase, AI',
  });
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [selectedPathId, setSelectedPathId] = useState('freelancer');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [faqSearch, setFaqSearch] = useState('');

  // Phase drawer/modal state
  const [openPhaseId, setOpenPhaseId] = useState(null);

  // Projects Carousel State
  const [currentProjectSlide, setCurrentProjectSlide] = useState(0);
  const [isProjectsPaused, setIsProjectsPaused] = useState(false);
  const [projectSlideProgress, setProjectSlideProgress] = useState(0);
  const projectSlideTimerRef = useRef(null);
  const projectElapsedRef = useRef(0);
  const touchStartRef = useRef(0);
  const PROJECT_SLIDE_DURATION = 3000; // 5s per slide

  // Detect scroll for transparent -> backdrop-blur header transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-advance Argon Hero Slides every 6.5s with color completion animation
  useEffect(() => {
    if (!config.heroSlides?.length) return;
    if (isHeroPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const stepTime = 30; // 33fps update for buttery smooth fill animation
    timerRef.current = setInterval(() => {
      elapsedRef.current += stepTime;
      const progressPercent = Math.min((elapsedRef.current / SLIDE_DURATION) * 100, 100);
      setSlideProgress(progressPercent);

      // Update per-slide progress array - current slide animates, completed stay at 100
      setSlideProgressArray(prev => {
        const next = [...prev];
        const currentIdx = currentSlideRef.current;
        next[currentIdx] = progressPercent;
        return next;
      });

      if (elapsedRef.current >= SLIDE_DURATION) {
        elapsedRef.current = 0;
        setSlideProgress(0);
        // Lock current slide progress at 100% when completed
        setSlideProgressArray(prev => {
          const next = [...prev];
          const currentIdx = currentSlideRef.current;
          next[currentIdx] = 100;
          return next;
        });
        setCurrentSlide((prev) => (prev + 1) % config.heroSlides.length);
        setSlideCycleKey((prev) => prev + 1);
      }
    }, stepTime);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [slideCycleKey, isHeroPaused, config.heroSlides?.length]);

  // Control video playback - only play active slide video, respect pause
  useEffect(() => {
    videoRefs.current.forEach((video, idx) => {
      if (video && video.tagName === 'VIDEO') {
        if (idx === currentSlide && !isHeroPaused) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      }
    });
  }, [currentSlide, isHeroPaused, isMuted]);

  // Sync slideProgressArray length with heroSlides
  useEffect(() => {
    const slideCount = config.heroSlides?.length || 0;
    setSlideProgressArray(prev => {
      if (prev.length !== slideCount) {
        return Array(slideCount).fill(0);
      }
      return prev;
    });
  }, [config.heroSlides?.length]);

  // Auto-advance Projects Carousel every 5s with progress animation
  useEffect(() => {
    const projects = config.previousProjects?.projects || [];
    if (!projects.length) return;
    if (isProjectsPaused) {
      if (projectSlideTimerRef.current) clearInterval(projectSlideTimerRef.current);
      return;
    }

    const stepTime = 30; // 33fps update for smooth fill animation
    projectSlideTimerRef.current = setInterval(() => {
      projectElapsedRef.current += stepTime;
      const progressPercent = Math.min((projectElapsedRef.current / PROJECT_SLIDE_DURATION) * 100, 100);
      setProjectSlideProgress(progressPercent);

      if (projectElapsedRef.current >= PROJECT_SLIDE_DURATION) {
        projectElapsedRef.current = 0;
        setProjectSlideProgress(0);
        setCurrentProjectSlide((prev) => (prev + 1) % projects.length);
      }
    }, stepTime);

    return () => {
      if (projectSlideTimerRef.current) clearInterval(projectSlideTimerRef.current);
    };
  }, [currentProjectSlide, isProjectsPaused, config.previousProjects?.projects?.length]);

  const goToProjectSlide = (idx) => {
    projectElapsedRef.current = 0;
    setProjectSlideProgress(0);
    setCurrentProjectSlide(idx);
  };

  // Keyboard navigation for Projects Carousel
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        goToProjectSlide((currentProjectSlide - 1 + config.previousProjects.projects.length) % config.previousProjects.projects.length);
      } else if (e.key === 'ArrowRight') {
        goToProjectSlide((currentProjectSlide + 1) % config.previousProjects.projects.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentProjectSlide, config.previousProjects.projects.length]);

  const openCheckout = (trackTitle) => {
    setIsMobileMenuOpen(false);
    setCheckoutStep('details');
    if (trackTitle && typeof trackTitle === 'string') {
      setCheckoutForm((prev) => ({ ...prev, selectedTrack: trackTitle }));
    }
    setCheckoutOpen(true);
  };

  const goToSlide = (idx) => {
    elapsedRef.current = 0;
    setSlideProgress(0);
    setCurrentSlide(idx);
    setSlideCycleKey((prev) => prev + 1);
    // Reset progress array: slides before target = 100%, target = 0%, after = 0%
    setSlideProgressArray(prev => 
      prev.map((_, i) => i < idx ? 100 : 0)
    );
  };

  const openPhaseDrawer = (phaseId) => {
    setOpenPhaseId(phaseId);
  };

  const closePhaseDrawer = () => {
    setOpenPhaseId(null);
  };

  // Get selected phase for drawer/modal
  const selectedPhase = config.curriculum.phases.find(p => p.id === openPhaseId);

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.title.trim()) return;
    const techList =
      typeof newProject.techStack === 'string'
        ? newProject.techStack
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : newProject.techStack;

    const created = {
      id: Date.now(),
      title: newProject.title,
      category: newProject.category || 'Web Application',
      phaseBadge: 'Phase 2 • Student Showcase',
      livePreviewUrl: 'https://demo.ai-academy.build',
      summary:
        newProject.summary ||
        'Custom digital product engineered and deployed using AI Builder Academy workflows.',
      techStack: techList.length ? techList : ['React', 'Tailwind', 'AI'],
      outcomeMetric: newProject.outcomeMetric || 'Deployed MVP Live',
      architectureNotes:
        'Frontend single page app built with React & Tailwind, styled with Google/Argon design system, integrated with AI APIs and deployed to edge hosting.',
    };

    setConfig((prev) => ({
      ...prev,
      previousProjects: {
        ...prev.previousProjects,
        projects: [created, ...(prev.previousProjects?.projects || [])],
      },
    }));

    setNewProject({
      title: '',
      category: 'Web Application',
      outcomeMetric: '',
      summary: '',
      techStack: 'React, Tailwind, AI',
    });
    setAddProjectModalOpen(false);
  };

  const handleCopyConfig = () => {
    navigator.clipboard?.writeText(JSON.stringify(config, null, 2));
    setCopiedConfig(true);
    setTimeout(() => setCopiedConfig(false), 2500);
  };

  const displayPrice = `${
    config.meta?.showCurrencySymbol !== false
      ? config.meta?.currencySymbol || config.pricing?.currencySymbol || '₦'
      : ''
  }${config.meta?.priceFormatted || config.pricing?.amount || '10,000'}`;

  const activeSlide = config.heroSlides?.[currentSlide] || config.heroSlides?.[0] || {};

  const filteredFaqs = (config.faqs || []).filter((f) => {
    const q = (f.question || f.q || '').toLowerCase();
    const a = (f.answer || f.a || '').toLowerCase();
    const s = faqSearch.toLowerCase();
    return q.includes(s) || a.includes(s);
  });


  return (
    <Routes>
      <Route
        path="/admin/config"
        element={
          <ProtectedRoute>
            <AdminConfig config={config} onConfigChange={setConfig} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/*"
        element={
          <div className="min-h-screen w-full overflow-x-hidden bg-white text-[#202124] antialiased selection:bg-purple-100 selection:text-purple-900">
      <style>{`
        @keyframes fadeUpSmooth {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUpDrawer {
          from { transform: translateY(100%); opacity: 0.5; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fade-up {
          animation: fadeUpSmooth 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-drawer-up {
          animation: slideUpDrawer 0.38s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* =====================================================================
          ADAPTIVE TRANSPARENT -> BACKDROP-BLUR HEADER
          ===================================================================== */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-3"
            : "bg-gradient-to-b from-slate-950/75 via-slate-950/35 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-1 group shrink-0">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm transition-all duration-300 group-hover:scale-105 `}
            >
              <div className="grid grid-cols-2 gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              </div>
            </div>
            <div className="flex flex-col">
              <span
                className={`font-bold text-base sm:text-lg tracking-tight leading-none transition-colors ${
                  isScrolled ? "text-slate-900" : "text-white"
                }`}
              >
                {config.brand.name}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {[
              { href: "#why-now", label: "Why AI Now" },
              { href: "#abilities", label: "Capabilities" },
              { href: "#curriculum", label: "12-Module Curriculum" },
              { href: "#paths", label: "Career Paths" },
              { href: "#showcase", label: "Projects Built" },
              { href: "#faq", label: "FAQ" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isScrolled
                    ? "text-slate-600 hover:text-blue-600"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              onClick={openCheckout}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] hover:bg-right text-white font-semibold text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-purple-900/20 transition-all duration-300 cursor-pointer active:scale-[0.99]"
            >
              <span>{config.pricing.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
              className={`lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl  transition-colors cursor-pointer ${
                isScrolled
                  ? "border-slate-200 text-slate-700 bg-white"
                  : "text-white"
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-4 pt-4 pb-6 mt-3 space-y-3 shadow-xl">
            <div className="grid grid-cols-2 gap-2">
              {[
                { href: "#why-now", label: "Why AI Now" },
                { href: "#abilities", label: "Capabilities" },
                { href: "#curriculum", label: "Curriculum" },
                { href: "#paths", label: "Choose Path" },
                { href: "#showcase", label: "Projects Built" },
                { href: "#faq", label: "FAQs" },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <button
              onClick={() => openCheckout()}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold text-sm py-3.5 rounded-full shadow-sm"
            >
              <CreditCard className="w-4 h-4" />
              <span>Checkout Now — {displayPrice}</span>
            </button>
          </div>
        )}
      </header>

      {/* =====================================================================
          ARGON VIDEO & IMAGE MULTI-SLIDE HERO DISPLAY (2 VIDEOS + 2 IMAGES)
          ===================================================================== */}
      <section
        className="relative w-full h-[88vh] min-h-[620px] max-h-[860px] bg-slate-950 overflow-hidden select-none"
        // onMouseEnter={() => setIsHeroPaused(true)}
        // onMouseLeave={() => setIsHeroPaused(false)}
      >
        {/* Background Media Slides */}
        {config.heroSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-out ${
                isActive
                  ? "opacity-100 z-10"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
            >
              {slide.type === "video" ? (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={slide.src}
                  poster={slide.poster}
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover scale-105 transition-transform duration-1000"
                />
              ) : (
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="w-full h-full object-cover scale-105 transition-transform duration-1000"
                />
              )}
              {/* Multi-layered Argon Dark Gradient Scrim for Crisp Text Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/35" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
            </div>
          );
        })}

        {/* Argon Hero Foreground Content (Minimal Per-Slide Text) */}
        <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center pt-16 pb-20">
          <div key={activeSlide.id} className="max-w-3xl animate-fade-up">
            {/* Slide Media Type & Counter Pill */}
            {/* <div className="inline-flex hidden items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold tracking-wider uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span>{activeSlide.tag}</span>
              <span className="text-white/40">•</span>
              <span className="text-purple-300 uppercase">{activeSlide.type} SLIDE</span>
            </div> */}

            {/* Minimal Dynamic Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-[1.06] mb-5">
              {activeSlide.title}
            </h1>

            {/* Minimal Dynamic Subtitle */}
            <p className="text-lg sm:text-2xl text-slate-200 font-normal leading-relaxed max-w-2xl mb-9">
              {activeSlide.subtitle}
            </p>

            {/* Primary Hero CTAs */}
            <div className=" sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={openCheckout}
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_auto] hover:bg-right text-white font-semibold text-base px-6 py-4 rounded-full shadow-xl shadow-purple-950/50 transition-all duration-300 cursor-pointer group"
              >
                <span>{config.pricing.ctaHero}</span>
                {/* <span className="bg-white/20 px-3 py-0.5 hidden rounded-full text-xs font-bold">
                  {config.pricing.currencySymbol}
                  {config.pricing.amount}
                </span> */}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* <a
                href="#curriculum"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/25 font-medium text-base px-7 py-4 rounded-full transition-all"
              >
                <Layers className="w-4 h-4 text-purple-300" />
                <span>Explore 5 Phases</span>
              </a> */}
            </div>
          </div>

          {/* Argon Bottom Slider Controls & Slide Indicators */}
          <div className="absolute bottom-8 left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-white/15">
            {/* 4-Slide Segmented Progress Tabs */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 flex-1 max-w-2xl">
              {config.heroSlides.map((slide, idx) => {
                const active = idx === currentSlide;
                const progress = slideProgressArray[idx] || 0;
                return (
                  <button
                    key={slide.id}
                    onClick={() => goToSlide(idx)}
                    className="text-left group cursor-pointer focus:outline-none relative"
                  >
                    <div className="h-1.5 w-full rounded-full bg-white/20 overflow-hidden mb-2 relative">
                      {/* Per-slide animated progress bar - each slide tracks its own progress */}
                      <div
                        className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-blue-400 to-purple-400 origin-left transition-all duration-300 ease-out"
                        style={{
                          transform: `scaleX(${progress / 100})`,
                          transformOrigin: 'left center',
                        }}
                      />
                    </div>
                    {/* <div className="hidden sm:flex items-center gap-1.5">
                      <span
                        className={`text-[11px] font-bold uppercase tracking-wider truncate ${
                          active
                            ? "text-white"
                            : progress === 100
                            ? "text-blue-300"
                            : "text-white/50"
                        }`}
                      >
                        0{idx + 1}. {slide.type}
                      </span>
                    </div> */}
                  </button>
                );
              })}
            </div>

            {/* Audio Mute, Pause/Play & Prev/Next Buttons */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              {activeSlide.type === "video" && (
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  title={isMuted ? "Unmute Video" : "Mute Video"}
                  className=" hidden items-center gap-1.5 px-3.5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                  <span className="hidden md:inline">
                    {isMuted ? "Muted" : "Sound On"}
                  </span>
                </button>
              )}
              {/* Pause/Play Auto-Advance Button */}
              <button
                onClick={() => setIsHeroPaused(!isHeroPaused)}
                title={isHeroPaused ? "Resume Auto-Advance" : "Pause Auto-Advance"}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                {isHeroPaused ? (
                  <span className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </span>
                ) : (
                  <span className="w-5 h-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  </span>
                )}
              </button>
              <button
                onClick={() =>
                  goToSlide(
                    (currentSlide - 1 + config.heroSlides.length) %
                      config.heroSlides.length,
                  )
                }
                aria-label="Previous slide"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() =>
                  goToSlide(
                    (currentSlide + 1) % config.heroSlides.length,
                  )
                }
                aria-label="Next slide"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          INTRODUCTORY STORY BAR (BELOW HERO)
          ===================================================================== */}
      <section className="py-12 sm:py-16 bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg sm:text-xl font-semibold text-slate-900 leading-relaxed mb-4">
            {config.hero.Lead}
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl mx-auto">
            {config.hero.narrative}
          </p>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: THE WORLD IS CHANGING (PROBLEM / CATCH / SOLUTION)
          ===================================================================== */}
      <section
        id="why-now"
        className="py-20 sm:py-28 bg-[#F8F9FA] border-b border-[#DADCE0]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14 sm:mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-3">
              {config.worldChanging.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-semibold text-[#202124] tracking-tight leading-tight">
              {config.worldChanging.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Context */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-7 sm:p-10 border border-[#DADCE0] flex flex-col justify-between shadow-xs">
              <div className="space-y-5">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                  <Cpu className="w-6 h-6" />
                </div>
                {config.worldChanging.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className="text-[#5F6368] text-base sm:text-lg leading-relaxed"
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#5F6368]">
                <span>SPEED + CAPABILITY</span>
                <span className="text-blue-600">AI-ASSISTED WORKFLOWS</span>
              </div>
            </div>

            {/* Right Column: The Catch & The Academy Solution */}
            <div className="lg:col-span-7 flex flex-col gap-6 sm:gap-8">
              <div className="bg-white rounded-3xl p-7 sm:p-10 border-l-4 border-l-purple-600 border border-[#DADCE0] shadow-xs">
                <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-purple-50 text-purple-700 mb-4">
                  {config.worldChanging.catchTitle}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#202124] mb-3 leading-snug">
                  {config.worldChanging.catchHighlight}
                </h3>
                <p className="text-[#5F6368] text-base leading-relaxed">
                  {config.worldChanging.catchBody}
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50/90 via-white to-purple-50/90 rounded-3xl p-7 sm:p-10 border border-purple-200 flex-1 flex flex-col justify-between shadow-xs">
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4">
                    THE COMPLETE ROADMAP
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#202124] mb-3">
                    {config.worldChanging.solutionTitle}
                  </h3>
                  <p className="text-[#3C4043] text-base leading-relaxed">
                    {config.worldChanging.solutionBody}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-purple-200/60 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs font-semibold text-purple-900">
                    Understand Tools → Build → Launch → Showcase → Monetize
                  </span>
                  <button
                    onClick={openCheckout}
                    className="text-sm font-bold text-blue-600 hover:text-purple-700 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <span>Start the journey</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
{/* =====================================================================
          SECTION 3: 7 PRACTICAL ABILITIES ("BEYOND JUST USING AI")
          FLOW LAYOUT WITH ARROWS CONNECTING ABILITIES
      ===================================================================== */}
     <section
  id="abilities"
  className="py-16 sm:py-24 bg-white border-b border-gray-100"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Header */}
    <div className="max-w-2xl mb-12 sm:mb-16">
      <span className="text-blue-600 text-xs font-bold uppercase tracking-wider">
        Practical Capabilities
      </span>
      <h2 className="mt-2 text-3xl sm:text-3xl   font-semibold text-gray-900 tracking-tight">
        {config.abilitiesSection.heading}
      </h2>
      <p className="mt-4 text-base sm:text-lg text-gray-600">
        {config.abilitiesSection.subheading}
      </p>
    </div>

    {/* Minimal Grid Layout for Abilities */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
      {config.abilitiesSection.abilities.map((item, idx) => (
        <div key={item.id} className="rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-7  items-start gap-5 brand-card-shadow brand-card-hover">
          <div className="mb-2   flex  gap-2 item-center  ">
           
               <h3 className="text-xl  text-gray-900 mb-2">
            {item.title}
          </h3>
          </div>
       
          <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-grow">
            {item.description}
          </p>
          <div className="pt-1 border-t border-gray-100">
            <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">
              Outcome
            </span>
            <span className="block font-bold text-blue-500   text-sm">
              {item.deliverable}
            </span>
          </div>
        </div>
      ))}
    </div>

    {/* Streamlined Closing Note */}
    <div className="mt-16 sm:mt-24 p-8 sm:p-10 bg-gray-50 rounded-2xl text-center border border-gray-100">
      <h4 className="text-xl sm:text-2xl font-  semibold text-gray-900 mb-4">
        "{config.abilitiesSection.closingNote}"
      </h4>
      <p className="text-sm text-gray-600 max-w-2xl mx-auto mb-8">
        Start as a beginner. Build, customize, deploy, and present real digital assets you can demonstrate live.
      </p>
      <button
        onClick={() => openCheckout()}
        className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
      >
        Join AI Builder Academy 
      </button>
    </div>
  </div>
</section>

      {/* =====================================================================
          SECTION 4: INTERACTIVE 5-PHASE, 12-MODULE CURRICULUM EXPLORER
          WITH IMAGES WRAPPED WITH DETAILS (LIKE OLD ABILITIES SECTION)
      ===================================================================== */}
      <section
        id="curriculum"
        className="py-20 sm:py-28 bg-[#F8F9FA] border-b border-[#E5E7EB]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div className="space-y-4 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3E8FF] text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
                COMPLETE SYLLABUS • 5 PHASES & 12 MODULES
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-semibold text-[#202124] tracking-tight leading-tight">
                {config.curriculum.heading}
              </h2>
              <p className="text-base sm:text-lg text-[#5F6368] leading-relaxed">
                {config.curriculum.subheading}
              </p>
            </div>

            {/* Toggle between Tabbed View and Full Expanded Syllabus */}
            {/* <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-auto">
              <button
                onClick={() => setShowAllPhases(false)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                  !showAllPhases
                    ? "bg-[#2563EB] text-white border-[#2563EB] shadow-xs"
                    : "bg-white text-[#5F6368] border-[#E5E7EB] hover:text-[#202124]"
                }`}
              >
                Interactive Phase Tabs
              </button>
              <button
                onClick={() => setShowAllPhases(true)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold border transition-all cursor-pointer ${
                  showAllPhases
                    ? "bg-[#7C3AED] text-white border-[#7C3AED] shadow-xs"
                    : "bg-white text-[#5F6368] border-[#E5E7EB] hover:text-[#202124]"
                }`}
              >
                View All 5 Phases Together
              </button>
            </div> */}
          </div>

          {/* Phase Selector Pills (Responsive Grid with Zero Overflow) */}
          {!showAllPhases && (
            <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
              {config.curriculum.phases.map((phase, idx) => {
                const isPurple = idx % 2 === 1;
                const accent = getBrandAccentClasses(
                  isPurple ? "purple" : "blue",
                );
                // Phase images - using placeholder images for each phase
                const phaseImages = [
                  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80", // Phase 1 - Foundation
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80", // Phase 2 - AI Tools
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80", // Phase 3 - Building
                  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80", // Phase 4 - Deployment
                  "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&q=80", // Phase 5 - Monetization
                ];
                return (
                  <button
                    key={phase.id}
                    onClick={() => openPhaseDrawer(phase.id)}
                    className="relative rounded-2xl overflow-hidden bg-white border border-[#E5E7EB] hover:border-[#2563EB] hover:shadow-xl transition-all cursor-pointer group h-full flex flex-col"
                  >
                    {/* Phase Image */}
                    <div className="relative h-40 w-full overflow-hidden bg-[#F3F4F6]">
                      <img
                        src={phaseImages[idx]}
                        alt={`${phase.title} phase`}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-[#111827]/20 to-transparent" />
                      
                      {/* Top Number & Badge Overlay */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs ${isPurple ? "bg-[#7C3AED]" : "bg-[#2563EB]"}`}>
                          {phase.number}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/95 text-[#202124] backdrop-blur-xs">
                          {phase.modules.length} Modules
                        </span>
                      </div>

                      {/* Bottom Title Overlay on Image */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight drop-shadow-xs">
                          {phase.title}
                        </h3>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <p className="text-sm text-[#5F6368] leading-relaxed mb-4">
                        {phase.summary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {phase.modules.slice(0, 3).map((mod, mIdx) => (
                          <span
                            key={mod.code}
                            className="px-2.5 py-1 rounded-lg bg-white border border-[#E5E7EB] text-xs font-medium text-[#5F6368]"
                          >
                            {mod.code}
                          </span>
                        ))}
                        {phase.modules.length > 3 && (
                          <span className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE] text-xs font-medium text-[#2563EB]">
                            +{phase.modules.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Phase Content Display - Only show "View All" expanded view */}
          {showAllPhases && (
            <div className="space-y-10">
              {config.curriculum.phases.map((phase, pIdx) => {
                const isPurple = pIdx % 2 === 1;
                const accent = getBrandAccentClasses(
                  isPurple ? "purple" : "blue",
                );
                // Phase images for expanded view
                const phaseImages = [
                  "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80",
                  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
                  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
                  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
                  "https://images.unsplash.com/photo-1553484771-371a605b060b?w=1200&q=80",
                ];
                return (
                  <div
                    key={phase.id}
                    className="rounded-3xl bg-white border border-[#E5E7EB] overflow-hidden brand-card-shadow animate-fade-up"
                  >
                    {/* Phase Header with Image */}
                    <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-[#F3F4F6]">
                      <img
                        src={phaseImages[pIdx]}
                        alt={`${phase.title} phase`}
                        className="w-full h-full object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
                      
                      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="space-y-2.5">
                            <div className="flex flex-wrap items-center gap-2.5">
                              <span className={`px-3.5 py-1 rounded-full text-xs font-bold ${accent.bgSoft} ${accent.text}`}>
                                {phase.number}
                              </span>
                              <span className="text-xs font-semibold text-white/80">
                                {phase.modules.length} Practical Modules
                              </span>
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                              {phase.number} — {phase.title}
                            </h3>
                            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                              {phase.summary}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Modules Grid inside Phase */}
                    <div className="p-6 sm:p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                        {phase.modules.map((mod, mIdx) => {
                          const modPurple = mIdx % 2 === 1;
                          return (
                            <div
                              key={mod.code}
                              className="rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] p-6 sm:p-8 flex flex-col justify-between hover:border-[#7C3AED] hover:bg-white transition-all brand-card-hover"
                            >
                              <div className="space-y-4">
                                <div className="flex items-center justify-between gap-2">
                                  <span
                                    className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full ${
                                      modPurple
                                        ? "bg-[#F3E8FF] text-[#7C3AED]"
                                        : "bg-[#EFF6FF] text-[#2563EB]"
                                    }`}
                                  >
                                    {mod.code}
                                  </span>
                                  <Code2 className="w-4 h-4 text-[#7C3AED]" />
                                </div>

                                <h4 className="text-lg sm:text-xl font-bold text-[#202124] leading-snug">
                                  {mod.code}: {mod.title}
                                </h4>

                                <p className="text-sm sm:text-base text-[#5F6368] leading-relaxed">
                                  {mod.description}
                                </p>
                              </div>

                              <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex flex-wrap gap-2">
                                {mod.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-3 py-1 rounded-lg bg-white border border-[#E5E7EB] text-xs font-medium text-[#5F6368]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: PREVIOUS PROJECTS BUILT & SHOWCASE GALLERY (CAROUSEL)
      ===================================================================== */}
      <section
        id="projects"
        className="py-20 sm:py-28 bg-white border-b border-[#E5E7EB] relative"
       
      >
        <span
          id="showcase"
          className="absolute -top-24 left-0 pointer-events-none"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-20">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold uppercase">
                <Layers className="w-3.5 h-3.5 text-[#7C3AED]" />
                PORTFOLIO & PREVIOUS PROJECTS BUILT
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-semibold text-[#202124] tracking-tight leading-tight">
                {config.previousProjects.heading}
              </h2>
              <p className="text-base sm:text-lg text-[#5F6368] leading-relaxed">
                {config.previousProjects.subheading}
              </p>
            </div>

            <button
              onClick={() => setAddProjectModalOpen(true)}
              className="hidden items-center gap-2 px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold text-[#7C3AED] bg-[#F3E8FF] hover:bg-[#EDE9FE] border border-[#DDD6FE] transition-colors cursor-pointer self-start lg:self-auto shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your Own Built Project</span>
            </button>
          </div>

          {/* Projects Carousel */}
          <div className="relative">
            {/* Carousel Viewport */}
            <div className="overflow-hidden touch-pan-x"
              onTouchStart={(e) => { touchStartRef.current = e.touches[0].clientX; }}
              onTouchEnd={(e) => {
                const touchEnd = e.changedTouches[0].clientX;
                const diff = touchStartRef.current - touchEnd;
                if (Math.abs(diff) > 50) {
                  if (diff > 0) {
                    goToProjectSlide((currentProjectSlide + 1) % config.previousProjects.projects.length);
                  } else {
                    goToProjectSlide((currentProjectSlide - 1 + config.previousProjects.projects.length) % config.previousProjects.projects.length);
                  }
                }
              }}
            >
              <div
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${currentProjectSlide * 100}%)`,
                }}
              >
                {config.previousProjects.projects.map((proj, idx) => {
                  const isPurple = idx % 2 === 1;
                  // Project-specific placeholder images
                  const projectImages = [
                    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80", // Web App
                    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80", // Mobile/App
                    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80", // Dashboard
                    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80", // E-commerce
                    "https://images.unsplash.com/photo-1553484771-371a605b060b?w=1200&q=80", // SaaS
                    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80", // Analytics
                  ];
                  const projectImage = projectImages[idx % projectImages.length];
                  
                  return (
                    <div key={proj.id} className="w-full flex-shrink-0 ">
                      <a
                        href={proj.livePreviewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block rounded-3xl bg-white border border-[#E5E7EB] overflow-hidden brand-card-shadow brand-card-hover group no-underline h-full"
                      >
                        {/* Project Image Header with Overlay Details */}
                        <div className="relative h-64 w-full overflow-hidden bg-[#F3F4F6]">
                          <img
                            src={projectImage}
                            alt={`${proj.title} project preview`}
                            loading="lazy"
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-[#111827]/30 to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/20" />

                          

                          {/* Bottom Content Overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <div className="flex items-center justify-between gap-2 mb-3">
                             
                              <span className=" hidden                        px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 text-white/90 backdrop-blur-sm border border-white/30 shrink-0">
                                LIVE DEMO
                              </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-lg group-hover:text-purple-200 transition-colors">
                              {proj.title}
                            </h3>
                            <p className="text-sm sm:text-base text-white/70 leading-relaxed mt-2 line-clamp-2">
                              {proj.summary}
                            </p>
                          </div>
                        </div>

                        {/* Card Body - Tech Stack & Details */}
                        <div className="p-6 sm:p-8 space-y-6">
                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2">
                            {proj.techStack.map((tech) => (
                              <span
                                key={tech}
                                className="px-3 py-1.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-sm font-semibold text-[#202124] group-hover:border-[#2563EB] group-hover:bg-[#EFF6FF] transition-colors"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Outcome & CTA */}
                          <div className="pt-4 border-t border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="hidden items-center gap-3 text-sm font-bold text-[#7C3AED]">
                              <CheckCircle2 className="w-5 h-5 shrink-0 text-[#2563EB]" />
                              <span>{proj.outcomeMetric}</span>
                            </div>

                            <div className="inline-flex items-center gap-2 text-sm font-bold text-[#2563EB] hover:text-[#7C3AED] transition-colors group">
                              <span className="relative">View Live Demo</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigation Arrows - Outside Carousel for Better Visibility */}
            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 sm:px-6 -ml-4 sm:-ml-6 -mr-4 sm:-mr-6 pointer-events-none z-20">
              <button
                onClick={() => goToProjectSlide(
                  (currentProjectSlide - 1 + config.previousProjects.projects.length) % config.previousProjects.projects.length
                )}
                aria-label="Previous project"
                className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white  backdrop-blur-md border border-[#E5E7EB] shadow-xl flex items-center justify-center text-[#202124] hover:bg-white hover:border-[#2563EB] hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-[#2563EB]" />
              </button>
              <button
                onClick={() => goToProjectSlide(
                  (currentProjectSlide + 1) % config.previousProjects.projects.length
                )}
                aria-label="Next project"
                className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/95 backdrop-blur-md border border-[#E5E7EB] shadow-xl flex items-center justify-center text-[#202124] hover:bg-white hover:border-[#2563EB] hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#2563EB]" />
              </button>
            </div>

            {/* Slide Indicators & Progress */}
            <div className="mt-8 flex flex-col items-center gap-4">
              {/* Progress Bar for Auto-Advance */}
              <div className="w-50   max-w-md h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] origin-left"
                  style={{
                    transform: `scaleX(${projectSlideProgress / 100})`,
                    transformOrigin: 'left center',
                    transition: 'transform 0.1s linear',
                  }}
                />
              </div>

              {/* Slide Indicators/Dots */}
              <div className="flex items-center gap-2">
                {config.previousProjects.projects.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToProjectSlide(idx)}
                    aria-label={`Go to project ${idx + 1}`}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === currentProjectSlide
                        ? "bg-gradient-to-r from-[#2563EB] to-[#7C3AED] w-8 shadow-md"
                        : "bg-[#D1D5DB] hover:bg-[#9CA3AF]"
                    }`} />
                ))}
              </div>

              {/* Pause/Play Toggle */}
              <button
                onClick={() => setIsProjectsPaused(!isProjectsPaused)}
                title={isProjectsPaused ? "Resume Auto-Slide" : "Pause Auto-Slide"}
                className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-[#E5E7EB] flex items-center justify-center text-[#5F6368] hover:text-[#202124] hover:border-[#2563EB] hover:bg-white transition-all cursor-pointer"
              >
                {isProjectsPaused ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: BUILT FOR BEGINNERS — 5-STEP LEARNING LOOP
      ===================================================================== */}
      <section className="py-20 sm:py-28 bg-[#F8F9FA] border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Copy */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold uppercase">
                BEGINNER-FRIENDLY METHODOLOGY
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-semibold text-[#202124] tracking-tight leading-tight">
                {config.beginnerSection.heading}
              </h2>
              <p className="text-lg sm:text-xl font-bold text-[#7C3AED]">
                {config.beginnerSection.lead}
              </p>
              {config.beginnerSection.paragraphs.map((p, i) => (
                <p key={i} className="text-base text-[#5F6368] leading-relaxed">
                  {p}
                </p>
              ))}

              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E7EB] space-y-4 brand-card-shadow">
                <p className="text-sm sm:text-base font-bold text-[#202124] leading-relaxed">
                  {config.beginnerSection.closingHighlight}
                </p>
                <p className="text-xs sm:text-sm text-[#5F6368] leading-relaxed">
                  {config.beginnerSection.audienceNote}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {config.beginnerSection.audiences.map((aud, aIdx) => (
                    <span
                      key={aud}
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        aIdx % 2 === 0
                          ? "bg-[#EFF6FF] text-[#2563EB]"
                          : "bg-[#F3E8FF] text-[#7C3AED]"
                      }`}
                    >
                      {aud}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right 5-Step Process Cards */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#5F6368] mb-3">
                {config.beginnerSection.stepsHeading}
              </h3>
              {config.beginnerSection.steps.map((s, idx) => {
                const isPurple = idx % 2 === 1;
                const accent = getBrandAccentClasses(
                  isPurple ? "purple" : "blue",
                );
                return (
                  <div
                    key={s.step}
                    className="rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-7 flex items-start gap-5 brand-card-shadow brand-card-hover"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl ${accent.bgSoft} ${accent.text} font-extrabold text-lg flex items-center justify-center shrink-0`}
                    >
                      {s.step}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-base sm:text-lg font-bold text-[#202124]">
                        {s.title}
                      </h4>
                      <p className="text-sm sm:text-base text-[#5F6368] leading-relaxed">
                        {s.detail}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 7: CHOOSE YOUR PATH + LEARN BY DOING
      ===================================================================== */}
      <section
        id="paths"
        className="py-20 sm:py-28 bg-white border-b border-[#E5E7EB]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {/* Part A: Choose Your Path */}
          <div>
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-14 lg:mb-20">
              <span className="inline-flex px-3.5 py-1.5 rounded-full bg-[#F3E8FF] text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
                TAILORED OUTCOMES
              </span>
              <h2 className="text-2xl sm:text-2xl lg:text-[42px] font-bold text-[#202124] tracking-tight leading-tight">
                {config.pathsSection.heading}
              </h2>
              <p className="text-base sm:text-lg text-[#5F6368]">
                {config.pathsSection.subheading}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
              {config.pathsSection.paths.map((path, idx) => {
                const IconComp = ICON_MAP[path.icon] || Rocket;
                const isPurple = idx % 2 === 1;
                const accent = getBrandAccentClasses(
                  isPurple ? "purple" : "blue",
                );
                const isSelected = selectedPathId === path.id;
                return (
                  <div
                    key={path.id}
                    onClick={() => setSelectedPathId(path.id)}
                    className={`rounded-3xl p-7 sm:p-9 border transition-all cursor-pointer flex flex-col justify-between brand-card-hover ${
                      isSelected
                        ? "bg-white border-2 border-[#2563EB] brand-card-shadow"
                        : "bg-[#F8F9FA] border-[#E5E7EB] hover:bg-white"
                    }`}
                  >
                    <div className="space-y-5">
                      <div className="flex items-center justify-between gap-2">
                        <div
                          className={`w-13 h-13 rounded-2xl ${accent.bgSoft} ${accent.text} flex items-center justify-center`}
                        >
                          <IconComp className="w-6 h-6" />
                        </div>
                        {isSelected && (
                          <span className="px-3.5 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold">
                            Selected Path
                          </span>
                        )}
                      </div>

                      <h3 className="text-2xl font-bold text-[#202124]">
                        {path.title}
                      </h3>

                      <p
                        className={`text-sm sm:text-base font-bold ${accent.text}`}
                      >
                        {path.question}
                      </p>

                      <p className="text-sm sm:text-base text-[#5F6368] leading-relaxed">
                        {path.description}
                      </p>
                    </div>

                    <div className="mt-8 pt-6 border-t border-[#E5E7EB] space-y-5">
                      <div className="space-y-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#5F6368]">
                          Core Focus Modules:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {path.keyModules.map((km) => (
                            <span
                              key={km}
                              className="px-3 py-1 rounded-lg bg-white border border-[#E5E7EB] text-xs font-semibold text-[#202124]"
                            >
                              {km}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openCheckout(path.title);
                        }}
                        className={`w-full py-3.5 px-5 rounded-full text-white text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs ${
                          isPurple
                            ? "bg-[#7C3AED] hover:bg-[#6D28D9]"
                            : "bg-[#2563EB] hover:bg-[#1D4ED8]"
                        }`}
                      >
                        <span>Choose {path.title}</span>
                        <span className="opacity-90">({displayPrice})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Part B: More Than Watching Lessons — Learn by Doing */}
<div className=" hidden rounded-3xl bg-gradient-to-br from-[#F8F9FA] via-white to-[#F3E8FF]/40 border border-[#E5E7EB] p-8 sm:p-12 brand-card-shadow">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold uppercase">
                  <Terminal className="w-3.5 h-3.5 text-[#7C3AED]" />
                  HANDS-ON IMPLEMENTATION
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-semibold text-[#202124] tracking-tight leading-tight">
                  {config.learnByDoing.heading}
                </h2>
                <div className="space-y-4">
                  {config.learnByDoing.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className={`text-sm sm:text-base leading-relaxed ${
                        idx === config.learnByDoing.paragraphs.length - 1
                          ? "font-bold text-[#202124]"
                          : "text-[#5F6368]"
                      }`}
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-white border border-[#E5E7EB] p-6 sm:p-8 space-y-5 brand-card-shadow">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
                    Interactive Experience & Support Elements
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {config.learnByDoing.experiencePills.map((pill, idx) => (
                      <div
                        key={pill}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#202124]"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            idx % 2 === 0 ? "text-[#2563EB]" : "text-[#7C3AED]"
                          }`}
                        />
                        <span>{pill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: TRANSPARENCY & HONESTY CALLOUT
      ===================================================================== */}
      <section className="py-20 sm:py-24 bg-[#F8F9FA] border-b border-[#E5E7EB]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-[#E5E7EB] p-8 sm:p-12 relative overflow-hidden brand-card-shadow">
            {/* 4-color Blue-Purple-Blue-Purple top bar */}
            <div className="absolute top-0 left-0 right-0 flex h-1.5">
              <div className="w-1/4 bg-[#2563EB]" />
              <div className="w-1/4 bg-[#7C3AED]" />
              <div className="w-1/4 bg-[#3B82F6]" />
              <div className="w-1/4 bg-[#9333EA]" />
            </div>

            <div className="flex flex-col md:flex-row gap-6 sm:gap-8 items-start">
              <div className="w-14 h-14 rounded-2xl bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-7 h-7" />
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2563EB]">
                  RESPONSIBLE BUILDING & REALISTIC EXPECTATIONS
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-semibold text-[#202124] tracking-tight leading-tight">
                  {config.honestySection.heading}
                </h2>
                <p className="text-lg font-bold text-[#7C3AED]">
                  {config.honestySection.lead}
                </p>
                <div className="space-y-4 text-sm sm:text-base text-[#5F6368] leading-relaxed">
                  {config.honestySection.paragraphs.map((p, idx) => (
                    <p
                      key={idx}
                      className={
                        idx === config.honestySection.paragraphs.length - 1
                          ? "font-bold text-[#202124]"
                          : ""
                      }
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 9: STOP WATCHING FROM THE SIDELINES + PRICING / CHECKOUT CARD
      ===================================================================== */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex px-3.5 py-1.5 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold uppercase">
                YOUR STARTING POINT
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-semibold text-[#202124] tracking-tight leading-tight">
                {config.sidelinesCta.heading}
              </h2>
              <div className="  space-y-4 text-base sm:text-lg text-[#5F6368] leading-relaxed">
                {config.sidelinesCta.paragraphs.map((p, idx) => (
                  <p
                    key={idx}
                    className={
                      idx === 2 || idx === 5 ? "font-semibold text-[#202124]" : ""
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              <div className="pt-4 space-y-2.5">
                <h3 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-[#2563EB] to-[#7C3AED] bg-clip-text text-transparent">
                  {config.sidelinesCta.highlightHeading}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-[#202124] leading-relaxed">
                  {config.sidelinesCta.highlightSub}
                </p>
              </div>
            </div>

            {/* Right Official Enrollment Checkout Card (Price: 10,000) */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl bg-white border-2 border-[#2563EB] p-7 sm:p-10 brand-card-shadow space-y-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#2563EB]" />

                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="px-3.5 py-1 rounded-full bg-[#EFF6FF] text-[#2563EB] text-xs font-bold uppercase">
                    FULL PROGRAM ACCESS
                  </span>
                  <span className="text-xs font-bold text-[#7C3AED] bg-[#F3E8FF] px-3 py-1 rounded-full">
                    One-Time Enrollment
                  </span>
                </div>

                <div>
                  <div className="text-sm font-medium text-[#5F6368]">
                    Complete 5-Phase Curriculum & Project Roadmap
                  </div>
                  <div className="mt-2 flex items-baseline gap-2 flex-wrap">
                    <span className="text-4xl sm:text-5xl font-bold text-[#202124] tracking-tight">
                      {displayPrice}
                    </span>
                    <span className="text-xs font-semibold text-[#5F6368]">
                      / full access
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5 pt-4 border-t border-[#E5E7EB] text-sm text-[#202124]">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>All 5 Phases & 12 Practical Modules</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" />
                    <span>Website, Full-Stack App & Deployment Guides</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>Freelancer, Career Builder & Founder Playbooks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#7C3AED] shrink-0" />
                    <span>
                      AI Outreach Templates, Portfolio & MVP Frameworks
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => openCheckout()}
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span>
                    {config.sidelinesCta.buttonText}
                  </span>
                </button>

                <p className="text-center text-xs text-[#5F6368]">
                  {config.sidelinesCta.footerCaption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 10: FREQUENTLY ASKED QUESTIONS (SPACIOUS ACCORDION)
      ===================================================================== */}
      <section
        id="faq"
        className="py-20 sm:py-28 bg-[#F8F9FA] border-b border-[#E5E7EB]"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <span className="inline-flex px-3.5 py-1.5 rounded-full bg-[#F3E8FF] text-[#7C3AED] text-xs font-bold uppercase tracking-wider">
              CLEAR ANSWERS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-semibold text-[#202124] tracking-tight leading-tight">
              Frequently Asked Questions
            </h2>
          </div>

          {/* Search Filter Bar */}
          <div className="mb-8 relative">
            <Search className="w-4 h-4 text-[#7C3AED] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search questions (e.g., coding experience, clients, jobs, computer)..."
              className="w-full pl-11 pr-4 py-4 rounded-full bg-white border border-[#E5E7EB] text-sm text-[#202124] placeholder-[#5F6368] focus:outline-none focus:border-[#2563EB] shadow-2xs"
            />
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={faq.question}
                  className={`rounded-2xl bg-white border transition-all overflow-hidden ${
                    isOpen
                      ? "border-[#2563EB] brand-card-shadow"
                      : "border-[#E5E7EB]"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full px-6 sm:px-8 py-5 sm:py-6 text-left flex items-center justify-between gap-4 hover:bg-[#F8F9FA] transition-colors cursor-pointer"
                  >
                    <span className="font-bold text-base sm:text-lg text-[#202124]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-[#7C3AED]" : "text-[#5F6368]"
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 sm:px-8 pb-6 pt-2 text-sm sm:text-base text-[#5F6368] leading-relaxed border-t border-[#F3F4F6] animate-fade-up">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 11: FINAL CONVERSION BANNER ("READY TO BUILD SOMETHING REAL?")
      ===================================================================== */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-[#EFF6FF] via-white to-[#F3E8FF] border-2 border-[#BFDBFE] p-8 sm:p-14 text-center space-y-6 brand-card-shadow">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white text-[#7C3AED] shadow-xs border border-[#DDD6FE] animate-float-slow">
              <Rocket className="w-7 h-7 text-[#2563EB]" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-[42px] font-semibold text-[#202124] tracking-tight leading-tight">
              {config.finalBanner.heading}
            </h2>

            <p className="text-base sm:text-lg font-medium text-[#5F6368] max-w-2xl mx-auto leading-relaxed">
              {config.finalBanner.subtext}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
              <button
                onClick={() => openCheckout()}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white font-bold text-base shadow-md hover:shadow-lg transition-all inline-flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>{config.finalBanner.buttonText}</span>
                <span className="px-3 py-0.5 rounded-full bg-white text-[#2563EB] text-sm font-extrabold">
                  {displayPrice}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          CLEAN FOOTER WITH BLUE-PURPLE-BLUE-PURPLE EMBLEM
      ===================================================================== */}
      <footer className="bg-[#F8F9FA] border-t border-[#E5E7EB] py-12 text-xs text-[#5F6368]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#9333EA]" />
            </div>
            <span className="font-bold text-[#202124]">
              {config.meta.brandName}
            </span>
            <span className="hidden sm:inline">•</span>
            <span>{config.meta.brandTagline}</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => openCheckout()}
              className="font-bold text-[#7C3AED] hover:underline cursor-pointer"
            >
              Checkout ({displayPrice})
            </button>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          MODAL 1: INTERACTIVE CHECKOUT MODAL (PRICE: 10,000)
      ===================================================================== */}
      {checkoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-[#E5E7EB] rounded-3xl max-w-lg w-full overflow-hidden brand-card-shadow animate-fade-up my-8">
            <div className="h-1.5 w-full flex">
              <div className="w-1/4 bg-[#2563EB]" />
              <div className="w-1/4 bg-[#7C3AED]" />
              <div className="w-1/4 bg-[#3B82F6]" />
              <div className="w-1/4 bg-[#9333EA]" />
            </div>
            <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#E5E7EB] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4 text-[#7C3AED]" />
                <span className="font-bold text-sm text-[#202124]">
                  {config.meta.brandName} — Official Checkout
                </span>
              </div>
              <button
                onClick={() => setCheckoutOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#E5E7EB] text-[#5F6368] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {checkoutStep === "details" ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setCheckoutStep("success");
                }}
                className="p-6 sm:p-8 space-y-5"
              >
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#EFF6FF] to-[#F3E8FF] border border-[#DDD6FE] flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold uppercase text-[#7C3AED]">
                      Enrollment Package
                    </div>
                    <div className="font-bold text-base text-[#202124]">
                      {config.meta.brandName} (All 5 Phases)
                    </div>
                    <div className="text-xs text-[#5F6368] mt-0.5">
                      12 Modules • Guided Projects • Portfolio Playbooks
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-2xl font-extrabold text-[#2563EB]">
                      {displayPrice}
                    </div>
                    <div className="text-[11px] text-[#5F6368]">
                      One-time payment
                    </div>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#202124] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutForm.fullName}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          fullName: e.target.value,
                        })
                      }
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#202124] mb-1">
                      Email Address (For Portal Access)
                    </label>
                    <input
                      type="email"
                      required
                      value={checkoutForm.email}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          email: e.target.value,
                        })
                      }
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#2563EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#202124] mb-1">
                      Primary Goal / Learning Path
                    </label>
                    <select
                      value={checkoutForm.selectedTrack}
                      onChange={(e) =>
                        setCheckoutForm({
                          ...checkoutForm,
                          selectedTrack: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] text-sm bg-white focus:outline-none focus:border-[#2563EB]"
                    >
                      <option value="The Freelancer Path">
                        The Freelancer Path (Clients & Services)
                      </option>
                      <option value="The Career Builder Path">
                        The Career Builder Path (Tech Roles & CV)
                      </option>
                      <option value="The Founder Path">
                        The Founder Path (Launch Your Own MVP)
                      </option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Complete Enrollment — Pay {displayPrice}</span>
                </button>

                <div className="text-center text-[11px] text-[#5F6368]">
                  {config.meta.checkoutSupportNote}
                </div>
              </form>
            ) : (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-[#202124]">
                  Enrollment Confirmed!
                </h3>
                <p className="text-sm text-[#5F6368] max-w-sm mx-auto leading-relaxed">
                  Welcome to <strong>{config.meta.brandName}</strong>,{" "}
                  {checkoutForm.fullName || "Builder"}! Your onboarding
                  instructions and Phase 1 toolkit for{" "}
                  <strong>{checkoutForm.selectedTrack}</strong> have been
                  prepared for{" "}
                  <span className="text-[#202124] font-semibold">
                    {checkoutForm.email || "your email"}
                  </span>
                  .
                </p>
                <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] text-xs text-[#202124] font-medium">
                  Amount Paid:{" "}
                  <strong className="text-[#2563EB]">{displayPrice}</strong> •
                  Status: Active
                </div>
                <button
                  onClick={() => setCheckoutOpen(false)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-bold cursor-pointer"
                >
                  Return to Academy Page
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: INSPECT PROJECT ARCHITECTURE MODAL
      ===================================================================== */}
      {selectedProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-[#E5E7EB] rounded-3xl max-w-lg w-full overflow-hidden brand-card-shadow animate-fade-up">
            <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#E5E7EB] flex items-center justify-between">
              <span className="font-bold text-sm text-[#202124]">
                Project Case Study — {selectedProjectModal.category}
              </span>
              <button
                onClick={() => setSelectedProjectModal(null)}
                className="p-1.5 rounded-full hover:bg-[#E5E7EB] text-[#5F6368] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-[#F3E8FF] text-[#7C3AED] text-xs font-bold">
                {selectedProjectModal.phaseBadge}
              </span>
              <h3 className="text-xl font-bold text-[#202124]">
                {selectedProjectModal.title}
              </h3>
              <p className="text-sm text-[#5F6368] leading-relaxed">
                {selectedProjectModal.summary}
              </p>
              <div className="p-4 rounded-2xl bg-[#F8F9FA] border border-[#E5E7EB] space-y-1.5">
                <div className="text-xs font-bold uppercase text-[#202124]">
                  Technical & Architecture Notes:
                </div>
                <p className="text-xs text-[#5F6368] leading-relaxed">
                  {selectedProjectModal.architectureNotes}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {selectedProjectModal.techStack.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg bg-[#EFF6FF] text-xs font-semibold text-[#2563EB]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#7C3AED]">
                  {selectedProjectModal.outcomeMetric}
                </span>
                <button
                  onClick={() => {
                    setSelectedProjectModal(null);
                    openCheckout();
                  }}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-xs font-bold cursor-pointer"
                >
                  Learn to Build This — {displayPrice}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: ADD PREVIOUS PROJECT MODAL
      ===================================================================== */}
      {addProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border border-[#E5E7EB] rounded-3xl max-w-lg w-full overflow-hidden brand-card-shadow animate-fade-up">
            <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#E5E7EB] flex items-center justify-between">
              <span className="font-bold text-sm text-[#202124]">
                Add a Built Project to Showcase Gallery
              </span>
              <button
                onClick={() => setAddProjectModalOpen(false)}
                className="p-1.5 rounded-full hover:bg-[#E5E7EB] text-[#5F6368] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleAddProject} className="p-6 sm:p-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#202124] mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) =>
                    setNewProject({ ...newProject, title: e.target.value })
                  }
                  placeholder="e.g., Lagos Logistics Tracker Web App"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#202124] mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newProject.category}
                    onChange={(e) =>
                      setNewProject({ ...newProject, category: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#202124] mb-1">
                    Outcome Highlight
                  </label>
                  <input
                    type="text"
                    value={newProject.outcomeMetric}
                    onChange={(e) =>
                      setNewProject({
                        ...newProject,
                        outcomeMetric: e.target.value,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#202124] mb-1">
                  Project Description
                </label>
                <textarea
                  rows={3}
                  required
                  value={newProject.summary}
                  onChange={(e) =>
                    setNewProject({ ...newProject, summary: e.target.value })
                  }
                  placeholder="Describe what the project does and the problem it solves..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#202124] mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={newProject.techStack}
                  onChange={(e) =>
                    setNewProject({ ...newProject, techStack: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E5E7EB] text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setAddProjectModalOpen(false)}
                  className="px-4 py-2.5 rounded-full text-xs font-bold border border-[#E5E7EB] text-[#5F6368]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-full text-xs font-bold bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white cursor-pointer"
                >
                  Add to Showcase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          PHASE DRAWER (Mobile) / MODAL (Desktop)
      ===================================================================== */}
      {openPhaseId && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs lg:items-center"
          onClick={closePhaseDrawer}
        >
          <div
            className={`w-full max-w-2xl overflow-hidden brand-card-shadow animate-fade-up ${
              'lg:max-w-3xl lg:rounded-3xl lg:shadow-2xl'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile drawer handle */}
            <div className="lg:hidden flex items-center justify-center py-3 bg-white border-b border-[#E5E7EB]">
              <div className="w-10 h-1 rounded-full bg-[#E5E7EB]" />
            </div>

            <div className="lg:hidden px-4 py-3 bg-white border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 z-10">
              <h3 className="font-bold text-lg text-[#202124]">Phase Details</h3>
              <button
                onClick={closePhaseDrawer}
                className="p-2 rounded-xl hover:bg-[#F3F4F6] text-[#5F6368] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal header for desktop */}
            <div className="hidden lg:flex lg:items-center lg:justify-between lg:px-6 lg:py-4 lg:bg-[#F8F9FA] lg:border-b lg:border-[#E5E7EB]">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-[#202124]">{selectedPhase?.number || 'Phase'}</h3>
                  <p className="text-sm text-[#5F6368]">{selectedPhase?.modules?.length || 0} Practical Modules</p>
                </div>
              </div>
              <button
                onClick={closePhaseDrawer}
                className="p-2 rounded-xl hover:bg-[#E5E7EB] text-[#5F6368] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white overflow-y-auto max-h-[70vh] lg:max-h-[80vh] p-4 sm:p-6 lg:p-8">
              {selectedPhase && (
                <div className="space-y-6">
                  <div className="lg:hidden flex items-center gap-3 mb-4 p-4 bg-gradient-to-r from-[#EFF6FF] to-[#F3E8FF] rounded-2xl">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                      <Layers className="w-5 h-5 text-[#2563EB]" />
                    </div>
                    <div>
                      <p className="font-bold text-[#202124]">{selectedPhase.number} — {selectedPhase.title}</p>
                      <p className="text-sm text-[#5F6368]">{selectedPhase.modules.length} Modules</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[#5F6368] leading-relaxed">{selectedPhase.summary}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EFF6FF] text-[#2563EB]">
                        {selectedPhase.number}
                      </span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F3E8FF] text-[#7C3AED]">
                        {selectedPhase.modules.length} Modules
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E5E7EB]">
                    <h4 className="font-bold text-sm text-[#202124] mb-3">Modules</h4>
                    <div className="space-y-2">
                      {selectedPhase.modules.map((mod, mIdx) => {
                        const modPurple = mIdx % 2 === 1;
                        return (
                          <button
                            key={mod.code}
                            onClick={() => {
                              closePhaseDrawer();
                              openCheckout(`${selectedPhase.number} - ${mod.title}`);
                            }}
                            className="w-full text-left p-4 rounded-xl bg-[#F8F9FA] border border-[#E5E7EB] hover:border-[#2563EB] hover:bg-white hover:shadow-md transition-all flex items-start gap-4"
                          >
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${modPurple ? 'bg-[#F3E8FF] text-[#7C3AED]' : 'bg-[#EFF6FF] text-[#2563EB]'}`}>
                              <Code2 className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-sm text-[#202124] truncate">{mod.code}: {mod.title}</p>
                              <p className="text-xs text-[#5F6368] truncate">{mod.description}</p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {mod.tags.map((tag) => (
                                  <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium bg-white border border-[#E5E7EB] text-[#5F6368]">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-[#5F6368] shrink-0" />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* CTA Button at bottom */}
                  <div className="pt-6 border-t border-[#E5E7EB]">
                    <button
                      onClick={() => {
                        closePhaseDrawer();
                        openCheckout(selectedPhase.title);
                      }}
                      className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Explore {selectedPhase.title} — {displayPrice}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  }
    />
    </Routes>
  );
}

function getSelectedPhase(phaseId, config) {
  return config.curriculum.phases.find(p => p.id === phaseId);
}