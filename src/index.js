import gsap from "https://cdn.skypack.dev/gsap";
import ScrollTrigger from "https://cdn.skypack.dev/gsap/ScrollTrigger";
import CustomEase from "https://cdn.skypack.dev/gsap/CustomEase";

gsap.registerPlugin(ScrollTrigger, CustomEase);

console.log("test");

CustomEase.create("main", "M0,0 C0.65,0.01 0.05,0.99 1,1");

gsap.defaults({
  ease: "main",
  duration: 0.4,
});

initFunctions();

function initFunctions() {
  initDropDown();
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

function initDropDown() {
  // Selecteer het dropdown menu, de wrapper, en de icon
  const dropdownMenu = document.querySelector(".nav_dropdown-menu");
  const dropdownWrap = document.querySelector(".nav_dropdown-wrap");
  const dropdownIcon = document.querySelector(".nav_dropdown-icon");

  // Maak een GSAP timeline aan met paused: true, zodat het niet automatisch afspeelt
  let timeline = gsap.timeline({ paused: true, reversed: true });

  // Voeg animaties voor het dropdown-menu en de icon toe aan de timeline
  timeline
    .to(dropdownMenu, {
      y: "0rem", // Breng het menu naar beneden
      opacity: 1, // Maak het zichtbaar
      display: "flex", // Zet display op flex
      duration: 0.4, // Hoe snel de animatie moet afspelen
      ease: "power3.inOut", // Een zachtere animatie beweging
    })
    .to(
      dropdownIcon,
      {
        rotate: 90, // Rotatie van de icon
        duration: 0.4, // Hoe snel de animatie moet afspelen
        ease: "power3.inOut", // Een zachtere animatie beweging
      },
      "=<"
    ); // Zorg ervoor dat beide animaties tegelijkertijd beginnen

  // Voeg hover-in en hover-out toe aan de wrapper
  dropdownWrap.addEventListener("mouseenter", () => {
    timeline.play(); // Speel de timeline af bij hover
  });

  dropdownWrap.addEventListener("mouseleave", () => {
    timeline.reverse(); // Speel de timeline terug wanneer je niet meer hovert
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
        markers: true,
        scrub: true,
      }
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
      }
    });

    sectionTimeline.to(sectionTrigger, {
      rotate: 90,
      duration: 0.5,
      ease: "linear",
    });

    sectionTimeline.from(sectionContent, {
      y: "25%",
      ease: "linear",
    }, "<");
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
  });
}

$(".faq_item").each(function (index, item) {
  console.log(item);
});

function faqItemsAnimation() {
  const faqItems = $(".faq_item");
  let currentOpenItem = null;

  faqItems.each(function () {
    console.log($(this));
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
  slidesPerView: 4,
  spaceBetween: 16,
  autoplay: {
    delay: 4000,
  },
  navigation: {
    nextEl: ".swiper-button-forward",
    prevEl: ".swiper-button-previous",
  },
});
