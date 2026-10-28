/**
 * ============================================================================
 * PUNCHY, MINIMAL PRODUCT CONFIGURATION (DEFAULT_PRODUCT_CONFIG & SAMPLES)
 * ============================================================================
 * Centralized product details optimized for high-impact, straightforward, 
 * and persuasive landing page copy.
 */

export const DEFAULT_PRODUCT_CONFIG = {
  meta: {
    brandName: 'AI Builder Academy',
    brandTagline: 'Practical AI Engineering & Product Launch',
    priceFormatted: '10,000',
    currencySymbol: '₦',
    showCurrencySymbol: true,
    checkoutSupportNote: 'Secure checkout • Instant portal & community access',
  },
  brand: {
    name: 'AI Builder Academy',
    badge: 'BUILD & LAUNCH WITH AI',
    accentColors: ['#2563EB', '#7C3AED', '#3B82F6', '#9333EA'],
  },
  pricing: {
    amount: '10,000',
    currencySymbol: '₦',
    billingText: 'One-time payment • Lifetime updates & templates',
    ctaPrimary: 'Enroll Now — ₦10,000',
    ctaHero: 'Start Building',
  },
  heroSlides: [
    {
      id: 'slide-1',
      type: 'image',
      src: 'https://res.cloudinary.com/dzqpchfew/image/upload/v1792594301/photo_5962831705997512569_y_nic0ye.jpg',
      tag: '02 / REAL-WORLD DEPLOYMENT',
      title: 'Learn To Build Exceptional Apps with AI.',
      subtitle: 'Turn raw ideas into live websites, web apps, and working MVPs.',
    },
    {
      id: 'slide-2',
      type: 'video',
      src: 'https://res.cloudinary.com/dzqpchfew/video/upload/v1792594304/document_5962831705537517867_ituylz.mp4',
      poster: 'https://res.cloudinary.com/dzqpchfew/image/upload/v1792638660/Brain_and_laptop_graphic_design_2K_20261022040830_onojsg.jpg',  
      tag: '01 / AI-ASSISTED ENGINEERING',
      title: 'Launch Real Digital Products.',
      subtitle: 'No coding expertise required. Master the tools and follow the roadmap.',
    },
    
    {
      id: 'slide-3',
      type: 'video',
      src: 'https://res.cloudinary.com/dzqpchfew/video/upload/v1792594306/document_5962831705537518132_oubbnx.mp4',
      poster: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=85',
      tag: '03 / HANDS-ON MASTERY',
      title: 'Learn by Doing Moving from Beginner to Master',
      subtitle: 'Understand AI-generated code, fix bugs, and connect real databases.',
    },
    {
      id: 'slide-4',
      type: 'image',
      src: 'https://res.cloudinary.com/dzqpchfew/image/upload/v1792638660/Brain_and_laptop_graphic_design_2K_20261022040830_onojsg.jpg',
      tag: '04 / MONETIZE YOUR SKILLS',
      title: 'Turn Skills into Income.',
      subtitle: 'Showcase your portfolio, pitch businesses, or launch your startup.',
    },
  ],
  hero: {
    title: 'Build with AI. Launch Real Products.',
    Lead: 'You don’t need to be an expert programmer. You just need the right tools and a proven roadmap.',
    narrative: 'Stop prompting blindly. Learn to create professional websites, deploy web apps, and build a high-trust portfolio that lands clients and launches startups.',
    footnote: 'Start as a beginner. Learn by building. Ship real projects.',
  },
  worldChanging: {
    eyebrow: 'THE SHIFT IN MODERN WORKFLOWS',
    title: 'The World Is Changing. Are Your Skills?',
    paragraphs: [
      'AI is revolutionizing how we build software and launch businesses.',
      'Today, AI writes code, designs interfaces, and automates workflows in seconds—if you know how to command it.',
    ],
    catchTitle: 'But here’s the catch:',
    catchHighlight: 'Access to AI doesn’t make you a   complete  builder.',
    catchBody: 'Generating a beautiful layout is useless if you can’t customize it, connect a database, fix a bug, or publish it live.',
    solutionTitle: 'That’s where we come in.',
    solutionBody: 'We take you past basic chat prompts. You will learn the complete pipeline: from raw idea to live, monetizable product.',
  },
  abilitiesSection: {
    heading: 'Go Beyond Just "Using" AI',
    subheading: 'By the end of this academy, you will be able to:',
    closingNote: 'No useless certificates. Just hard skills and real projects.',
    abilities: [
      {
        id: 'ability-1',
        title: 'Build',
        description: 'Engineer responsive web apps and websites alongside AI.',
        deliverable: 'Responsive React & Full-Stack Apps',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'AI web and app development',
      },
      {
        id: 'ability-2',
        title: 'Launch',
        description: 'Deploy projects to the cloud and connect custom domains.',
        deliverable: 'Custom Domains & Cloud Deploys',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Cloud deployment and online launch',
      },
      {
        id: 'ability-3',
        title: 'Showcase',
        description: 'Compile a high-trust portfolio to prove your capability.',
        deliverable: 'Case Study Portfolio',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Showcase portfolio',
      },
      {
        id: 'ability-4',
        title: 'Monetize',
        description: 'Identify business problems, pitch solutions, and close deals.',
        deliverable: 'Targeted Outreach Proposals',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Client outreach and discovery',
      },
      {
        id: 'ability-7',
        title: 'Automate',
        description: 'Replace repetitive work with AI-powered business workflows.',
        deliverable: 'Automated CRM & Webhook Flows',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'AI automation workflows',
      },
    ],
  },
  curriculum: {
    heading: 'The Blueprint',
    subheading: '5 phases. 12 modules. From zero to confident builder.',
    eyebrow: 'STRUCTURED ROADMAP',
    title: 'What You’ll Learn',
    subtitle: 'Tap a phase below to reveal the modules.',
    phases: [
      {
        id: 'phase-1',
        number: 'PHASE 1',
        title: 'AI Fundamentals & Toolkit',
        summary: 'Master prompting and configure your AI dev environment.',
        modules: [
          {
            code: 'Module 1',
            title: 'Intro to AI-Powered Building',
            description: 'Learn prompting basics, identify AI’s limits, and scope your first project.',
            tags: ['Prompting', 'Scoping'],
          },
          {
            code: 'Module 2',
            title: 'Your AI Toolkit',
            description: 'Set up VS Code, Cursor, Claude, and ChatGPT for optimal development.',
            tags: ['VS Code', 'Claude', 'Cursor'],
          },
        ],
      },
      {
        id: 'phase-2',
        number: 'PHASE 2',
        title: 'Prompt Engineering & Apps Construction',
        summary: 'Generate UI, understand the code, and connect databases.',
        modules: [
          {
            code: 'Module 3',
            title: 'Design with AI',
            description: 'Plan, generate, and refine responsive, mobile-first interfaces.',
            tags: ['UI/UX', 'Tailwind', 'Mobile-First'],
          },
          {
            code: 'Module 4',
            title: 'Understand the Code',
            description: 'Grasp HTML, CSS, JS, and React so you can tweak what AI builds.',
            tags: ['React Basics', 'JSX'],
          },
          {
            code: 'Module 5',
            title: 'Functional Apps',
            description: 'Integrate forms, APIs, auth, and databases to make your app interactive.',
            tags: ['APIs', 'Supabase', 'Auth'],
          },
        ],
      },
      {
        id: 'phase-3',
        number: 'PHASE 3',
        title: 'Launch & Showcase',
        summary: 'Ship to production and build your case studies.',
        modules: [
          {
            code: 'Module 6',
            title: 'Deploy Online',
            description: 'Master Git, push to Vercel/Netlify, and attach custom domains.',
            tags: ['Git', 'Vercel', 'Domains'],
          },
          {
            code: 'Module 7',
            title: 'The Portfolio',
            description: 'Frame your projects into compelling case studies that build trust.',
            tags: ['Portfolio Design', 'Proof of Work'],
          },
        ],
      },
      {
        id: 'phase-4',
        number: 'PHASE 4',
        title: 'Create Opportunities',
        summary: 'Pitch clients and position yourself for tech roles.',
        modules: [
          {
            code: 'Module 8',
            title: 'Find Clients',
            description: 'Identify niches, audit websites, and spot operational pain points.',
            tags: ['Market Research', 'Lead Gen'],
          },
          {
            code: 'Module 9',
            title: 'Outreach & Sales',
            description: 'Use AI to draft personalized pitches, handle objections, and close deals.',
            tags: ['Cold Outreach', 'Proposals'],
          },
          {
            code: 'Module 10',
            title: 'Tech Career Prep',
            description: 'Optimize your CV and LinkedIn to land entry-level tech positions.',
            tags: ['CV Optimization', 'Interview Prep'],
          },
        ],
      },
      {
        id: 'phase-5',
        number: 'PHASE 5',
        title: 'Scale & Automate',
        summary: 'Launch your own MVP and automate business workflows.',
        modules: [
          {
            code: 'Module 11',
            title: 'Launch Your MVP',
            description: 'Validate ideas, build a Micro-SaaS, and gather user feedback.',
            tags: ['MVP', 'Product Launch'],
          },
          {
            code: 'Module 12',
            title: 'AI Automation',
            description: 'Connect APIs, webhooks, and CRMs to automate repetitive tasks.',
            tags: ['Webhooks', 'Zapier', 'CRM'],
          },
        ],
      },
    ],
  },
  previousProjects: {
    heading: 'Built by Our Students',
    subheading: 'Real web apps and automations built using our exact roadmap.',
    projects: [
      {
        id: 1,
        title: 'Swifty Logistics',
        category: 'Web App',
        phaseBadge: 'Phase 2 • Module 5',
        livePreviewUrl: 'http://swiftylogistics.vercel.app',
        summary: 'Ride/delivery application that connects drivers to cutomers & tracks realtime movement .',
        techStack: ['React', 'Tailwind', 'Node js',"OpenAi"],
        outcomeMetric: 'Reduced patient intake latency by 68%',
        architectureNotes: 'Serverless backend, encrypted forms, Google Calendar sync.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 2,
        title: 'Bytebuy ',
        category: 'Eccomerce',
        phaseBadge: 'Phase 4 • Module 9',
        livePreviewUrl:'https://www.bytebuy.name.ng',
        summary: 'Effevtice E-commerce website that functions with speed and clarity.',
        techStack: ['OpenAI', 'Webhooks','Javascript', 'Node.js'],
        outcomeMetric: 'Generated 40+ agency leads in 2 weeks',
        architectureNotes: 'Headless browser scraping + LLM bottleneck detection.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 3,
        title: 'Free Express ',
        category: 'Founder MVP',
        phaseBadge: 'Phase 5 • Module 11',
        livePreviewUrl:'https://freeexpress.vercel.app',
        summary: 'Socail blogging application built for anonymous free and fair hearing  .',
        techStack: ['Lovable AI','React', 'Vite', 'Vercel'],
        outcomeMetric: 'Acquired 150+ active users organically',
        architectureNotes: 'Client-side PDF generation, local persistence, webhook payments.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 4,
        title: 'Estatevita',
        category: 'Client Services',
        phaseBadge: 'Phase 3 • Module 7',
        livePreviewUrl: 'https://real-estate-omega-rust.vercel.app/',
        summary: 'Interactive real estate site with maps and WhatsApp scheduling.',
        techStack: ['Claude ai','React', 'Mapbox', 'Vercel'],
        outcomeMetric: 'Sold as a ₦350,000 custom build',
        architectureNotes: 'Fast static pages, microdata markup, direct inquiry hooks.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  beginnerSection: {
    heading: 'Built for Beginners & Pros Alike',
    lead: 'Zero coding experience required.',
    paragraphs: [
      'We strip away the jargon. You will learn by seeing, building, breaking, and fixing.',
      'You won’t just learn prompts. You’ll learn to evaluate AI output, correct mistakes, and make architectural decisions.',
    ],
    closingHighlight: 'Stop guessing. Start engineering.',
    audienceNote: 'Perfect for students, freelancers, founders, and career switchers.',
    audiences: ['Students', 'Freelancers', 'Founders', 'Career Switchers'],
    stepsHeading: 'The 5-Step Learning Loop:',
    steps: [
      { step: '01', title: 'Understand', detail: 'Grasp the concept via clear analogies.' },
      { step: '02', title: 'Watch', detail: 'See it built live step-by-step.' },
      { step: '03', title: 'Build', detail: 'Use our starter kits to construct it yourself.' },
      { step: '04', title: 'Refine', detail: 'Debug, optimize, and customize the output.' },
      { step: '05', title: 'Launch', detail: 'Ship to your portfolio or public domain.' },
    ],
  },
  pathsSection: {
    heading: 'Choose Your Path',
    subheading: 'One academy. Three specific end-goals.',
    paths: [
      {
        id: 'freelancer',
        icon: 'Briefcase',
        title: 'Freelancer',
        question: 'Want to sell web services?',
        description: 'Build a portfolio, hunt for high-value leads, and craft pitches that close deals.',
        keyModules: ['UI Design', 'Portfolios', 'Outreach & Sales'],
      },
      {
        id: 'career',
        icon: 'UserCheck',
        title: 'Career Builder',
        question: 'Want a role in tech?',
        description: 'Stack your CV with real-world builds and prep for technical interviews.',
        keyModules: ['Code Architecture', 'Git & Deploy', 'Tech Job Roles'],
      },
      {
        id: 'founder',
        icon: 'Rocket',
        title: 'Founder',
        question: 'Ready to launch an idea?',
        description: 'Validate demand, launch a fast MVP, and automate your operations.',
        keyModules: ['Web Apps', 'Product Launch', 'AI Automation'],
      },
    ],
  },
  learnByDoing: {
    heading: 'Learn by Doing',
    paragraphs: [
      'Theory doesn’t ship products. Execution does.',
      'Leave this academy with more than notes. Leave with live projects you can demonstrate, pitch, and scale.',
    ],
    experiencePills: [
      'Guided Builds',
      'Live Troubleshooting',
      'Portfolio Reviews',
      'Pitch Breakdowns',
      'Interview Prep',
      'MVP Guidance',
    ],
  },
  honestySection: {
    heading: 'The Hard Truth About AI',
    lead: 'AI is a tool, not magic.',
    paragraphs: [
      'AI speeds up development, but it also writes bugs, insecure code, and hallucinations.',
      'We teach you how to spot errors, guide the AI, and take control. No get-rich-quick guarantees—just hard skills, critical thinking, and the exact roadmap to build and monetize real value.',
    ],
  },
  sidelinesCta: {
    heading: 'Stop Watching from the Sidelines',
    paragraphs: [
      'The AI revolution is happening right now. You can either watch others build, or learn to build yourself.',
    ],
    highlightHeading: 'Your next project starts here.',
    buttonText: 'Enroll Now — One-Time Access',
    footerCaption: 'Instant curriculum access • Discord community • Code templates',
  },
  faqs: [
    {
      question: 'Do I need coding experience?',
      answer: 'No. We start from zero and introduce technical concepts practically.',
    },
    {
      question: 'Are there hidden tool costs?',
      answer: 'No. We prioritize free and low-cost tools. Paid subscriptions are optional.',
    },
    {
      question: 'Will I build real websites?',
      answer: 'Yes. You will build, customize, and deploy fully functional web applications.',
    },
    {
      question: 'Will this guarantee me clients or a job?',
      answer: 'No course guarantees employment. We give you the skills, portfolio, and outreach systems. The execution is on you.',
    },
    {
      question: 'How do I start?',
      answer: 'Click enroll, get instant access to the portal, and start Module 1 today.',
    },
  ],
  finalBanner: {
    heading: 'Ready to Build Something Real?',
    subtext: 'Turn ideas into live apps, portfolios, and client opportunities today.',
    buttonText: 'Claim Your Seat',
  },
};

/**
 * ============================================================================
 * SAMPLE SECOND PRODUCT CONFIGURATION (FOR 1-CLICK TEMPLATE SWAP TESTING)
 * ============================================================================
 */
export const SAMPLE_SECOND_PRODUCT_CONFIG = {
  ...DEFAULT_PRODUCT_CONFIG,
  meta: {
    brandName: 'Prompt Engineer Pro Mastermind',
    brandTagline: 'Advanced AI Prompt Systems & Production Agents',
    priceFormatted: '25,000',
    currencySymbol: '₦',
    showCurrencySymbol: true,
    checkoutSupportNote: 'API credits • Certified badge • Mastermind access',
  },
  brand: {
    name: 'Prompt Engineer Pro',
    badge: 'ADVANCED PROMPTS & AGENTS',
    accentColors: ['#7C3AED', '#2563EB', '#9333EA', '#3B82F6'],
  },
  pricing: {
    amount: '25,000',
    currencySymbol: '₦',
    billingText: 'One-time investment • 6-Month Vault Access',
    ctaPrimary: 'Enroll Now — ₦25,000',
    ctaHero: 'Join the Mastermind',
  },
  hero: {
    title: 'Architect Enterprise AI Agents.',
    Lead: 'Go beyond basic chat. Master JSON outputs, RAG pipelines, and agent orchestration.',
    narrative: 'Learn how senior prompt engineers build production-grade workflows for tech startups and enterprise clients.',
    footnote: 'Advanced prompts • Real LLM evals • Agent templates',
  },
  finalBanner: {
    heading: 'Master Advanced Prompt Engineering',
    subtext: 'Build resilient agent workflows that enterprises depend on.',
    buttonText: 'Join the Mastermind',
  },
};