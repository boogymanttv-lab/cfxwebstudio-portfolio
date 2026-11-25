// Рендерира проектите от projects-data.js в контейнерите
// <div data-projects-grid="all">      -> показва всички проекти
// <div data-projects-grid="featured"> -> показва само featured:true
// Не изисква редакция — просто добавяш проекти в projects-data.js
(function () {
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function cardHTML(p) {
    var titleBg = p.titleBg || p.title || '';
    var titleEn = p.titleEn || p.title || '';
    var hasImage = !!p.image;

    var img = hasImage
      ? '<img src="' + esc(p.image) + '" alt="' + esc(titleBg) + '" loading="lazy" onerror="this.style.display=\'none\'; this.nextElementSibling.style.display=\'flex\';">'
      : '';
    var fallback = '<div class="thumb-fallback"' + (hasImage ? ' style="display:none;"' : '') + '><span>' + esc(p.initials || '★') + '</span></div>';

    var liveBtn = p.link ? '<a class="project-link-btn" href="' + esc(p.link) + '" target="_blank" rel="noopener"><span data-en="Live" data-bg="На живо">На живо</span> ↗</a>' : '';
    var githubBtn = false ? '<a class="project-link-btn ghost" href="' + esc(p.github) + '" target="_blank" rel="noopener">GitHub ↗</a>' : '';
    var linksRow = (liveBtn || githubBtn) ? '<div class="project-links">' + liveBtn + githubBtn + '</div>' : '';

    var tags = (p.tags || []).map(function (t) {
      if (t && typeof t === 'object') {
        return '<span class="tag" data-en="' + esc(t.en) + '" data-bg="' + esc(t.bg) + '">' + esc(t.bg) + '</span>';
      }
      return '<span class="tag">' + esc(t) + '</span>';
    }).join('');

    return ''
      + '<div class="project-card">'
      + '<div class="project-thumb ' + (p.thumbClass || 'thumb-1') + '">' + img + fallback + '</div>'
      + '<div class="project-body">'
      + '<h3 data-en="' + esc(titleEn) + '" data-bg="' + esc(titleBg) + '">' + esc(titleBg) + '</h3>'
      + '<p data-en="' + esc(p.descEn) + '" data-bg="' + esc(p.descBg) + '">' + esc(p.descBg) + '</p>'
      + '<div class="tag-row">' + tags + '</div>'
      + linksRow
      + '</div>'
      + '</div>';
  }

  var containers = document.querySelectorAll('[data-projects-grid]');
  if (!containers.length || typeof PROJECTS === 'undefined') return;

  containers.forEach(function (el) {
    var onlyFeatured = el.getAttribute('data-projects-grid') === 'featured';
    var list = onlyFeatured ? PROJECTS.filter(function (p) { return p.featured; }) : PROJECTS;
    el.innerHTML = list.map(cardHTML).join('');
  });

  // Lightbox — click a project photo to view it larger
  var overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = '<button class="lightbox-close" aria-label="Close">✕</button><img alt="">';
  document.body.appendChild(overlay);
  var overlayImg = overlay.querySelector('img');

  function openLightbox(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlay.classList.add('open');
  }
  function closeLightbox() {
    overlay.classList.remove('open');
  }

  document.querySelectorAll('.project-thumb img').forEach(function (img) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function () { openLightbox(img.src, img.alt); });
  });
  overlay.addEventListener('click', function (e) { if (e.target === overlay) closeLightbox(); });
  overlay.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
})();
