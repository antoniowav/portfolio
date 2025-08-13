// Sample data for Terminal Portfolio

import type {
  Project,
  BlogPost,
  Author,
  Skill,
  Experience,
  Education,
  ProfessionalLink,
  NavigationItem,
} from "@/types";

// Author/Personal Information
export const author: Author = {
  name: "Antonio Piattelli",
  email: "hello@antoniopiattelli.com",
  bio: "Full-stack developer passionate about creating elegant solutions to complex problems. Experienced in modern web technologies, system architecture, and developer tooling.",
  avatar: "/images/avatar.jpg",
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/antoniopiattelli",
      username: "antoniopiattelli",
      icon: "github",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/antoniopiattelli",
      username: "antoniopiattelli",
      icon: "linkedin",
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/antoniopiattelli",
      username: "@antoniopiattelli",
      icon: "twitter",
    },
  ],
};

// Professional Links
export const professionalLinks: ProfessionalLink[] = [
  {
    type: "github",
    url: "https://github.com/antoniopiattelli",
    label: "View GitHub Profile",
  },
  {
    type: "linkedin",
    url: "https://linkedin.com/in/antoniopiattelli",
    label: "Connect on LinkedIn",
  },
  {
    type: "email",
    url: "mailto:hello@antoniopiattelli.com",
    label: "Send Email",
  },
  {
    type: "resume",
    url: "/resume",
    label: "Download Resume",
  },
];

// Navigation Menu
export const navigation: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
    icon: "home",
  },
  {
    label: "Projects",
    href: "/projects",
    icon: "folder",
  },
  {
    label: "About",
    href: "/about",
    icon: "user",
  },
  {
    label: "Listen, Watch & Photos",
    href: "/listen-watch",
    icon: "play",
  },
  {
    label: "Contact",
    href: "/contact",
    icon: "mail",
  },
];

// Skills
export const skills: Skill[] = [
  // Frontend
  {
    name: "React",
    category: "frontend",
    proficiency: 90,
    yearsOfExperience: 4,
    tags: ["javascript", "typescript", "jsx"],
    description: "Building modern, performant user interfaces",
  },
  {
    name: "TypeScript",
    category: "frontend",
    proficiency: 85,
    yearsOfExperience: 3,
    tags: ["javascript", "types", "development"],
    description: "Type-safe JavaScript development",
  },
  {
    name: "Next.js",
    category: "frontend",
    proficiency: 88,
    yearsOfExperience: 3,
    tags: ["react", "ssr", "ssg"],
    description: "Full-stack React framework",
  },
  {
    name: "CSS/SCSS",
    category: "frontend",
    proficiency: 85,
    yearsOfExperience: 5,
    tags: ["styling", "responsive", "animations"],
    description: "Modern CSS and preprocessors",
  },
  {
    name: "Tailwind CSS",
    category: "frontend",
    proficiency: 80,
    yearsOfExperience: 2,
    tags: ["utility-first", "responsive"],
    description: "Utility-first CSS framework",
  },
  {
    name: "Svelte",
    category: "frontend",
    proficiency: 80,
    yearsOfExperience: 4,
    tags: ["javascript", "ui", "components"],
    description: "Building fast and efficient websites",
  },
  // Backend
  {
    name: "Go",
    category: "backend",
    proficiency: 40,
    yearsOfExperience: 2,
    tags: ["golang", "concurrency", "microservices"],
    description: "Building scalable backend services",
  },
  {
    name: "Node.js",
    category: "backend",
    proficiency: 88,
    yearsOfExperience: 4,
    tags: ["javascript", "api", "server"],
    description: "Server-side JavaScript development",
  },
  {
    name: "PostgreSQL",
    category: "backend",
    proficiency: 80,
    yearsOfExperience: 3,
    tags: ["database", "sql", "optimization"],
    description: "Relational database design and optimization",
  },

  // DevOps
  {
    name: "Docker",
    category: "devops",
    proficiency: 50,
    yearsOfExperience: 3,
    tags: ["containerization", "deployment"],
    description: "Application containerization",
  },
  {
    name: "AWS",
    category: "devops",
    proficiency: 70,
    yearsOfExperience: 2,
    tags: ["cloud", "infrastructure"],
    description: "Cloud infrastructure and services",
  },
  {
    name: "Git",
    category: "devops",
    proficiency: 80,
    yearsOfExperience: 5,
    tags: ["version-control", "collaboration"],
    description: "Version control and collaboration",
  },
];

