import type { LanguageContent } from '@/types'

export const translations: Record<'en' | 'es', LanguageContent> = {
  en: {
    navbar: {
      about: 'About',
      skills: 'Technologies',
      projects: 'Projects',
      services: 'Services',
      process: 'Process',
      contact: 'Contact',
    },
    hero: {
      badge: '✨ Software Development Startup',
      title: 'Building Modern',
      titleHighlight: 'Digital Solutions',
      titleEnd: 'with AI Integration',
      subtitle: 'Oblivion Labs is a cutting-edge software development startup specializing in full-stack web applications, AI integration, and custom digital solutions for businesses worldwide.',
      ctaPrimary: 'View Our Work',
      ctaSecondary: 'Start Your Project',
      stats: {
        technologies: {
          number: '15+',
          title: 'Technologies Mastered',
          description: 'React, Next.js, Python, AI/ML, and more'
        },
        experience: {
          number: '4+',
          title: 'Years in Business',
          description: 'Delivering enterprise-grade solutions'
        },
        projects: {
          number: '5+',
          title: 'Projects Delivered',
          description: 'Successful client implementations'
        }
      }
    },
    about: {
      title: 'About Oblivion Labs',
      subtitle: 'Innovation Through Technology',
      journey: 'Our Mission',
      description: 'Oblivion Labs is a forward-thinking software development startup dedicated to transforming businesses through cutting-edge technology solutions. We specialize in full-stack web development, AI integration, and custom software that drives real business results.',
      description2: 'We believe that exceptional software comes from deep technical expertise, innovative thinking, and genuine understanding of our clients\' needs. Every solution we deliver is crafted with precision, scalability, and user experience at its core.',
      description3: 'Our team combines years of experience in modern web technologies with expertise in artificial intelligence and machine learning. We\'re passionate about pushing the boundaries of what\'s possible and helping businesses stay ahead in the digital landscape.',
      achievements: 'Our Expertise',
      experience: 'Our Recent Projects',
      highlights: {
        student: {
          title: 'Full-Stack Development',
          description: 'End-to-end web applications with modern technologies'
        },
        company: {
          title: 'AI Integration',
          description: 'Machine learning and AI-powered business solutions'
        },
        challenges: {
          title: 'Enterprise Solutions',
          description: 'Scalable systems for growing businesses'
        },
        passion: {
          title: 'Innovation Focus',
          description: 'Cutting-edge technology meets practical business needs'
        }
      },
      stats: {
        projects: {
          title: '+5 Projects Delivered',
          description: 'Real client projects including cultural centers, medical billing, handyman services, construction companies, and trucking businesses'
        },
        satisfaction: {
          title: 'Client Satisfaction',
          description: '100% client satisfaction rate with ongoing support and maintenance'
        },
        yearsExp: {
          title: 'Years in Business',
          description: 'Proven track record of delivering high-quality software solutions'
        },
        leadership: {
          title: 'Graphic Design Expertise',
          description: 'Over +15 professional logos designed and complete branding packages delivered (separate from programming projects)'
        }
      }
    },
    skills: {
      title: 'Our Technology Stack',
      subtitle: 'Cutting-Edge Tools & Frameworks',
      frontend: 'Frontend Development',
      backend: 'Backend Development',
      design: 'Graphic Design',
      tools: 'Development Tools',
      stats: {
        technologies: 'Technologies Mastered',
        experience: 'Years Programming',
        projects: 'Programming Projects Completed'
      }
    },
    projects: {
      title: 'Our Portfolio',
      subtitle: 'Featured Client Solutions',
      viewProject: 'View Project',
      viewCode: 'View Code',
      technologies: 'Technologies Used',
      allProjects: 'All Projects',
      featured: 'Featured',
      web: 'Web',
      mobile: 'Mobile',
      desktop: 'Desktop'
    },
    contact: {
      title: 'Let\'s Build Something Amazing',
      subtitle: 'Ready to transform your business with technology?',
      description: 'At Oblivion Labs, we\'re passionate about turning your vision into reality. Our team is ready to deliver cutting-edge solutions that drive growth and innovation for your business.',
      form: {
        name: 'Full Name',
        email: 'Email Address',
        company: 'Company (Optional)',
        message: 'Project Details',
        budget: 'Budget Range (USD)',
        submit: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Error sending message. Please try again.',
        placeholders: {
          name: 'Your full name',
          email: 'your@email.com',
          company: 'Your company name',
          message: 'Tell us about your project...',
          budgetSelect: 'Select budget range'
        },
        privacy: 'I agree to the <a href="/privacy-policy" target="_blank" class="text-primary-400 hover:text-primary-300 underline">Privacy Policy</a> and consent to the processing of my personal data for the purpose of responding to my inquiry.'
      },
      info: {
        email: 'hola@oblivion-labs.com',
        phone: '+53 5639 5275',
        location: 'Calle G, entre Calle 4ta y Avenida de Céspedes, Sueño, Santiago de Cuba',
        response: 'Response within 24 hours',
        getInTouch: 'Get in Touch',
        getInTouchDescription: 'Ready to bring your vision to life? Let\'s discuss your project and see how we can help you achieve your goals.',
        quickResponse: 'Quick Response',
        quickResponseDescription: 'We typically respond to all inquiries within 24 hours. For urgent projects, feel free to call us directly.'
      },
    },
    services: {
      title: 'Our Services',
      subtitle: 'Comprehensive Digital Solutions',
      webDev: {
        title: 'Full-Stack Web Development',
        description: 'Enterprise-grade web applications using React, Next.js, Node.js, and cloud technologies with seamless AI integration.',
      },
      uiux: {
        title: 'UI/UX Design & Branding',
        description: 'Modern user interfaces, complete brand identity systems, and user experience optimization for maximum engagement.',
      },
      consulting: {
        title: 'AI & Machine Learning',
        description: 'Custom AI solutions, machine learning models, and intelligent automation to transform your business processes.',
      },
      cta: {
        title: 'Our Development Process',
        description: 'Streamlined workflow: Discovery & Planning → Design & Architecture → Development & Testing → Deployment & Support.',
        button: 'Start Your Project'
      },
      customCta: {
        title: 'Need Something Custom?',
        description: 'Every project is unique. Let\'s discuss your specific requirements and create a tailored solution that perfectly fits your needs.',
        button: 'Schedule a Consultation'
      },
      categories: {
        all: 'All Services',
        development: 'Development',
        design: 'Design',
        consulting: 'Consulting'
      },
      pricing: {
        starting: 'Starting at',
        delivery: 'Delivery',
        whatsIncluded: 'What\'s Included:',
        moreFeatures: 'more features',
        getStarted: 'Get Started'
      },
      items: {
        webDevelopment: {
          title: 'Full-Stack Web Development',
          description: 'Complete web applications using React, Next.js, Express, and PostgreSQL. From landing pages to complex business applications.',
          features: [
            'React & Next.js Development',
            'Responsive Design',
            'Database Integration (PostgreSQL)',
            'API Development (Express)',
            'AI Integration with Python',
            'Deployment Support'
          ],
          deliveryTime: '2-4 weeks'
        },
        logoBranding: {
          title: 'Logo Design & Branding',
          description: 'Professional logo design and complete branding packages including visual identity, business cards, and marketing materials.',
          features: [
            'Custom Logo Design',
            'Brand Identity Package',
            'Business Card Design',
            'Flyers & Banners',
            'Social Media Graphics',
            'Brand Guidelines'
          ],
          deliveryTime: '1-2 weeks'
        },
        aiIntegration: {
          title: 'AI Integration & Development',
          description: 'Add artificial intelligence features to your applications using Python machine learning algorithms and modern AI tools.',
          features: [
            'Machine Learning Algorithms',
            'Python AI Development',
            'Data Analysis & Processing',
            'Chatbot Integration',
            'Automated Systems',
            'AI-Powered Features'
          ],
          deliveryTime: '2-3 weeks'
        },
        basicWebsite: {
          title: 'Basic Business Website',
          description: 'Simple, professional websites for small businesses. Perfect for showcasing services and establishing online presence.',
          features: [
            'Responsive Design',
            'Contact Forms',
            'SEO Optimization',
            'Fast Loading',
            'Mobile Friendly',
            'Basic Analytics'
          ],
          deliveryTime: '1-2 weeks'
        },
        consulting: {
          title: 'Technical Consulting',
          description: 'Get expert advice on technology choices, project planning, and development strategies for your business needs.',
          features: [
            'Technology Stack Advice',
            'Project Planning',
            'Code Review',
            'Performance Optimization',
            'Security Assessment',
            'Development Strategy'
          ],
          deliveryTime: 'Flexible'
        },
        maintenance: {
          title: 'Website Maintenance',
          description: 'Keep your website updated, secure, and running smoothly with ongoing maintenance and support services.',
          features: [
            'Regular Updates',
            'Security Monitoring',
            'Bug Fixes',
            'Content Updates',
            'Performance Monitoring',
            'Backup Management'
          ],
          deliveryTime: 'Ongoing'
        }
      }
    },
    process: {
      title: 'Our Development Process',
      subtitle: 'Proven Methodology for Success',
      steps: {
        contact: {
          title: 'Discovery & Consultation',
          description: 'We analyze your business needs and define project requirements'
        },
        planning: {
          title: 'Strategy & Architecture',
          description: 'Technical planning, system design, and project roadmap creation'
        },
        development: {
          title: 'Agile Development',
          description: 'Iterative development with regular demos and client feedback'
        },
        approval: {
          title: 'Testing & Quality Assurance',
          description: 'Comprehensive testing, performance optimization, and final approval'
        },
        deployment: {
          title: 'Launch & Ongoing Support',
          description: 'Production deployment with monitoring and continuous support'
        }
      },
      readyCta: {
        title: 'Ready to Get Started?',
        description: 'At Oblivion Labs, we combine technical excellence with business strategy to deliver solutions that drive real results. Let\'s discuss your project and create something amazing together.',
        button: 'Start Your Project'
      }
    },
    meetDev: {
      badge: '✨ Meet Our Team',
      title: 'The Innovation Behind Oblivion Labs',
      subtitle: 'A dedicated team of experts passionate about transforming businesses through cutting-edge technology solutions.',
      description: 'At Oblivion Labs, we combine technical excellence with creative innovation to deliver solutions that exceed expectations. Our team brings together years of experience in modern web technologies, AI integration, and business strategy.',
      description2: 'We believe that exceptional software comes from understanding our clients\' unique challenges and crafting solutions that not only meet their needs but drive their success. Every project is an opportunity to push boundaries and create something remarkable.',
      highlights: {
        student: {
          title: 'Technical Excellence',
          description: 'Cutting-edge development practices and modern technologies'
        },
        company: {
          title: 'Innovation Focus',
          description: 'Leading the way in AI integration and digital transformation'
        },
        challenges: {
          title: 'Problem Solvers',
          description: 'Turning complex challenges into elegant solutions'
        },
        passion: {
          title: 'Future-Ready',
          description: 'Building scalable solutions for tomorrow\'s needs'
        }
      },
      cta: 'Start Your Project',
      fromCuba: '👨‍💼 Founder'
    },
    common: {
      viewProject: 'View Project',
      featured: 'Featured',
      madeWith: 'Made with ❤️ and lots of ☕ in Cuba',
      aboutProject: 'About This Project',
      technologiesUsed: 'Technologies Used',
      viewLiveSite: 'View Live Site',
      viewDemo: 'View Demo',
      viewCode: 'View Code',
      moreItems: 'more',
      letsWorkTogether: 'Let\'s Work Together'
    },
    experiences: [
      {
        id: 'bank-system',
        title: 'Enterprise Banking Solution',
        company: 'Financial Technology Project',
        period: '2024 - Present',
        description: 'Our team delivered a comprehensive internal control system for a major bank, featuring advanced AI integration for enhanced security and automated compliance monitoring.',
        technologies: ['React', 'Next.js', 'PostgreSQL', 'Python', 'Express']
      },
      {
        id: 'construction-company',
        title: 'Construction Industry Platform',
        company: 'Digital Transformation Project',
        period: '2023',
        description: 'Oblivion Labs created a complete digital ecosystem for a construction company, including project management tools, client portals, and comprehensive branding solutions.',
        technologies: ['React', 'Next.js', 'JavaScript', 'Photoshop', 'Illustrator']
      },
      {
        id: 'trucking-business',
        title: 'Logistics Management System',
        company: 'Transportation Technology',
        period: '2023',
        description: 'We developed an integrated logistics platform for a trucking business, featuring fleet management, route optimization, and complete brand identity redesign.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Photoshop']
      },
      {
        id: 'marcos-handyman',
        title: 'Service Industry Solution',
        company: 'Small Business Digital Package',
        period: '2023',
        description: 'Our startup delivered a complete digital transformation for a handyman service in the USA, including web presence, branding, and customer management tools.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Photoshop', 'Illustrator']
      },
      {
        id: 'medical-billing',
        title: 'Healthcare Technology Solution',
        company: 'Medical Industry Project',
        period: '2022',
        description: 'Oblivion Labs designed and implemented a professional web platform for a medical billing service company, focusing on compliance, security, and user experience.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL']
      }
    ],
    sampleProjects: [
      {
        id: 'ecommerce-platform',
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and inventory management.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
        image: '/api/placeholder/600/400',
        icon: '🛒',
        category: 'web',
        featured: true,
        links: {
          demo: '#',
          github: '#',
          live: '#'
        }
      },
      {
        id: 'task-management',
        title: 'Task Management App',
        description: 'Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
        technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io', 'Framer Motion'],
        image: '/api/placeholder/600/400',
        icon: '📋',
        category: 'web',
        featured: true,
        links: {
          demo: '#',
          github: '#'
        }
      },
      {
        id: 'mobile-fitness',
        title: 'Fitness Tracker',
        description: 'Mobile fitness tracking application with workout planning, progress tracking, and social features built with React Native.',
        technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'Chart.js'],
        image: '/api/placeholder/600/400',
        icon: '💪',
        category: 'mobile',
        featured: false,
        links: {
          demo: '#',
          github: '#'
        }
      },
      {
        id: 'analytics-dashboard',
        title: 'Analytics Dashboard',
        description: 'Real-time analytics dashboard with interactive charts, data visualization, and customizable widgets for business intelligence.',
        technologies: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'MongoDB'],
        image: '/api/placeholder/600/400',
        icon: '📊',
        category: 'web',
        featured: true,
        links: {
          demo: '#',
          github: '#',
          live: '#'
        }
      },
      {
        id: 'chat-application',
        title: 'Real-time Chat App',
        description: 'Modern chat application with real-time messaging, file sharing, group chats, and end-to-end encryption.',
        technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'WebRTC'],
        image: '/api/placeholder/600/400',
        icon: '💬',
        category: 'web',
        featured: false,
        links: {
          demo: '#',
          github: '#'
        }
      },
      {
        id: 'portfolio-website',
        title: 'Portfolio Website',
        description: 'This very portfolio website built with Next.js, featuring smooth animations, responsive design, and modern UI/UX.',
        technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Zustand'],
        image: '/api/placeholder/600/400',
        icon: '🎨',
        category: 'web',
        featured: true,
        links: {
          github: '#',
          live: '#'
        }
      }
    ]
  },
  es: {
    navbar: {
      about: 'Acerca de',
      skills: 'Tecnologías',
      projects: 'Proyectos',
      services: 'Servicios',
      process: 'Proceso',
      contact: 'Contacto',
    },
    hero: {
      badge: '✨ Startup de Desarrollo de Software',
      title: 'Construyendo Soluciones',
      titleHighlight: 'Digitales Modernas',
      titleEnd: 'con Integración de IA',
      subtitle: 'Oblivion Labs es una startup de desarrollo de software de vanguardia especializada en aplicaciones web full-stack, integración de IA y soluciones digitales personalizadas para empresas de todo el mundo.',
      ctaPrimary: 'Ver Nuestro Trabajo',
      ctaSecondary: 'Iniciar Tu Proyecto',
      stats: {
        technologies: {
          number: '15+',
          title: 'Tecnologías Dominadas',
          description: 'React, Next.js, Python, IA/ML, y más'
        },
        experience: {
          number: '4+',
          title: 'Años en el Negocio',
          description: 'Entregando soluciones de nivel empresarial'
        },
        projects: {
          number: '5+',
          title: 'Proyectos Entregados',
          description: 'Implementaciones exitosas para clientes'
        }
      }
    },
    about: {
      title: 'Acerca de Oblivion Labs',
      subtitle: 'Innovación a Través de la Tecnología',
      journey: 'Nuestra Misión',
      description: 'Oblivion Labs es una startup de desarrollo de software visionaria dedicada a transformar negocios a través de soluciones tecnológicas de vanguardia. Nos especializamos en desarrollo web full-stack, integración de IA y software personalizado que genera resultados comerciales reales.',
      description2: 'Creemos que el software excepcional proviene de una profunda experiencia técnica, pensamiento innovador y comprensión genuina de las necesidades de nuestros clientes. Cada solución que entregamos está elaborada con precisión, escalabilidad y experiencia de usuario en su núcleo.',
      description3: 'Nuestro equipo combina años de experiencia en tecnologías web modernas con experiencia en inteligencia artificial y aprendizaje automático. Somos apasionados por empujar los límites de lo posible y ayudar a las empresas a mantenerse adelante en el panorama digital.',
      achievements: 'Logros',
      experience: 'Nuestros Proyectos Recientes',
      highlights: {
        student: {
          title: 'Estudiante Universitario',
          description: 'Equilibrando estudios mientras construyo proyectos del mundo real'
        },
        company: {
          title: 'Construyendo Oblivion',
          description: 'Creando mi propia empresa de desarrollo desde Cuba'
        },
        challenges: {
          title: 'Superando Desafíos',
          description: 'Trabajando con recursos limitados pero pasión ilimitada'
        },
        passion: {
          title: 'IA y Tecnología',
          description: 'Integrando IA de vanguardia en cada proyecto'
        }
      },
      stats: {
        projects: {
          title: '+5 Proyectos Entregados',
          description: 'Proyectos reales de clientes incluyendo centros culturales, facturación médica, servicios de handyman, empresas de construcción y empresas de rastras'
        },
        satisfaction: {
          title: 'Satisfacción del Cliente',
          description: 'Todos los clientes satisfechos con proyectos entregados y soporte continuo'
        },
        yearsExp: {
          title: 'Años Programando',
          description: 'Aprendizaje continuo a pesar de condiciones desafiantes en Cuba'
        },
        leadership: {
          title: 'Experiencia en Diseño Gráfico',
          description: 'Más de +15 logos profesionales diseñados y paquetes completos de branding entregados (separados de los proyectos de programación)'
        }
      }
    },
    skills: {
      title: 'Nuestras Tecnologías',
      subtitle: 'Herramientas y Frameworks de Vanguardia',
      frontend: 'Desarrollo Frontend',
      backend: 'Desarrollo Backend',
      design: 'Diseño Gráfico',
      tools: 'Herramientas de Desarrollo',
      stats: {
        technologies: 'Tecnologías Dominadas',
        experience: 'Años Programando',
        projects: 'Proyectos de Programación Completados'
      }
    },
    projects: {
      title: 'Nuestro Portafolio',
      subtitle: 'Soluciones Destacadas para Clientes',
      viewProject: 'Ver Proyecto',
      viewCode: 'Ver Código',
      technologies: 'Tecnologías Utilizadas',
      allProjects: 'Todos los Proyectos',
      featured: 'Destacados',
      web: 'Web',
      mobile: 'Móvil',
      desktop: 'Escritorio'
    },
    contact: {
      title: 'Trabajemos Juntos',
      subtitle: '¿Listo para comenzar tu próximo proyecto?',
      description: 'Estoy emocionado de trabajar en nuevos proyectos a pesar de los desafíos de vivir en Cuba con internet limitado y cortes de luz. Trabajo desde lugares con electricidad estable y entrego resultados de calidad dentro de los plazos acordados.',
      form: {
        name: 'Nombre Completo',
        email: 'Correo Electrónico',
        company: 'Empresa (Opcional)',
        message: 'Detalles del Proyecto',
        budget: 'Rango de Presupuesto (USD)',
        submit: 'Enviar Mensaje',
        sending: 'Enviando...',
        success: '¡Mensaje enviado exitosamente!',
        error: 'Error al enviar mensaje. Por favor intenta de nuevo.',
        placeholders: {
          name: 'Tu nombre completo',
          email: 'tu@email.com',
          company: 'Nombre de tu empresa',
          message: 'Cuéntanos sobre tu proyecto...',
          budgetSelect: 'Seleccionar rango de presupuesto'
        },
        privacy: 'Acepto la <a href="/privacy-policy" target="_blank" class="text-primary-400 hover:text-primary-300 underline">Política de Privacidad</a> y consiento el procesamiento de mis datos personales con el propósito de responder a mi consulta.'
      },
      info: {
        email: 'hola@oblivion-labs.com',
        phone: '+53 5639 5275',
        location: 'Calle G, entre Calle 4ta y Avenida de Céspedes, Sueño, Santiago de Cuba',
        response: 'Respuesta en 24 horas',
        getInTouch: 'Ponte en Contacto',
        getInTouchDescription: '¿Listo para dar vida a tu visión? Hablemos sobre tu proyecto y veamos cómo podemos ayudarte a lograr tus objetivos.',
        quickResponse: 'Respuesta Rápida',
        quickResponseDescription: 'Típicamente respondemos a todas las consultas dentro de 24 horas. Para proyectos urgentes, no dudes en contactarnos directamente.'
      },
    },
    services: {
      title: 'Nuestros Servicios',
      subtitle: 'Soluciones Digitales Integrales',
      webDev: {
        title: 'Desarrollo Web Full-Stack',
        description: 'Aplicaciones web de nivel empresarial usando React, Next.js, Node.js y tecnologías en la nube con integración perfecta de IA.',
      },
      uiux: {
        title: 'Diseño UI/UX y Branding',
        description: 'Interfaces de usuario modernas, sistemas completos de identidad de marca y optimización de experiencia de usuario para máximo engagement.',
      },
      consulting: {
        title: 'IA y Machine Learning',
        description: 'Soluciones de IA personalizadas, modelos de machine learning y automatización inteligente para transformar tus procesos de negocio.',
      },
      cta: {
        title: 'Nuestro Proceso de Desarrollo',
        description: 'Flujo optimizado: Descubrimiento y Planificación → Diseño y Arquitectura → Desarrollo y Pruebas → Despliegue y Soporte.',
        button: 'Iniciar Tu Proyecto'
      },
      customCta: {
        title: '¿Necesitas Algo Personalizado?',
        description: 'Cada proyecto es único. Hablemos sobre tus requisitos específicos y creemos una solución a medida que se ajuste perfectamente a tus necesidades.',
        button: 'Programar una Consulta'
      },
      categories: {
        all: 'Todos los Servicios',
        development: 'Desarrollo',
        design: 'Diseño',
        consulting: 'Consultoría'
      },
      pricing: {
        starting: 'Desde',
        delivery: 'Entrega',
        whatsIncluded: 'Qué Incluye:',
        moreFeatures: 'características más',
        getStarted: 'Empezar'
      },
      items: {
        webDevelopment: {
          title: 'Desarrollo Web Full-Stack',
          description: 'Aplicaciones web completas usando React, Next.js, Express y PostgreSQL. Desde páginas de aterrizaje hasta aplicaciones empresariales complejas.',
          features: [
            'Desarrollo React & Next.js',
            'Diseño Responsivo',
            'Integración de Base de Datos (PostgreSQL)',
            'Desarrollo de API (Express)',
            'Integración de IA con Python',
            'Soporte de Despliegue'
          ],
          deliveryTime: '2-4 semanas'
        },
        logoBranding: {
          title: 'Diseño de Logo y Branding',
          description: 'Diseño profesional de logos y paquetes completos de branding incluyendo identidad visual, tarjetas de presentación y materiales de marketing.',
          features: [
            'Diseño de Logo Personalizado',
            'Paquete de Identidad de Marca',
            'Diseño de Tarjetas de Presentación',
            'Volantes y Banners',
            'Gráficos para Redes Sociales',
            'Guías de Marca'
          ],
          deliveryTime: '1-2 semanas'
        },
        aiIntegration: {
          title: 'Integración y Desarrollo de IA',
          description: 'Agrega características de inteligencia artificial a tus aplicaciones usando algoritmos de machine learning en Python y herramientas modernas de IA.',
          features: [
            'Algoritmos de Machine Learning',
            'Desarrollo de IA en Python',
            'Análisis y Procesamiento de Datos',
            'Integración de Chatbots',
            'Sistemas Automatizados',
            'Características Potenciadas por IA'
          ],
          deliveryTime: '2-3 semanas'
        },
        basicWebsite: {
          title: 'Sitio Web Empresarial Básico',
          description: 'Sitios web simples y profesionales para pequeñas empresas. Perfecto para mostrar servicios y establecer presencia online.',
          features: [
            'Diseño Responsivo',
            'Formularios de Contacto',
            'Optimización SEO',
            'Carga Rápida',
            'Compatible con Móviles',
            'Analíticas Básicas'
          ],
          deliveryTime: '1-2 semanas'
        },
        consulting: {
          title: 'Consultoría Técnica',
          description: 'Obtén asesoramiento experto sobre elecciones tecnológicas, planificación de proyectos y estrategias de desarrollo para las necesidades de tu negocio.',
          features: [
            'Asesoramiento de Stack Tecnológico',
            'Planificación de Proyectos',
            'Revisión de Código',
            'Optimización de Rendimiento',
            'Evaluación de Seguridad',
            'Estrategia de Desarrollo'
          ],
          deliveryTime: 'Flexible'
        },
        maintenance: {
          title: 'Mantenimiento de Sitios Web',
          description: 'Mantén tu sitio web actualizado, seguro y funcionando sin problemas con servicios de mantenimiento y soporte continuo.',
          features: [
            'Actualizaciones Regulares',
            'Monitoreo de Seguridad',
            'Corrección de Errores',
            'Actualizaciones de Contenido',
            'Monitoreo de Rendimiento',
            'Gestión de Respaldos'
          ],
          deliveryTime: 'Continuo'
        }
      }
    },
    process: {
      title: 'Nuestro Proceso de Desarrollo',
      subtitle: 'Metodología Probada para el Éxito',
      steps: {
        contact: {
          title: 'Descubrimiento y Consulta',
          description: 'Analizamos las necesidades de tu negocio y definimos los requisitos del proyecto'
        },
        planning: {
          title: 'Estrategia y Arquitectura',
          description: 'Planificación técnica, diseño del sistema y creación de hoja de ruta del proyecto'
        },
        development: {
          title: 'Desarrollo Ágil',
          description: 'Desarrollo iterativo con demos regulares y retroalimentación del cliente'
        },
        approval: {
          title: 'Pruebas y Aseguramiento de Calidad',
          description: 'Pruebas exhaustivas, optimización de rendimiento y aprobación final'
        },
        deployment: {
          title: 'Lanzamiento y Soporte Continuo',
          description: 'Despliegue en producción con monitoreo y soporte continuo'
        }
      },
      readyCta: {
        title: '¿Listo para Comenzar?',
        description: 'En Oblivion Labs, combinamos excelencia técnica con estrategia empresarial para entregar soluciones que generan resultados reales. Hablemos sobre tu proyecto y creemos algo increíble juntos.',
        button: 'Iniciar Tu Proyecto'
      }
    },
    meetDev: {
      badge: '✨ Conoce Nuestro Equipo',
      title: 'La Innovación Detrás de Oblivion Labs',
      subtitle: 'Un equipo dedicado de expertos apasionados por transformar negocios a través de soluciones tecnológicas de vanguardia.',
      description: 'En Oblivion Labs, combinamos excelencia técnica con innovación creativa para entregar soluciones que superan las expectativas. Nuestro equipo reúne años de experiencia en tecnologías web modernas, integración de IA y estrategia empresarial.',
      description2: 'Creemos que el software excepcional proviene de entender los desafíos únicos de nuestros clientes y crear soluciones que no solo satisfacen sus necesidades sino que impulsan su éxito. Cada proyecto es una oportunidad para empujar límites y crear algo extraordinario.',
      highlights: {
        student: {
          title: 'Excelencia Técnica',
          description: 'Prácticas de desarrollo de vanguardia y tecnologías modernas'
        },
        company: {
          title: 'Enfoque en Innovación',
          description: 'Liderando el camino en integración de IA y transformación digital'
        },
        challenges: {
          title: 'Solucionadores de Problemas',
          description: 'Convirtiendo desafíos complejos en soluciones elegantes'
        },
        passion: {
          title: 'Preparados para el Futuro',
          description: 'Construyendo soluciones escalables para las necesidades del mañana'
        }
      },
      cta: 'Iniciar Tu Proyecto',
      fromCuba: '👨‍💼 Fundador'
    },
    common: {
      viewProject: 'Ver Proyecto',
      featured: 'Destacado',
      madeWith: 'Hecho con ❤️ y mucho ☕ en Cuba',
      aboutProject: 'Acerca de Este Proyecto',
      technologiesUsed: 'Tecnologías Utilizadas',
      viewLiveSite: 'Ver Sitio en Vivo',
      viewDemo: 'Ver Demo',
      viewCode: 'Ver Código',
      moreItems: 'más',
      letsWorkTogether: 'Trabajemos Juntos'
    },
    experiences: [
      {
        id: 'bank-system',
        title: 'Solución Bancaria Empresarial',
        company: 'Proyecto de Tecnología Financiera',
        period: '2024 - Presente',
        description: 'Nuestro equipo entregó un sistema integral de control interno para un banco importante, con integración avanzada de IA para mayor seguridad y monitoreo automatizado de cumplimiento.',
        technologies: ['React', 'Next.js', 'PostgreSQL', 'Python', 'Express']
      },
      {
        id: 'construction-company',
        title: 'Plataforma para Industria de Construcción',
        company: 'Proyecto de Transformación Digital',
        period: '2023',
        description: 'Oblivion Labs creó un ecosistema digital completo para una empresa de construcción, incluyendo herramientas de gestión de proyectos, portales de clientes y soluciones integrales de branding.',
        technologies: ['React', 'Next.js', 'JavaScript', 'Photoshop', 'Illustrator']
      },
      {
        id: 'trucking-business',
        title: 'Sistema de Gestión Logística',
        company: 'Tecnología de Transporte',
        period: '2023',
        description: 'Desarrollamos una plataforma logística integrada para una empresa de rastras, con gestión de flota, optimización de rutas y rediseño completo de identidad de marca.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL', 'Photoshop']
      },
      {
        id: 'marcos-handyman',
        title: 'Solución para Industria de Servicios',
        company: 'Paquete Digital para Pequeñas Empresas',
        period: '2023',
        description: 'Nuestra startup entregó una transformación digital completa para un servicio de handyman en USA, incluyendo presencia web, branding y herramientas de gestión de clientes.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Photoshop', 'Illustrator']
      },
      {
        id: 'medical-billing',
        title: 'Solución de Tecnología Médica',
        company: 'Proyecto de Industria Médica',
        period: '2022',
        description: 'Oblivion Labs diseñó e implementó una plataforma web profesional para una empresa de servicios de facturación médica, enfocándose en cumplimiento, seguridad y experiencia de usuario.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'PHP', 'MySQL']
      }
    ],
    sampleProjects: [
      {
        id: 'ecommerce-platform',
        title: 'Plataforma E-commerce',
        description: 'Solución e-commerce full-stack con React, Node.js y PostgreSQL. Incluye autenticación de usuarios, procesamiento de pagos y gestión de inventario.',
        technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
        image: '/api/placeholder/600/400',
        icon: '🛒',
        category: 'web',
        featured: true,
        links: {
          demo: '#',
          github: '#',
          live: '#'
        }
      },
      {
        id: 'task-management',
        title: 'App de Gestión de Tareas',
        description: 'Aplicación colaborativa de gestión de tareas con actualizaciones en tiempo real, funcionalidad de arrastrar y soltar, y características de colaboración en equipo.',
        technologies: ['Next.js', 'TypeScript', 'Prisma', 'Socket.io', 'Framer Motion'],
        image: '/api/placeholder/600/400',
        icon: '📋',
        category: 'web',
        featured: true,
        links: {
          demo: '#',
          github: '#'
        }
      },
      {
        id: 'mobile-fitness',
        title: 'Rastreador de Fitness',
        description: 'Aplicación móvil de seguimiento de fitness con planificación de entrenamientos, seguimiento de progreso y características sociales construida con React Native.',
        technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'Chart.js'],
        image: '/api/placeholder/600/400',
        icon: '💪',
        category: 'mobile',
        featured: false,
        links: {
          demo: '#',
          github: '#'
        }
      },
      {
        id: 'analytics-dashboard',
        title: 'Dashboard de Analíticas',
        description: 'Dashboard de analíticas en tiempo real con gráficos interactivos, visualización de datos y widgets personalizables para inteligencia de negocios.',
        technologies: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'MongoDB'],
        image: '/api/placeholder/600/400',
        icon: '📊',
        category: 'web',
        featured: true,
        links: {
          demo: '#',
          github: '#',
          live: '#'
        }
      },
      {
        id: 'chat-application',
        title: 'App de Chat en Tiempo Real',
        description: 'Aplicación de chat moderna con mensajería en tiempo real, compartir archivos, chats grupales y encriptación de extremo a extremo.',
        technologies: ['React', 'Socket.io', 'Node.js', 'MongoDB', 'WebRTC'],
        image: '/api/placeholder/600/400',
        icon: '💬',
        category: 'web',
        featured: false,
        links: {
          demo: '#',
          github: '#'
        }
      },
      {
        id: 'portfolio-website',
        title: 'Sitio Web Portfolio',
        description: 'Este mismo sitio web portfolio construido con Next.js, con animaciones suaves, diseño responsivo y UI/UX moderno.',
        technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS', 'Zustand'],
        image: '/api/placeholder/600/400',
        icon: '🎨',
        category: 'web',
        featured: true,
        links: {
          github: '#',
          live: '#'
        }
      }
    ]
  },
}