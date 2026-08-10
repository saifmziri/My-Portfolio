import type { SkillCategory } from '../types/portfolio';

export const skillCategories: SkillCategory[] = [
  {
    id: "backend-desktop",
    name: "Backend & Desktop",
    description: "Building robust server-side Web APIs, business logic services, and desktop applications.",
    skills: [
      { name: "C#", level: 94, tag: "Language", yearsOfExp: "Core", highlight: "Object-Oriented Programming, LINQ, Async/Await" },
      { name: ".NET Core", level: 92, tag: "Framework", yearsOfExp: "Core", highlight: "Cross-Platform Runtime, Dependency Injection, Middleware" },
      { name: "ASP.NET Web API", level: 92, tag: "Web API", yearsOfExp: "Core", highlight: "RESTful Endpoints, Controllers, Routing, Error Handling" },
      { name: "Entity Framework Core", level: 90, tag: "ORM", yearsOfExp: "Core", highlight: "Code-First Migrations, DbContext, LINQ Queries" },
      { name: "ADO.NET", level: 88, tag: "Data Access", yearsOfExp: "Core", highlight: "SqlConnection, SqlCommand, DataReader, Datasets" },
      { name: "Laravel", level: 88, tag: "PHP Framework", yearsOfExp: "Core", highlight: "Eloquent ORM, Sanctum Auth, Blade, Service Layer" },
      { name: "WPF", level: 86, tag: "Desktop UI", yearsOfExp: "Desktop", highlight: "XAML Layouts, Data Binding, MVVM Pattern" },
      { name: "WinForms", level: 88, tag: "Desktop UI", yearsOfExp: "Desktop", highlight: "Event-Driven Windows Applications, Custom Controls" }
    ]
  },
  {
    id: "web-frontend",
    name: "Web & Frontend",
    description: "Developing reactive, responsive, and dynamic user interfaces for web applications.",
    skills: [
      { name: "HTML5", level: 96, tag: "Markup", yearsOfExp: "Web", highlight: "Semantic Structure, Accessibility, Forms" },
      { name: "CSS3", level: 92, tag: "Styling", yearsOfExp: "Web", highlight: "Flexbox, Grid, Responsive Layouts, Animations" },
      { name: "JavaScript", level: 94, tag: "Language", yearsOfExp: "Web", highlight: "ES6+, DOM Manipulation, Async Fetch, Promises" },
      { name: "TypeScript", level: 92, tag: "Type Safety", yearsOfExp: "Web", highlight: "Strict Interfaces, Type Definitions, Generics" },
      { name: "React", level: 94, tag: "Frontend Library", yearsOfExp: "Web", highlight: "Component Architecture, Custom Hooks, State Management" },
      { name: "Vite", level: 90, tag: "Build Tool", yearsOfExp: "Tooling", highlight: "Fast HMR, ES Modules, Optimized Production Bundles" },
      { name: "Tailwind CSS", level: 92, tag: "Utility CSS", yearsOfExp: "Styling", highlight: "Custom Tokens, Responsive Utility Classes, Dark Mode" }
    ]
  },
  {
    id: "databases",
    name: "Databases",
    description: "Relational database schema modeling, query tuning, stored procedures, and cloud DB services.",
    skills: [
      { name: "Microsoft SQL Server", level: 94, tag: "RDBMS", yearsOfExp: "Database", highlight: "Relational Schema Design, Foreign Keys, Indexing" },
      { name: "T-SQL", level: 92, tag: "SQL Dialect", yearsOfExp: "Database", highlight: "Stored Procedures, Triggers, Views, Query Optimization" },
      { name: "PostgreSQL", level: 88, tag: "RDBMS", yearsOfExp: "Database", highlight: "Relational Constraints, Complex Joins, JSONB Storage" },
      { name: "Supabase", level: 86, tag: "BaaS / DB", yearsOfExp: "Cloud DB", highlight: "PostgreSQL Hosting, Real-time Sync, Row Level Security" }
    ]
  },
  {
    id: "software-engineering",
    name: "Software Engineering & Core Concepts",
    description: "Fundamental architectural design patterns, clean code principles, and secure API protocols.",
    skills: [
      { name: "OOP", level: 96, tag: "Paradigm", yearsOfExp: "Core", highlight: "Encapsulation, Inheritance, Polymorphism, Abstraction" },
      { name: "SOLID Principles", level: 94, tag: "Architecture", yearsOfExp: "Core", highlight: "Single Responsibility, Open/Closed, Dependency Inversion" },
      { name: "Clean Code", level: 95, tag: "Best Practices", yearsOfExp: "Core", highlight: "Readable Code, Self-Documenting Methods, Refactoring" },
      { name: "3-Tier Architecture", level: 92, tag: "System Design", yearsOfExp: "Core", highlight: "Presentation, Business Logic (BLL), Data Access Layer (DAL)" },
      { name: "JWT Authentication", level: 90, tag: "Security", yearsOfExp: "Security", highlight: "Token Signing, Claims-Based Auth, Refresh Tokens" },
      { name: "RESTful APIs", level: 95, tag: "API Standards", yearsOfExp: "Core", highlight: "HTTP Verbs, Status Codes, JSON Serialization, Versioning" }
    ]
  }
];
