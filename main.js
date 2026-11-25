(function () {
  var yearEls = document.querySelectorAll('[data-year]');
  var y = new Date().getFullYear();
  yearEls.forEach(function (el) { el.textContent = y; });

  var buttons = document.querySelectorAll('[data-set-lang]');
  var nodes = document.querySelectorAll('[data-en][data-bg]');

  function getCookieLang() {
    try {
      var m = document.cookie.match(/(?:^|; )site_lang=([^;]+)/);
      return m ? decodeURIComponent(m[1]) : null;
    } catch (e) { return null; }
  }

  function applyLang(lang) {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);
    nodes.forEach(function (el) {
      var val = el.getAttribute('data-' + lang);
      if (val !== null) { el.textContent = val; }
    });
    buttons.forEach(function (b) {
      b.classList.toggle('active', b.getAttribute('data-set-lang') === lang);
    });
    try { document.cookie = 'site_lang=' + lang + ';path=/;max-age=31536000'; } catch (e) {}
  }

  buttons.forEach(function (b) {
    b.addEventListener('click', function () { applyLang(b.getAttribute('data-set-lang')); });
  });

  applyLang(getCookieLang() || 'bg');

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var panel = document.querySelector('.mobile-panel');
  if (toggle && panel) {
    toggle.addEventListener('click', function () {
      panel.classList.toggle('open');
    });
    panel.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { panel.classList.remove('open'); });
    });
  }
})();
