window.addEventListener("scroll", function () {
  const header = document.querySelector("header");

  if (window.scrollY > 32) {
    header.style.width = "100%";
    header.style.borderRadius = "0";
  } else {
    header.style.width = "1200px";
    header.style.borderRadius = "20px";
  }
});
