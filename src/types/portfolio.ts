export interface PersonalInfo {
  name: string;
  location: string;
  email: string;
  phone?: string;
  github: string;
  linkedin: string;
  instagram?: string;
  profileImage: string;
}

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  extendedDescription: string;
  category: 'Full-Stack Web' | 'Web Application' | 'Backend & API' | 'Database System' | 'Desktop Application' | 'Systems Architecture';
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

export interface Skill {
  id: string;
  name: string;
  icon: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: Skill[];
}

export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  company: string;
  location: string;
  type: 'Full-time' | 'Contract' | 'Open Source' | 'Education' | 'Certification';
  summary: string;
  achievements: string[];
  technologies: string[];
  highlightMetric?: string;
}
