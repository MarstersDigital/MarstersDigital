/* ============================================================
   Marsters Digital — Site scripts
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Config: adjust these for production ---------- */
  var CONFIG = {
    email: "info@marstersdigital.com",
    subjectPrefix: "New enquiry via marstersdigital.com"
  };

  document.addEventListener("DOMContentLoaded", function () {
    initNav();
    initReveal();
    initYear();
    initContactForm();
  });

  /* ---------- Mobile nav ---------- */
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

  /* ---------- Scroll reveal ---------- */
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

  /* ---------- Footer year ---------- */
  function initYear() {
    var el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Contact form (§5) ---------- */
  function initContactForm() {
    var form = document.getElementById("contactForm");
    if (!form) return;

    var name = document.getElementById("cf-name");
    var email = document.getElementById("cf-email");
    var details = document.getElementById("cf-details");
    var phone = document.getElementById("cf-phone");
    var timeline = document.getElementById("cf-timeline");
    var honeypot = document.getElementById("cf-website");
    var chipsContainer = document.querySelector("[data-chips]");
    var chips = chipsContainer ? chipsContainer.querySelectorAll(".chip-select") : [];
    var submitBtn = form.querySelector("button[type=submit]");
    var statusBox = document.getElementById("formStatus");
    var statusTitle = document.getElementById("formStatusTitle");
    var statusText = document.getElementById("formStatusText");
    var successMsg = "Thanks for reaching out! Your account manager will be in touch within 24 hours.";

    /* Chip multi-select */
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
        setError(name, "Please enter your full name (min 2 characters).");
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
        setError(phone, "Please enter a valid phone number (UK or international).");
        ok = false;
      } else {
        clearError(phone);
      }

      if (!selectedServices().length) {
        if (chipsContainer) chipsContainer.classList.add("field-error");
        ok = false;
      } else if (chipsContainer) {
        chipsContainer.classList.remove("field-error");
      }

      if (!details.value.trim() || details.value.trim().length < 20) {
        setError(details, "Please outline your project in at least 20 characters.");
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

    /* Optional Cloudflare Turnstile hook (enable when you have a sitekey) */
    function runTurnstile(cb) {
      if (window.turnstile && window.MARSTERS_TURNSTILE_SITEKEY) {
        var token = window.turnstile.getResponse();
        if (token) { cb(); return; }
        window.turnstile.reset();
        window.turnstile.render(document.getElementById("turnstile-widget") || document.body, {
          sitekey: window.MARSTERS_TURNSTILE_SITEKEY,
          callback: cb,
          "expired-callback": function () { window.turnstile.reset(); }
        });
        return;
      }
      cb();
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      /* Honeypot: bots always fill it — silently "succeed" */
      if (honeypot && honeypot.value) {
        showStatus("success", "Message sent", successMsg);
        return;
      }

      if (!validate()) {
        showStatus("error", "Please check the highlighted fields", "A few details need attention before we can send your enquiry.");
        return;
      }

      submitBtn.classList.add("loading");
      submitBtn.disabled = true;

      runTurnstile(function () {
        var subject = CONFIG.subjectPrefix + " — " + name.value.trim();
        var services = selectedServices().join(", ");
        var bodyLines = [
          "Full Name: " + name.value.trim(),
          "Business Name: " + ((document.getElementById("cf-business") || {}).value || "").trim(),
          "Email: " + email.value.trim(),
          "Phone: " + (phone.value.trim() || "Not provided"),
          "Services Required: " + (services || "Not selected"),
          "Estimated Timeline: " + ((timeline && timeline.value) || "Flexible"),
          "",
          "Project Details:",
          details.value.trim()
        ];

        var mailto = "mailto:" + encodeURIComponent(CONFIG.email) +
          "?subject=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(bodyLines.join("\n"));

        /* Small delay so the spinner is visible, then hand off to the user's mail client */
        setTimeout(function () {
          submitBtn.classList.remove("loading");
          submitBtn.disabled = false;
          window.location.href = mailto;
          showStatus("success", "Message ready", successMsg);
          form.reset();
          chips.forEach(function (c) { c.classList.remove("selected"); });
        }, 900);
      });
    });
  }
})();
