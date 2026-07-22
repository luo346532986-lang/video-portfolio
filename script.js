const featuredRoot = document.querySelector("#featured-cases");
const archiveRoot = document.querySelector("#archive-grid");
const emptyState = document.querySelector("#empty-state");
const filters = [...document.querySelectorAll(".filter")];
const dialog = document.querySelector("#project-dialog");
const dialogMedia = document.querySelector("#dialog-media");
const closeButton = document.querySelector(".dialog-close");
const directoryLinks = [...document.querySelectorAll("[data-directory-filter]")];
const copyButtons = [...document.querySelectorAll("[data-copy-value]")];
const copyToast = document.querySelector("#copy-toast");
const categoryLabels = {
  AIGC: "AIGC",
  "实拍": "实拍 + AE",
  "实拍结合 AI": "实拍 + AI",
};
const displayCategory = (category) => categoryLabels[category] || category;
const featuredTitles = ["把风夹在身边", "多米拉 S1 烤箱", "AI 校园宣传片"];
const featuredProjects = featuredTitles
  .map((title) => projects.find((project) => project.title === title))
  .filter(Boolean);
const remainingProjects = projects.filter((project) => !featuredTitles.includes(project.title));
const orderedProjects = [...featuredProjects, ...remainingProjects];
const archiveProjects = orderedProjects;
document.querySelector("#count-all").textContent = archiveProjects.length;

const escapeHTML = (value = "") => String(value).replace(/[&<>'"]/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
})[character]);

const summary = (value, limit = 76) => value.length > limit ? `${value.slice(0, limit)}…` : value;

function openProject(project, index) {
  document.querySelector("#dialog-index").textContent = `CASE ${String(index + 1).padStart(2, "0")} / ${String(orderedProjects.length).padStart(2, "0")}`;
  document.querySelector("#dialog-meta").textContent = `${displayCategory(project.category)} · ${project.year} · ${project.duration}`;
  document.querySelector("#dialog-title").textContent = project.title;
  document.querySelector("#dialog-description").textContent = project.description;
  document.querySelector("#dialog-role").textContent = "全流程独立完成";
  document.querySelector("#dialog-problem").textContent = project.problem;
  document.querySelector("#dialog-deliverable").textContent = project.deliverable;

  const poster = escapeHTML(project.cover);
  const source = escapeHTML(project.src);
  dialogMedia.innerHTML = `<video controls playsinline preload="metadata" poster="${poster}"><source src="${source}" type="video/mp4">你的浏览器暂不支持视频播放。</video>`;
  const watchLink = document.querySelector("#watch-link");
  watchLink.href = project.src;
  dialog.showModal();
  document.body.classList.add("modal-open");
}

function projectButton(content, project, index, className) {
  const button = document.createElement("article");
  button.className = className;
  button.tabIndex = 0;
  button.setAttribute("role", "button");
  button.setAttribute("aria-label", `查看案例：${project.title}`);
  button.innerHTML = content;
  button.addEventListener("click", () => openProject(project, index));
  button.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(project, index);
    }
  });
  return button;
}

function renderFeatured() {
  featuredRoot.innerHTML = "";
  featuredProjects.forEach((project, index) => {
    const card = projectButton(`
      <div class="feature-case-media"><img src="${escapeHTML(project.cover)}" alt="${escapeHTML(project.title)}视频封面"></div>
      <div class="feature-case-head"><span>CASE ${String(index + 1).padStart(2, "0")}</span><span>${escapeHTML(displayCategory(project.category))} / ${escapeHTML(project.duration)}</span></div>
      <div class="feature-case-copy">
        <h3>${escapeHTML(project.title)}</h3>
        <p>${escapeHTML(project.description)}</p>
        <div class="feature-case-foot"><span>${escapeHTML(project.deliverable.split(" / ")[0])}</span><span class="independent-badge">独立完成</span><b>↗</b></div>
      </div>`, project, index, "feature-case reveal");
    featuredRoot.appendChild(card);
  });
}

function renderArchive(filter = "all") {
  const visible = filter === "all" ? archiveProjects : archiveProjects.filter((project) => project.category === filter);
  archiveRoot.innerHTML = "";
  visible.forEach((project) => {
    const index = orderedProjects.indexOf(project);
    const card = projectButton(`
      <div class="project-cover"><img src="${escapeHTML(project.cover)}" alt="${escapeHTML(project.title)}视频封面" loading="lazy"><span class="project-arrow">↗</span></div>
      <div class="project-card-body">
        <h3>${escapeHTML(project.title)}</h3>
        <p class="project-meta">${escapeHTML(displayCategory(project.category))} · 独立完成 · ${escapeHTML(project.duration)}</p>
        <p>${escapeHTML(summary(project.description))}</p>
      </div>`, project, index, "project-card reveal");
    archiveRoot.appendChild(card);
  });
  emptyState.hidden = visible.length > 0;
  observeReveals();
}

function activateFilter(button) {
  filters.forEach((item) => {
    const isActive = item === button;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-pressed", String(isActive));
  });
  renderArchive(button.dataset.filter);
}

filters.forEach((button) => button.addEventListener("click", () => activateFilter(button)));
directoryLinks.forEach((link) => link.addEventListener("click", () => {
  const target = filters.find((button) => button.dataset.filter === link.dataset.directoryFilter);
  if (target) activateFilter(target);
}));

function fallbackCopy(value) {
  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  if (!copied) throw new Error("Copy failed");
}

async function copyValue(value) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(value);
    return;
  }
  fallbackCopy(value);
}

let toastTimer;
function showCopyToast(message, isError = false) {
  if (!copyToast) return;
  window.clearTimeout(toastTimer);
  copyToast.textContent = message;
  copyToast.classList.toggle("is-error", isError);
  copyToast.classList.add("is-visible");
  toastTimer = window.setTimeout(() => copyToast.classList.remove("is-visible"), 2200);
}

copyButtons.forEach((button) => button.addEventListener("click", async () => {
  try {
    await copyValue(button.dataset.copyValue);
    showCopyToast(`已复制${button.dataset.copyLabel}`);
  } catch {
    showCopyToast(`复制失败，请长按${button.dataset.copyLabel}`, true);
  }
}));

function closeDialog() {
  const video = dialogMedia.querySelector("video");
  if (video) video.pause();
  dialog.close();
  dialogMedia.innerHTML = "";
  document.body.classList.remove("modal-open");
}

closeButton.addEventListener("click", closeDialog);
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) closeDialog();
});
dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  closeDialog();
});

let observer;
function observeReveals() {
  if (!observer) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  }
  document.querySelectorAll(".reveal:not(.in-view)").forEach((element) => observer.observe(element));
}

window.addEventListener("scroll", () => {
  document.querySelector(".site-header").classList.toggle("scrolled", window.scrollY > 24);
}, { passive: true });

renderFeatured();
renderArchive();
observeReveals();