// Experience
export const experience: Experience[] = [
  {
    id: "senior-developer-2023",
    title: "Senior Full-Stack Developer",
    company: "TechCorp Solutions",
    companyUrl: "https://techcorp.example.com",
    location: "Remote",
    startDate: "2023-01-01",
    current: true,
    description:
      "Lead development of modern web applications using React, TypeScript, and Go.",
    responsibilities: [
      "Architect and implement scalable web applications",
      "Mentor junior developers and conduct code reviews",
      "Collaborate with product teams on feature planning",
      "Optimize application performance and user experience",
    ],
    technologies: ["React", "TypeScript", "Go", "PostgreSQL", "Docker", "AWS"],
    achievements: [
      "Reduced application load time by 40% through optimization",
      "Led migration from legacy system to modern stack",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
    ],
  },
  {
    id: "fullstack-developer-2021",
    title: "Full-Stack Developer",
    company: "StartupXYZ",
    companyUrl: "https://startupxyz.example.com",
    location: "San Francisco, CA",
    startDate: "2021-06-01",
    endDate: "2022-12-31",
    current: false,
    description:
      "Developed and maintained multiple client projects using modern web technologies.",
    responsibilities: [
      "Built responsive web applications from design mockups",
      "Implemented RESTful APIs and database schemas",
      "Collaborated with designers and product managers",
      "Maintained and debugged existing codebases",
    ],
    technologies: ["React", "Node.js", "Python", "MongoDB", "Express.js"],
    achievements: [
      "Delivered 8 successful client projects on time",
      "Improved code test coverage from 60% to 90%",
      "Implemented automated testing and deployment workflows",
    ],
  },
];

// Education
export const education: Education[] = [
  {
    id: "cs-degree",
    degree: "Bachelor of Science in Computer Science",
    school: "University of Technology",
    schoolUrl: "https://university.example.com",
    location: "Tech City, CA",
    startDate: "2017-09-01",
    endDate: "2021-05-31",
    gpa: "3.8/4.0",
    honors: ["Magna Cum Laude", "Dean's List (6 semesters)"],
    relevantCoursework: [
      "Data Structures and Algorithms",
      "Software Engineering",
      "Database Systems",
      "Web Development",
      "Computer Networks",
      "Operating Systems",
    ],
  },
];

