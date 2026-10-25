/**
 * ============================================================================
 * REUSABLE PRODUCT CONFIGURATION (DEFAULT_PRODUCT_CONFIG & SAMPLES)
 * ============================================================================
 * Centralized product details, pricing, Argon hero slides, curriculum phases,
 * previous projects showcase, FAQs, and brand settings.
 */

export const DEFAULT_PRODUCT_CONFIG = {
  meta: {
    brandName: 'AI Builder Academy',
    brandTagline: 'Practical AI Engineering & Product Launch',
    priceFormatted: '10,000',
    currencySymbol: '₦',
    showCurrencySymbol: true,
    checkoutSupportNote: 'Guaranteed secure checkout • Instant access via student portal & private community',
  },
  brand: {
    name: 'AI Builder Academy',
    badge: 'PRACTICAL AI ENGINEERING & PRODUCT LAUNCH',
    accentColors: ['#2563EB', '#7C3AED', '#3B82F6', '#9333EA'], // Blue, Purple, Blue, Purple
  },
  pricing: {
    amount: '10,000',
    currencySymbol: '₦',
    billingText: 'One-time full access • Lifetime updates & project templates',
    ctaPrimary: 'Enroll Now — ₦10,000',
    ctaHero: 'Join Now',
  },
  // Argon-style 4-Slide Hero (2 Videos + 2 Images with minimal, high-impact text)
  heroSlides: [
    {
      id: 'slide-1',
      type: 'video',
      src: 'https://res.cloudinary.com/dzqpchfew/video/upload/v1792594304/document_5962831705537517867_ituylz.mp4',
      poster: 'https://res.cloudinary.com/dzqpchfew/image/upload/v1792594301/photo_5962831705997512569_y_nic0ye.jpg',
      tag: '01 / AI-ASSISTED ENGINEERING',
      title: 'Learn to Build Professionally with AI.',
      subtitle: 'No expert coding required. Master the right tools and a practical roadmap.',
    },
    {
      id: 'slide-2',
      type: 'image',
      src: 'https://res.cloudinary.com/dzqpchfew/image/upload/v1792594301/photo_5962831705997512569_y_nic0ye.jpg',
      tag: '02 / REAL-WORLD DEPLOYMENT',
      title: 'Launch Real Digital Products.',
      subtitle: 'Turn raw ideas into live websites, web apps, and working MVPs online.',
    },
    {
      id: 'slide-3',
      type: 'video',
      src: 'https://res.cloudinary.com/dzqpchfew/video/upload/v1792594306/document_5962831705537518132_oubbnx.mp4',
      poster: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=85',
      tag: '03 / HANDS-ON MASTERY',
      title: 'Start as a Beginner. Learn by Doing.',
      subtitle: 'Understand the code AI generates, fix errors, and connect real databases.',
    },
    {
      id: 'slide-4',
      type: 'image',
      src: 'https://res.cloudinary.com/dzqpchfew/image/upload/v1792638660/Brain_and_laptop_graphic_design_2K_20261022040830_onojsg.jpg',
      tag: '04 / MONETIZE YOUR SKILLS',
      title: 'Turn Skills into Opportunities.',
      subtitle: 'Showcase your portfolio, pitch businesses, pursue tech roles, or launch your startup.',
    },
  ],
  hero: {
    title: 'Learn to Build with AI. Launch Real Products.',
    Lead: 'You don’t need to be an expert programmer to start building with AI. You need the right tools, the right guidance, and a practical roadmap.',
    narrative:
      'Imagine creating a professional website, turning an idea into a working digital product, publishing it online, showcasing your skills, and learning how to approach businesses that may need what you can build. That’s what you’ll work toward inside AI Builder Academy.',
    footnote: 'Start as a beginner. Learn by building. Finish with projects you can demonstrate.',
  },
  worldChanging: {
    eyebrow: 'THE SHIFT IN MODERN WORKFLOWS',
    title: 'The World Is Changing. Are Your Skills Changing With It?',
    paragraphs: [
      'Artificial intelligence is changing how websites are designed, how software is developed, how businesses operate, and how people bring ideas to life.',
      'Today, AI tools can help you write code, design interfaces, debug problems, research business opportunities, automate repetitive tasks, and build products faster than traditional workflows often allow.',
    ],
    catchTitle: 'But here’s the catch:',
    catchHighlight: 'Having access to AI doesn’t automatically mean you know how to use it effectively.',
    catchBody:
      'You can generate a beautiful website and still not know how to customize it, connect a database, fix errors, publish it, or get a customer to pay for your work.',
    solutionTitle: 'That’s where this academy comes in.',
    solutionBody:
      'Instead of simply showing you AI tools, we guide you through the complete journey — from understanding the tools to building, launching, showcasing, and finding opportunities with what you create.',
  },
  abilitiesSection: {
    heading: 'What If You Could Go Beyond Just Using AI?',
    subheading: 'By the end of your learning journey, you’ll have worked toward these practical abilities:',
    closingNote: 'This isn’t about collecting certificates while wondering what to do next. It’s about learning practical skills and applying them to real projects.',
    abilities: [
      {
        id: 'ability-1',
        title: 'Build',
        description: 'Create professional websites and learn how to develop functional web applications with AI assistance.',
        deliverable: 'Responsive React & Full-Stack Apps',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'AI web and app development',
      },
      {
        id: 'ability-2',
        title: 'Launch',
        description: 'Publish your projects online so other people can access, interact with, and test them live.',
        deliverable: 'Custom Domains & Cloud Deploys',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Cloud deployment and online launch',
      },
      {
        id: 'ability-3',
        title: 'Showcase',
        description: 'Build a portfolio that demonstrates your skills to potential clients, employers, or collaborators.',
        deliverable: 'High-Trust Case Study Portfolio',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Showcase portfolio',
      },
      {
        id: 'ability-4',
        title: 'Find Opportunities',
        description: 'Research businesses, identify operational problems you can solve, and prepare personalized pitches.',
        deliverable: 'Targeted Outreach Proposals',
        image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'Client outreach and discovery',
      },
      // {
      //   id: 'ability-5',
      //   title: 'Pursue Jobs',
      //   description: 'Use your projects to strengthen your CV, applications, professional profile, and interview preparation.',
      //   deliverable: 'Technical Resume & Interview Playbook',
      //   image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80',
      //   imageAlt: 'Career preparation',
      // },
      // {
      //   id: 'ability-6',
      //   title: 'Create Products',
      //   description: 'Learn how to validate ideas, build minimum viable products (MVPs), and gather initial user feedback.',
      //   deliverable: 'Functional Micro-SaaS MVP',
      //   image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=900&q=80',
      //   imageAlt: 'Product creation and MVP launch',
      // },
      {
        id: 'ability-7',
        title: 'Work Smarter',
        description: 'Explore AI-powered automation that can help reduce repetitive work and improve business processes.',
        deliverable: 'Automated CRM & Webhook Flows',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80',
        imageAlt: 'AI automation workflows',
      },
    ],
  },
  curriculum: {
    heading: 'What You’ll Learn Inside the Academy',
    subheading: 'A step-by-step 5-phase syllabus with 12 hands-on modules designed to take you from beginner to confident builder.',
    eyebrow: 'STRUCTURED ROADMAP • 5 PHASES • 12 MODULES',
    title: 'What You’ll Learn Inside the Academy',
    subtitle: 'Tap any phase below to open its modules and curriculum details inside the interactive bottom drawer.',
    phases: [
      {
        id: 'phase-1',
        number: 'PHASE 1',
        title: 'Understand AI and Get Started',
        summary: 'Master prompting fundamentals, choose your first realistic project, and configure your essential AI builder toolkit.',
        modules: [
          {
            code: 'Module 1',
            title: 'Introduction to AI-Powered Building',
            description: 'Understand what AI can do, where it falls short, and how beginners can use it to build digital products. Learn the basics of prompting, AI-assisted development, and choosing a realistic first project.',
            tags: ['Prompt Engineering', 'AI Mindset', 'Project Scoping'],
          },
          {
            code: 'Module 2',
            title: 'Your Essential AI Toolkit',
            description: 'Get familiar with relevant AI assistants, coding tools, visual website builders, and development environments. Learn how to choose tools based on your needs, including free or low-cost options where available.',
            tags: ['VS Code', 'Claude & ChatGPT', 'Cursor & Copilot'],
          },
        ],
      },
      {
        id: 'phase-2',
        number: 'PHASE 2',
        title: 'Build Real Websites and Applications',
        summary: 'Design responsive interfaces, understand HTML/CSS/React code, and connect forms, APIs, and databases.',
        modules: [
          {
            code: 'Module 3',
            title: 'Design Professional Websites with AI',
            description: 'Learn how to plan pages, generate layouts, improve visual design, create responsive interfaces, and build websites that look good on mobile and desktop.',
            tags: ['UI/UX Design', 'Tailwind CSS', 'Mobile First'],
          },
          {
            code: 'Module 4',
            title: 'Understand the Technology Behind Your Website',
            description: 'Learn the fundamentals of HTML, CSS, JavaScript, React, and styling tools in beginner-friendly language. Understand the code AI generates so you can make changes instead of relying blindly on prompts.',
            tags: ['React Basics', 'JSX', 'Component Architecture'],
          },
          {
            code: 'Module 5',
            title: 'Build Functional Web Applications',
            description: 'Go beyond appearance. Explore forms, APIs, databases, user accounts, and the basic frontend and backend concepts that power interactive applications. Learn why testing, security, and protecting user data matter.',
            tags: ['Backend APIs', 'Supabase', 'Database Auth'],
          },
        ],
      },
      {
        id: 'phase-3',
        number: 'PHASE 3',
        title: 'Launch and Showcase Your Work',
        summary: 'Deploy production builds with Git & GitHub, connect custom domains, and package your projects into a high-trust portfolio.',
        modules: [
          {
            code: 'Module 6',
            title: 'Deploy Your Projects Online',
            description: 'Learn how to use Git and GitHub, deploy projects, connect domains where needed, manage environment variables, test production builds, and troubleshoot common deployment problems.',
            tags: ['Git & GitHub', 'Vercel / Netlify', 'Custom Domains'],
          },
          {
            code: 'Module 7',
            title: 'Build a Professional Portfolio',
            description: 'Turn your projects into a portfolio that demonstrates what you can do. Learn how to present project goals, features, screenshots, live demos, and your actual contribution clearly and professionally.',
            tags: ['Portfolio Design', 'Case Study Writing', 'Proof of Work'],
          },
        ],
      },
      {
        id: 'phase-4',
        number: 'PHASE 4',
        title: 'Turn Your Skills into Opportunities',
        summary: 'Identify businesses that need digital upgrades, send AI-assisted outreach pitches, and prepare for tech roles.',
        modules: [
          {
            code: 'Module 8',
            title: 'Find Businesses You Can Help',
            description: 'Learn how to research businesses, choose a niche, identify potential customers, examine publicly available websites, and recognize opportunities where your skills could provide value.',
            tags: ['Niche Selection', 'Market Research', 'Lead Qualification'],
          },
          {
            code: 'Module 9',
            title: 'AI-Assisted Outreach and Sales',
            description: 'Learn to write personalized emails, direct messages, proposals, and follow-ups. Discover how to present a relevant demo, discuss pricing and scope, handle objections, and communicate professionally with prospective clients.',
            tags: ['Cold Outreach', 'Client Proposals', 'Value Pricing'],
          },
          {
            code: 'Module 10',
            title: 'Use Your Skills to Pursue Jobs',
            description: 'Learn how to identify relevant entry-level opportunities, tailor your CV honestly, improve your professional profile, prepare for interviews, practice technical assessments, and track applications.',
            tags: ['CV Optimization', 'LinkedIn Branding', 'Interview Prep'],
          },
        ],
      },
      {
        id: 'phase-5',
        number: 'PHASE 5',
        title: 'Build, Launch, and Grow',
        summary: 'Validate and launch your own MVP product and automate repetitive business workflows using APIs and webhooks.',
        modules: [
          {
            code: 'Module 11',
            title: 'Create and Launch Your Own Product',
            description: 'Learn how to research problems, study competitors, validate ideas, build a minimum viable product, gather user feedback, and plan a launch around a real need.',
            tags: ['Idea Validation', 'MVP Blueprint', 'Product Hunt / Launch'],
          },
          {
            code: 'Module 12',
            title: 'AI Automation and Business Growth',
            description: 'Explore workflows, APIs, webhooks, CRM systems, and automation tools. Learn how AI can assist with repetitive tasks, customer onboarding, lead management, and business operations — with appropriate human oversight.',
            tags: ['Webhooks', 'Make / Zapier', 'CRM Integrations'],
          },
        ],
      },
    ],
  },
  previousProjects: {
    heading: 'Previous Projects Built by Students & Founders',
    subheading: 'Explore examples of real websites, functional web applications, and AI-automated workflows built using the exact roadmap taught inside the Academy.',
    projects: [
      {
        id: 1,
        title: 'MedFlow Clinic Booking & Patient Portal',
        category: 'Web Application',
        phaseBadge: 'Built in Phase 2 • Module 5',
        livePreviewUrl: 'https://medflow-demo.ai-academy.build',
        summary: 'Responsive healthcare appointment platform with patient intake forms, automated SMS reminders, and an admin schedule dashboard.',
        techStack: ['React', 'Tailwind CSS', 'Supabase', 'AI Prompting'],
        outcomeMetric: 'Reduced clinic patient intake latency by 68%',
        architectureNotes: 'Architecture features serverless backend functions, encrypted patient intake forms, and real-time scheduling synchronizing to Google Calendar.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 2,
        title: 'LeadScout Local Business Audit & Pitch Engine',
        category: 'AI Automation',
        phaseBadge: 'Built in Phase 4 • Module 9',
        livePreviewUrl: 'https://leadscout-demo.ai-academy.build',
        summary: 'Automated workflow that analyzes local business websites, identifies mobile UX gaps, and drafts tailored outreach proposals.',
        techStack: ['OpenAI API', 'Webhooks', 'Node.js', 'CRM Sync'],
        outcomeMetric: 'Generated 40+ qualified agency client leads in 2 weeks',
        architectureNotes: 'Combines headless browser page scraping with OpenAI LLM analysis to detect viewport bottlenecks and auto-draft client recommendations.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 3,
        title: 'InvoiceCraft SaaS Micro-Product MVP',
        category: 'Founder MVP',
        phaseBadge: 'Built in Phase 5 • Module 11',
        livePreviewUrl: 'https://invoicecraft-demo.ai-academy.build',
        summary: 'Clean invoicing and receipt generator built for African freelancers with instant PDF export, client tracking, and payment links.',
        techStack: ['React', 'Vite', 'GitHub', 'Vercel'],
        outcomeMetric: 'Acquired 150+ active monthly freelancers with zero ad spend',
        architectureNotes: 'Static React web app utilizing client-side PDF generation, local browser persistence, and webhook integration for payment confirmation.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80',
      },
      {
        id: 4,
        title: 'EstateLens Luxury Property Showcase & Virtual Tour',
        category: 'Client Services',
        phaseBadge: 'Built in Phase 3 • Module 7',
        livePreviewUrl: 'https://estatelens-demo.ai-academy.build',
        summary: 'High-converting interactive real estate listing site featuring high-res imagery carousels, neighborhood maps, and WhatsApp tour scheduling.',
        techStack: ['React', 'Tailwind CSS', 'Mapbox', 'Vercel'],
        outcomeMetric: 'Sold as a ₦350,000 custom web build to a Lagos realtor',
        architectureNotes: 'Ultra-fast optimized static pages with automated image compression, SEO microdata markup, and one-click direct agent inquiry hooks.',
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80',
      },
    ],
  },
  beginnerSection: {
    heading: 'This Academy Is Built for Beginners',
    lead: 'You don’t have to arrive knowing how to code.',
    paragraphs: [
      'We’ll approach the learning process step by step, introducing technical concepts in simple language before applying them in practical demonstrations.',
      'You’ll learn by seeing how things work, building alongside the lessons, experimenting with AI, troubleshooting errors, and improving your projects.',
    ],
    closingHighlight: 'You won’t just learn what to type into an AI tool. You’ll learn how to evaluate its output, recognize mistakes, and make better decisions as a builder.',
    audienceNote: 'Whether you’re a student, aspiring freelancer, career switcher, entrepreneur, or simply curious about what AI makes possible, you’ll have a practical path to follow.',
    audiences: ['University Students', 'Aspiring Freelancers', 'Career Switchers', 'Agency Founders', 'Curious Non-Techies'],
    stepsHeading: 'The 5-Step Practical Learning Loop:',
    steps: [
      { step: '01', title: 'Understand the concept', detail: 'Deconstruct what we are building using clear, jargon-free analogies and visual diagrams.' },
      { step: '02', title: 'Watch it demonstrated', detail: 'Follow live step-by-step demonstrations showing AI prompts, code assembly, and styling.' },
      { step: '03', title: 'Build it yourself', detail: 'Take the reins on your computer with provided starter kits and step-by-step guided instructions.' },
      { step: '04', title: 'Test and improve it', detail: 'Learn how to detect bugs, customize layouts, optimize performance, and test on mobile devices.' },
      { step: '05', title: 'Apply to real scenarios', detail: 'Package the finished build into your portfolio, pitch to clients, or launch it as a public product.' },
    ],
  },
  pathsSection: {
    heading: 'Choose Your Learning Path',
    subheading: 'One academy. Different personal goals. A concrete, practical foundation for all three.',
    paths: [
      {
        id: 'freelancer',
        icon: 'Briefcase',
        title: 'The Freelancer Path',
        question: 'Want to offer website development or related digital services?',
        description: 'Work toward a portfolio, learn to identify potential clients, practice personalized outreach, and understand how to scope and present your services professionally.',
        keyModules: ['Module 3: UI Design', 'Module 7: Portfolios', 'Module 9: Outreach & Sales'],
      },
      {
        id: 'career',
        icon: 'UserCheck',
        title: 'The Career Builder Path',
        question: 'Want to strengthen your chances of landing a technology role?',
        description: 'Build demonstrable projects, improve your CV and professional presence, and practice applications, interviews, and technical assessments.',
        keyModules: ['Module 4: Code Tech', 'Module 6: Git & Deploy', 'Module 10: Tech Job Roles'],
      },
      {
        id: 'founder',
        icon: 'Rocket',
        title: 'The Founder Path',
        question: 'Have an idea you want to bring to life quickly?',
        description: 'Learn how to research a problem, validate demand, build an initial product, publish it, and gather feedback before investing too much time or money.',
        keyModules: ['Module 5: Web Apps', 'Module 11: Product Launch', 'Module 12: AI Automation'],
      },
    ],
  },
  learnByDoing: {
    heading: 'More Than Watching Lessons — Learn by Doing',
    paragraphs: [
      'The goal is to help you move from understanding concepts to applying them.',
      'Depending on the learning package offered, your experience may include guided project sessions, live classes, troubleshooting clinics, portfolio feedback, outreach reviews, interview preparation, and product-launch guidance.',
      'You’ll have practical assignments designed to help you produce tangible work as you progress.',
      'By the time you complete the program, your goal should be to have more than notes and prompts: you should have projects you can explain, demonstrate, and continue improving.',
    ],
    experiencePills: [
      'Guided Project Sessions',
      'Live Troubleshooting Clinics',
      '1-on-1 Portfolio Feedback',
      'Outreach & Pitch Reviews',
      'Interview & Assessment Prep',
      'MVP Launch Guidance',
    ],
  },
  honestySection: {
    heading: 'Let’s Be Honest About What AI Can and Cannot Do',
    lead: 'AI is powerful, but it is not magic.',
    paragraphs: [
      'It can make development more accessible, help you work through problems, and speed up parts of the building process.',
      'It can also produce errors, insecure code, outdated suggestions, and solutions that don’t work as expected.',
      'That’s why this academy emphasizes understanding, testing, critical thinking, and responsible use — not blindly copying whatever AI generates.',
      'And while these skills can help you pursue clients, jobs, or product ideas, no course can honestly guarantee employment, sales, or a specific income. Your results will depend on your effort, practice, project quality, communication, market demand, and ability to apply what you learn. Our aim is to help you build a stronger foundation and take practical steps toward your goals.',
    ],
  },
  sidelinesCta: {
    heading: 'Stop Watching the AI Revolution from the Sidelines',
    paragraphs: [
      'You’ve probably seen people using AI to create websites, launch products, and experiment with new business ideas. You might have wondered whether you could do the same.',
      'You can start learning — even if you’re a complete beginner.',
      'You don’t need to master every tool at once. You don’t need to build the next big startup on your first attempt. And you don’t need to understand every line of code before you begin.',
      'You need a starting point, a practical learning process, and the willingness to keep building.',
      'AI Builder Academy is designed to help you take that first step and keep moving forward.',
    ],
    highlightHeading: 'Your Next Project Could Be the Beginning of Something Bigger.',
    highlightSub: 'Learn the tools. Build real projects. Publish your work. Develop your portfolio. Start exploring the opportunities your skills can create.',
    buttonText: 'Enroll Now — One-Time Access',
    footerCaption: 'Immediate access to private curriculum • Discord community • Guided code templates',
  },
  faqs: [
    {
      question: 'Do I need coding experience?',
      answer: 'No. The curriculum is designed for beginners, with technical concepts introduced gradually. A willingness to practice and learn is essential.',
    },
    {
      question: 'Do I need an expensive computer or paid AI subscriptions?',
      answer: 'Not necessarily. You’ll learn to evaluate tools and use free or lower-cost options where practical. Some tools may have usage limits or require paid plans for particular features.',
    },
    {
      question: 'Will I learn to build actual websites?',
      answer: 'Yes. The curriculum focuses on practical website-building exercises, customization, and deployment, progressing toward functional applications.',
    },
    {
      question: 'Will this help me get clients?',
      answer: 'You’ll learn how to research prospective clients, identify possible business needs, prepare personalized outreach, and present your work. Finding paying clients is not guaranteed, and results vary.',
    },
    {
      question: 'Can I use these skills to apply for jobs?',
      answer: 'The course covers portfolio development, CV preparation, professional profiles, applications, and interview practice. Employment depends on your skills, experience, the role, and the hiring process.',
    },
    {
      question: 'Will I be able to launch my own product?',
      answer: 'You’ll learn the process of researching an idea, building an MVP, deploying it, and collecting feedback. A successful business requires further testing, execution, and market demand.',
    },
    {
      question: 'How do I get started?',
      answer: 'Choose your learning package, review what it includes, and follow the enrollment instructions on this page.',
    },
  ],
  finalBanner: {
    heading: 'Ready to Build Something Real with AI?',
    subtext: 'Join learners and creators turning ideas into live websites, software apps, and client opportunities with practical AI workflows.',
    buttonText: 'Claim Your Seat Today',
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
    checkoutSupportNote: 'Includes API credits pack • Verified certification badge • Mastermind group access',
  },
  brand: {
    name: 'Prompt Engineer Pro',
    badge: 'ADVANCED PROMPT SYSTEMS & AGENTIC ARCHITECTURES',
    accentColors: ['#7C3AED', '#2563EB', '#9333EA', '#3B82F6'],
  },
  pricing: {
    amount: '25,000',
    currencySymbol: '₦',
    billingText: 'One-time investment • 6-Month Mastermind Access & AI Prompt Vault',
    ctaPrimary: 'Enroll Now — ₦25,000',
    ctaHero: 'Join the Prompt Engineer Mastermind',
  },
  hero: {
    title: 'Architect Enterprise AI Prompts & Autonomous Agents',
    Lead: 'Go beyond basic chat prompts. Master structured JSON outputs, few-shot evaluations, RAG pipelines, and agentic task orchestration.',
    narrative:
      'Learn how senior prompt engineers build production-grade workflows for tech startups, enterprise products, and AI consultancy clients.',
    footnote: 'Advanced prompt techniques • Real LLM evals • Production agent templates',
  },
  finalBanner: {
    heading: 'Step Into the Future of Advanced Prompt Engineering',
    subtext: 'Build resilient prompts and agent workflows that enterprises and fast-growing tech teams depend upon daily.',
    buttonText: 'Join the Prompt Mastermind',
  },
};
