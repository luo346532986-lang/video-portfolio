const grid = document.querySelector('#work-grid');
const search = document.querySelector('#search');
const empty = document.querySelector('#empty-state');
const count = document.querySelector('#work-count');
const dialog = document.querySelector('#project-dialog');
let category = 'all';

function visibleProjects() {
  const term = search.value.trim().toLowerCase();
  return projects.filter(p => (category === 'all' || p.category === category) && `${p.title} ${p.category} ${p.year}`.toLowerCase().includes(term));
}
function render() {
  const items = visibleProjects();
  count.textContent = `(${items.length.toString().padStart(2, '0')})`;
  empty.hidden = !!items.length;
  grid.innerHTML = items.map((p, i) => `<article class="project-card" tabindex="0" data-index="${projects.indexOf(p)}" aria-label="观看：${p.title}"><div class="card-image"><img src="${p.cover}" alt="${p.title}" loading="${i > 1 ? 'lazy' : 'eager'}" /><span class="play">▶</span></div><div class="card-info"><p class="case-index">CASE ${(i + 1).toString().padStart(2, '0')} / ${p.category.toUpperCase()}</p><h3>${p.title}</h3><p class="case-summary">${p.description}</p><dl class="case-details"><div><dt>解决什么</dt><dd>${p.problem}</dd></div><div><dt>交付内容</dt><dd>${p.deliverable}</dd></div></dl><span class="case-watch">播放案例 <b>${p.duration}</b> <i>↗</i></span></div></article>`).join('');
}
function getEmbed(url) {
  if (/youtube\.com|youtu\.be/.test(url)) { const id = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1]; return id ? `<iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1" title="视频播放器" allow="autoplay; fullscreen" allowfullscreen></iframe>` : ''; }
  if (/vimeo\.com/.test(url)) { const id = url.match(/vimeo\.com\/(\d+)/)?.[1]; return id ? `<iframe src="https://player.vimeo.com/video/${id}?autoplay=1" title="视频播放器" allow="autoplay; fullscreen" allowfullscreen></iframe>` : ''; }
  return '';
}
function openProject(index) {
  const p = projects[index];
  document.querySelector('#dialog-title').textContent = p.title;
  document.querySelector('#dialog-meta').textContent = `${p.category} / ${p.year} / ${p.duration}`;
  document.querySelector('#dialog-description').textContent = p.description;
  const media = document.querySelector('#dialog-media');
  const embed = p.src && getEmbed(p.src);
  media.innerHTML = embed || (p.src ? `<video controls playsinline preload="metadata" poster="${p.cover}" src="${p.src}"></video>` : `<img src="${p.cover}" alt="${p.title}" />`);
  const link = document.querySelector('#watch-link');
  link.href = p.src || '#'; link.style.display = p.src ? 'inline-flex' : 'none';
  dialog.showModal();
}
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => { category = button.dataset.filter; document.querySelector('.filter.active').classList.remove('active'); button.classList.add('active'); render(); }));
search.addEventListener('input', render);
grid.addEventListener('click', event => { const card = event.target.closest('.project-card'); if (card) openProject(card.dataset.index); });
grid.addEventListener('keydown', event => { if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('.project-card')) { event.preventDefault(); openProject(event.target.dataset.index); } });
document.querySelector('.close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => document.querySelector('#dialog-media').innerHTML = '');
document.querySelector('#year').textContent = new Date().getFullYear();
render();
