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

const portfolioGrid = document.getElementById("portfolio-grid");
if (portfolioGrid) {
  const githubIcon = `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg>`;

  fetch("js/projects.json")
    .then(r => r.json())
    .then(projects => {
      if (!projects.length) {
        portfolioGrid.innerHTML = '<p class="portfolio-empty">No projects yet.</p>';
        return;
      }

      const allTags = [...new Set(projects.flatMap(p => p.tags))].sort();
      let activeTag = null;

      const filterBar = document.createElement("div");
      filterBar.className = "portfolio-filter";
      portfolioGrid.parentNode.insertBefore(filterBar, portfolioGrid);

      function renderFilter() {
        filterBar.innerHTML = "";
        ["All", ...allTags].forEach(tag => {
          const btn = document.createElement("button");
          btn.className = "filter-btn" + ((tag === "All" ? null : tag) === activeTag ? " active" : "");
          btn.textContent = tag;
          btn.addEventListener("click", () => {
            activeTag = tag === "All" ? null : tag;
            renderFilter();
            renderProjects();
          });
          filterBar.appendChild(btn);
        });
      }

      function renderProjects() {
        const filtered = activeTag ? projects.filter(p => p.tags.includes(activeTag)) : projects;

        if (!filtered.length) {
          portfolioGrid.innerHTML = '<p class="portfolio-empty">No projects match this filter.</p>';
          return;
        }

        portfolioGrid.innerHTML = filtered.map((p, i) => {
          const imageHtml = p.image
            ? `<img src="${p.image}" alt="${p.title}">`
            : `<div class="img-placeholder"></div>`;
          const tagsHtml = p.tags.length
            ? `<ul class="portfolio-project-tags">${p.tags.map(t => `<li>${t}</li>`).join("")}</ul>`
            : "";
          const githubHtml = p.github
            ? `<a href="${p.github}" target="_blank" rel="noopener" class="portfolio-github-link">${githubIcon} View on GitHub</a>`
            : "";
          const demoHtml = p.demo
            ? `<a href="${p.demo}" target="_blank" rel="noopener" class="portfolio-demo-link">Live Demo</a>`
            : "";
          const descHtml = p.description.split("\n\n").filter(Boolean).map(para => `<p>${para}</p>`).join("");

          return `
            <div class="portfolio-project${i % 2 !== 0 ? " reverse" : ""}">
              <div class="portfolio-project-image">${imageHtml}</div>
              <div class="portfolio-project-content">
                ${githubHtml}
                <h3>${p.title}</h3>
                ${tagsHtml}
                ${descHtml}
                ${demoHtml}
              </div>
            </div>`;
        }).join("");
      }

      renderFilter();
      renderProjects();
    })
    .catch(() => {
      portfolioGrid.innerHTML = '<p class="portfolio-empty">Could not load projects.</p>';
    });
}
