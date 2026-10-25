import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Copy,
  Check,
  RefreshCw,
  Settings,
  Lock,
  ArrowRight,
  CreditCard,
} from 'lucide-react';
import { DEFAULT_PRODUCT_CONFIG, SAMPLE_SECOND_PRODUCT_CONFIG } from '../config/productConfig';

const ICON_MAP = {
  Briefcase: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  UserCheck: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Rocket: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 19c-3.866 0-7-3.134-7-7V4a1 1 0 011-1h2a1 1 0 011 1v8a5 5 0 0010 0v-8a1 1 0 011-1h2a1 1 0 011 1v8c0 3.866-3.134 7-7 7z" /></svg>,
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

export default function AdminConfig({ config, onConfigChange }) {
  const navigate = useNavigate();
  const [copiedConfig, setCopiedConfig] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

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

  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'pricing', label: 'Pricing', icon: CreditCard },
    { id: 'hero', label: 'Hero Slides', icon: ArrowRight },
    { id: 'curriculum', label: 'Curriculum', icon: Lock },
    { id: 'projects', label: 'Projects', icon: CreditCard },
    { id: 'json', label: 'Full JSON', icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Top Bar */}
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-xl hover:bg-[#F3F4F6] transition-colors"
                title="Back to Site"
              >
                <svg className="w-5 h-5 text-[#5F6368]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-lg text-[#202124]">Admin Config Panel</h1>
                  <p className="text-xs text-[#5F6368]">AI Builder Academy — Product Configuration</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#F3E8FF] text-[#7C3AED]">
                Live Preview: {config.meta.brandName}
              </span>
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-sm font-bold hover:opacity-90 transition-opacity"
              >
                View Live Site
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-t border-[#E5E7EB] overflow-x-auto pb-2">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-1 min-w-max" aria-label="Admin tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#2563EB] text-white shadow-sm'
                      : 'text-[#5F6368] hover:bg-[#F3F4F6] hover:text-[#202124]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'general' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#202124] mb-6">Brand & General Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#202124] mb-1">Product Name</label>
                  <input
                    type="text"
                    value={config.meta.brandName}
                    onChange={(e) => onConfigChange({ ...config, meta: { ...config.meta, brandName: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#202124] mb-1">Brand Tagline</label>
                  <input
                    type="text"
                    value={config.meta.brandTagline}
                    onChange={(e) => onConfigChange({ ...config, meta: { ...config.meta, brandTagline: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#202124] mb-1">Checkout Support Note</label>
                  <input
                    type="text"
                    value={config.meta.checkoutSupportNote}
                    onChange={(e) => onConfigChange({ ...config, meta: { ...config.meta, checkoutSupportNote: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#202124] mb-1">Hero Lead</label>
                  <textarea
                    rows={2}
                    value={config.hero.Lead}
                    onChange={(e) => onConfigChange({ ...config, hero: { ...config.hero, Lead: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-[#202124] mb-1">Hero Narrative</label>
                  <textarea
                    rows={3}
                    value={config.hero.narrative}
                    onChange={(e) => onConfigChange({ ...config, hero: { ...config.hero, narrative: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#202124] mb-6">Template Actions</h2>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => onConfigChange(DEFAULT_PRODUCT_CONFIG)}
                  className="px-5 py-3 rounded-xl bg-white border border-[#E5E7EB] text-sm font-bold text-[#202124] hover:border-[#2563EB] hover:bg-[#F8F9FA] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Reset to Default (AI Builder Academy)</span>
                </button>
                <button
                  onClick={() => onConfigChange(SAMPLE_SECOND_PRODUCT_CONFIG)}
                  className="px-5 py-3 rounded-xl bg-white border border-[#E5E7EB] text-sm font-bold text-[#7C3AED] hover:border-[#7C3AED] hover:bg-[#F8F9FA] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Settings className="w-4 h-4" />
                  <span>Load Sample 2nd Product</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'pricing' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#202124] mb-6">Pricing Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#202124] mb-1">Formatted Price</label>
                  <input
                    type="text"
                    value={config.meta.priceFormatted}
                    onChange={(e) => onConfigChange({ ...config, meta: { ...config.meta, priceFormatted: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#202124] mb-1">Currency Symbol</label>
                  <div className="flex flex-wrap gap-2">
                    {['₦', '$', '£', '€', ''].map((sym) => (
                      <button
                        key={sym || 'none'}
                        onClick={() => onConfigChange({ ...config, meta: { ...config.meta, currencySymbol: sym, showCurrencySymbol: Boolean(sym) } })}
                        className={`px-4 py-2.5 rounded-xl text-sm font-bold border cursor-pointer transition-all ${
                          config.meta.currencySymbol === sym && config.meta.showCurrencySymbol === Boolean(sym)
                            ? 'bg-[#2563EB] text-white border-[#2563EB]'
                            : 'bg-white text-[#5F6368] border-[#E5E7EB] hover:border-[#2563EB]'
                        }`}
                      >
                        {sym ? `${sym}${config.meta.priceFormatted}` : `${config.meta.priceFormatted} (No Symbol)`}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#202124] mb-1">Show Symbol</label>
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.meta.showCurrencySymbol}
                      onChange={(e) => onConfigChange({ ...config, meta: { ...config.meta, showCurrencySymbol: e.target.checked } })}
                      className="w-4 h-4 rounded border-[#E5E7EB] text-[#2563EB] focus:ring-[#2563EB]"
                    />
                    <span className="text-sm text-[#202124]">Display currency symbol</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#E5E7EB] p-6 shadow-sm">
              <h2 className="text-xl font-bold text-[#202124] mb-6">CTA Text</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-bold text-[#202124] mb-1">Primary CTA (Header)</label>
                  <input
                    type="text"
                    value={config.pricing.ctaPrimary}
                    onChange={(e) => onConfigChange({ ...config, pricing: { ...config.pricing, ctaPrimary: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#202124] mb-1">Hero CTA</label>
                  <input
                    type="text"
                    value={config.pricing.ctaHero}
                    onChange={(e) => onConfigChange({ ...config, pricing: { ...config.pricing, ctaHero: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#202124] mb-1">Billing Text</label>
                  <input
                    type="text"
                    value={config.pricing.billingText}
                    onChange={(e) => onConfigChange({ ...config, pricing: { ...config.pricing, billingText: e.target.value } })}
                    className="w-full px-4 py-3 rounded-xl border border-[#E5E7EB] focus:outline-none focus:border-[#2563EB]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hero' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#202124]">Hero Slides ({config.heroSlides.length})</h2>
              <span className="text-sm text-[#5F6368]">2 Videos + 2 Images</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {config.heroSlides.map((slide, idx) => (
                <div key={slide.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${slide.type === 'video' ? 'bg-[#EFF6FF] text-[#2563EB]' : 'bg-[#F3E8FF] text-[#7C3AED]'}`}>
                          {slide.type.toUpperCase()}
                        </span>
                        <span className="text-sm font-bold text-[#202124]">Slide {idx + 1}: {slide.tag}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-[#202124] mb-1">Title</label>
                          <input
                            type="text"
                            value={slide.title}
                            onChange={(e) => {
                              const newSlides = [...config.heroSlides];
                              newSlides[idx] = { ...slide, title: e.target.value };
                              onConfigChange({ ...config, heroSlides: newSlides });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#202124] mb-1">Subtitle</label>
                          <input
                            type="text"
                            value={slide.subtitle}
                            onChange={(e) => {
                              const newSlides = [...config.heroSlides];
                              newSlides[idx] = { ...slide, subtitle: e.target.value };
                              onConfigChange({ ...config, heroSlides: newSlides });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#202124] mb-1">Media URL</label>
                          <input
                            type="url"
                            value={slide.src}
                            onChange={(e) => {
                              const newSlides = [...config.heroSlides];
                              newSlides[idx] = { ...slide, src: e.target.value };
                              onConfigChange({ ...config, heroSlides: newSlides });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-[#202124] mb-1">Poster/Thumbnail URL</label>
                          <input
                            type="url"
                            value={slide.poster || ''}
                            onChange={(e) => {
                              const newSlides = [...config.heroSlides];
                              newSlides[idx] = { ...slide, poster: e.target.value };
                              onConfigChange({ ...config, heroSlides: newSlides });
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-[#E5E7EB] text-sm focus:outline-none focus:border-[#2563EB]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <img
                        src={slide.src}
                        alt={slide.title}
                        className="w-32 h-18 rounded-lg object-cover border border-[#E5E7EB]"
                        loading="lazy"
                      />
                      <button
                        onClick={() => {
                          const newSlides = config.heroSlides.filter((_, i) => i !== idx);
                          onConfigChange({ ...config, heroSlides: newSlides });
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors flex items-center gap-1"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newSlide = {
                    id: `slide-${Date.now()}`,
                    type: 'image',
                    src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&q=85',
                    poster: '',
                    tag: `0${config.heroSlides.length + 1} / NEW SLIDE`,
                    title: 'New Slide Title',
                    subtitle: 'New slide subtitle',
                  };
                  onConfigChange({ ...config, heroSlides: [...config.heroSlides, newSlide] });
                }}
                className="w-full py-4 border-2 border-dashed border-[#E5E7EB] rounded-2xl text-[#5F6368] font-bold hover:border-[#2563EB] hover:bg-[#F8F9FA] transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Add New Slide</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#202124]">Curriculum Phases ({config.curriculum.phases.length})</h2>
            </div>
            <div className="space-y-4">
              {config.curriculum.phases.map((phase, pIdx) => (
                <div key={phase.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${pIdx % 2 === 1 ? 'bg-[#F3E8FF] text-[#7C3AED]' : 'bg-[#EFF6FF] text-[#2563EB]'}`}>
                          {phase.number}
                        </span>
                        <h3 className="font-bold text-lg text-[#202124]">{phase.title}</h3>
                        <span className="text-sm text-[#5F6368]">{phase.modules.length} Modules</span>
                      </div>
                      <p className="text-[#5F6368] text-sm">{phase.summary}</p>
                    </div>
                    <button
                      onClick={() => {
                        const newPhases = config.curriculum.phases.filter((_, i) => i !== pIdx);
                        onConfigChange({ ...config, curriculum: { ...config.curriculum, phases: newPhases } });
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors shrink-0"
                    >
                      Delete Phase
                    </button>
                  </div>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.modules.map((mod, mIdx) => (
                      <div key={mod.code} className="bg-[#F8F9FA] rounded-xl p-3 border border-[#E5E7EB]">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${mIdx % 2 === 1 ? 'bg-[#F3E8FF] text-[#7C3AED]' : 'bg-[#EFF6FF] text-[#2563EB]'}`}>
                            {mod.code}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-[#202124] mb-1">{mod.title}</h4>
                        <p className="text-xs text-[#5F6368] mb-2">{mod.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {mod.tags.map((tag) => (
                            <span key={tag} className="px-2 py-0.5 rounded text-[10px] font-medium bg-white border border-[#E5E7EB] text-[#5F6368]">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#202124]">Previous Projects ({config.previousProjects.projects.length})</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {config.previousProjects.projects.map((proj, idx) => (
                <div key={proj.id} className="bg-white rounded-2xl border border-[#E5E7EB] p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-sm font-bold text-[#202124]">{proj.title}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${idx % 2 === 1 ? 'bg-[#F3E8FF] text-[#7C3AED]' : 'bg-[#EFF6FF] text-[#2563EB]'}`}>
                          {proj.category}
                        </span>
                        <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white border border-[#E5E7EB] text-[#5F6368]">{proj.phaseBadge}</span>
                      </div>
                      <p className="text-[#5F6368] text-sm mb-2">{proj.summary}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {proj.techStack.map((tech) => (
                          <span key={tech} className="px-2.5 py-1 rounded-lg bg-[#F8F9FA] border border-[#E5E7EB] text-xs font-semibold text-[#202124]">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-32 h-20 rounded-lg object-cover border border-[#E5E7EB]"
                        loading="lazy"
                      />
                      <button
                        onClick={() => {
                          const newProjects = config.previousProjects.projects.filter((_, i) => i !== idx);
                          onConfigChange({ ...config, previousProjects: { ...config.previousProjects, projects: newProjects } });
                        }}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'json' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#202124]">Full JSON Configuration</h2>
              <button
                onClick={handleCopyConfig}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] text-white text-sm font-bold hover:bg-[#1D4ED8] transition-colors cursor-pointer"
              >
                {copiedConfig ? (
                  <>
                    <Check className="w-4 h-4 text-[#7C3AED]" />
                    <span className="text-[#7C3AED]">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy JSON</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-[#1E1B4B] rounded-2xl p-6 max-h-[60vh] overflow-auto">
              <pre className="text-[#E0E7FF] font-mono text-[11px] leading-relaxed">
                {JSON.stringify(config, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}