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
      url: "https://github.com/antoniowav",
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
      platform: "Instagram",
      url: "https://instagram.com/okbye_toni",
      username: "@okbye_toni",
      icon: "Instagram",
    },
  ],
};

// Professional Links
export const professionalLinks: ProfessionalLink[] = [
  {
    type: "github",
    url: "https://github.com/antoniowav",
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
// Get featured project IDs dynamically from GitHub at runtime
export const featuredProjectIds: string[] = [];

// Quick stats for about page
export const quickStats = {
  yearsOfExperience: new Date().getFullYear() - 2019,
  projectsCompleted: 0, // This will be updated dynamically
  technologiesUsed: 0, // This will be updated dynamically
  coffeeCupsConsumed: "∞",
};
