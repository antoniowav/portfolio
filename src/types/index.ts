// Type definitions for Terminal Portfolio

export * from "./github";

export type Theme = "dark" | "light" | "amber" | "blue";

export type FontFamily = "mono" | "sans" | "serif";

// Project Types
export interface ProjectLink {
  type: "repo" | "demo" | "website" | "article";
  url: string;
  label: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface ProjectSection {
  title: string;
  content: string;
  images?: ProjectImage[];
  codeSnippets?: CodeSnippet[];
}

export interface CodeSnippet {
  language: string;
  code: string;
  filename?: string;
  description?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  category: string;
  dateStart: string;
  dateEnd?: string;
  impactScore: number;
  featured: boolean;
  links: ProjectLink[];
  images: ProjectImage[];
  sections: {
    overview: ProjectSection;
    problem?: ProjectSection;
    approach?: ProjectSection;
    results?: ProjectSection;
    technical?: ProjectSection;
  };
  metadata: {
    readTime: number;
    difficulty: "beginner" | "intermediate" | "advanced";
    status: "completed" | "in-progress" | "archived";
  };
}

// Blog Types
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
  lastModified?: string;
  tags: string[];
  category: string;
  featured: boolean;
  published: boolean;
  author: Author;
  readTime: number;
  seo: {
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
  };
}

export interface Author {
  name: string;
  email: string;
  bio: string;
  avatar: string;
  social: SocialLink[];
}

// Contact Types
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  consent: boolean;
  honeypot?: string;
  timestamp: number;
}

export interface ContactFormResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

// Social and Professional Links
export interface SocialLink {
  platform: string;
  url: string;
  username: string;
  icon: string;
}

export interface ProfessionalLink {
  type: "linkedin" | "github" | "email" | "resume" | "website";
  url: string;
  label: string;
}

// Skills and Experience
export interface Skill {
  name: string;
  category: "frontend" | "backend" | "devops" | "design" | "other";
  proficiency: number; // 1-100
  yearsOfExperience: number;
  tags: string[];
  description?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  schoolUrl?: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  honors?: string[];
  relevantCoursework?: string[];
}

// Navigation and UI
export interface NavigationItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
  children?: NavigationItem[];
}

export interface Breadcrumb {
  label: string;
  href: string;
  current?: boolean;
}

// Theme and Settings
export interface UserPreferences {
  theme: Theme;
  fontFamily: FontFamily;
  reducedMotion: boolean;
  gridOverlay: boolean;
  fontSize: "small" | "medium" | "large";
}

// Analytics and Tracking
export interface AnalyticsEvent {
  name: string;
  category: "navigation" | "engagement" | "conversion" | "error";
  properties?: Record<string, string | number | boolean>;
  timestamp: number;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Search and Filtering
export interface SearchFilters {
  query?: string;
  category?: string;
  tags?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  sortBy?: "date" | "title" | "relevance" | "impact";
  sortOrder?: "asc" | "desc";
}

export interface SearchResult {
  id: string;
  type: "project" | "blog" | "page";
  title: string;
  excerpt: string;
  url: string;
  relevance: number;
  highlights: string[];
}

// SEO and Meta
export interface SeoData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: "summary" | "summary_large_image";
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

// Error Handling
export interface ErrorInfo {
  message: string;
  code?: string;
  statusCode?: number;
  timestamp: number;
  url?: string;
  userAgent?: string;
  userId?: string;
}

// Form Validation
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: () => boolean | string;
}

export interface FormField {
  name: string;
  label: string;
  type: "text" | "email" | "textarea" | "checkbox" | "select";
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule;
  options?: { label: string; value: string }[];
}

// Component Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  "data-testid"?: string;
}

export interface ButtonProps extends BaseComponentProps {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  href?: string;
  external?: boolean;
  title?: string;
}

export interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
  image?: string;
  href?: string;
  tags?: string[];
  footer?: React.ReactNode;
  elevated?: boolean;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl";
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

// Utility Types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Environment and Configuration
export interface EnvironmentConfig {
  NODE_ENV: "development" | "production" | "test";
  NEXT_PUBLIC_SITE_URL: string;
  NEXT_PUBLIC_ANALYTICS_ID?: string;
  CONTACT_EMAIL: string;
  SMTP_HOST?: string;
  SMTP_PORT?: number;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  RATE_LIMIT_MAX?: number;
  RATE_LIMIT_WINDOW?: number;
}
