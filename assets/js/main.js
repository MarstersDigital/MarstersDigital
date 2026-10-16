/* ============================================================
   Marsters Digital — Main JavaScript Engine
   Features: 3D Website Globe, Multi-Row Showcase, Interactive
   Full-Page Preview Modal, Free Design Intake Form & Cloudflare API
   ============================================================ */

(function () {
  "use strict";

  /* ============================================================
     CONFIG & PORTFOLIO DATA (8 SITES × 3 SCREENSHOTS)
     ============================================================ */
  // Dedicated WhatsApp mobile contact number (change here anytime)
  var WHATSAPP_NUMBER = "447528137987";

  var CONFIG = {
    email: "info@marstersdigital.com",
    apiEndpoint: "/api/contact"
  };

  /**
   * Centralised 8-Item Portfolio Array (Strictly 8 genuine project examples — no duplicates)
   * CRITICAL BUSINESS RULE:
   * Only Harrogate Jagwar Specialists and Ellavate Dogs may display liveUrl.
   * All other bespoke industry designs must set liveUrl: null.
   */
  var PORTFOLIO_ITEMS = [
    {
      id: "harrogate-jagwar",
      name: "Harrogate Jagwar Specialists",
      industry: "Jaguar & Land Rover Specialist • Harrogate",
      description: "Premium workshop website with custom service menus, instant booking, and mobile-optimised conversion paths.",
      heroImg: "assets/portfolio/harrogatejagwar.co.uk-hero.png",
      fullImg: "assets/portfolio/harrogatejagwar.co.uk-full.png",
      mobileImg: "assets/portfolio/harrogatejagwar.co.uk-mobile.png",
      liveUrl: "https://harrogatejagwar.co.uk",
      displayUrl: "https://harrogatejagwar.co.uk",
      tags: ["Custom Design", "Super-Fast Mobile", "Google Friendly", "Live Client"]
    },
    {
      id: "ellavate-dogs",
      name: "Ellavate Dogs",
      industry: "Canine Training & Behaviour • Newcastle",
      description: "Modern, welcoming website built for a premier dog trainer. Clean service packages and seamless mobile enquiry flows.",
      heroImg: "assets/portfolio/ellavatedogs.com-hero.png",
      fullImg: "assets/portfolio/ellavatedogs.com-full.png",
      mobileImg: "assets/portfolio/ellavatedogs.com-mobile.png",
      liveUrl: "https://ellavatedogs.com",
      displayUrl: "https://ellavatedogs.com",
      tags: ["Custom Design", "Clean & Easy to Browse", "Simple Enquiries", "Live Client"]
    },
    {
      id: "established-home-improvements",
      name: "Established Home Improvements",
      industry: "Windows, Doors & Living Spaces • Yorkshire",
      description: "Clean architectural portfolio showcase with before & after gallery, instant quote funnels, and high-trust accreditation badges.",
      heroImg: "assets/portfolio/established-home-improvements-hero.png",
      fullImg: "assets/portfolio/established-home-improvements-full.png",
      mobileImg: "assets/portfolio/Established-Home-Improvements-mobile.png",
      liveUrl: null,
      displayUrl: "https://establishedhomeimprovements.co.uk (Design)",
      tags: ["High-Converting Quotes", "Project Gallery", "Mobile First"]
    },
    {
      id: "fliss-and-ivy",
      name: "Fliss & Ivy Floral Design",
      industry: "Bespoke Floristry & Botanical Styling • Yorkshire",
      description: "Editorial-grade floral studio design showcasing wedding installations, seasonal collections, and bespoke booking funnels.",
      heroImg: "assets/portfolio/fliss-&-ivy-hero.png",
      fullImg: "assets/portfolio/fliss-&-ivy-full.png",
      mobileImg: "assets/portfolio/fliss-&-ivy-mobile.png",
      liveUrl: null,
      displayUrl: "https://flissandivy.co.uk (Design)",
      tags: ["Editorial Aesthetic", "Wedding Booking Funnel", "High Res Media"]
    },
    {
      id: "halo-hair-design",
      name: "Halo Hair Design",
      industry: "Hair Salon & Creative Colour Studio • Yorkshire",
      description: "Chic, minimalist boutique salon experience featuring stylist portfolios, clear service menus, and integrated appointment requests.",
      heroImg: "assets/portfolio/halo-hair-design-hero.png",
      fullImg: "assets/portfolio/halo-hair-design-full.png",
      mobileImg: "assets/portfolio/halo-hair-design-mobile.png",
      liveUrl: null,
      displayUrl: "https://halohairdesign.co.uk (Design)",
      tags: ["Boutique Aesthetic", "Service Menu", "Fast Booking"]
    },
    {
      id: "skyrise-contractors",
      name: "Skyrise Contractors Ltd",
      industry: "Commercial Roofing & Industrial Cladding • UK",
      description: "Industrial-strength contracting website built to convert commercial tenders, featuring case studies and fast RFQ forms.",
      heroImg: "assets/portfolio/skyrise-contractors-hero.png",
      fullImg: "assets/portfolio/skyrise-contractors-full.png",
      mobileImg: "assets/portfolio/skyrise-contractors-mobile.png",
      liveUrl: null,
      displayUrl: "https://skyrisecontractors.co.uk (Design)",
      tags: ["Commercial Tender Ready", "Safety Accreditations", "Instant RFQ"]
    },
    {
      id: "the-eden-pack",
      name: "The Eden Pack",
      industry: "Countryside Pack Adventures & Pet Photography • London",
      description: "Exclusive canine sanctuary website showcasing structured countryside pack adventures, intentional pet care, and timeless pet photography.",
      heroImg: "assets/portfolio/the-eden-pack-hero.png",
      fullImg: "assets/portfolio/the-eden-pack-full.png",
      mobileImg: "assets/portfolio/the-eden-pack-mobile.png",
      liveUrl: null,
      displayUrl: "https://theedenpack.co.uk (Design)",
      tags: ["Pack Adventures", "Pet Photography", "Canine Sanctuary"]
    },
    {
      id: "the-hive-property-group",
      name: "The Hive Property Group",
      industry: "Bespoke Kitchens & Luxury Bathrooms • Harrogate",
      description: "High-end residential renovation showcase featuring bespoke kitchen design, luxury wet rooms, before/after project sliders, and instant quote funnels.",
      heroImg: "assets/portfolio/the-hive-property-group-hero.png",
      fullImg: "assets/portfolio/the-hive-property-group-full.png",
      mobileImg: "assets/portfolio/the-hive-property-group-mobile.png",
      liveUrl: null,
      displayUrl: "https://thehivepropertygroup.co.uk (Design)",
      tags: ["Bespoke Kitchens", "Luxury Bathrooms", "Transformation Sliders"]
    }
  ];

  // Expose portfolio items globally for inline scripts or debugging if needed
  window.PORTFOLIO_ITEMS = PORTFOLIO_ITEMS;

  /* ============================================================
     DOM INITIALISATION
     ============================================================ */
  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initReveal();
    initYear();
    init3DGlobe();
    initMarqueeShowcase();
    initPreviewModal();
    initConceptModal();
    initContactForm();
    initFaqAccordion();
    initContactDock();
  });

  /* ============================================================
     MOBILE NAVIGATION
     ============================================================ */
  function initNav() {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.innerHTML = open
        ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>'
        : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>';
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ============================================================
     SCROLL REVEAL OBSERVER
     ============================================================ */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ============================================================
     FOOTER COPYRIGHT YEAR
     ============================================================ */
  function initYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ============================================================
     FEATURE 2: INTERACTIVE 3D DRAGGABLE GLOBE
     ============================================================ */
  function init3DGlobe() {
    var wrap = document.getElementById("heroGlobeWrap");
    var sphere = document.getElementById("heroGlobeSphere");
    if (!wrap || !sphere) return;

    function getRadius() {
      var w = window.innerWidth;
      if (w <= 480) return 135;
      if (w <= 768) return 165;
      return 205;
    }
    var radius = getRadius();

    /**
     * Staggered 2-Ring Antiprism Layout:
     * - Upper Ring (4 tiles at el = +20°): az = 0°, 90°, 180°, 270°
     * - Lower Ring (4 tiles at el = -20°, staggered 45°): az = 45°, 135°, 225°, 315°
     * Guarantees:
     * 1. Exactly 8 tiles for the 8 genuine projects — zero duplicates.
     * 2. Harmonious spacing with compact ~30px gaps between neighboring cards.
     */
    var tileCoords = [
      // Upper ring (el = +20°)
      { az: 0, el: 20, item: PORTFOLIO_ITEMS[0] },   // Harrogate Jagwar Specialists
      { az: 90, el: 20, item: PORTFOLIO_ITEMS[2] },  // Established Home Improvements
      { az: 180, el: 20, item: PORTFOLIO_ITEMS[4] }, // Halo Hair Design
      { az: 270, el: 20, item: PORTFOLIO_ITEMS[6] }, // The Eden Pack
      // Lower ring (el = -20°, staggered 45°)
      { az: 45, el: -20, item: PORTFOLIO_ITEMS[1] },  // Ellavate Dogs
      { az: 135, el: -20, item: PORTFOLIO_ITEMS[3] }, // Fliss & Ivy Floral Design
      { az: 225, el: -20, item: PORTFOLIO_ITEMS[5] }, // Skyrise Contractors Ltd
      { az: 315, el: -20, item: PORTFOLIO_ITEMS[7] }  // The Hive Property Group
    ];

    var tiles = [];
    tileCoords.forEach(function (coord) {
      var item = coord.item;
      var tileEl = document.createElement("div");
      tileEl.className = "globe-tile";
      tileEl.dataset.projectId = item.id;
      tileEl.setAttribute("title", item.name + " (" + item.industry + ")");

      tileEl.style.transform = "rotateY(" + coord.az + "deg) rotateX(" + (-coord.el) + "deg) translateZ(" + radius + "px)";

      var img = document.createElement("img");
      img.src = item.heroImg;
      img.alt = item.name + " preview";
      img.loading = "eager";
      tileEl.appendChild(img);

      sphere.appendChild(tileEl);
      tiles.push({ el: tileEl, coord: coord });
    });

    // Dynamic resize handler for radius
    window.addEventListener("resize", function () {
      radius = getRadius();
      tiles.forEach(function (t) {
        t.el.style.transform = "rotateY(" + t.coord.az + "deg) rotateX(" + (-t.coord.el) + "deg) translateZ(" + radius + "px)";
      });
    });

    // 3D Rotation & Physics
    var rotX = -12;
    var rotY = 25;
    var velX = 0;
    var velY = 0.18; // gentle auto-rotation speed
    var isDragging = false;
    var startX = 0;
    var startY = 0;
    var dragMoved = false;
    var lastX = 0;
    var lastY = 0;

    function applyTransform() {
      sphere.style.transform = "rotateX(" + rotX.toFixed(2) + "deg) rotateY(" + rotY.toFixed(2) + "deg)";
    }
    applyTransform();

    function onPointerDown(e) {
      isDragging = true;
      dragMoved = false;
      wrap.classList.add("is-dragging");
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;
      startX = clientX;
      startY = clientY;
      lastX = clientX;
      lastY = clientY;
      velX = 0;
      velY = 0;
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      var clientX = e.touches ? e.touches[0].clientX : e.clientX;
      var clientY = e.touches ? e.touches[0].clientY : e.clientY;
      var dx = clientX - lastX;
      var dy = clientY - lastY;

      if (Math.abs(clientX - startX) > 6 || Math.abs(clientY - startY) > 6) {
        dragMoved = true;
      }

      // Sensitivity factor
      var sens = 0.32;
      rotY += dx * sens;
      rotX -= dy * sens;

      // Restrict extreme flipping on X
      rotX = Math.max(-65, Math.min(65, rotX));

      velY = dx * sens;
      velX = -dy * sens;

      lastX = clientX;
      lastY = clientY;

      applyTransform();
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;
      wrap.classList.remove("is-dragging");
    }

    wrap.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    wrap.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // Animation loop with inertia & idle auto-rotation
    function loop() {
      if (!isDragging) {
        // Decay momentum toward idle auto-spin
        velY = velY * 0.94 + 0.012;
        velX = velX * 0.94;

        rotY += velY;
        rotX += velX;

        // Subtle gentle breathing tilt
        rotX = Math.max(-50, Math.min(50, rotX));

        applyTransform();
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);

    // Click tile handler (only if user wasn't dragging)
    sphere.addEventListener("click", function (e) {
      if (dragMoved) {
        // Prevent clicking when spinning
        return;
      }
      var tile = e.target.closest(".globe-tile");
      if (tile && tile.dataset.projectId) {
        openPreviewModal(tile.dataset.projectId);
      }
    });
  }

  /* ============================================================
     FEATURE 3: MULTI-ROW SCROLLING WEBSITE SHOWCASE
     ============================================================ */
  function initMarqueeShowcase() {
    var showcaseWrap = document.getElementById("showcaseMarqueeWrap");
    if (!showcaseWrap) return;

    // Distribute the 8 unique portfolio items across 2 alternating rows (4 items each)
    // Row 1: items 0, 1, 2, 3
    // Row 2: items 4, 5, 6, 7
    var rows = [
      { id: "marqueeRow1", items: [PORTFOLIO_ITEMS[0], PORTFOLIO_ITEMS[1], PORTFOLIO_ITEMS[2], PORTFOLIO_ITEMS[3]] },
      { id: "marqueeRow2", items: [PORTFOLIO_ITEMS[4], PORTFOLIO_ITEMS[5], PORTFOLIO_ITEMS[6], PORTFOLIO_ITEMS[7]] }
    ];

    rows.forEach(function (rowConfig) {
      var track = document.getElementById(rowConfig.id);
      if (!track) return;

      // Duplicate list twice for seamless infinite scrolling
      var fullList = rowConfig.items.concat(rowConfig.items).concat(rowConfig.items);
      track.innerHTML = "";

      fullList.forEach(function (item) {
        var card = document.createElement("div");
        card.className = "marquee-card";
        card.dataset.projectId = item.id;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");
        card.setAttribute("aria-label", "Explore " + item.name + " full page");

        card.innerHTML =
          '<img src="' + item.heroImg + '" alt="' + item.name + ' website thumbnail" loading="lazy">' +
          '<div class="marquee-card-overlay">' +
            '<span class="marquee-pill">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>' +
              'Click to explore full page' +
            '</span>' +
          '</div>';

        card.addEventListener("click", function () {
          openPreviewModal(item.id);
        });

        card.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openPreviewModal(item.id);
          }
        });

        track.appendChild(card);
      });
    });

    // Also attach to any static portfolio cards on portfolio.html
    document.querySelectorAll("[data-open-preview]").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var id = btn.getAttribute("data-open-preview");
        if (id) openPreviewModal(id);
      });
    });
  }

  /* ============================================================
     FEATURE 4: INTERACTIVE FULL-PAGE PREVIEW MODAL
     ============================================================ */
  var currentActiveProject = null;

  function initPreviewModal() {
    var modal = document.getElementById("previewModal");
    if (!modal) return;

    var closeBtn = modal.querySelector(".preview-modal-close");
    var backdrop = modal.querySelector(".preview-modal-backdrop");
    var viewportBtns = modal.querySelectorAll(".viewport-btn");
    var container = modal.querySelector(".preview-viewport-container");
    var conceptCta = document.getElementById("previewConceptCta");

    // Close handlers
    function closeModal() {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });

    // Viewport Toggle (Desktop vs Mobile)
    viewportBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        viewportBtns.forEach(function (b) {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");

        var viewMode = btn.getAttribute("data-view");
        if (container) {
          container.className = "preview-viewport-container " + viewMode + "-mode";
        }
      });
    });

    // "Get a Free Design Like This" CTA in modal header
    if (conceptCta) {
      conceptCta.addEventListener("click", function () {
        var refName = currentActiveProject ? currentActiveProject.name : "Website Showcase Style";
        closeModal();
        openConceptModal(refName);
      });
    }
  }

  function openPreviewModal(projectId) {
    var modal = document.getElementById("previewModal");
    if (!modal) return;

    var project = null;
    for (var i = 0; i < PORTFOLIO_ITEMS.length; i++) {
      if (PORTFOLIO_ITEMS[i].id === projectId) {
        project = PORTFOLIO_ITEMS[i];
        break;
      }
    }
    if (!project) project = PORTFOLIO_ITEMS[0];
    currentActiveProject = project;

    var titleEl = document.getElementById("previewModalTitle");
    var industryEl = document.getElementById("previewModalIndustry");
    var urlText = document.getElementById("browserUrlText");
    var desktopImg = document.getElementById("previewDesktopImg");
    var mobileImg = document.getElementById("previewMobileImg");
    var liveLink = document.getElementById("previewLiveLink");

    if (titleEl) titleEl.textContent = project.name;
    if (industryEl) industryEl.textContent = project.industry;
    if (urlText) urlText.textContent = project.displayUrl || "https://" + project.id + ".co.uk";

    if (desktopImg) {
      desktopImg.src = project.fullImg;
      desktopImg.alt = project.name + " desktop design";
    }
    if (mobileImg) {
      mobileImg.src = project.mobileImg;
      mobileImg.alt = project.name + " mobile design";
    }

    // Reset scroll positions to top
    var dScroll = document.getElementById("desktopScrollPane");
    var mScroll = document.getElementById("mobileScrollPane");
    if (dScroll) dScroll.scrollTop = 0;
    if (mScroll) mScroll.scrollTop = 0;

    /**
     * CRITICAL BUSINESS RULE:
     * Only Harrogate Jagwar Specialists and Ellavate Dogs may display liveUrl.
     * For all other design sites, liveUrl is null and this button is hidden.
     */
    if (liveLink) {
      if (project.liveUrl) {
        liveLink.href = project.liveUrl;
        liveLink.style.display = "inline-flex";
      } else {
        liveLink.href = "#";
        liveLink.style.display = "none";
      }
    }

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  window.openPreviewModal = openPreviewModal;

  /* ============================================================
     FEATURE 5: "SEE IT BEFORE YOU PAY" INTAKE MODAL & LOGO UPLOAD
     ============================================================ */
  function initConceptModal() {
    // Open triggers from across the site
    document.querySelectorAll("[data-open-concept]").forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        var ref = trigger.getAttribute("data-reference-style") || "";
        openConceptModal(ref);
      });
    });

    var modal = document.getElementById("conceptModal");
    if (!modal) return;

    var closeBtn = modal.querySelector(".concept-modal-close");
    var backdrop = modal.querySelector(".concept-modal-backdrop");
    var form = document.getElementById("conceptForm");
    var fileInput = document.getElementById("conceptLogoInput");
    var dropzone = document.getElementById("conceptLogoDropzone");
    var previewWrap = document.getElementById("conceptLogoPreview");
    var previewThumb = document.getElementById("conceptLogoThumb");
    var previewName = document.getElementById("conceptLogoName");
    var previewSize = document.getElementById("conceptLogoSize");
    var removeLogoBtn = document.getElementById("conceptLogoRemove");
    var statusBox = document.getElementById("conceptFormStatus");
    var submitBtn = form ? form.querySelector("button[type=submit]") : null;

    function closeModal() {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("active")) {
        closeModal();
      }
    });

    // Drag-and-drop & file selection
    if (dropzone && fileInput) {
      ["dragenter", "dragover"].forEach(function (eventName) {
        dropzone.addEventListener(eventName, function (e) {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.add("dragover");
        });
      });

      ["dragleave", "drop"].forEach(function (eventName) {
        dropzone.addEventListener(eventName, function (e) {
          e.preventDefault();
          e.stopPropagation();
          dropzone.classList.remove("dragover");
        });
      });

      dropzone.addEventListener("drop", function (e) {
        if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
          fileInput.files = e.dataTransfer.files;
          handleFile(fileInput.files[0]);
        }
      });

      fileInput.addEventListener("change", function () {
        if (fileInput.files && fileInput.files[0]) {
          handleFile(fileInput.files[0]);
        }
      });
    }

    function handleFile(file) {
      if (!file) return;

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit. Please choose a smaller logo image.");
        fileInput.value = "";
        return;
      }

      // Validate file type
      var validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml"];
      if (!validTypes.includes(file.type) && !file.name.match(/\.(png|jpg|jpeg|webp|svg)$/i)) {
        alert("Please upload a PNG, JPEG, WebP, or SVG logo image.");
        fileInput.value = "";
        return;
      }

      if (previewWrap) {
        previewWrap.style.display = "flex";
        if (previewName) previewName.textContent = file.name;
        if (previewSize) previewSize.textContent = (file.size / 1024).toFixed(1) + " KB";

        if (previewThumb) {
          var reader = new FileReader();
          reader.onload = function (e) {
            previewThumb.src = e.target.result;
          };
          reader.readAsDataURL(file);
        }
      }
    }

    if (removeLogoBtn && fileInput) {
      removeLogoBtn.addEventListener("click", function () {
        fileInput.value = "";
        if (previewWrap) previewWrap.style.display = "none";
        if (previewThumb) previewThumb.src = "";
      });
    }

    // Form Submission via Cloudflare Pages Function (/api/contact)
    if (form) {
      form.addEventListener("submit", async function (e) {
        e.preventDefault();

        // Validation
        var nameInput = document.getElementById("ci-name");
        var businessInput = document.getElementById("ci-business");
        var emailInput = document.getElementById("ci-email");
        var phoneInput = document.getElementById("ci-phone");
        var goalsInput = document.getElementById("ci-goals");

        if (!nameInput.value.trim() || !businessInput.value.trim() || !emailInput.value.trim() || !phoneInput.value.trim() || !goalsInput.value.trim()) {
          showStatus("error", "Please fill in all required fields (Name, Business, Email, Phone, and Business Goals).");
          return;
        }

        if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
          showStatus("error", "Please provide a valid email address so Elliot can send your design.");
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.classList.add("loading");
        }

        var formData = new FormData(form);
        formData.append("formType", "free-concept");

        try {
          var response = await fetch(CONFIG.apiEndpoint, {
            method: "POST",
            body: formData
          });

          var result = await response.json().catch(function () { return { ok: false }; });

          if (response.ok && result.ok) {
            form.style.display = "none";
            showStatus("success", "Homepage Design Request Received!", "Thank you " + nameInput.value.trim() + "! Elliot will review your brand details and begin preparing your bespoke homepage design. We'll be in touch within 24 hours.");
          } else {
            throw new Error(result.error || "Submission failed");
          }
        } catch (err) {
          console.warn("API submission error, falling back to direct contact:", err);
          showStatus("error", "Unable to send online right now", "Please email your request directly to " + CONFIG.email + " or reach out on WhatsApp below.");
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove("loading");
          }
        }
      });
    }

    function showStatus(type, title, message) {
      if (!statusBox) return;
      statusBox.className = "form-status " + type;
      statusBox.style.display = "flex";
      var titleEl = statusBox.querySelector(".status-title");
      var textEl = statusBox.querySelector(".status-text");
      if (titleEl) titleEl.textContent = title;
      if (textEl) textEl.textContent = message || "";
    }
  }

  function openConceptModal(referenceStyleName) {
    var modal = document.getElementById("conceptModal");
    if (!modal) {
      window.location.href = "/#see-it-before-you-pay";
      return;
    }

    var banner = document.getElementById("conceptReferenceBanner");
    var refInput = document.getElementById("ci-referenceStyle");
    var refText = document.getElementById("conceptReferenceText");

    if (referenceStyleName) {
      if (banner) banner.style.display = "flex";
      if (refInput) refInput.value = referenceStyleName;
      if (refText) refText.textContent = "Preferred style reference: " + referenceStyleName;
    } else {
      if (banner) banner.style.display = "none";
      if (refInput) refInput.value = "";
    }

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  window.openConceptModal = openConceptModal;

  /* ============================================================
     CONTACT FORM (Upgraded to Cloudflare Pages API /api/contact)
     ============================================================ */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    var name = document.getElementById("cf-name");
    var email = document.getElementById("cf-email");
    var details = document.getElementById("cf-details");
    var phone = document.getElementById("cf-phone");
    var business = document.getElementById("cf-business");
    var timeline = document.getElementById("cf-timeline");
    var honeypot = document.getElementById("cf-website");
    var chipsContainer = document.querySelector("[data-chips]");
    var chips = chipsContainer ? chipsContainer.querySelectorAll(".chip-select") : [];
    var submitBtn = form.querySelector("button[type=submit]");
    var statusBox = document.getElementById("formStatus");
    var statusTitle = document.getElementById("formStatusTitle");
    var statusText = document.getElementById("formStatusText");

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chip.classList.toggle("selected");
        chip.setAttribute("aria-pressed", chip.classList.contains("selected"));
        if (chipsContainer && chipsContainer.classList.contains("field-error")) {
          chipsContainer.classList.remove("field-error");
        }
      });
    });

    function setError(input, error) {
      var wrap = input.closest(".field");
      if (!wrap) return;
      wrap.classList.add("field-error");
      var msg = wrap.querySelector(".error-msg");
      if (msg) msg.textContent = error;
    }

    function clearError(input) {
      var wrap = input.closest(".field");
      if (wrap) wrap.classList.remove("field-error");
    }

    function selectedServices() {
      var out = [];
      chips.forEach(function (c) {
        if (c.classList.contains("selected")) out.push(c.textContent.trim());
      });
      return out;
    }

    function validate() {
      var ok = true;
      if (!name.value.trim() || name.value.trim().length < 2) {
        setError(name, "Please enter your full name.");
        ok = false;
      } else {
        clearError(name);
      }

      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRe.test(email.value.trim())) {
        setError(email, "Please enter a valid email address.");
        ok = false;
      } else {
        clearError(email);
      }

      if (phone.value.trim() && !/^[+\d][\d\s().-]{6,}$/.test(phone.value.trim())) {
        setError(phone, "Please enter a valid phone number.");
        ok = false;
      } else {
        clearError(phone);
      }

      if (!details.value.trim() || details.value.trim().length < 15) {
        setError(details, "Please outline your project in at least 15 characters.");
        ok = false;
      } else {
        clearError(details);
      }

      return ok;
    }

    function showStatus(type, title, body) {
      statusBox.className = "form-status " + type;
      statusTitle.textContent = title;
      statusText.textContent = body;
      statusBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (honeypot && honeypot.value) {
        showStatus("success", "Enquiry Sent", "Thank you! We will be in touch within 24 hours.");
        return;
      }

      if (!validate()) {
        showStatus("error", "Check highlighted fields", "A few details need attention before we can send your enquiry.");
        return;
      }

      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      var formData = new FormData();
      formData.append("name", name.value.trim());
      formData.append("business", business ? business.value.trim() : "");
      formData.append("email", email.value.trim());
      formData.append("phone", phone.value.trim());
      formData.append("services", selectedServices().join(", "));
      formData.append("timeline", timeline ? timeline.value : "Flexible");
      formData.append("details", details.value.trim());
      formData.append("formType", "contact");

      try {
        var response = await fetch(CONFIG.apiEndpoint, {
          method: "POST",
          body: formData
        });

        var result = await response.json().catch(function () { return { ok: false }; });

        if (response.ok && result.ok) {
          submitBtn.classList.remove("loading");
          showStatus("success", "Enquiry Received!", "Thanks " + name.value.trim() + "! Your message was sent directly to Elliot. We'll reply within 24 hours with transparent advice and a clear quote.");
          form.reset();
          chips.forEach(function (c) { c.classList.remove("selected"); });
        } else {
          throw new Error(result.error || "Submission error");
        }
      } catch (err) {
        console.warn("Contact API error, offering mailto fallback:", err);
        submitBtn.classList.remove("loading");
        submitBtn.disabled = false;
        showStatus("error", "Failed to send message", "Please email us directly at " + CONFIG.email + " or message Elliot on WhatsApp.");
      }
    });
  }

  /* ============================================================
     FEATURE 7: PLAIN-ENGLISH FAQ ACCORDION
     ============================================================ */
  function initFaqAccordion() {
    var accordion = document.querySelector(".faq-accordion");
    if (!accordion) return;

    var items = accordion.querySelectorAll(".faq-item");

    items.forEach(function (item) {
      var questionBtn = item.querySelector(".faq-question");
      if (!questionBtn) return;

      questionBtn.addEventListener("click", function () {
        var isOpen = item.classList.contains("open");

        // Close other items for sleek single-open accordion feel
        items.forEach(function (other) {
          other.classList.remove("open");
          var otherBtn = other.querySelector(".faq-question");
          if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
          item.classList.add("open");
          questionBtn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  /* ============================================================
     FEATURE 8: STICKY MULTI-CHANNEL CONTACT DOCK
     ============================================================ */
  function initContactDock() {
    var whatsappBtn = document.getElementById("dockWhatsappBtn");
    var emailBtn = document.getElementById("dockEmailBtn");

    if (whatsappBtn) {
      whatsappBtn.href = "https://wa.me/" + WHATSAPP_NUMBER;
    }

    if (emailBtn) {
      emailBtn.addEventListener("click", function (e) {
        e.preventDefault();
        // If concept modal is available, open it; otherwise open mailto
        var conceptModal = document.getElementById("conceptModal");
        if (conceptModal) {
          openConceptModal("Direct Enquiry via Contact Dock");
        } else {
          window.location.href = "mailto:" + CONFIG.email;
        }
      });
    }
  }

})();
