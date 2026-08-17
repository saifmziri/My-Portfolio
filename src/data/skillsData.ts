import type { SkillCategory } from '../types/portfolio';

export const skillCategories: SkillCategory[] = [
  {
    id: "backend-desktop",
    name: "Backend & Desktop",
    description: "Building robust server-side Web APIs, business logic services, and desktop applications.",
    skills: [
      { id: "csharp", name: "C#", icon: "csharp" },
      { id: "dotnet", name: ".NET Core", icon: "dotnet" },
      { id: "aspnet", name: "ASP.NET Web API", icon: "aspnet" },
      { id: "efcore", name: "Entity Framework Core", icon: "efcore" },
      { id: "adonet", name: "ADO.NET", icon: "adonet" },
      { id: "laravel", name: "Laravel", icon: "laravel" },
      { id: "wpf", name: "WPF", icon: "wpf" },
      { id: "winforms", name: "WinForms", icon: "winforms" }
    ]
  },
  {
    id: "web-frontend",
    name: "Web & Frontend",
    description: "Developing reactive, responsive, and dynamic user interfaces for web applications.",
    skills: [
      { id: "html5", name: "HTML5", icon: "html5" },
      { id: "css3", name: "CSS3", icon: "css3" },
      { id: "javascript", name: "JavaScript", icon: "javascript" },
      { id: "typescript", name: "TypeScript", icon: "typescript" },
      { id: "react", name: "React", icon: "react" },
      { id: "vite", name: "Vite", icon: "vite" },
      { id: "tailwindcss", name: "Tailwind CSS", icon: "tailwindcss" },
      { id: "bootstrap", name: "Bootstrap", icon: "bootstrap" }
    ]
  },
  {
    id: "databases",
    name: "Databases",
    description: "Relational database schema modeling, query tuning, stored procedures, and cloud DB services.",
    skills: [
      { id: "mssql", name: "Microsoft SQL Server", icon: "mssql" },
      { id: "tsql", name: "T-SQL", icon: "tsql" },
      { id: "postgresql", name: "PostgreSQL", icon: "postgresql" },
      { id: "supabase", name: "Supabase", icon: "supabase" }
    ]
  },
  {
    id: "software-engineering",
    name: "Software Engineering & Core Concepts",
    description: "Fundamental architectural design patterns, clean code principles, and secure API protocols.",
    skills: [
      { id: "oop", name: "OOP", icon: "oop" },
      { id: "solid", name: "SOLID Principles", icon: "solid" },
      { id: "cleancode", name: "Clean Code", icon: "cleancode" },
      { id: "cleanarch", name: "Clean Architecture", icon: "cleanarch" },
      { id: "threetier", name: "3-Tier Architecture", icon: "threetier" },
      { id: "jwt", name: "JWT Authentication", icon: "jwt" }
    ]
  }
];