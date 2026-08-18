import type { PersonalInfo } from '../types/portfolio';

// Sleek placeholder graphic for developer photo until replaced by user
export const developerPhotoPlaceholder = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="960" viewBox="0 0 800 960" fill="none">
  <rect width="800" height="960" fill="#0D0E14"/>
  <defs>
    <pattern id="grid_hero" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" stroke-opacity="0.05" stroke-width="1"/>
    </pattern>
    <radialGradient id="avatar_glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#6366F1" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="#0D0E14" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="800" height="960" fill="url(#grid_hero)"/>
  <rect width="800" height="960" fill="url(#avatar_glow)"/>

  <!-- Developer Silhouette Artwork -->
  <g opacity="0.85">
    <path d="M 220 820 C 220 660, 310 580, 400 580 C 490 580, 580 660, 580 820 L 580 960 L 220 960 Z" fill="#1C1E2B" stroke="#6366F1" stroke-opacity="0.3" stroke-width="2"/>
    <circle cx="400" cy="380" r="140" fill="#24283B" stroke="#6366F1" stroke-opacity="0.4" stroke-width="2"/>
    <rect x="320" y="340" width="160" height="40" rx="8" fill="#0D0E14" stroke="#00F0FF" stroke-opacity="0.6" stroke-width="2"/>
    <circle cx="360" cy="360" r="12" fill="#00F0FF" fill-opacity="0.3"/>
    <circle cx="440" cy="360" r="12" fill="#00F0FF" fill-opacity="0.3"/>
    <line x1="372" y1="360" x2="428" y2="360" stroke="#00F0FF" stroke-width="2"/>
  </g>

  <!-- Technical Overlay Details -->
  <rect x="40" y="40" width="720" height="880" rx="16" fill="none" stroke="#FFFFFF" stroke-opacity="0.08" stroke-width="1.5"/>
  <text x="70" y="90" font-family="monospace" font-size="14" fill="#6366F1" font-weight="600">SAIF ABDULQADIR ADIL</text>
  <text x="70" y="115" font-family="monospace" font-size="12" fill="#8E93A6">FULL-STACK DEVELOPER</text>
  <circle cx="710" cy="85" r="6" fill="#10B981"/>
</svg>
`)}`;

export const personalInfo: PersonalInfo = {
  name: "Saif Abdulqadir",
  title: "Full-Stack Developer",
  roleTagline: "Building scalable web, backend, database, and desktop applications with clean architecture.",
  bio: "Computer Science student & Full-Stack Developer passionate about building high-performance web, backend, and desktop applications.",
  extendedBio: [
    "I am a Computer Science student and Full-Stack Developer focused on building web applications, backend systems, APIs, database-driven applications, and desktop applications.",
    "I care about writing clean, maintainable software and building systems with clear structure and separation of responsibilities."
  ],
  location: "Duhok",
  email: "saefmziri10@gmail.com",
  phone: "07517475043",
  github: "https://github.com/saifmziri",
  linkedin: "https://linkedin.com/in/saif-mziri-8530b037b",
  instagram: "https://www.instagram.com/saif__mziri0/",
  resumeUrl: "#",
  profileImage: "/profile.jpg",
  stats: []
};

export const aboutStats = [
  {
    target: 10,
    suffix: "+",
    label: "PROJECTS"
  },
  {
    target: 30,
    suffix: "+",
    label: "CERTIFICATIONS"
  },
  {
    target: 2,
    suffix: "+",
    label: "YEARS CODING"
  }
];

export const engineeringPrinciples = [
  {
    number: "01",
    title: "Clean Architecture",
    description: "Maintainable system structure and separation of responsibilities."
  },
  {
    number: "02",
    title: "SOLID Principles",
    description: "Flexible and maintainable object-oriented design."
  },
  {
    number: "03",
    title: "Clean Code",
    description: "Readable, understandable, and maintainable code."
  },
  {
    number: "04",
    title: "3-Tier Architecture",
    description: "Separation of presentation, business logic, and data access."
  }
];
