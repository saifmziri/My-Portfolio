import type { ExperienceItem } from '../types/portfolio';

export const experiences: ExperienceItem[] = [
  {
    id: "edu-1",
    period: "2024 — 2028",
    role: "Bachelor of Science (BS) in Computer Science",
    company: "University of Duhok",
    location: "Duhok",
    type: "Education",
    summary: "Pursuing a Computer Science degree focused on software engineering principles, algorithm design, relational database modeling, and full-stack application development.",
    achievements: [
      "Studying computer science fundamentals, data structures, object-oriented programming, and relational databases",
      "Developing production-ready web and desktop applications as part of independent and academic software projects",
      "Applying Clean Code standards, SOLID principles, and 3-Tier Architecture across application codebases",
      "Participating in technical development across C#, .NET, React, Laravel, and SQL database platforms"
    ],
    technologies: ["C#", ".NET", "SQL Server", "React", "TypeScript", "Laravel", "PostgreSQL"],
    highlightMetric: "BS Computer Science"
  },
  {
    id: "cert-1",
    period: "2024 — PRESENT",
    role: "Comprehensive .NET Developer Roadmap (24+ Certificates)",
    company: "Programming Advices",
    location: "Online / Self-Paced",
    type: "Contract",
    summary: "Completed an intensive 24+ certificate software engineering roadmap mastering the Microsoft .NET ecosystem, SQL database engineering, desktop development, and web technologies.",
    achievements: [
      "Mastered .NET Backend Development: ASP.NET Core Web API, Entity Framework Core, JWT Authentication, RESTful APIs",
      "Engineered Relational Databases: Microsoft SQL Server, T-SQL, Stored Procedures, Transactions, Indexing",
      "Built Desktop & Web Applications: WPF, WinForms, HTML5, CSS3, JavaScript, TypeScript, React, Vite, Tailwind CSS",
      "Applied Core Software Engineering: OOP, SOLID Principles, 3-Tier Architecture, Clean Code, Design Patterns"
    ],
    technologies: ["C#", "ASP.NET Core", "EF Core", "SQL Server", "T-SQL", "WPF", "WinForms", "React", "TypeScript"],
    highlightMetric: "24+ .NET Certificates"
  }
];
