document.addEventListener("DOMContentLoaded", () => {
  // Register GSAP Plugin
  if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // --- Data: Components ---

  const skillsData = [
    {
      category: "Backend Development",
      icon: "fa-server",
      items: [
        "C#",
        "ASP.NET Core",
        "RESTful API Development",
        "JWT Authentication & Authorization",
        "ADO.NET",
      ],
    },
    {
      category: "Database Management",
      icon: "fa-database",
      items: ["SQL Server", "T-SQL", "Database Design", "Stored Procedures"],
    },
    {
      category: "Desktop Development",
      icon: "fa-desktop",
      items: ["WPF (XAML)", "Windows Forms"],
    },
    {
      category: "Frontend Development",
      icon: "fa-code",
      items: [
        "HTML5",
        "CSS3 (Flexbox & Grid)",
        "JavaScript (ES6+)",
        "TypeScript",
        "Responsive Web Design",
        "GSAP Animations",
      ],
    },
    {
      category: "Tools & Workflow",
      icon: "fa-screwdriver-wrench",
      items: ["Visual Studio", "Git & GitHub", "Chrome DevTools"],
    },
  ];

  const projectsData = [
    {
      title: "Enterprise Inventory System",
      description:
        "A comprehensive Windows Forms application designed for large-scale inventory management. Features real-time tracking, barcode scanning integration, and automated reporting.",
      tech: ["C#", "Windows Forms", "SQL Server", "Clean Code"],
      image: "assets/menu.png", // Example using your file
      icon: "fa-boxes-stacked", // Fallback icon
      imageLabel: "Desktop App Layout",
    },
    {
      title: "Modern E-Commerce Platform",
      description:
        "A full-stack web application with a responsive dashboard, showcasing the power of vanilla JavaScript and clean CSS architecture without relying on heavy frameworks.",
      tech: ["HTML5/CSS3", "Vanilla JS", "REST API", "C# Backend"],
      image: "assets/dentail.png", // Set to "assets/filename.jpg"
      icon: "fa-cart-shopping",
      imageLabel: "Web Dashboard UI",
    },
  ];

  // --- Rendering Logic ---

  function renderSkills() {
    const skillsContainer = document.getElementById("skills-grid");
    if (!skillsContainer) return;

    skillsContainer.innerHTML = skillsData
      .map(
        (skill) => `
            <div class="skill-card">
                <div class="skill-icon"><i class="fa-solid ${skill.icon}"></i></div>
                <h3>${skill.category}</h3>
                <ul class="skill-list">
                    ${skill.items.map((item) => `<li>${item}</li>`).join("")}
                </ul>
            </div>
        `,
      )
      .join("");
  }

  function renderProjects() {
    const projectsContainer = document.getElementById("project-list");
    if (!projectsContainer) return;

    projectsContainer.innerHTML = projectsData
      .map((project, index) => {
        const isReverse = index % 2 !== 0 ? "reverse" : "";

        // Logic: Use image if available, else use icon placeholder
        const visualContent = project.image
          ? `<img src="${project.image}" alt="${project.title}" style="width:100%; height:100%; object-fit:cover;">`
          : `<div class="img-placeholder">
                        <i class="fa-solid ${project.icon}"></i>
                        <span>${project.imageLabel}</span>
                   </div>`;

        return `
            <div class="project-item ${isReverse}">
                <div class="project-content">
                    <span class="project-number">0${index + 1}</span>
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-desc">${project.description}</p>
                    <ul class="project-tech">
                        ${project.tech.map((t) => `<li>${t}</li>`).join("")}
                    </ul>
                </div>
                <div class="project-image">
                    ${visualContent}
                </div>
            </div>
            `;
      })
      .join("");
  }

  // Initialize Content
  renderSkills();
  renderProjects();

  // --- Animations (GSAP) ---

  initAnimations();

  function initAnimations() {
    // Cursor Logic
    const cursorDot = document.getElementById("cursor-dot");
    const cursorOutline = document.getElementById("cursor-outline");

    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("GSAP not loaded");
      return;
    }

    // Hero Animation
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(".hero-greeting", { y: 0, opacity: 1, duration: 1, delay: 0.2 })
      .to(".hero-name", { y: 0, opacity: 1, duration: 1.2 }, "-=0.8")
      .to(".hero-title-wrapper", { y: 0, opacity: 1, duration: 1 }, "-=1")
      .to(".hero-description", { opacity: 1, duration: 1 }, "-=0.5")
      .to(".hero-buttons", { y: 0, opacity: 1, duration: 0.8 }, "-=0.5")
      .to(".scroll-indicator", { opacity: 1, duration: 1 }, "-=0.5");

    // Section Headers
    gsap.utils.toArray(".section-header").forEach((header) => {
      gsap.from(header, {
        scrollTrigger: {
          trigger: header,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      });
    });

    // About Section
    gsap.from(".about-text", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 75%",
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    gsap.from(".profile-img-container", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 75%",
      },
      scale: 0.9,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      ease: "back.out(1.7)",
    });

    // Skills Cards
    const skillCards = document.querySelectorAll(".skill-card");
    if (skillCards.length > 0) {
      // Using fromTo for better control, ensuring they end up visible
      gsap.fromTo(
        skillCards,
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: ".skills-grid",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.7)",
        },
      );
    }

    // Projects
    const projectItems = document.querySelectorAll(".project-item");
    projectItems.forEach((item, i) => {
      const direction = i % 2 === 0 ? -100 : 100;

      const content = item.querySelector(".project-content");
      const image = item.querySelector(".project-image");

      if (content) {
        gsap.fromTo(
          content,
          { x: direction, opacity: 0 },
          {
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
        );
      }

      if (image) {
        gsap.fromTo(
          image,
          { scale: 0.8, opacity: 0 },
          {
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
            },
            scale: 1,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: "power2.out",
          },
        );
      }
    });

    // Contact Form
    gsap.from(".contact-info", {
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 75%",
      },
      x: -50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
  }

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-link");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });

    links.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("active");
      });
    });
  }
});
