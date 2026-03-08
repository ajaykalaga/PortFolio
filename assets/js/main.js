/**
 * Template Name: iPortfolio
 * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
 * Updated: Jun 29 2024 with Bootstrap v5.3.3
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

(function () {
  "use strict";

  /**
   * Header toggle
   */
  const headerToggleBtn = document.querySelector(".header-toggle");

  function headerToggle() {
    document.querySelector("#header").classList.toggle("header-show");
    headerToggleBtn.classList.toggle("bi-list");
    headerToggleBtn.classList.toggle("bi-x");
  }
  headerToggleBtn.addEventListener("click", headerToggle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".header-show")) {
        headerToggle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  /*
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);
*/
  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init typed.js
   */
  const selectTyped = document.querySelector(".typed");
  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute("data-typed-items");
    typed_strings = typed_strings.split(",");
    new Typed(".typed", {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
    });
  }

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll(".skills-animation");
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: "80%",
      handler: function (direction) {
        let progress = item.querySelectorAll(".progress .progress-bar");
        progress.forEach((el) => {
          el.style.width = el.getAttribute("aria-valuenow") + "%";
        });
      },
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();

/* ---------------- Chatbot Logic ---------------- */

const chatbot = document.getElementById("chatbot");
const toggle = document.getElementById("chat-toggle");
const closeBtn = document.getElementById("close-chat");
const messages = document.getElementById("chat-messages");
const input = document.getElementById("user-input");

/* Open / Close Chat */
if (toggle) toggle.onclick = () => (chatbot.style.display = "flex");
if (closeBtn) closeBtn.onclick = () => (chatbot.style.display = "none");

/* Greeting detection */
const greetings = ["hi", "hello", "hey", "hii", "hi!", "hello!", "hey!"];

/* Welcome message when page loads with suggested questions */
window.addEventListener("load", () => {
  const welcome = document.createElement("div");
  welcome.className = "ai-msg";
  welcome.textContent =
    "Hi 👋 I'm Ajay's AI assistant.\n\nYou can ask things like:";
  messages.appendChild(welcome);

  const suggestions = [
    "What does Ajay do?",
    "What are Ajay's skills?",
    "What projects has Ajay built?",
  ];

  const suggestionContainer = document.createElement("div");
  suggestionContainer.id = "chat-suggestions";
  suggestionContainer.style.display = "flex";
  suggestionContainer.style.flexDirection = "column";
  suggestionContainer.style.gap = "6px";
  suggestionContainer.style.margin = "6px 0";

  suggestions.forEach((text) => {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.style.padding = "6px 10px";
    btn.style.borderRadius = "8px";
    btn.style.border = "none";
    btn.style.cursor = "pointer";
    btn.style.background = "#eef2ff";
    btn.style.fontSize = "13px";
    btn.style.textAlign = "left";

    btn.onclick = () => {
      input.value = text;

      const suggestions = document.getElementById("chat-suggestions");
      if (suggestions) suggestions.remove();

      sendMessage();
    };

    suggestionContainer.appendChild(btn);
  });

  messages.appendChild(suggestionContainer);

  /* Auto‑notify visitor to use the chatbot */
  setTimeout(() => {
    if (chatbot && chatbot.style.display !== "flex") {
      chatbot.style.display = "flex";

      const notifyMsg = document.createElement("div");
      notifyMsg.className = "ai-msg";
      notifyMsg.textContent =
        "👋 Before you go — you can ask me anything about Ajay's skills, projects, or experience!";

      messages.appendChild(notifyMsg);
      messages.scrollTop = messages.scrollHeight;
    }
  }, 4000); // opens after 4 seconds
});

/* Send message */
async function sendMessage() {
  const userText = input.value.trim();
  if (!userText) return;

  /* Remove suggested questions after first interaction */
  const suggestions = document.getElementById("chat-suggestions");
  if (suggestions) suggestions.remove();

  /* User bubble */
  const userMsg = document.createElement("div");
  userMsg.className = "user-msg";
  userMsg.textContent = userText;
  messages.appendChild(userMsg);

  input.value = "";
  messages.scrollTop = messages.scrollHeight;

  /* Handle greetings locally (no API call) */
  if (greetings.includes(userText.toLowerCase())) {
    const aiMsg = document.createElement("div");
    aiMsg.className = "ai-msg";
    messages.appendChild(aiMsg);

    const text =
      "Hi 👋 I'm Ajay's AI assistant.\nAsk me about Ajay's skills, projects, or experience.";

    let i = 0;
    function typeEffectGreeting() {
      if (i < text.length) {
        aiMsg.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffectGreeting, 15);
      }
    }

    typeEffectGreeting();
    messages.scrollTop = messages.scrollHeight;
    return;
  }

  /* Typing indicator */
  const typing = document.createElement("div");
  typing.className = "ai-msg";
  typing.textContent = "Ajay AI is typing...";
  messages.appendChild(typing);
  messages.scrollTop = messages.scrollHeight;

  try {
    const res = await fetch(
      "https://ajaykalaga-ajay-ai-backend.hf.space/chat",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      }
    );

    const data = await res.json();

    typing.remove();

    const aiMsg = document.createElement("div");
    aiMsg.className = "ai-msg";
    messages.appendChild(aiMsg);

    /* Typing animation */
    let i = 0;
    const text = data.response;

    function typeEffect() {
      if (i < text.length) {
        aiMsg.textContent += text.charAt(i);
        i++;
        setTimeout(typeEffect, 15);
      }
    }

    typeEffect();
  } catch (err) {
    typing.remove();

    const errorMsg = document.createElement("div");
    errorMsg.className = "ai-msg";
    errorMsg.textContent = "⚠️ Unable to reach Ajay AI backend.";

    messages.appendChild(errorMsg);
  }

  messages.scrollTop = messages.scrollHeight;
}

/* Send message with Enter key */
if (input) {
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
}
