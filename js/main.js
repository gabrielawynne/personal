const hasHero = !!document.querySelector(".hero, .page-banner");

function updateHeader() {
  const header = document.querySelector("header");
  const isNarrow = window.innerWidth < 1200;
  const isScrolled = window.scrollY > 32;

  if (isScrolled || isNarrow || !hasHero) {
    header.style.width = "100%";
    header.style.borderRadius = "0";
  } else {
    header.style.width = "1200px";
    header.style.borderRadius = "20px";
  }
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
