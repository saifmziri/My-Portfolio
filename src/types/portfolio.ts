export interface PersonalInfo {
  name: string;
  title: string;
  roleTagline: string;
  bio: string;
  extendedBio: string[];
  location: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  twitter?: string;
  resumeUrl: string;
  profileImage: string; // Path or URL to professional developer photo
  stats: {
    label: string;
    value: string;
    description?: string;
  }[];
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  extendedDescription: string;
  category: 'Full-Stack Web' | 'Backend & API' | 'Database System' | 'Desktop Application' | 'Systems Architecture';
  featured: boolean;
  technologies: string[];
  image: string;
  images?: string[];
  previewVideo?: string;
  github?: string;
  githubFrontend?: string;
  githubBackend?: string;
  live?: string;
  linkedinPost?: string;
  instagramPost?: string;
  metrics: {
    label: string;
    value: string;
  }[];
  features: string[];
  architectureHighlights: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    level: number; // 1-100
    icon?: string;
    tag: string;
    yearsOfExp: string;
    highlight?: string;
  }[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Open Source' | 'Education';
  summary: string;
  achievements: string[];
  technologies: string[];
  highlightMetric?: string;
}

export interface Principle {
  title: string;
  subtitle: string;
  description: string;
  codeSnippet?: string;
}
