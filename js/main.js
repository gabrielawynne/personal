function updateHeader() {
  const header = document.querySelector("header");
  const isNarrow = window.innerWidth < 1200;
  const isScrolled = window.scrollY > 32;

  if (isScrolled || isNarrow) {
    header.style.width = "100%";
    header.style.borderRadius = "0";
  } else {
    header.style.width = "1200px";
    header.style.borderRadius = "20px";
  }
}

// Run on both scroll and resize
window.addEventListener("scroll", updateHeader);
window.addEventListener("resize", updateHeader);

// Also run once on load to catch initial size
updateHeader();