// Sample Projects
export const projects: Project[] = [
  {
    id: "terminal-portfolio",
    slug: "terminal-portfolio",
    title: "Terminal-Style Portfolio",
    summary:
      "A modern developer portfolio with a distinctive terminal aesthetic built using Next.js and SRCL components.",
    description:
      "This portfolio website showcases projects and skills with a unique terminal-inspired design. Built with performance and accessibility in mind, featuring dark/light themes, keyboard navigation, and optimized for all devices.",
    tech: ["Next.js", "TypeScript", "SCSS", "React", "Vercel"],
    category: "Web Development",
    dateStart: "2024-01-01",
    impactScore: 85,
    featured: true,
    links: [
      {
        type: "demo",
        url: "https://portfolio.piattelli.dev",
        label: "View Live Site",
      },
      {
        type: "repo",
        url: "https://github.com/antoniopiattelli/terminal-portfolio",
        label: "View Source",
      },
    ],
    images: [
      {
        src: "/images/projects/terminal-portfolio/hero.jpg",
        alt: "Terminal Portfolio Homepage",
        caption: "Homepage with terminal-style typing animation",
        width: 1200,
        height: 800,
      },
      {
        src: "/images/projects/terminal-portfolio/projects.jpg",
        alt: "Projects Grid View",
        caption: "Responsive projects grid with filtering",
        width: 1200,
        height: 800,
      },
    ],
    sections: {
      overview: {
        title: "Project Overview",
        content:
          "A developer portfolio website designed to stand out with a terminal aesthetic while maintaining excellent performance and accessibility. The site serves as both a showcase of projects and a demonstration of modern web development best practices.",
      },
      problem: {
        title: "Challenge",
        content:
          "Creating a unique visual identity that appeals to developers while ensuring the site remains accessible, fast, and functional across all devices. The challenge was balancing the terminal aesthetic with modern UX expectations.",
      },
      approach: {
        title: "Technical Approach",
        content:
          "Built with Next.js for optimal performance and SEO, using TypeScript for type safety. Implemented custom SCSS following the SRCL design system for consistent terminal styling. Used modern CSS features for responsive design and animations.",
        codeSnippets: [
          {
            language: "typescript",
            filename: "components/TypingAnimation.tsx",
            code: `export const TypingAnimation = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1))
        i++
      } else {
        setIsTyping(false)
        clearInterval(timer)
      }
    }, 50)

    return () => clearInterval(timer)
  }, [text])

  return (
    <span className="typing-text">
      {displayText}
      {isTyping && <span className="cursor">|</span>}
    </span>
  )
}`,
            description: "React component for terminal-style typing animation",
          },
        ],
      },
      results: {
        title: "Results & Impact",
        content:
          "Achieved sub-1s load times, 95+ Lighthouse scores across all categories, and full keyboard accessibility. The unique design has received positive feedback from the developer community and potential employers.",
      },
    },
    metadata: {
      readTime: 5,
      difficulty: "intermediate",
      status: "completed",
    },
  },
  {
    id: "task-manager-api",
    slug: "task-manager-api",
    title: "Go Task Manager API",
    summary:
      "A RESTful API built with Go for managing tasks and projects with authentication, real-time updates, and comprehensive testing.",
    description:
      "A robust task management API featuring JWT authentication, real-time WebSocket updates, and comprehensive CRUD operations. Built following Go best practices with extensive testing and documentation.",
    tech: ["Go", "PostgreSQL", "JWT", "WebSockets", "Docker", "Redis"],
    category: "Backend Development",
    dateStart: "2023-08-01",
    dateEnd: "2023-11-30",
    impactScore: 92,
    featured: true,
    links: [
      {
        type: "repo",
        url: "https://github.com/antoniopiattelli/go-task-api",
        label: "View Repository",
      },
      {
        type: "article",
        url: "https://dev.to/antoniopiattelli/building-scalable-apis-with-go",
        label: "Read Article",
      },
    ],
    images: [
      {
        src: "/images/projects/go-task-api/architecture.jpg",
        alt: "API Architecture Diagram",
        caption: "System architecture and data flow",
        width: 1000,
        height: 600,
      },
    ],
    sections: {
      overview: {
        title: "Project Overview",
        content:
          "A production-ready task management API designed for scalability and performance. Features include user authentication, real-time notifications, task organization, and comprehensive API documentation.",
      },
      technical: {
        title: "Technical Implementation",
        content:
          "Built using Go with clean architecture principles, PostgreSQL for data persistence, Redis for caching and sessions, and WebSockets for real-time updates.",
        codeSnippets: [
          {
            language: "go",
            filename: "handlers/tasks.go",
            code: `func (h *TaskHandler) CreateTask(w http.ResponseWriter, r *http.Request) {
    var req CreateTaskRequest
    if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }

    if err := h.validator.Validate(req); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    userID := getUserIDFromContext(r.Context())
    task, err := h.service.CreateTask(r.Context(), userID, req)
    if err != nil {
        http.Error(w, "Failed to create task", http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(task)
}`,
            description: "Example API handler with proper error handling",
          },
        ],
      },
      results: {
        title: "Outcomes",
        content:
          "Successfully deployed API handling 1000+ requests per minute with 99.9% uptime. Comprehensive test suite with 95% code coverage and detailed API documentation.",
      },
    },
    metadata: {
      readTime: 8,
      difficulty: "advanced",
      status: "completed",
    },
  },
  {
    id: "react-dashboard",
    slug: "react-dashboard",
    title: "Analytics Dashboard",
    summary:
      "A responsive analytics dashboard built with React and TypeScript, featuring real-time data visualization and customizable widgets.",
    description:
      "An interactive analytics dashboard providing real-time insights through customizable charts and widgets. Features drag-and-drop layout, theme customization, and responsive design.",
    tech: ["React", "TypeScript", "Chart.js", "Tailwind CSS", "React Query"],
    category: "Frontend Development",
    dateStart: "2023-03-01",
    dateEnd: "2023-06-30",
    impactScore: 88,
    featured: true,
    links: [
      {
        type: "demo",
        url: "https://dashboard.piattelli.dev",
        label: "View Demo",
      },
      {
        type: "repo",
        url: "https://github.com/antoniopiattelli/react-dashboard",
        label: "Source Code",
      },
    ],
    images: [
      {
        src: "/images/projects/react-dashboard/overview.jpg",
        alt: "Dashboard Overview",
        caption: "Main dashboard with multiple widgets",
        width: 1400,
        height: 900,
      },
      {
        src: "/images/projects/react-dashboard/mobile.jpg",
        alt: "Mobile Dashboard View",
        caption: "Responsive mobile layout",
        width: 375,
        height: 812,
      },
    ],
    sections: {
      overview: {
        title: "Project Overview",
        content:
          "A comprehensive analytics dashboard designed for business intelligence. Provides real-time data visualization, customizable layouts, and responsive design for optimal user experience across devices.",
      },
      approach: {
        title: "Development Approach",
        content:
          "Built with React and TypeScript for type safety, using Chart.js for data visualization and Tailwind CSS for responsive styling. Implemented React Query for efficient data fetching and caching.",
      },
      results: {
        title: "Key Features & Results",
        content:
          "Successfully delivered a fully responsive dashboard with 15+ widget types, drag-and-drop customization, dark/light themes, and real-time data updates. Achieved 98 Lighthouse performance score.",
      },
    },
    metadata: {
      readTime: 6,
      difficulty: "intermediate",
      status: "completed",
    },
  },
];

