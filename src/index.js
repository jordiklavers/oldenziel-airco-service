import gsap from "https://cdn.skypack.dev/gsap";
import ScrollTrigger from "https://cdn.skypack.dev/gsap/ScrollTrigger";
import CustomEase from "https://cdn.skypack.dev/gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create("main", "M0,0 C0.65,0.01 0.05,0.99 1,1");

gsap.defaults({
  ease: "main",
  duration: 0.4,
});

$(document).ready(function () {
  initFunctions();
});

function initFunctions() {
  initNavMenu();
  initDetectScrollingDirection();
  dienstenScroll();
  scrollTriggerAnimations();
  faqItemsAnimation();
}

$("section[data-theme]").each(function () {
  let theme = 1;
  if ($(this).attr("data-theme") === "dark") theme = 2;

  ScrollTrigger.create({
    trigger: $(this),
    start: "top top",
    end: "bottom top",
    onToggle: ({ self, isActive }) => {
      if (isActive) gsap.to(".nav", { ...colorThemes[theme], duration: 0.3 });
    },
  });
});

function initNavMenu() {
  if (window.innerWidth < 768) {
    let dropdownState = "closed";
    //
    let navMenu = $(".nav_links-wrap");
    let navTrigger = $(".btn_main_wrap.is-nav-menu");

    const openNav = () => {
      navMenu.attr("data-nav", "open");
      navMenu.css("display", "flex");
    };

    const closeNav = () => {
      navMenu.attr("data-nav", "closed");
      navMenu.css("display", "none");
    };

    navTrigger.on("click", () => {
      navMenu.attr("data-nav") === "open" ? closeNav() : openNav();
    });

    $(".nav_dropdown-wrap").on("click", () => {
      dropdownState === "closed" ? openDropdown() : closeDropdown();
    });

    const openDropdown = () => {
      dropdownState = "open";
      $(".nav_dropdown-menu").css("display", "flex");
      $(".nav_dropdown-menu").css("opacity", "1");
    };

    const closeDropdown = () => {
      dropdownState = "closed";
      $(".nav_dropdown-menu").css("display", "none");
      $(".nav_dropdown-menu").css("opacity", "0");
    };
  }
}

function initDetectScrollingDirection() {
  let lastScrollTop = 0;
  const threshold = 10; // Minimal scroll distance to switch to up/down
  const thresholdTop = 50; // Minimal scroll distance from top of window to start

  window.addEventListener("scroll", () => {
    const nowScrollTop = window.scrollY;

    if (Math.abs(lastScrollTop - nowScrollTop) >= threshold) {
      // Update Scroll Direction
      const direction = nowScrollTop > lastScrollTop ? "down" : "up";
      document
        .querySelectorAll("[data-scrolling-direction]")
        .forEach((el) =>
          el.setAttribute("data-scrolling-direction", direction)
        );

      // Update Scroll Started
      const started = nowScrollTop > thresholdTop;
      document
        .querySelectorAll("[data-scrolling-started]")
        .forEach((el) =>
          el.setAttribute("data-scrolling-started", started ? "true" : "false")
        );

      lastScrollTop = nowScrollTop;
    }
  });
}

function dienstenScroll() {
  let dienstenTrigger = $("[data-scrolltrigger-name=diensten]");
  let dienstenItems = dienstenTrigger.find(".diensten_item");

  console.log(dienstenItems);

  let dienstenTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: dienstenTrigger,
      start: "top bottom",
    },
  });

  dienstenTimeline.from(dienstenItems, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
  });
}

function scrollTriggerAnimations() {
  $(".section_hero").each(function () {
    let section = $(this);
    let sectionContent = section.find(".hero_content");

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom top",
        markers: false,
        scrub: true,
      },
    });

    tl.to(sectionContent, {
      y: "-30%",
      duration: 0.5,
      ease: "linear",
    });
  });

  $(".section_over").each(function () {
    let section = $(this);
    let sectionTrigger = section.find(".over_bg");
    let sectionContent = section.find(".over_content-wrapper.u-column-4");

    let sectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    sectionTimeline.to(sectionTrigger, {
      rotate: 90,
      duration: 0.5,
      ease: "linear",
    });

    sectionTimeline.from(
      sectionContent,
      {
        y: "25%",
        ease: "linear",
      },
      "<"
    );
  });

  $(".section_contact-header").each(function () {
    let section = $(this);
    let sectionTrigger = section.find(".contact_header-bg");

    let sectionTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    sectionTimeline.to(sectionTrigger, {
      rotate: 90,
      duration: 0.5,
      ease: "linear",
    });
  });
}

// REVIEWS SWIPER

if (".swiper.is-reviews") {
  let swiper = new Swiper(".swiper.is-reviews", {
    direction: "horizontal",
    slidesPerView: "3.5",
    loop: true,
    spaceBetween: 16,
    centeredSlides: true,
    createElements: true,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      480: {
        slidesPerView: 2.5,
      },
      1024: {
        slidesPerView: 3.5,
      },
    },
  });
}

function faqItemsAnimation() {
  const faqItems = $(".faq_item");
  let currentOpenItem = null;

  faqItems.each(function () {
    const item = $(this);
    const title = item.find(".faq_title");
    const answer = item.find(".faq_answer-wrap");
    const icon = title.find("svg");

    // Set initial states
    answer.height(0);
    item.attr("data-open", "false");

    title.on("click", function () {
      const isOpen = item.attr("data-open") === "true";

      if (currentOpenItem && !currentOpenItem.is(item)) {
        // Close the previously open item
        toggleItem(currentOpenItem, false);
      }

      // Toggle the clicked item
      toggleItem(item, !isOpen);

      currentOpenItem = isOpen ? null : item;
    });
  });

  function toggleItem(item, open) {
    const answer = item.find(".faq_answer-wrap");
    const icon = item.find(".faq_title svg");

    item.attr("data-open", open.toString());

    gsap.to(icon[0], { rotation: open ? 45 : 0, duration: 0.7 });
    gsap.to(answer[0], { height: open ? "auto" : 0, duration: 0.7 });
  }
}

let swiper = new Swiper(".swiper.is-projecten", {
  direction: "horizontal",
  spaceBetween: 16,
  autoplay: {
    delay: 4000,
  },
  navigation: {
    nextEl: ".swiper-button-forward",
    prevEl: ".swiper-button-previous",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});
