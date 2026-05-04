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
        "Entity Framework",
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
      items: ["HTML", "CSS", "JavaScript", "TypeScript"],
    },
  ];

  const projectsData = [
    {
      title: "Wandly – Premium Digital Menu System",
      description:
        "A sophisticated digital ecosystem built for restaurants and dessert shops. Combines a luxury brand showcase website with a fully dynamic multi-language digital menu system and secure admin dashboard. Features real-time content management, theme customization (Light/Dark), RTL/LTR internationalization, and Supabase-powered backend integration.",
      tech: [
        "HTML5",
        "CSS3",
        "JavaScript (ES6+)",
        "Supabase",
        "Responsive Design",
      ],
      image: "assets/menu.png",
      icon: "fa-utensils",
      imageLabel: "Digital Menu & Admin Dashboard",
    },
    {
      title: "ClinicDentail Management System",
      description:
        "A comprehensive Clinical Dental Management System designed to streamline operations, enhance patient care, and provide advanced financial tracking. Built with ASP.NET Core Web API and a modern Vanilla JavaScript frontend, featuring appointment scheduling, treatment management, PDF reporting, and a secure role-based admin dashboard.",
      tech: [
        "ASP.NET Core Web API",
        "C#",
        "SQL Server",
        "HTML5/CSS3",
        "Vanilla JS (ES Modules)",
        "RESTful API",
      ],
      image: "assets/dentail.png",
      icon: "fa-tooth",
      imageLabel: "Clinic Dashboard & Reporting System",
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
      duration: 2,
      ease: "power2.out",
    });

    gsap.from(".profile-img-container", {
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 75%",
      },
      scale: 0.9,
      opacity: 0,
      duration: 2,
      delay: 0.4,
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
      duration: 3,
      ease: "power2.out",
    });
  }

  // --- Mobile Menu Toggle & Premium Smooth Scrolling ---
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const allLinks = document.querySelectorAll("a[href^='#']");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // Smooth Scrolling Logic
  allLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#" || !targetId) return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 90; // Adjust for fixed navbar
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        // Custom duration (in ms) - higher is smoother/slower
        smoothScroll(offsetPosition, 1200);
      }

      // Automatically close mobile menu after clicking a link
      if (navLinks && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        if (hamburger) hamburger.classList.remove("active");
      }
    });
  });

  // --- Professional Dynamic Particle Background ---
  function initParticles() {
    const canvas = document.getElementById("bg-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width, height, particles;

    // Mouse interaction properties
    let mouse = {
      x: null,
      y: null,
      radius: 120,
    };

    window.addEventListener("mousemove", function (event) {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    });

    window.addEventListener("mouseout", function () {
      mouse.x = null;
      mouse.y = null;
    });

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    }

    class Particle {
      constructor(x, y, dx, dy, size, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 20 + 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // Check bounds to bounce
        if (this.x > width || this.x < 0) this.dx = -this.dx;
        if (this.y > height || this.y < 0) this.dy = -this.dy;

        // Move particle
        this.x += this.dx;
        this.y += this.dy;

        // Mouse interaction: push away slightly for a cool interactive feel
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const maxDistance = mouse.radius;
            const force = (maxDistance - distance) / maxDistance;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;
            this.x -= directionX;
            this.y -= directionY;
          }
        }
        this.draw();
      }
    }

    function init() {
      particles = [];
      // Calculate a balanced number of particles based on screen size
      let numberOfParticles = Math.floor((width * height) / 10000);
      // limit on huge screens
      if (numberOfParticles > 200) numberOfParticles = 200;

      for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 2 + 0.5;
        let x = Math.random() * width;
        let y = Math.random() * height;
        let dx = (Math.random() - 0.5) * 0.8;
        let dy = (Math.random() - 0.5) * 0.8;
        let color = "rgba(56, 189, 248, 0.6)"; // Accent sky blue
        particles.push(new Particle(x, y, dx, dy, size, color));
      }
    }

    function animate() {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
    }

    function connect() {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let dx = particles[a].x - particles[b].x;
          let dy = particles[a].y - particles[b].y;
          let distance = dx * dx + dy * dy;

          // If particles are close enough, draw a line between them
          if (distance < 15000) {
            let opacity = 1 - distance / 15000;
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.4})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    }

    window.addEventListener("resize", resize);
    resize();
    animate();
  }

  initParticles();

  // Custom Premium Smooth Scroll Function
  function smoothScroll(targetPosition, duration) {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Easing function (easeOutQuart for a luxurious slow-down effect)
    function ease(t, b, c, d) {
      t /= d;
      t--;
      return -c * (t * t * t * t - 1) + b;
    }

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      } else {
        window.scrollTo(0, targetPosition); // Snap to exact end
      }
    }

    requestAnimationFrame(animation);
  }
});