// Sample Blog Posts
export const blogPosts: BlogPost[] = [
  {
    id: "building-terminal-ui",
    slug: "building-terminal-ui-with-react",
    title: "Building Terminal-Style UIs with React",
    excerpt:
      "Learn how to create engaging terminal-inspired interfaces using modern React patterns and CSS techniques.",
    body: "Full blog post content here...",
    date: "2024-01-15",
    tags: ["React", "CSS", "UI/UX", "Terminal"],
    category: "Frontend",
    featured: true,
    published: true,
    author,
    readTime: 8,
    seo: {
      metaDescription:
        "A comprehensive guide to building terminal-style user interfaces with React and modern CSS techniques.",
      keywords: ["React", "Terminal UI", "CSS", "Frontend Development"],
    },
  },
  {
    id: "go-api-best-practices",
    slug: "go-api-best-practices",
    title: "Go API Development Best Practices",
    excerpt:
      "Essential patterns and practices for building robust, scalable APIs in Go.",
    body: "Full blog post content here...",
    date: "2023-12-08",
    tags: ["Go", "API", "Backend", "Best Practices"],
    category: "Backend",
    featured: true,
    published: true,
    author,
    readTime: 12,
    seo: {
      metaDescription:
        "Learn the best practices for developing robust and scalable APIs in Go programming language.",
      keywords: ["Go", "Golang", "API Development", "Backend"],
    },
  },
];

// Featured project IDs (for homepage)
export const featuredProjectIds = projects
  .filter((project) => project.featured)
  .slice(0, 3)
  .map((project) => project.id);

// Quick stats for about page
export const quickStats = {
  yearsOfExperience: new Date().getFullYear() - 2019,
  projectsCompleted: projects.length,
  technologiesUsed: Array.from(new Set(projects.flatMap((p) => p.tech))).length,
  coffeeCupsConsumed: "∞",
};
