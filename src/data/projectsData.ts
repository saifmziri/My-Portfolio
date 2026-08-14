import type { Project } from '../types/portfolio';

// Custom SVG graphic data URIs for dark editorial software architecture preview frames
const generateProjectMockup = (title: string, accentColor: string, pattern: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750" fill="none">
    <rect width="1200" height="750" fill="#0D0E12"/>
    <defs>
      <pattern id="grid_${pattern}" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" stroke-opacity="0.04" stroke-width="1"/>
      </pattern>
      <radialGradient id="glow_${pattern}" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.25"/>
        <stop offset="100%" stop-color="#0D0E12" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1200" height="750" fill="url(#grid_${pattern})"/>
    <rect width="1200" height="750" fill="url(#glow_${pattern})"/>

    <!-- Software Window Frame -->
    <rect x="80" y="80" width="1040" height="590" rx="12" fill="#14151C" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1.5"/>
    <rect x="80" y="80" width="1040" height="50" rx="12" fill="#1B1D28"/>
    <circle cx="120" cy="105" r="6" fill="#FF5F56"/>
    <circle cx="140" cy="105" r="6" fill="#FFBD2E"/>
    <circle cx="160" cy="105" r="6" fill="#27C93F"/>
    <rect x="200" y="93" width="360" height="24" rx="4" fill="#0D0E12" fill-opacity="0.5"/>
    <text x="212" y="109" font-family="monospace" font-size="12" fill="#8E93A6">${title.toLowerCase().replace(/\s+/g, '-')}.app/v1.0</text>

    <!-- Code & Architecture Diagram Layout -->
    <rect x="120" y="160" width="300" height="470" rx="8" fill="#1B1D27" stroke="#FFFFFF" stroke-opacity="0.05"/>
    <rect x="440" y="160" width="640" height="280" rx="8" fill="#1B1D27" stroke="#FFFFFF" stroke-opacity="0.05"/>
    <rect x="440" y="460" width="300" height="170" rx="8" fill="#1B1D27" stroke="#FFFFFF" stroke-opacity="0.05"/>
    <rect x="760" y="460" width="320" height="170" rx="8" fill="#1B1D27" stroke="#FFFFFF" stroke-opacity="0.05"/>

    <path d="M 460 260 H 1040 M 460 320 H 900 M 460 380 H 980" stroke="${accentColor}" stroke-opacity="0.4" stroke-width="2" stroke-dasharray="8 8"/>
    <circle cx="460" cy="260" r="5" fill="${accentColor}"/>
    <circle cx="1040" cy="260" r="5" fill="${accentColor}"/>

    <text x="460" y="210" font-family="sans-serif" font-weight="700" font-size="26" fill="#FFFFFF">${title}</text>
    <text x="460" y="235" font-family="monospace" font-size="13" fill="#8E93A6">REAL-WORLD APPLICATION &amp; BACKEND ARCHITECTURE</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

export const projects: Project[] = [
  {
    id: "taskflow",
    number: "01",
    title: "TaskFlow System",
    subtitle: "Project & Task Management Platform",
    tagline: "A scalable full-stack Project & Task Management System designed for business operations.",
    description: "Built with a secure RESTful Laravel backend and React frontend. Features role-based authorization, Service Layer architecture, and a responsive task dashboard.",
    extendedDescription: "TaskFlow is an enterprise-ready management platform engineered with a strict Service Layer architecture. The backend uses Laravel with Sanctum authentication, email verification, and password recovery, serving a component-based React & TypeScript dashboard with search and filtering.",
    category: "Full-Stack Web",
    featured: true,
    technologies: ["Laravel", "React", "TypeScript", "Tailwind CSS", "Laravel Sanctum", "REST API"],
    image: "/projects/taskflow.png",
    githubFrontend: "https://github.com/saifmziri/Task-Project-Management-System-Frontend",
    githubBackend: "https://github.com/saifmziri/Task-Project-Management-System-API",
    linkedinPost: "https://www.linkedin.com/posts/saefmziri_laravel-reactjs-tailwindcss-ugcPost-7491581009075957760-C7Iy",
    metrics: [
      { label: "Status", value: "In Development" },
      { label: "Role", value: "Full-Stack Dev" },
      { label: "Architecture", value: "Service Layer" }
    ],
    features: [
      "Laravel Sanctum token authentication with email verification & recovery",
      "Role-based authorization and permission rules for projects and tasks",
      "React + TypeScript responsive dashboard with reusable component layout",
      "Full CRUD operations with real-time search, filtering, and API validation"
    ],
    architectureHighlights: [
      "Decoupled Service Layer isolating business rules from API controllers",
      "Centralized error handling middleware delivering structured API responses",
      "Type-safe React client consuming validated RESTful endpoints"
    ]
  },
  {
    id: "dental-clinic",
    number: "02",
    title: "Dental Clinic System",
    subtitle: "Dental Clinic Management & Financial Suite",
    tagline: "A full-stack clinic system managing patient records, visit summaries, and income reporting.",
    description: "Designed for real-world clinic operations. Built with .NET, RESTful APIs, Microsoft SQL Server, ADO.NET, and T-SQL for complete data integrity.",
    extendedDescription: "The Dental Clinic Management System streamlines clinic operations. It provides end-to-end patient record handling, visit summaries, and automated financial performance reporting with high-throughput T-SQL database procedures.",
    category: "Full-Stack Web",
    featured: true,
    technologies: [".NET", "C#", "RESTful API", "SQL Server", "ADO.NET", "T-SQL", "JavaScript"],
    image: "/projects/dental-clinic.png",
    linkedinPost: "https://www.linkedin.com/posts/saefmziri_dotnet-csharp-adonet-ugcPost-7494078186289451008-cQZF",
    metrics: [
      { label: "Status", value: "Production-Ready" },
      { label: "Role", value: "Full-Stack Dev" },
      { label: "Data Access", value: "ADO.NET & T-SQL" }
    ],
    features: [
      "Complete patient record management with clinical history tracking",
      "Financial income and performance report generation for clinic management",
      "Visit summary documentation and prescription details management",
      "Data integrity enforcement via transactional SQL procedures"
    ],
    architectureHighlights: [
      "Raw ADO.NET data pipelines executing parameterized T-SQL procedures",
      ".NET RESTful API backend handling business logic and request routing",
      "Normalized SQL Server relational database design"
    ]
  },
  {
    id: "institute-management",
    number: "03",
    title: "Institute System",
    subtitle: "Desktop Management & Enrollment Platform",
    tagline: "A WPF & C# desktop system managing institute operations, schedules, and payments.",
    description: "Engineered for educational institutes. Features WPF user interfaces, SQL Server database backends, payment tracking, and reporting services.",
    extendedDescription: "Developed for comprehensive institute administration. Handles student registrations, course schedules, enrollment tracking, and student fee payment history with WPF data bindings and optimized T-SQL queries.",
    category: "Desktop Application",
    featured: true,
    technologies: ["WPF", "C#", "SQL Server", "ADO.NET", "T-SQL", "RESTful API"],
    image: "/projects/IMS.png",
    metrics: [
      { label: "Status", value: "Production-Ready" },
      { label: "Role", value: "Backend & DB Dev" },
      { label: "UI Framework", value: "WPF & C#" }
    ],
    features: [
      "Student record and course enrollment management modules",
      "Course schedule creation and conflict prevention logic",
      "Student payment tracking and transaction history logging",
      "SQL Server Reporting Services for institute performance analytics"
    ],
    architectureHighlights: [
      "WPF XAML layouts with C# backend service separation",
      "T-SQL database query optimization for fast record retrieval",
      "Structured ADO.NET database access layer"
    ]
  },
  {
    id: "online-menu",
    number: "04",
    title: "Online Menu Platform",
    subtitle: "Multi-Lingual Dynamic Menu & Admin Portal",
    tagline: "Dynamic online menu platform with real-time Supabase/PostgreSQL admin management.",
    description: "Features a full-featured Admin Dashboard for real-time CRUD operations and multi-language support in English, Arabic, and Kurdish.",
    extendedDescription: "Built for modern restaurant digital presence. The dynamic frontend consumes Supabase PostgreSQL data with real-time updates, allowing restaurant owners to manage items, categories, and prices instantly in 3 languages.",
    category: "Full-Stack Web",
    featured: true,
    technologies: ["React", "JavaScript", "Supabase", "PostgreSQL", "Tailwind CSS", "HTML/CSS"],
    image: "/projects/Menu.png",
    live: "https://wandly-menu.pages.dev/menu/#",
    metrics: [
      { label: "Status", value: "Production-Ready" },
      { label: "Role", value: "Full-Stack Dev" },
      { label: "Languages", value: "EN / AR / KU" }
    ],
    features: [
      "Full-featured Admin Dashboard for real-time menu management",
      "Multi-language switcher supporting English, Arabic, and Kurdish",
      "Instant item price, description, and category CRUD updates",
      "Responsive mobile-first layout for dining customers"
    ],
    architectureHighlights: [
      "Supabase real-time subscription sync with PostgreSQL backend",
      "Dynamic localization framework supporting RTL and LTR scripts",
      "Clean component structure with Tailwind utility styling"
    ]
  },
  {
    id: "gym-system",
    number: "05",
    title: "Gym Management",
    subtitle: "Multi-Lingual Operations & Membership System",
    tagline: "Full-stack management system for gym memberships, packages, trainers, and discounts.",
    description: "Built with ASP.NET RESTful API, EF Core, SQL Server, TypeScript, Vite, and React. Features multi-lingual support and reporting.",
    extendedDescription: "A comprehensive solution for fitness centers. Manages member enrollments, subscription package durations, trainer assignments, promotional discount logic, and daily financial reporting across English, Arabic, and Kurdish languages.",
    category: "Full-Stack Web",
    featured: false,
    technologies: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server", "TypeScript", "Vite", "React"],
     image: "/projects/gym1.png",
      images: [
    "/projects/gym1.png",
    "/projects/gym2.png",
    "/projects/gym3.png",
    "/projects/gym4.png",
    "/projects/gym5.png",
    "/projects/gym6.png"
  ],
     metrics: [ 
      { label: "Status", value: "In Development" },
      { label: "Role", value: "Full-Stack Dev" },
      { label: "Backend", value: "ASP.NET & EF Core" }
    ],
    features: [
      "Member profile, membership package, and expiration tracking",
      "Trainer scheduling and discount promotion code processing",
      "Multi-language user interface (English, Arabic, Kurdish)",
      "Secure authentication and automated revenue reporting"
    ],
    architectureHighlights: [
      "ASP.NET Core Web API with Entity Framework Core data mapping",
      "TypeScript + Vite client architecture for fast rendering",
      "Relational SQL Server database with transactional integrity"
    ]
  },
  {
    id: "dvld-system",
    number: "06",
    title: "DVLD Licensing System",
    subtitle: "3-Tier Architecture Licensing Application",
    tagline: "Comprehensive Windows Forms application managing driver licenses, tests, and renewals.",
    description: "Developed as an intensive academic project to master 3-Tier Architecture, WinForms, C#, SQL Server, and complex business workflows.",
    extendedDescription: "The Driving & Vehicle Licensing Department (DVLD) System handles driver profile creation, license application tracking, multi-stage testing (Vision, Written, Practical), license renewals, international license issuing, and expiration tracking.",
    category: "Desktop Application",
    featured: false,
    technologies: ["C#", "WinForms", "SQL Server", "T-SQL", "3-Tier Architecture"],
    image: generateProjectMockup("DVLD Licensing System", "#EC4899", "p6"),
    instagramPost: "https://www.instagram.com/p/DM6K8uxIpr0RCboZa-sGb8dUPVMoeDCxJZwg780/",
    metrics: [
      { label: "Status", value: "Academic Project" },
      { label: "Role", value: ".NET Developer" },
      { label: "Pattern", value: "3-Tier (DAL/BLL/UI)" }
    ],
    features: [
      "Multi-stage test management (Vision, Written, Practical test passes)",
      "Driver license renewal, replacement, and international license issuing",
      "License expiration tracking and automated penalty validation",
      "User profile management and comprehensive audit trails"
    ],
    architectureHighlights: [
      "Strict 3-Tier Architecture (Data Access Layer, Business Logic Layer, UI)",
      "Stored procedures and complex T-SQL join queries in SQL Server",
      "Input data validation and custom WinForms controls"
    ]
  },
  {
    id: "bank-system",
    number: "07",
    title: "Bank Management System",
    subtitle: "Core Financial Operations & RBAC Auditing",
    tagline: "Windows Forms banking application built with C# and SQL Server for financial transactions.",
    description: "Features Role-Based Access Control, client account management, money transfers, activity logging, and transaction auditing.",
    extendedDescription: "A banking operations system handling financial client accounts, balance deposits/withdrawals, internal money transfers, administrator permissions, and detailed transaction audit logs.",
    category: "Desktop Application",
    featured: false,
    technologies: ["C#", "WinForms", "SQL Server", "T-SQL", "RBAC"],
    image: generateProjectMockup("Bank Management System", "#14B8A6", "p7"),
    linkedinPost:"https://www.linkedin.com/posts/saefmziri_csharp-tsql-sqlserver-activity-7369091075967176705-3gNm?utm_source=share&utm_medium=member_desktop&rcm=ACoAAF3O778BJOwLKpBGDVCGXz5RXhXo5AvDIig",
    metrics: [
      { label: "Status", value: "Academic Project" },
      { label: "Role", value: ".NET Developer" },
      { label: "Security", value: "RBAC & Auditing" }
    ],
    features: [
      "Client account management with account balance tracking",
      "Financial transaction processing (deposits, withdrawals, transfers)",
      "Role-Based Access Control (RBAC) with granular admin permissions",
      "System activity logging and transaction audit records"
    ],
    architectureHighlights: [
      "SQL Server database transactions ensuring financial data safety",
      "Clean C# desktop business logic layer",
      "T-SQL data access scripts executing within transaction blocks"
    ]
  }
];
