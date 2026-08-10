import type { PersonalInfo, Principle } from '../types/portfolio';

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
  name: "Saif Abdulqadir Adil",
  title: "Full-Stack Developer",
  roleTagline: "Building scalable web, backend, database, and desktop applications with clean architecture.",
  bio: "Computer Science student & Full-Stack Developer passionate about building high-performance web, backend, and desktop applications using C#, .NET, React, Laravel, and SQL databases.",
  extendedBio: [
    "I am a Computer Science student at the University of Duhok and a Full-Stack Developer focused on software engineering. I work across frontend, backend, databases, and desktop development with an emphasis on Clean Code and solid software architecture.",
    "My core technology stack includes C#, .NET Core, ASP.NET Web API, Entity Framework Core, Laravel, React, TypeScript, SQL Server, and PostgreSQL. Whether architecting RESTful services with JWT authentication or developing desktop software with WPF and WinForms, I focus on reliability and data integrity.",
    "Through hands-on application engineering and comprehensive roadmap certifications, I continuously build production-ready platforms — including project management tools, clinic systems, multi-lingual web platforms, and financial software."
  ],
  location: "Duhok",
  email: "saefmziri10@gmail.com",
  phone: "07517475043",
  github: "https://github.com/saifmziri",
  linkedin: "https://linkedin.com/in/saif-mziri-8530b037b",
  resumeUrl: "#",

  // Photo path — place photo file in public/profile.jpg
  profileImage: "/profile.jpg",

  stats: [
    {
      label: "PROJECTS",
      value: "10+",
      description: "Full-stack, backend, & desktop applications"
    },
    {
      label: "CERTIFICATIONS",
      value: "30+",
      description: "Software engineering & developer roadmap"
    }
  ]
};

export const engineeringPrinciples: Principle[] = [
  {
    title: "Clean Architecture & 3-Tier",
    subtitle: "Maintainable Systems",
    description: "Decoupling presentation, business logic, and database persistence layers using SOLID principles, dependency injection, and service contracts.",
    codeSnippet: "public class TaskService : ITaskService { private readonly ITaskRepository _repo; }"
  },
  {
    title: "RESTful APIs & Security",
    subtitle: "Robust Endpoint Services",
    description: "Designing RESTful API endpoints in ASP.NET Core & Laravel with JWT/Sanctum authentication, role-based authorization, and centralized error handling.",
    codeSnippet: "[Authorize(Roles = \"Admin\")]\n[HttpPost]\npublic async Task<IActionResult> CreateTask([FromBody] TaskDto dto) => Ok(await _service.CreateAsync(dto));"
  },
  {
    title: "Database Integrity",
    subtitle: "SQL Server & PostgreSQL",
    description: "Architecting relational database schemas, T-SQL stored procedures, ADO.NET/EF Core data mapping, and ACID-compliant transactional operations.",
    codeSnippet: "CREATE PROCEDURE dbo.sp_GetPatientSummary @PatientId INT AS BEGIN SELECT * FROM Patients WHERE Id = @PatientId END;"
  }
];
