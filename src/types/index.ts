// Navigation Types
export interface NavItem {
  id: string
  label: {
    en: string
    es: string
  }
  href: string
  section: string
}

// Language Types
export type Language = 'en' | 'es'

// Animation Types
export interface AnimationConfig {
  duration: number
  easing: string
  delay?: number
  stagger?: number
}

export interface SectionTransition {
  enter: AnimationConfig
  exit: AnimationConfig
}

// Section Types
export interface Section {
  id: string
  name: string
  component: React.ComponentType
  order: number
}

// Project Types
export interface Project {
  id: string
  title: {
    es: string
    en: string
  }
  description: {
    es: string
    en: string
  }
  technologies: string[]
  imageUrl: string
  iconUrl: string
  demoUrl?: string
  githubUrl?: string
  featured: boolean
  category: 'web' | 'mobile' | 'design' | 'fullstack'
}

// Skill Types
export interface Skill {
  id: string
  name: string
  category: 'frontend' | 'backend' | 'design' | 'tools'
  proficiency: number // 0-100
  yearsOfExperience: number
  iconUrl: string
  color: string
}

// Animation State Types
export interface AnimationState {
  currentSection: number
  isTransitioning: boolean
  selectedProject: string | null
  projectPanelVisible: boolean
  scrollDirection: 'up' | 'down'
  animationsEnabled: boolean
}

// Contact Form Types
export interface ContactForm {
  name: string
  email: string
  message: string
  company?: string
  budget?: string
}

// Language Content Types
export interface LanguageContent {
  navbar: {
    about: string
    skills: string
    projects: string
    services: string
    process: string
    contact: string
  }
  hero: {
    badge: string
    title: string
    titleHighlight: string
    titleEnd: string
    subtitle: string
    ctaPrimary: string
    ctaSecondary: string
    stats: {
      technologies: {
        number: string
        title: string
        description: string
      }
      experience: {
        number: string
        title: string
        description: string
      }
      projects: {
        number: string
        title: string
        description: string
      }
    }
  }
  about: {
    title: string
    subtitle: string
    journey: string
    description: string
    description2: string
    description3: string
    achievements: string
    experience: string
    highlights: {
      student: {
        title: string
        description: string
      }
      company: {
        title: string
        description: string
      }
      challenges: {
        title: string
        description: string
      }
      passion: {
        title: string
        description: string
      }
    }
    stats: {
      projects: {
        title: string
        description: string
      }
      satisfaction: {
        title: string
        description: string
      }
      yearsExp: {
        title: string
        description: string
      }
      leadership: {
        title: string
        description: string
      }
    }
  }
  skills: {
    title: string
    subtitle: string
    frontend: string
    backend: string
    design: string
    tools: string
    stats: {
      technologies: string
      experience: string
      projects: string
    }
  }
  projects: {
    title: string
    subtitle: string
    viewProject: string
    viewCode: string
    technologies: string
    allProjects: string
    featured: string
    web: string
    mobile: string
    desktop: string
  }
  contact: {
    title: string
    subtitle: string
    description: string
    form: {
      name: string
      email: string
      company: string
      message: string
      budget: string
      submit: string
      sending: string
      success: string
      error: string
      placeholders: {
        name: string
        email: string
        company: string
        message: string
        budgetSelect: string
      }
      privacy: string
    }
    info: {
      email: string
      phone: string
      location: string
      response: string
      getInTouch: string
      getInTouchDescription: string
      quickResponse: string
      quickResponseDescription: string
    }
  }
  services: {
    title: string
    subtitle: string
    webDev: {
      title: string
      description: string
    }
    uiux: {
      title: string
      description: string
    }
    consulting: {
      title: string
      description: string
    }
    cta: {
      title: string
      description: string
      button: string
    }
    customCta: {
      title: string
      description: string
      button: string
    }
    categories: {
      all: string
      development: string
      design: string
      consulting: string
    }
    pricing: {
      starting: string
      delivery: string
      whatsIncluded: string
      moreFeatures: string
      getStarted: string
    }
    items: {
      webDevelopment: {
        title: string
        description: string
        features: string[]
        deliveryTime: string
      }
      logoBranding: {
        title: string
        description: string
        features: string[]
        deliveryTime: string
      }
      aiIntegration: {
        title: string
        description: string
        features: string[]
        deliveryTime: string
      }
      basicWebsite: {
        title: string
        description: string
        features: string[]
        deliveryTime: string
      }
      consulting: {
        title: string
        description: string
        features: string[]
        deliveryTime: string
      }
      maintenance: {
        title: string
        description: string
        features: string[]
        deliveryTime: string
      }
    }
  }
  process: {
    title: string
    subtitle: string
    steps: {
      contact: {
        title: string
        description: string
      }
      planning: {
        title: string
        description: string
      }
      development: {
        title: string
        description: string
      }
      approval: {
        title: string
        description: string
      }
      deployment: {
        title: string
        description: string
      }
    }
    readyCta: {
      title: string
      description: string
      button: string
    }
  }
  meetDev: {
    badge: string
    title: string
    subtitle: string
    description: string
    description2: string
    highlights: {
      student: {
        title: string
        description: string
      }
      company: {
        title: string
        description: string
      }
      challenges: {
        title: string
        description: string
      }
      passion: {
        title: string
        description: string
      }
    }
    cta: string
    fromCuba: string
  }
  common: {
    viewProject: string
    featured: string
    aboutProject: string
    technologiesUsed: string
    viewLiveSite: string
    viewDemo: string
    viewCode: string
    moreItems: string
    letsWorkTogether: string
  }
  experiences: Array<{
    id: string
    title: string
    company: string
    period: string
    description: string
    technologies: string[]
  }>
  sampleProjects: Array<{
    id: string
    title: string
    description: string
    technologies: string[]
    image: string
    icon: string
    category: string
    featured: boolean
    links: {
      demo?: string
      github?: string
      live?: string
    }
  }>
}