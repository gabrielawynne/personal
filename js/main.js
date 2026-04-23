// Remove preload guard after first paint so transitions can run normally
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('preload');
  });
});

const hasHero = !!document.querySelector(".hero, .page-banner");

function updateHeader() {
  const header = document.querySelector("header");
  const isNarrow = window.innerWidth < 1200;
  const isScrolled = window.scrollY > 32;
  const expanded = isScrolled || isNarrow || !hasHero;

  if (expanded) {
    header.style.width = "100%";
    header.style.borderRadius = "0";
  } else {
    header.style.width = "1200px";
    header.style.borderRadius = "20px";
  }

  document.body.classList.toggle("header-expanded", expanded);
}

window.addEventListener("scroll", updateHeader);
window.addEventListener("resize", updateHeader);
updateHeader();

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  hamburger.classList.toggle("open", isOpen);
  hamburger.setAttribute("aria-expanded", isOpen);
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    hamburger.classList.remove("open");
    hamburger.setAttribute("aria-expanded", false);
  });
});

const darkToggle = document.querySelector(".dark-toggle");

darkToggle.addEventListener("click", () => {
  const isDark = document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", !isDark);
  localStorage.setItem("darkMode", !isDark);
});

window.addEventListener("storage", (e) => {
  if (e.key === "darkMode") {
    document.documentElement.classList.toggle("dark", e.newValue === "true");
  }
});
