/* =====================================================================
   CFXWEBSTUDIO — 3D бюро (Three.js r149 + GSAP)
   Обекти -> секции:  монитор = Проекти · клавиатура = Услуги
                      слушалки = За мен · телефон = Контакти
   ===================================================================== */
(function () {
  'use strict';

  /* ---------- език ---------- */
  var lang = 'bg';
  try { var m = document.cookie.match(/(?:^|; )site_lang=([^;]+)/); if (m && SITE.ui[m[1]]) lang = m[1]; } catch (e) {}
  function T() { return SITE.ui[lang]; }
  function L(o) { return (o && typeof o === 'object') ? (o[lang] || o.en || o.bg) : o; }
  var isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  var reduceMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  var $ = function (s) { return document.querySelector(s); };
  var body = document.body;
  var panel = $('#panel'), winBody = $('#winBody'), winTitle = $('#winTitle');
  var tooltip = $('#tooltip'), canvas = $('#scene');

  /* ---------- панели (HTML съдържание) ---------- */
  function tagHtml(t) { return '<span>' + L(t) + '</span>'; }

  function renderProjects() {
    var u = T();
    var h = '<h2>' + u.projects + '</h2><p class="sub">' + u.selected + '</p><div class="grid">';
    PROJECTS.forEach(function (p) {
      var title = lang === 'en' ? (p.titleEn || p.titleBg) : p.titleBg;
      var desc = lang === 'en' ? p.descEn : p.descBg;
      var cls = (p.thumbClass || 'thumb-1').replace('thumb-', 't');
      h += '<article class="card"><div class="thumb ' + cls + '">' + (p.initials || '') +
        (p.image ? '<img src="' + p.image + '" alt="' + title + '" loading="lazy" onerror="this.remove()">' : '') + '</div>' +
        '<h4>' + title + '</h4><p>' + desc + '</p><div class="tags">' + (p.tags || []).map(tagHtml).join('') + '</div>';
      var links = '';
      if (p.link) links += '<a href="' + p.link + '" target="_blank" rel="noopener">' + u.viewSite + '</a>';
      if (links) h += '<div class="links">' + links + '</div>';
      h += '</article>';
    });
    return h + '</div>';
  }

  function mailto(title) { return 'mailto:' + SITE.email + '?subject=' + encodeURIComponent((lang === 'en' ? 'Inquiry: ' : 'Запитване: ') + title); }
  function pkgCard(n, title, desc, old, price, per) {
    var u = T();
    return '<article class="card pkg"><div class="num"><span>' + n + '</span><i class="spark">✦</i></div><h4>' + title + '</h4><p>' + desc + '</p>' +
      '<div class="foot"><div class="pr">' + (old ? '<s>' + u.from + ' ' + old + '</s>' : '') +
      (price ? '<b>' + u.from + ' ' + price + (per ? '<small>' + L(per) + '</small>' : '') + '</b>' : '<b class="ask">' + u.custom + '</b>') + '</div>' +
      '<div class="more">' + (price ? '<em>' + u.custom + '</em>' : '') + '<a href="' + mailto(title) + '">' + u.details + '</a></div></div></article>';
  }

  function renderServices() {
    var u = T();
    var h = '<h2>' + u.services + '</h2><p class="sub">' + u.servicesIntro + '</p><h3>' + u.packages + '</h3><div class="grid">';
    SITE.packages.forEach(function (s) { h += pkgCard(s.n, L(s.title), L(s.desc), s.old, s.price, s.per); });
    h += '</div><h3>' + u.addons + '</h3><p class="sub" style="margin:-6px 0 16px">' + u.addonsSub + '</p><div class="grid">';
    SITE.addons.forEach(function (s) { h += pkgCard(s.n, L(s.title), L(s.desc), s.old, s.price, s.per); });
    h += '</div><div class="cta"><h4>' + u.notSure + '</h4><p>' + u.notSureText + '</p><a class="btn" href="mailto:' + SITE.email + '">' + u.writeMe + '</a></div>';
    return h;
  }

  function renderAbout() {
    var u = T(), total = 0;
    var h = '<h2>' + u.aboutTitle + '</h2><div class="about-wrap" style="margin-top:18px"><div><p>' + u.aboutP1 + '</p><p>' + u.aboutP2 + '</p><p>' + u.aboutP3 + '</p></div>' +
      '<div class="facts"><div class="fact card"><small>' + u.location + '</small>🇧🇬 Bulgaria</div><div class="fact card"><small>' + u.focus + '</small>' + u.focusVal + '</div><div class="fact card"><small>' + u.availability + '</small>' + u.availVal + '</div></div></div>';
    SITE.stack.forEach(function (g) { total += g.items.length; });
    h += '<div class="stack-head"><div><h3 class="stk">' + u.stackTitle + '</h3><p class="sub" style="margin:0">' + u.stackSub + '</p></div>' +
      '<div class="stat"><b data-count="' + total + '">' + total + '</b><span>' + u.techUnit + '</span><code>ship(product);</code></div></div>';
    SITE.stack.forEach(function (g) {
      h += '<section class="stk-group"><header><span class="n">' + g.n + '</span><div><h4>' + g.t + '</h4><p>' + L(g.d) + '</p></div><span class="cnt">// ' + g.items.length + ' ' + u.toolsWord + '</span></header><div class="tiles">';
      g.items.forEach(function (it) { h += '<div class="tile" style="--c:' + it[2] + '"><span class="ico">' + it[1] + '</span><div><b>' + it[0] + '</b><small>' + g.t + '</small></div></div>'; });
      h += '</div></section>';
    });
    h += '<h3>' + u.how + '</h3><div class="skills">';
    SITE.skills.slice(2).forEach(function (s) {
      h += '<div class="card"><h4>' + L(s.t) + '</h4><ul>' + s.l.map(function (x) { return '<li>' + L(x) + '</li>'; }).join('') + '</ul></div>';
    });
    return h + '</div>';
  }

  function renderContact() {
    var u = T();
    return '<h2>' + u.contactTitle + '</h2><p class="sub">' + u.contactText + '</p><div class="contact-grid">' +
      '<a class="card" href="mailto:' + SITE.email + '"><div class="ico">✉️</div><h4>' + u.email + '</h4><p>' + u.emailSub + '</p><div class="val">' + SITE.email + '</div></a>' +
      '</div>' +
      '<div class="cta"><h4>' + u.notSure + '</h4><p>' + u.notSureText + '</p><a class="btn" href="mailto:' + SITE.email + '">' + u.writeMe + '</a></div>';
  }

  function renderTools() {
    var u = T(), tl = SITE.tools;
    var h = '<h2>' + u.tools + '</h2><p class="sub">' + L(tl.intro) + '</p><div class="grid">';
    tl.items.forEach(function (i) { h += pkgCard(i.n, L(i.t), L(i.d), null, i.price, null); });
    h += '</div><div class="cta"><h4>' + u.notSure + '</h4><p>' + u.notSureText + '</p><a class="btn" href="mailto:' + SITE.email + '">' + u.writeMe + '</a></div>';
    return h;
  }

  function folderSvg(c) {
    return '<svg viewBox="0 0 64 54" style="--c:' + c + '"><path d="M4 10a6 6 0 0 1 6-6h15l6 7h23a6 6 0 0 1 6 6v28a6 6 0 0 1-6 6H10a6 6 0 0 1-6-6z" fill="' + c + '" opacity=".55"/><rect x="4" y="18" width="56" height="32" rx="6" fill="' + c + '"/><rect x="4" y="18" width="56" height="9" rx="4" fill="#fff" opacity=".18"/></svg>';
  }
  function renderDesktop() {
    var u = T(), en = lang === 'en';
    var f = [['projects', '#ffb067', '🚀', u.projects], ['services', '#ff5a4a', '💶', u.services], ['about', '#6ee7f0', '👤', u.about], ['tools', '#3ddc84', '🛠️', u.tools]];
    var h = '<div class="os"><div class="os-icons">';
    f.forEach(function (x) { h += '<button class="os-ico" style="--c:' + x[1] + '" data-go="' + x[0] + '"><span class="ico-art">' + folderSvg(x[1]) + '<em>' + x[2] + '</em></span><span>' + x[3] + '</span></button>'; });
    h += '<button class="os-ico" style="--c:#c58bff" data-go="contact"><span class="ico-art tileart"><b>✉️</b></span><span>' + u.contact + '</span></button>';
    if (sceneOK) h += '<button class="os-ico" style="--c:#3ddc84" data-act="snake"><span class="ico-art tileart"><b>🐍</b></span><span>snake.exe</span></button>';
    h += '<button class="os-ico' + (audio.on ? '' : ' off') + '" style="--c:#ffb067" data-act="music"><span class="ico-art tileart"><b>🎵</b></span><span>music.mp3</span></button>';
    h += '</div><div class="os-widget"><b class="os-clock">--:--</b><small>' + new Date().toLocaleDateString(en ? 'en-GB' : 'bg-BG', { weekday: 'long', day: 'numeric', month: 'long' }) + '</small>' +
      '<div class="os-line">› cfxwebstudio.exe — running</div><div class="os-avail"><i></i>' + u.available + '</div></div>' +
      '<div class="os-task"><span class="start">CFX</span><span class="task-app">▣ ' + u.desktop + '</span><span class="os-clock">--:--</span></div></div>';
    return h;
  }
  var RENDER = { desktop: renderDesktop, projects: renderProjects, services: renderServices, about: renderAbout, contact: renderContact, tools: renderTools };

  /* ---------- живи карти: каскада, прожектор, tick ---------- */
  var lastHot = null;
  function decorate() {
    winBody.querySelectorAll('.card,.tile,.stk-group,.cta').forEach(function (el, i) { el.style.setProperty('--i', Math.min(i, 26)); });
    var c = winBody.querySelector('[data-count]');
    if (c && !reduceMotion) {
      var to = +c.getAttribute('data-count'), t0 = null;
      (function step(ts) { if (!t0) t0 = ts; var k = Math.min(1, (ts - t0) / 1000); c.textContent = Math.round(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(step); })(performance.now());
    }
  }
  winBody.addEventListener('pointermove', function (e) {
    var el = e.target.closest && e.target.closest('.card,.tile'); if (!el) return;
    var r = el.getBoundingClientRect(); el.style.setProperty('--mx', (e.clientX - r.left) + 'px'); el.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
  winBody.addEventListener('pointerover', function (e) {
    var el = e.target.closest && e.target.closest('.card,.tile');
    if (el && el !== lastHot) { lastHot = el; sfx('tick'); } else if (!el) lastHot = null;
  });

  var state = { open: null, sub: null, busy: false, hover: null, game: false };

  /* ---------- работен плот: вътрешна навигация ---------- */
  var winBack = document.createElement('button'); winBack.id = 'winBack'; winBack.className = 'back-btn'; winBack.style.display = 'none';
  $('.win-bar').insertBefore(winBack, winTitle);
  function showBody() {
    var n = state.sub || state.open, u = T();
    winBody.innerHTML = RENDER[n](); decorate(); winBody.scrollTop = 0;
    winBody.classList.toggle('os-mode', n === 'desktop');
    winTitle.textContent = n === 'desktop' ? 'CFXWEBSTUDIO — ' + u.desktop : (state.open === 'desktop' ? 'CFXWEBSTUDIO › ' + u[n] : u[n]);
    winBack.style.display = state.sub ? '' : 'none'; winBack.textContent = '← ' + u.desktop;
    tickClock();
  }
  function openSub(name) { if (!RENDER[name] || !state.open) return; sfx('open'); state.sub = name; showBody(); }
  function backToDesktop() { state.sub = null; sfx('close'); showBody(); }
  winBack.addEventListener('click', backToDesktop);
  function tickClock() { var d = new Date(), s = ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2); document.querySelectorAll('.os-clock').forEach(function (el) { el.textContent = s; }); }
  setInterval(tickClock, 1000);
  winBody.addEventListener('click', function (e) {
    var g = e.target.closest && e.target.closest('[data-go],[data-act]'); if (!g || state.open !== 'desktop') return;
    if (g.hasAttribute('data-go')) { openSub(g.getAttribute('data-go')); return; }
    var a = g.getAttribute('data-act');
    if (a === 'music') { setSound(!audio.on); g.classList.toggle('off', !audio.on); sfx('click'); }
    if (a === 'snake') { closeSection(); (function tryEnter(n) { if (!state.open && !state.busy) { if (sceneOK) gl.enterGame(); } else if (n < 40) setTimeout(function () { tryEnter(n + 1); }, 150); })(0); }
  });

  /* подсказка за играта */
  var gameHint = document.createElement('div'); gameHint.id = 'gamehint'; document.body.appendChild(gameHint);
  function setGameHint() {
    gameHint.innerHTML = (lang === 'en' ? '<span>↑ ← ↓ →</span> move · <kbd>SPACE</kbd> start / pause · <kbd>Esc</kbd> exit' : '<span>↑ ← ↓ →</span> движение · <kbd>SPACE</kbd> старт / пауза · <kbd>Esc</kbd> изход') + '<button id="gameExit" aria-label="exit">✕</button>';
    $('#gameExit').onclick = function () { if (sceneOK) gl.exitGame(); };
  }

  /* ---------- звук и музика (WebAudio, без файлове) ---------- */
  var audio = { ctx: null, on: false, master: null, music: null, delay: null, noise: null, timer: null, step: 0, next: 0, kicks: [] };
  var CH = [[220, 261.63, 329.63, 440], [174.61, 220, 261.63, 349.23], [261.63, 329.63, 392, 523.25], [196, 246.94, 293.66, 392]];
  var BASS = [55, 43.65, 65.41, 49];
  function audioInit() {
    if (audio.ctx) return true;
    var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return false;
    var c = audio.ctx = new AC();
    audio.master = c.createGain(); audio.master.gain.value = 0; audio.master.connect(c.destination);
    var len = Math.floor(c.sampleRate * 1.5), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    audio.noise = buf;
    audio.music = c.createGain(); audio.music.gain.value = 0.75; audio.music.connect(audio.master);
    var dl = c.createDelay(1); dl.delayTime.value = 0.34;
    var fb = c.createGain(); fb.gain.value = 0.35;
    var wet = c.createGain(); wet.gain.value = 0.5;
    dl.connect(fb); fb.connect(dl); dl.connect(wet); wet.connect(audio.music); audio.delay = dl;
    var ns = c.createBufferSource(); ns.buffer = buf; ns.loop = true;
    var lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 350;
    var ng = c.createGain(); ng.gain.value = 0.02; ns.connect(lp); lp.connect(ng); ng.connect(audio.master); ns.start();
    return true;
  }
  function tone(type, freq, t, dur, vol, cutoff, send) {
    var c = audio.ctx, o = c.createOscillator(), g = c.createGain(); o.type = type; o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol, t + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    if (cutoff) { var f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = cutoff; o.connect(f); f.connect(g); } else o.connect(g);
    g.connect(audio.music); if (send) g.connect(audio.delay);
    o.start(t); o.stop(t + dur + 0.05);
  }
  function noiseHit(t, dur, vol, type, freq, dest) {
    var c = audio.ctx, s = c.createBufferSource(); s.buffer = audio.noise;
    var f = c.createBiquadFilter(); f.type = type; f.frequency.value = freq; var g = c.createGain();
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(dest || audio.music); s.start(t, Math.random()); s.stop(t + dur + 0.02);
  }
  function playStep(st, t) {
    var c = audio.ctx, bar = (st >> 4) & 3, k = st & 15, ch = CH[bar];
    if (k === 0 || k === 7 || k === 10) {
      var o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(130, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.13);
      g.gain.setValueAtTime(0.55, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2); o.connect(g); g.connect(audio.music); o.start(t); o.stop(t + 0.22);
      audio.kicks.push(t);
    }
    if (k === 4 || k === 12) noiseHit(t, 0.14, 0.16, 'bandpass', 1900);
    if (k % 2 === 1) noiseHit(t, 0.04, 0.045, 'highpass', 7000);
    if (k === 0 || k === 3 || k === 6 || k === 10 || k === 12) tone('sawtooth', BASS[bar] * 2, t, 0.22, 0.14, 420);
    if (k === 0) ch.slice(0, 3).forEach(function (f) { tone('sawtooth', f, t, 3.2, 0.035, 800); tone('sawtooth', f * 1.006, t, 3.2, 0.03, 800); });
    if (k % 2 === 0) tone('triangle', ch[[0, 1, 2, 3, 2, 1, 3, 2][(k >> 1) & 7]] * 2, t, 0.3, 0.07, 0, true);
  }
  function startMusic() {
    var c = audio.ctx; if (audio.timer) return; audio.next = c.currentTime + 0.08;
    audio.timer = setInterval(function () {
      while (audio.next < c.currentTime + 0.3) { playStep(audio.step, audio.next); audio.next += 60 / 88 / 4; audio.step = (audio.step + 1) % 64; }
    }, 70);
  }
  function stopMusic() { clearInterval(audio.timer); audio.timer = null; }
  function kickPulse() {
    if (!audio.ctx || !audio.on) return 0;
    var now = audio.ctx.currentTime;
    while (audio.kicks.length > 1 && audio.kicks[1] <= now) audio.kicks.shift();
    var k = audio.kicks[0]; if (k === undefined || k > now) return 0;
    return Math.max(0, 1 - (now - k) / 0.2);
  }
  function setSound(on) {
    if (on && !audioInit()) return;
    audio.on = on;
    if (audio.ctx) {
      var g = audio.master.gain, t = audio.ctx.currentTime; audio.ctx.resume();
      g.cancelScheduledValues(t); g.setValueAtTime(g.value, t); g.linearRampToValueAtTime(on ? 1 : 0, t + 0.6);
      if (on) startMusic(); else setTimeout(function () { if (!audio.on) stopMusic(); }, 700);
    }
  }
  document.addEventListener('visibilitychange', function () {
    if (!audio.ctx || !audio.on) return;
    if (document.hidden) audio.ctx.suspend(); else audio.ctx.resume();
  });
  function sfx(kind) {
    if (!audio.on || !audio.ctx) return;
    var c = audio.ctx, t = c.currentTime, o, g = c.createGain(); g.connect(audio.master);
    switch (kind) {
      case 'tick':
        o = c.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(700, t); o.frequency.exponentialRampToValueAtTime(1300, t + 0.06);
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.06, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
        o.connect(g); o.start(t); o.stop(t + 0.1); break;
      case 'click':
        noiseHit(t, 0.05, 0.25, 'bandpass', 2400, audio.master); break;
      case 'open': case 'close':
        var up = (kind === 'open'); o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 110;
        var f = c.createBiquadFilter(); f.type = 'lowpass'; f.Q.value = 6;
        f.frequency.setValueAtTime(up ? 200 : 1800, t); f.frequency.exponentialRampToValueAtTime(up ? 1800 : 200, t + 0.4);
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.07, t + 0.08); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
        o.connect(f); f.connect(g); o.start(t); o.stop(t + 0.5); break;
      case 'jingle':
        [523, 659, 784, 1047, 784, 1047].forEach(function (fr, i) {
          var oo = c.createOscillator(), gg = c.createGain(); oo.type = 'square'; oo.frequency.value = fr;
          gg.gain.setValueAtTime(0.0001, t + i * 0.08); gg.gain.exponentialRampToValueAtTime(0.05, t + i * 0.08 + 0.01); gg.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.08 + 0.09);
          oo.connect(gg); gg.connect(audio.master); oo.start(t + i * 0.08); oo.stop(t + i * 0.08 + 0.1);
        }); break;
      case 'buzz':
        o = c.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 95;
        var lf = c.createBiquadFilter(); lf.type = 'lowpass'; lf.frequency.value = 500;
        g.gain.setValueAtTime(0.09, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.25); o.connect(lf); lf.connect(g); o.start(t); o.stop(t + 0.3); break;
      case 'whoosh':
        var s = c.createBufferSource(); s.buffer = audio.noise; var bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 2;
        bp.frequency.setValueAtTime(300, t); bp.frequency.exponentialRampToValueAtTime(3200, t + 0.6);
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.3, t + 0.2); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.7);
        s.connect(bp); bp.connect(g); s.start(t, Math.random()); s.stop(t + 0.75); break;
      case 'sip':
        noiseHit(t, 0.3, 0.14, 'lowpass', 700, audio.master); break;
      case 'pop':
        o = c.createOscillator(); o.type = 'sine'; o.frequency.setValueAtTime(420, t); o.frequency.exponentialRampToValueAtTime(140, t + 0.12);
        g.gain.setValueAtTime(0.2, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.14); o.connect(g); o.start(t); o.stop(t + 0.16); break;
    }
  }

  var TIPS = {
    bg: { speaker: 'Музика: вкл / изкл', neon: 'Смени цвета на неона', lamp: 'Лампа: вкл / изкл', pc: 'Turbo режим 🚀', robot: 'Кажи здрасти 👋', mug: 'Още кафе ☕', gamepad: 'Натисни START 🎮', lava: 'Смени цвета', poster1: 'Смени постера', poster2: 'Смени постера', game: 'Играй Snake 🐍' },
    en: { speaker: 'Music: on / off', neon: 'Change the neon color', lamp: 'Lamp: on / off', pc: 'Turbo mode 🚀', robot: 'Say hi 👋', mug: 'More coffee ☕', gamepad: 'Press START 🎮', lava: 'Change color', poster1: 'Change the poster', poster2: 'Change the poster', game: 'Play Snake 🐍' }
  };
  function tipFor(k) { return T()[k + 'Tip'] || TIPS[lang][k] || ''; }
  var bubbleEl = $('#bubble');

  /* ---------- превод на интерфейса ---------- */
  function applyLang(l) {
    lang = l;
    document.documentElement.lang = l;
    document.documentElement.setAttribute('data-lang', l);
    var u = T();
    $('#availText').textContent = u.available;
    $('#tagline').textContent = u.tagline;
    $('#hint').textContent = isTouch ? u.hintTouch : u.hint;
    $('#classic').textContent = u.classic;
    ['projects', 'services', 'about', 'contact', 'tools'].forEach(function (k) { $('#dock-' + k).textContent = u[k]; });
    document.querySelectorAll('[data-set-lang]').forEach(function (b) { b.classList.toggle('active', b.getAttribute('data-set-lang') === l); });
    try { document.cookie = 'site_lang=' + l + ';path=/;max-age=31536000'; } catch (e) {}
    setGameHint(); if (state.open) showBody();
  }

  /* ---------- 3D сцена ---------- */
  var gl = {};
  var sceneOK = false;

  function initScene() {
    if (THREE.ColorManagement) THREE.ColorManagement.legacyMode = false;

    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isTouch ? 1.6 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x07050a);
    scene.fog = new THREE.FogExp2(0x07050a, 0.07);

    var camera = new THREE.PerspectiveCamera(45, 1, 0.1, 60);

    /* --- помощници --- */
    function mk(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
    function tex(c) { var t = new THREE.CanvasTexture(c); t.encoding = THREE.sRGBEncoding; t.anisotropy = 8; return t; }
    function std(color, o) { o = o || {}; return new THREE.MeshStandardMaterial({ color: color, roughness: o.r !== undefined ? o.r : 0.6, metalness: o.m || 0, emissive: o.e || 0x000000, emissiveIntensity: o.ei || 1, transparent: !!o.t, opacity: o.o !== undefined ? o.o : 1 }); }
    function bas(color) { return new THREE.MeshBasicMaterial({ color: color, toneMapped: false }); }
    function box(w, h, d, mat, x, y, z, parent, shadow) {
      var me = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      me.position.set(x || 0, y || 0, z || 0);
      if (shadow !== false) { me.castShadow = true; me.receiveShadow = true; }
      if (parent) parent.add(me);
      return me;
    }
    function cyl(rt, rb, h, mat, x, y, z, parent, seg) {
      var me = new THREE.Mesh(new THREE.CylinderGeometry(rt, rb, h, seg || 32), mat);
      me.position.set(x || 0, y || 0, z || 0); me.castShadow = true; me.receiveShadow = true;
      if (parent) parent.add(me); return me;
    }
    function glowTex(r, g, b) {
      var c = mk(128, 128), x = c.getContext('2d'), gr = x.createRadialGradient(64, 64, 0, 64, 64, 64);
      gr.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',1)'); gr.addColorStop(1, 'rgba(' + r + ',' + g + ',' + b + ',0)');
      x.fillStyle = gr; x.fillRect(0, 0, 128, 128); return tex(c);
    }
    function hitBox(w, h, d, y) {
      var me = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }));
      me.position.y = y; return me;
    }

    /* --- светлини --- */
    scene.add(new THREE.HemisphereLight(0x5a4468, 0x180a0c, 0.55));
    var rim = new THREE.PointLight(0xff1a35, 1.6, 6, 1.6); rim.position.set(0, 1.4, -0.7); scene.add(rim);
    var rimL = new THREE.PointLight(0x7a3cff, 0.8, 5, 1.6); rimL.position.set(-2.4, 1.2, 0.2); scene.add(rimL);
    var screenLight = new THREE.PointLight(0xff8a9a, 0.9, 2.6, 1.6); screenLight.position.set(0, 0.75, 0.55); scene.add(screenLight);
    var flash = new THREE.PointLight(0xffe0c0, 0.8, 2.4, 1.6); flash.position.set(0, 1, -0.6); scene.add(flash);
    var flashTarget = new THREE.Vector3(0, 1, -0.6), wallPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0.72), wallPt = new THREE.Vector3();
    var sun = new THREE.DirectionalLight(0xffffff, 0.3); sun.position.set(1.5, 3.5, 3);
    sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
    var sc = sun.shadow.camera; sc.left = -3; sc.right = 3; sc.top = 3; sc.bottom = -3; sc.near = 0.5; sc.far = 12; sun.shadow.bias = -0.0008;
    scene.add(sun);

    /* --- стена, под, бюро --- */
    var wall = new THREE.Mesh(new THREE.PlaneGeometry(16, 7), std(0x120b10, { r: 0.9 }));
    wall.position.set(0, 1.8, -0.96); wall.receiveShadow = true; scene.add(wall);
    var slats = new THREE.InstancedMesh(new THREE.BoxGeometry(0.07, 4.6, 0.05), std(0xffffff, { r: 0.7 }), 90), dm = new THREE.Object3D(), cc = new THREE.Color();
    for (var i = 0; i < 90; i++) {
      dm.position.set(-6.2 + i * 0.138, 1.9, -0.93); dm.updateMatrix(); slats.setMatrixAt(i, dm.matrix);
      cc.setHSL(0.05 + Math.random() * 0.02, 0.45, 0.1 + Math.random() * 0.06); slats.setColorAt(i, cc);
    }
    slats.receiveShadow = true; scene.add(slats);
    var floor = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), std(0x0b0709, { r: 0.8 }));
    floor.rotation.x = -Math.PI / 2; floor.position.y = -2.2; floor.receiveShadow = true; scene.add(floor);

    box(4.8, 0.1, 1.9, std(0x241513, { r: 0.55 }), 0, -0.05, 0, scene);
    [[-2.2, -0.8], [2.2, -0.8], [-2.2, 0.8], [2.2, 0.8]].forEach(function (p) { box(0.1, 2.1, 0.1, std(0x0d0809), p[0], -1.1, p[1], scene); });
    box(4.6, 0.014, 0.014, bas(0xff2038), 0, 0.012, -0.93, scene, false);

    // подложка (mousepad) с лого
    var matC = mk(1024, 384), mx = matC.getContext('2d');
    mx.fillStyle = '#0c0a0e'; mx.fillRect(0, 0, 1024, 384);
    mx.strokeStyle = 'rgba(255,42,61,.16)'; mx.lineWidth = 1;
    for (var gx = 0; gx <= 1024; gx += 32) { mx.beginPath(); mx.moveTo(gx, 0); mx.lineTo(gx, 384); mx.stroke(); }
    for (var gy = 0; gy <= 384; gy += 32) { mx.beginPath(); mx.moveTo(0, gy); mx.lineTo(1024, gy); mx.stroke(); }
    mx.fillStyle = 'rgba(255,42,61,.55)'; mx.font = '800 22px Segoe UI, Arial'; mx.fillText('CFXWEBSTUDIO  //  FULL-STACK', 36, 356);
    mx.strokeStyle = '#ff2a3d'; mx.lineWidth = 5; mx.strokeRect(6, 6, 1012, 372);
    var padMat = std(0xffffff, { r: 0.85 }); padMat.map = tex(matC);
    var pad = new THREE.Mesh(new THREE.BoxGeometry(2.7, 0.008, 1.0), padMat);
    pad.position.set(0, 0.004, 0.36); pad.receiveShadow = true; scene.add(pad);

    var interactive = {};
    var hits = [];

    /* ================= МОНИТОР (Проекти) ================= */
    var mon = new THREE.Group(); mon.position.set(0, 0, -0.38); scene.add(mon);
    var plastic = std(0x14101a, { r: 0.45, m: 0.3 });
    cyl(0.17, 0.2, 0.014, std(0x1c1822, { r: 0.4, m: 0.6 }), 0, 0.007, 0, mon);
    box(0.07, 0.36, 0.04, std(0x1c1822, { r: 0.4, m: 0.6 }), 0, 0.19, -0.03, mon);
    box(1.34, 0.78, 0.045, plastic, 0, 0.76, 0, mon);
    box(0.9, 0.46, 0.07, plastic, 0, 0.76, -0.05, mon);
    var screenC = mk(1024, 576), sctx = screenC.getContext('2d'), screenT = tex(screenC);
    var scr = new THREE.Mesh(new THREE.PlaneGeometry(1.26, 0.709), new THREE.MeshBasicMaterial({ map: screenT, toneMapped: false }));
    scr.position.set(0, 0.76, 0.0235); mon.add(scr);
    var ambi = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.5), new THREE.MeshBasicMaterial({ map: glowTex(255, 30, 55), transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false }));
    ambi.position.set(0, 0.8, -0.55); mon.add(ambi);
    interactive.projects = mon;

    var code = [
      'const dev = {', '  name: "CFXWEBSTUDIO",', '  role: "Full-Stack Developer",', '  stack: ["Next.js", "Supabase", "TypeScript"],',
      '  location: "Bulgaria",', '  available: true,', '};', '',
      'export async function buildIdea(idea) {', '  const design = await sketch(idea);', '  const app = await ship(design, { fast: true });',
      '  return app; // live in days, not months', '}', '', '// click the objects on the desk ->'
    ];
    var codeTotal = code.join('\n').length;
    var KW = /^(const|export|async|function|await|return|true|false)$/;
    function drawCodeLine(x, line, px, py) {
      var re = /(\/\/.*$)|("[^"]*")|(\w+)|(\s+)|(.)/g, mt;
      while ((mt = re.exec(line))) {
        var s = mt[0], col = '#e8dede';
        if (mt[1]) col = '#6d5a62';
        else if (mt[2]) col = '#ffb067';
        else if (mt[3]) { col = KW.test(s) ? '#ff5a6e' : (/^\d+$/.test(s) ? '#ffb067' : (/^[A-Z]/.test(s) || /^(dev|design|app|idea)$/.test(s) ? '#ff9aa6' : '#e8dede')); }
        else if (mt[5]) col = '#9a8a92';
        x.fillStyle = col; x.fillText(s, px, py); px += x.measureText(s).width;
      }
      return px;
    }
    var DICONS = [['projects', '#ffb067', '🚀', 0], ['services', '#ff5a4a', '💶', 0], ['about', '#6ee7f0', '👤', 0], ['tools', '#3ddc84', '🛠️', 0], ['contact', '#c58bff', '✉️', 1], ['snake', '#3ddc84', '🐍', 1]];
    function drawMain(t, hoverAmt) {
      var x = sctx, hot = Math.min(1, (hoverAmt || 0) * 1.2), pul = 0.5 + 0.5 * Math.sin(t * 3.2);
      // тапет
      var wg = x.createLinearGradient(0, 0, 1024, 576); wg.addColorStop(0, '#14080d'); wg.addColorStop(1, '#0b0710'); x.fillStyle = wg; x.fillRect(0, 0, 1024, 576);
      var rg = x.createRadialGradient(840, 60, 10, 840, 60, 460); rg.addColorStop(0, 'rgba(255,42,61,' + (0.32 + hot * 0.15) + ')'); rg.addColorStop(1, 'rgba(255,42,61,0)'); x.fillStyle = rg; x.fillRect(0, 0, 1024, 576);
      var rg2 = x.createRadialGradient(80, 560, 10, 80, 560, 380); rg2.addColorStop(0, 'rgba(138,60,255,.26)'); rg2.addColorStop(1, 'rgba(138,60,255,0)'); x.fillStyle = rg2; x.fillRect(0, 0, 1024, 576);
      x.strokeStyle = 'rgba(255,42,61,.06)'; x.lineWidth = 1; var gs = (t * 8) % 48;
      for (var gx = -48 + gs; gx < 1024; gx += 48) { x.beginPath(); x.moveTo(gx, 0); x.lineTo(gx, 528); x.stroke(); }
      for (var gy = -48 + gs; gy < 528; gy += 48) { x.beginPath(); x.moveTo(0, gy); x.lineTo(1024, gy); x.stroke(); }
      // икони на плота
      DICONS.forEach(function (d, i) {
        var col = i % 2, row = Math.floor(i / 2), X = 44 + col * 124, Y = 36 + row * 128 + (hot > 0.04 ? Math.sin(t * 5 + i) * 2 * hot : 0), c = d[1];
        x.save(); x.shadowColor = c; x.shadowBlur = 10 + hot * 18;
        if (!d[3]) {
          x.fillStyle = c; x.globalAlpha = 0.55; rr(x, X, Y, 64, 52, 8); x.fill(); x.globalAlpha = 1; rr(x, X, Y + 12, 64, 40, 8); x.fill(); x.fillStyle = 'rgba(255,255,255,.2)'; x.fillRect(X + 2, Y + 12, 60, 9);
        } else { x.fillStyle = 'rgba(255,255,255,.08)'; rr(x, X + 4, Y, 56, 56, 14); x.fill(); x.strokeStyle = c; x.lineWidth = 2; x.stroke(); }
        x.restore();
        x.textAlign = 'center'; x.font = '26px "Segoe UI Emoji", "Apple Color Emoji", Arial'; x.fillStyle = '#fff'; x.fillText(d[2], X + 32, Y + (d[3] ? 38 : 44));
        var lab = d[0] === 'snake' ? 'snake.exe' : T()[d[0]];
        x.font = '600 16px Segoe UI, Arial'; x.fillStyle = '#e8dede'; x.shadowColor = '#000'; x.shadowBlur = 6; x.fillText(lab, X + 32, Y + 80); x.shadowBlur = 0; x.textAlign = 'left';
      });
      // прозорец с код
      var WX = 300, WY = 36, WW = 690, WH = 384;
      x.save(); x.shadowColor = 'rgba(0,0,0,.7)'; x.shadowBlur = 30; x.fillStyle = '#0f0b12'; rr(x, WX, WY, WW, WH, 10); x.fill(); x.restore();
      x.strokeStyle = 'rgba(255,255,255,.1)'; x.lineWidth = 1; rr(x, WX, WY, WW, WH, 10); x.stroke();
      x.fillStyle = '#181119'; rr(x, WX, WY, WW, 32, 10); x.fill(); x.fillRect(WX, WY + 20, WW, 12);
      ['#ff5f57', '#febc2e', '#28c840'].forEach(function (c, i) { x.fillStyle = c; x.beginPath(); x.arc(WX + 20 + i * 20, WY + 16, 5.5, 0, 7); x.fill(); });
      x.fillStyle = '#8a7a82'; x.font = '600 14px Segoe UI, Arial'; x.textAlign = 'center'; x.fillText('cfxwebstudio — index.ts', WX + WW / 2, WY + 21); x.textAlign = 'left';
      x.font = '16.5px Consolas, "Courier New", monospace';
      var typed = Math.floor(t * 30) % (codeTotal + 110), shown = 0, LH = 23, BY = WY + 62;
      for (var i = 0; i < code.length; i++) {
        var ln = code[i], left = typed - shown; shown += ln.length + 1;
        if (left <= 0) break;
        var part = ln.slice(0, Math.max(0, left));
        x.fillStyle = '#4a3c44'; x.fillText(String(i + 1), WX + 16, BY + i * LH);
        var endX = drawCodeLine(x, part, WX + 52, BY + i * LH);
        if (left < ln.length + 1 && Math.floor(t * 2.2) % 2 === 0) { x.fillStyle = '#ff2a3d'; x.fillRect(endX + 2, BY + i * LH - 15, 9, 19); }
      }
      if (typed > codeTotal && Math.floor(t * 2.2) % 2 === 0) { x.fillStyle = '#ff2a3d'; x.fillRect(WX + 52, BY + 14 * LH - 15, 9, 19); }
      // подкана за клик
      var BW = 640 + hot * 40, BH = 54 + hot * 8, BX = 512 - BW / 2 + 0, BYY = 446;
      x.save(); x.shadowColor = '#ff2a3d'; x.shadowBlur = 14 + pul * 18 + hot * 20;
      x.fillStyle = hot > 0.3 ? '#ff2a3d' : 'rgba(255,42,61,' + (0.16 + pul * 0.12) + ')'; rr(x, BX, BYY, BW, BH, BH / 2); x.fill();
      x.strokeStyle = 'rgba(255,42,61,' + (0.6 + pul * 0.4) + ')'; x.lineWidth = 2; x.stroke(); x.restore();
      x.textAlign = 'center'; x.fillStyle = '#fff'; x.font = '800 ' + (22 + hot * 2) + 'px Segoe UI, Arial';
      x.fillText('▶  ' + bg('КЛИКНИ МОНИТОРА — ОТВОРИ РАБОТНИЯ ПЛОТ', 'CLICK THE MONITOR — OPEN THE DESKTOP'), 512, BYY + BH / 2 + 8); x.textAlign = 'left';
      // лента
      x.fillStyle = 'rgba(6,4,8,.92)'; x.fillRect(0, 528, 1024, 48); x.fillStyle = 'rgba(255,255,255,.08)'; x.fillRect(0, 528, 1024, 1);
      var sg = x.createLinearGradient(0, 534, 0, 570); sg.addColorStop(0, '#ff2a3d'); sg.addColorStop(1, '#7a0014'); x.fillStyle = sg; rr(x, 12, 535, 66, 34, 8); x.fill();
      x.fillStyle = '#fff'; x.font = '800 16px Consolas, monospace'; x.textAlign = 'center'; x.fillText('CFX', 45, 558);
      x.textAlign = 'left'; x.fillStyle = '#9a8a92'; x.font = '600 15px Segoe UI, Arial'; x.fillText('▣ ' + T().desktop, 98, 558);
      var dn = new Date(), clk = ('0' + dn.getHours()).slice(-2) + ':' + ('0' + dn.getMinutes()).slice(-2);
      x.textAlign = 'right'; x.fillStyle = '#e8dede'; x.font = '600 16px Consolas, monospace'; x.fillText(clk, 1008, 558); x.textAlign = 'left';
      var vg = x.createRadialGradient(512, 288, 260, 512, 288, 660); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.4)');
      x.fillStyle = vg; x.fillRect(0, 0, 1024, 576);
      screenT.needsUpdate = true;
    }
    drawMain(40);

    /* ================= КЛАВИАТУРА (Услуги) ================= */
    var kb = new THREE.Group(); kb.position.set(0, 0, 0.5); scene.add(kb);
    box(1.04, 0.034, 0.37, std(0x0c0a0d, { r: 0.4, m: 0.5 }), 0, 0.017, 0, kb);
    var rgbC = mk(256, 64), rgx = rgbC.getContext('2d'), rgbT = tex(rgbC);
    var rgbP = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.33), new THREE.MeshBasicMaterial({ map: rgbT, toneMapped: false }));
    rgbP.rotation.x = -Math.PI / 2; rgbP.position.y = 0.0345; kb.add(rgbP);
    function drawRGB(t) {
      for (var xx = 0; xx < 256; xx += 4) {
        var hue = (350 + 38 * Math.sin(xx * 0.045 - t * 2.4) + 16 * Math.sin(t * 0.7) + 360) % 360;
        rgx.fillStyle = 'hsl(' + hue + ',100%,52%)'; rgx.fillRect(xx, 0, 4, 64);
      }
      rgbT.needsUpdate = true;
    }
    drawRGB(0);
    var rows = [[14, -0.125], [14, -0.06], [13, 0.005], [12, 0.07]];
    var keys = new THREE.InstancedMesh(new THREE.BoxGeometry(0.05, 0.022, 0.05), std(0x17131a, { r: 0.5 }), 14 + 14 + 13 + 12 + 7), ki = 0, kd = new THREE.Object3D();
    rows.forEach(function (r) {
      for (var c = 0; c < r[0]; c++) { kd.position.set(-0.46 + c * 0.0665 + (r[1] > -0.1 ? 0.012 : 0), 0.046, r[1]); kd.scale.set(1, 1, 1); kd.updateMatrix(); keys.setMatrixAt(ki++, kd.matrix); }
    });
    for (var c2 = 0; c2 < 7; c2++) {
      var sp = (c2 === 3);
      kd.position.set(sp ? 0.0 : (c2 < 3 ? -0.46 + c2 * 0.0665 + 0.02 : 0.28 + (c2 - 4) * 0.0665 + 0.07), 0.046, 0.135);
      kd.scale.set(sp ? 5.6 : 1, 1, 1); kd.updateMatrix(); keys.setMatrixAt(ki++, kd.matrix);
    }
    keys.castShadow = true; keys.receiveShadow = true; kb.add(keys);
    kb.add(hitBox(1.1, 0.12, 0.42, 0.05));
    interactive.services = kb;

    // мишка
    var mouse = new THREE.Group(); mouse.position.set(0.82, 0, 0.52); scene.add(mouse);
    var mBody = new THREE.Mesh(new THREE.CapsuleGeometry(0.033, 0.06, 6, 16), std(0x14101a, { r: 0.4, m: 0.4 })); mBody.rotation.x = Math.PI / 2; mBody.scale.set(1, 1, 0.55); mBody.position.y = 0.02; mBody.castShadow = true; mouse.add(mBody);
    box(0.012, 0.004, 0.07, bas(0xff2038), 0, 0.034, 0.0, mouse, false);
    scene.add(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0.82, 0.012, 0.46), new THREE.Vector3(0.82, 0.012, 0.2), new THREE.Vector3(0.5, 0.012, -0.1), new THREE.Vector3(0.2, 0.012, -0.5)]), 24, 0.004, 6), std(0x0a0809)));

    // геймпад (декор)
    var pad2 = new THREE.Group(); pad2.position.set(0.58, 0, 0.84); pad2.rotation.y = -0.35; scene.add(pad2);
    var padMat2 = std(0x15111a, { r: 0.4, m: 0.3 });
    box(0.16, 0.026, 0.085, padMat2, 0, 0.013, 0, pad2);
    [-1, 1].forEach(function (sx) { var gr = box(0.04, 0.026, 0.07, padMat2, sx * 0.075, 0.013, 0.03, pad2); gr.rotation.y = sx * 0.3; });
    [[-0.04, 0.0], [0.03, 0.018]].forEach(function (p) { cyl(0.013, 0.015, 0.016, std(0x0a0809, { r: 0.6 }), p[0], 0.032, p[1], pad2, 16); });
    box(0.03, 0.006, 0.01, std(0x0a0809), 0.04 * -1.2, 0.028, -0.02, pad2); box(0.01, 0.006, 0.03, std(0x0a0809), 0.04 * -1.2, 0.028, -0.02, pad2);
    [[0.05, -0.022, 0xff2038], [0.07, -0.01, 0xffb067], [0.05, 0.002, 0xffffff], [0.03, -0.01, 0xff5a8a]].forEach(function (b) { cyl(0.006, 0.006, 0.006, bas(b[2]), b[0], 0.029, b[1], pad2, 12); });
    box(0.04, 0.004, 0.006, bas(0xff2038), 0, 0.027, 0.04, pad2, false);
    pad2.add(hitBox(0.24, 0.08, 0.14, 0.03));

    /* ================= СЛУШАЛКИ (За мен) ================= */
    var hp = new THREE.Group(); hp.position.set(-1.0, 0, 0.32); hp.rotation.y = 0.5; scene.add(hp);
    cyl(0.085, 0.095, 0.016, std(0x1c1822, { r: 0.4, m: 0.5 }), 0, 0.008, 0, hp);
    cyl(0.011, 0.011, 0.34, std(0x1c1822, { r: 0.4, m: 0.5 }), 0, 0.18, 0, hp);
    var band = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.015, 12, 48, Math.PI), std(0x15111a, { r: 0.5, m: 0.2 })); band.position.y = 0.2; band.castShadow = true; hp.add(band);
    box(0.06, 0.012, 0.034, bas(0xff2038), 0, 0.36, 0, hp, false);
    [-1, 1].forEach(function (s) {
      var cup = cyl(0.075, 0.075, 0.05, std(0x15111a, { r: 0.45, m: 0.3 }), s * 0.165, 0.2, 0, hp); cup.rotation.z = Math.PI / 2;
      var ring = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.006, 8, 32), bas(0xff2038)); ring.position.set(s * 0.192, 0.2, 0); ring.rotation.y = Math.PI / 2; hp.add(ring);
      var cush = cyl(0.07, 0.07, 0.022, std(0x0a0809, { r: 0.9 }), s * 0.138, 0.2, 0, hp); cush.rotation.z = Math.PI / 2;
    });
    hp.add(hitBox(0.5, 0.5, 0.3, 0.22));
    interactive.about = hp;

    /* ================= ТЕЛЕФОН (Контакти) ================= */
    var ph = new THREE.Group(); ph.position.set(1.28, 0, 0.58); ph.rotation.y = -0.4; scene.add(ph);
    box(0.11, 0.02, 0.1, std(0x1c1822, { r: 0.4, m: 0.5 }), 0, 0.01, -0.01, ph);
    var phBody = box(0.088, 0.175, 0.01, std(0x0d0d12, { r: 0.3, m: 0.6 }), 0, 0.105, 0, ph); phBody.rotation.x = -0.32;
    var phC = mk(256, 512), phx = phC.getContext('2d'), phT = tex(phC);
    var phScr = new THREE.Mesh(new THREE.PlaneGeometry(0.078, 0.158), new THREE.MeshBasicMaterial({ map: phT, toneMapped: false }));
    phScr.position.set(0, 0.105, 0.0056); phScr.rotation.x = -0.32; ph.add(phScr);
    var phLight = new THREE.PointLight(0xff3050, 0.5, 1.2, 1.6); phLight.position.set(0, 0.16, 0.12); ph.add(phLight);
    function drawPhone(t) {
      var x = phx, now = new Date();
      var g = x.createLinearGradient(0, 0, 0, 512); g.addColorStop(0, '#2a0610'); g.addColorStop(1, '#0a0508'); x.fillStyle = g; x.fillRect(0, 0, 256, 512);
      x.fillStyle = '#fff'; x.textAlign = 'center'; x.font = '700 64px Segoe UI, Arial';
      x.fillText(('0' + now.getHours()).slice(-2) + ':' + ('0' + now.getMinutes()).slice(-2), 128, 110);
      x.font = '600 17px Segoe UI, Arial'; x.fillStyle = '#c9a0a8';
      x.fillText(now.toLocaleDateString(lang === 'bg' ? 'bg-BG' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' }), 128, 142);
      var pulse = 0.5 + 0.5 * Math.sin(t * 3);
      x.fillStyle = 'rgba(255,255,255,' + (0.1 + 0.07 * pulse) + ')'; x.fillRect(18, 190, 220, 120);
      x.strokeStyle = '#ff5a6e'; x.lineWidth = 4; x.strokeRect(38, 214, 52, 36); x.beginPath(); x.moveTo(38, 214); x.lineTo(64, 236); x.lineTo(90, 214); x.stroke();
      x.textAlign = 'left'; x.fillStyle = '#fff'; x.font = '700 20px Segoe UI, Arial'; x.fillText(lang === 'bg' ? 'Нов проект?' : 'New project?', 104, 228);
      x.fillStyle = '#d8b0b8'; x.font = '15px Segoe UI, Arial'; x.fillText('wellecfx@gmail.com', 38, 280);
      x.fillStyle = '#ff2a3d'; x.beginPath(); x.arc(128, 460, 6 + pulse * 2, 0, 7); x.fill();
      phT.needsUpdate = true; phLight.intensity = 0.35 + 0.35 * pulse;
    }
    drawPhone(0);
    ph.add(hitBox(0.24, 0.3, 0.2, 0.13));
    interactive.contact = ph;

    /* ================= ДЕКОР ================= */
    var mon2 = new THREE.Group(); mon2.position.set(-1.12, 0, -0.5); mon2.rotation.y = 0.42; scene.add(mon2);
    cyl(0.12, 0.14, 0.012, std(0x1c1822, { r: 0.4, m: 0.6 }), 0, 0.006, 0, mon2);
    box(0.05, 0.3, 0.035, std(0x1c1822, { r: 0.4, m: 0.6 }), 0, 0.16, -0.03, mon2);
    box(0.5, 0.86, 0.04, plastic, 0, 0.64, 0, mon2);
    var s2C = mk(480, 820), s2x = s2C.getContext('2d'), s2T = tex(s2C);
    var scr2 = new THREE.Mesh(new THREE.PlaneGeometry(0.46, 0.82), new THREE.MeshBasicMaterial({ map: s2T, toneMapped: false })); scr2.position.set(0, 0.64, 0.021); mon2.add(scr2);
    /* --- мини игра Snake на втория монитор (реклама) --- */
    var G = { mode: 'demo', focus: false, paused: false, cols: 20, rows: 20, cs: 22, ox: 20, oy: 112, snake: [], dir: [1, 0], q: [], food: [0, 0], score: 0, best: 0, last: 0, flash: 0 };
    try { G.best = +localStorage.getItem('cfx_snake_best') || 0; } catch (e) {}
    function gFood() { for (var n = 0; n < 600; n++) { var fx = Math.floor(Math.random() * G.cols), fy = Math.floor(Math.random() * G.rows); if (!G.snake.some(function (s) { return s[0] === fx && s[1] === fy; })) { G.food = [fx, fy]; return; } } }
    function gReset() { G.snake = [[8, 10], [7, 10], [6, 10]]; G.dir = [1, 0]; G.q = []; G.score = 0; G.paused = false; gFood(); }
    function gHit(x, y) { if (x < 0 || y < 0 || x >= G.cols || y >= G.rows) return true; for (var i = 0; i < G.snake.length - 1; i++) if (G.snake[i][0] === x && G.snake[i][1] === y) return true; return false; }
    function gAI() {
      var h = G.snake[0], best = null, bd = 1e9;
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(function (d) {
        if (d[0] === -G.dir[0] && d[1] === -G.dir[1]) return;
        var nx = h[0] + d[0], ny = h[1] + d[1]; if (gHit(nx, ny)) return;
        var ds = Math.abs(nx - G.food[0]) + Math.abs(ny - G.food[1]) + Math.random() * 0.6; if (ds < bd) { bd = ds; best = d; }
      });
      if (best) G.dir = best;
    }
    function gAdvance() {
      if (G.mode === 'demo') gAI();
      else if (G.q.length) { var d = G.q.shift(); if (!(d[0] === -G.dir[0] && d[1] === -G.dir[1])) G.dir = d; }
      var h = G.snake[0], nx = h[0] + G.dir[0], ny = h[1] + G.dir[1];
      if (gHit(nx, ny)) {
        if (G.mode === 'play') { G.mode = 'over'; G.flash = 1; sfx('buzz'); if (G.score > G.best) { G.best = G.score; try { localStorage.setItem('cfx_snake_best', G.best); } catch (e) {} } }
        else gReset();
        return;
      }
      G.snake.unshift([nx, ny]);
      if (nx === G.food[0] && ny === G.food[1]) { G.score++; if (G.mode === 'play') sfx('pop'); gFood(); } else G.snake.pop();
      if (G.mode === 'demo' && G.snake.length > 34) gReset();
    }
    function gameStep(t) {
      if (G.mode === 'over' || G.mode === 'ready' || G.paused) return;
      var iv = G.mode === 'play' ? Math.max(0.06, 0.12 - G.score * 0.003) : 0.085;
      if (t - G.last > iv) { G.last = t; gAdvance(); }
    }
    function gameStart() {
      if (!G.focus) return;
      if (G.mode === 'play') { G.paused = !G.paused; sfx('tick'); return; }
      gReset(); G.mode = 'play'; sfx('jingle');
    }
    function gameDir(d) { if (G.mode !== 'play' || G.paused) return; if (G.q.length < 2) G.q.push(d); }
    function enterGame() {
      if (state.open || state.game) return;
      state.game = true; state.hover = null; G.focus = true; G.mode = 'ready'; gReset();
      tooltip.classList.remove('show'); canvas.classList.remove('pointer'); hideBubble(); sfx('click'); sfx('whoosh');
      body.classList.add('gaming'); flyTo('game', 1.0);
    }
    function exitGame() {
      if (!state.game) return;
      state.game = false; G.focus = false; G.mode = 'demo'; gReset(); sfx('close');
      body.classList.remove('gaming'); flyTo('home', 1.0);
    }
    gReset();
    function rr(x, X, Y, W, H, R) { x.beginPath(); x.moveTo(X + R, Y); x.arcTo(X + W, Y, X + W, Y + H, R); x.arcTo(X + W, Y + H, X, Y + H, R); x.arcTo(X, Y + H, X, Y, R); x.arcTo(X, Y, X + W, Y, R); x.closePath(); }
    function drawS2(t) {
      var x = s2x, cs = G.cs, ox = G.ox, oy = G.oy, bw = G.cols * cs, bh = G.rows * cs, pul = 0.5 + 0.5 * Math.sin(t * 4);
      x.textAlign = 'left'; x.fillStyle = '#0a070d'; x.fillRect(0, 0, 480, 820);
      x.fillStyle = '#ff2a3d'; x.shadowColor = '#ff2a3d'; x.shadowBlur = 14; x.font = '800 36px Segoe UI, Arial'; x.fillText('SNAKE', 22, 52); x.shadowBlur = 0;
      x.fillStyle = '#8a7a82'; x.font = '600 14px Consolas, monospace'; x.fillText('CFXWEBSTUDIO // ARCADE', 24, 78);
      x.textAlign = 'right'; x.fillStyle = '#fff'; x.font = '800 34px Consolas, monospace'; x.fillText(('00' + G.score).slice(-3), 458, 52);
      x.fillStyle = '#8a7a82'; x.font = '600 14px Consolas, monospace'; x.fillText('BEST ' + G.best, 458, 78); x.textAlign = 'left';
      // дъска
      x.fillStyle = '#110b12'; rr(x, ox - 4, oy - 4, bw + 8, bh + 8, 8); x.fill();
      x.strokeStyle = G.mode === 'play' ? 'rgba(255,42,61,.9)' : 'rgba(255,42,61,.45)'; x.lineWidth = 2; x.shadowColor = '#ff2a3d'; x.shadowBlur = G.mode === 'play' ? 14 : 6; x.stroke(); x.shadowBlur = 0;
      x.fillStyle = 'rgba(255,255,255,.045)';
      for (var gx = 0; gx < G.cols; gx++) for (var gy = 0; gy < G.rows; gy++) if ((gx + gy) % 2 === 0) x.fillRect(ox + gx * cs, oy + gy * cs, cs, cs);
      var fx = ox + G.food[0] * cs + cs / 2, fy = oy + G.food[1] * cs + cs / 2;
      x.fillStyle = '#ffb067'; x.shadowColor = '#ff7a30'; x.shadowBlur = 16; x.beginPath(); x.arc(fx, fy, 6 + pul * 2.2, 0, 6.283); x.fill(); x.shadowBlur = 0;
      var n = G.snake.length, dim = G.mode === 'demo' ? 0.8 : 1;
      for (var i = n - 1; i >= 0; i--) {
        var s = G.snake[i], k = i / Math.max(1, n - 1);
        x.fillStyle = i === 0 ? '#ffffff' : 'rgba(' + Math.round(255 - k * 120) + ',' + Math.round(42 + (1 - k) * 30) + ',' + Math.round(61 + k * 40) + ',' + dim + ')';
        if (i === 0) { x.shadowColor = '#ff2a3d'; x.shadowBlur = 12; }
        rr(x, ox + s[0] * cs + 2, oy + s[1] * cs + 2, cs - 4, cs - 4, 6); x.fill(); x.shadowBlur = 0;
      }
      var cx = ox + bw / 2, cy = oy + bh / 2;
      if (G.mode === 'demo') {
        x.fillStyle = 'rgba(10,7,13,.72)'; rr(x, ox + 20, oy + bh - 52, bw - 40, 36, 10); x.fill();
        x.fillStyle = 'rgba(255,200,170,' + (0.6 + pul * 0.4) + ')'; x.font = '700 15px Segoe UI, Arial'; x.textAlign = 'center';
        x.fillText(bg('▶ кликни монитора и играй', '▶ click the monitor to play'), cx, oy + bh - 29); x.textAlign = 'left';
      } else if (G.mode === 'ready' || G.mode === 'over' || G.paused) {
        x.fillStyle = 'rgba(10,7,13,.78)'; x.fillRect(ox, oy, bw, bh); x.textAlign = 'center';
        if (G.mode === 'over') {
          x.fillStyle = '#ff2a3d'; x.shadowColor = '#ff2a3d'; x.shadowBlur = 18; x.font = '800 40px Segoe UI, Arial'; x.fillText('GAME OVER', cx, cy - 30); x.shadowBlur = 0;
          x.fillStyle = '#fff'; x.font = '700 22px Consolas, monospace'; x.fillText(bg('Резултат: ', 'Score: ') + G.score + (G.score >= G.best && G.score > 0 ? '  ★ BEST' : ''), cx, cy + 12);
        } else if (G.paused) { x.fillStyle = '#fff'; x.font = '800 38px Segoe UI, Arial'; x.fillText(bg('ПАУЗА', 'PAUSED'), cx, cy - 10); }
        else { x.fillStyle = '#fff'; x.font = '800 40px Segoe UI, Arial'; x.fillText('SNAKE', cx, cy - 46); x.fillStyle = '#9a8a92'; x.font = '600 22px Consolas, monospace'; x.fillText('↑  ←  ↓  →', cx, cy - 6); }
        x.fillStyle = 'rgba(255,176,103,' + (0.55 + pul * 0.45) + ')'; x.font = '800 24px Consolas, monospace';
        x.fillText(G.paused ? '[SPACE]' : (G.mode === 'over' ? bg('[SPACE] нова игра', '[SPACE] play again') : bg('[SPACE] старт', '[SPACE] start')), cx, cy + (G.mode === 'ready' ? 48 : 62)); x.textAlign = 'left';
      }
      if (G.flash > 0) { x.fillStyle = 'rgba(255,42,61,' + (G.flash * 0.5) + ')'; x.fillRect(ox, oy, bw, bh); G.flash = Math.max(0, G.flash - 0.06); }
      // рекламен панел
      var py = 578;
      var gr = x.createLinearGradient(0, py, 0, 800); gr.addColorStop(0, 'rgba(255,42,61,.22)'); gr.addColorStop(1, 'rgba(255,42,61,.04)');
      x.fillStyle = gr; rr(x, 20, py, 440, 220, 14); x.fill(); x.strokeStyle = 'rgba(255,42,61,.5)'; x.lineWidth = 1.5; x.stroke();
      x.textAlign = 'center'; x.fillStyle = '#fff'; x.shadowColor = '#ff2a3d'; x.shadowBlur = 12; x.font = '800 33px Segoe UI, Arial'; x.fillText('CFXWEBSTUDIO', 240, py + 52); x.shadowBlur = 0;
      x.fillStyle = '#d8cccd'; x.font = '600 17px Segoe UI, Arial'; x.fillText(bg('Сайтове · Игри · Автоматизации', 'Websites · Games · Automation'), 240, py + 84);
      x.fillStyle = 'rgba(255,255,255,.12)'; x.fillRect(60, py + 102, 360, 1);
      x.fillStyle = '#e8dede'; x.font = '600 18px Segoe UI, Arial'; x.fillText(bg('Харесва ли ти играта?', 'Like this game?'), 240, py + 134);
      x.fillStyle = 'rgba(255,176,103,' + (0.7 + pul * 0.3) + ')'; x.font = '800 22px Segoe UI, Arial'; x.fillText(bg('Мога да направя твоята ▸', 'I can build yours ▸'), 240, py + 166);
      x.fillStyle = '#8a7a82'; x.font = '600 15px Consolas, monospace'; x.fillText(SITE.email, 240, py + 198); x.textAlign = 'left';
      s2T.needsUpdate = true;
    }
    drawS2(0);
    mon2.add(hitBox(0.6, 0.95, 0.2, 0.64));

    var pc = new THREE.Group(); pc.position.set(1.95, 0, -0.42); pc.rotation.y = -0.38; scene.add(pc);
    box(0.28, 0.58, 0.5, std(0x0c0a0e, { r: 0.35, m: 0.6 }), 0, 0.29, 0, pc);
    var glass = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.52), std(0x16101c, { r: 0.1, m: 0.2, t: true, o: 0.5 })); glass.position.set(0, 0.29, 0.2515); pc.add(glass);
    var fans = [];
    [0.1, 0.29, 0.48].forEach(function (yy) {
      var f = new THREE.Group(); f.position.set(0, yy, 0.255); pc.add(f);
      f.add(new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.01, 8, 32), bas(0xff2038)));
      for (var b = 0; b < 7; b++) { var bl = box(0.014, 0.065, 0.004, std(0x221826, { r: 0.5 }), 0, 0, 0, null, false); bl.position.set(Math.sin(b / 7 * 6.283) * 0.036, Math.cos(b / 7 * 6.283) * 0.036, 0); bl.rotation.z = -b / 7 * 6.283; f.add(bl); }
      fans.push(f);
    });
    var pcLight = new THREE.PointLight(0xff1a35, 0.9, 1.6, 1.6); pcLight.position.set(0, 0.29, 0.4); pc.add(pcLight);
    pc.add(hitBox(0.36, 0.66, 0.6, 0.31));

    var lamp = new THREE.Group(); lamp.position.set(-2.1, 0, -0.35); scene.add(lamp);
    var lampMat = std(0x0e0b10, { r: 0.35, m: 0.7 });
    cyl(0.13, 0.15, 0.03, lampMat, 0, 0.015, 0, lamp);
    var a1 = new THREE.Group(); a1.position.set(0, 0.03, 0); a1.rotation.z = -0.3; lamp.add(a1);
    cyl(0.012, 0.012, 0.75, lampMat, 0, 0.375, 0, a1);
    var a2 = new THREE.Group(); a2.position.set(0, 0.75, 0); a2.rotation.z = -1.1; a1.add(a2);
    cyl(0.012, 0.012, 0.52, lampMat, 0, 0.26, 0, a2);
    var head = new THREE.Group(); head.position.set(0, 0.52, 0); a2.add(head);
    var cone = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.2, 28, 1, true), new THREE.MeshStandardMaterial({ color: 0x0e0b10, roughness: 0.4, metalness: 0.7, side: THREE.DoubleSide })); cone.castShadow = true; head.add(cone);
    var bulb = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), bas(0xffc58a)); bulb.position.y = -0.06; head.add(bulb);
    head.add(hitBox(0.3, 0.3, 0.3, -0.05));
    var lampSpot = new THREE.SpotLight(0xffa860, 2.6, 7, 0.75, 0.7, 1.4); lampSpot.castShadow = true; lampSpot.shadow.mapSize.set(1024, 1024); lampSpot.shadow.bias = -0.0005; scene.add(lampSpot);
    var lampTarget = new THREE.Object3D(); lampTarget.position.set(-0.4, 0, 0.35); scene.add(lampTarget); lampSpot.target = lampTarget;

    var mug = new THREE.Group(); mug.position.set(-0.55, 0, 0.7); scene.add(mug);
    cyl(0.045, 0.04, 0.1, std(0x1f1a24, { r: 0.35 }), 0, 0.05, 0, mug);
    cyl(0.0455, 0.0455, 0.02, std(0xff2a3d, { r: 0.4 }), 0, 0.06, 0, mug);
    var handle = new THREE.Mesh(new THREE.TorusGeometry(0.028, 0.007, 8, 16, Math.PI), std(0x1f1a24, { r: 0.35 })); handle.position.set(0.045, 0.05, 0); handle.rotation.z = -Math.PI / 2; mug.add(handle);
    mug.add(hitBox(0.14, 0.16, 0.14, 0.07));
    var steamTex = glowTex(255, 255, 255), steam = [];
    for (var s = 0; s < 7; s++) { var sp2 = new THREE.Sprite(new THREE.SpriteMaterial({ map: steamTex, transparent: true, opacity: 0, depthWrite: false })); sp2.userData.p = s / 7; sp2.scale.set(0.05, 0.05, 1); mug.add(sp2); steam.push(sp2); }

    var neonC = mk(1024, 256), nx = neonC.getContext('2d'), neonT = tex(neonC);
    var NEON = [['#ff3550', '#ff1a3a', 0xff1a3a, [255, 30, 55]], ['#35e0ff', '#00b8ff', 0x00b8ff, [0, 184, 255]], ['#c58bff', '#8a3cff', 0x8a3cff, [138, 60, 255]], ['#6dff9f', '#00e060', 0x00e060, [0, 224, 96]]], neonIdx = 0;
    function drawNeon(i) {
      var col = NEON[i]; nx.clearRect(0, 0, 1024, 256); nx.textAlign = 'center'; nx.textBaseline = 'middle'; nx.font = '800 104px "Segoe UI", Arial, sans-serif';
      [60, 36, 20, 8].forEach(function (b) { nx.shadowColor = col[1]; nx.shadowBlur = b; nx.fillStyle = col[0]; nx.fillText('CFXWEBSTUDIO', 512, 132); });
      nx.shadowBlur = 4; nx.shadowColor = '#fff'; nx.fillStyle = '#ffffff'; nx.globalAlpha = 0.85; nx.fillText('CFXWEBSTUDIO', 512, 132); nx.globalAlpha = 1; neonT.needsUpdate = true;
    }
    drawNeon(0);
    var neonG = new THREE.Group(); neonG.userData.noScale = true; scene.add(neonG);
    var neon = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 0.6), new THREE.MeshBasicMaterial({ map: neonT, transparent: true, toneMapped: false, depthWrite: false }));
    neon.position.set(0, 1.78, -0.9); neonG.add(neon);
    var neonLight = new THREE.PointLight(0xff1a3a, 1.1, 4, 1.6); neonLight.position.set(0, 1.78, -0.5); scene.add(neonLight);

    // постери (пред летвите, за да се виждат) — клик сменя съдържанието
    function poster(x, y, w, h, sets, drawFn) {
      var c = mk(300, Math.round(300 * h / w)), cx = c.getContext('2d'), pt = tex(c), g = new THREE.Group(), idx = 0; g.userData.noScale = true; scene.add(g);
      function redraw() { cx.clearRect(0, 0, c.width, c.height); drawFn(cx, c.width, c.height, sets[idx], idx); pt.needsUpdate = true; }
      redraw();
      box(w + 0.05, h + 0.05, 0.02, std(0x0b080c, { r: 0.5 }), x, y, -0.885, g);
      var pl = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshStandardMaterial({ map: pt, roughness: 0.8 })); pl.position.set(x, y, -0.872); g.add(pl);
      g.userData.next = function () { idx = (idx + 1) % sets.length; redraw(); };
      return g;
    }
    var PG = [['#ff2a3d', '#3a0614'], ['#35e0ff', '#06223a'], ['#ffb067', '#3a1a06'], ['#c58bff', '#1a063a']];
    var poster1 = poster(-1.55, 1.5, 0.5, 0.7, [['SHIP', 'IT.', 'fast. clean. live.'], ['LESS', 'BUGS.', 'test. fix. repeat.'], ['MORE', 'COFFEE.', 'runs on caffeine'], ['CODE', 'WINS.', 'ideas to products']], function (x, w, h, st, i) {
      var g = x.createLinearGradient(0, 0, w, h); g.addColorStop(0, PG[i % 4][0]); g.addColorStop(1, PG[i % 4][1]); x.fillStyle = g; x.fillRect(0, 0, w, h);
      x.fillStyle = '#fff'; x.font = '800 84px Segoe UI, Arial'; x.textAlign = 'center'; x.fillText(st[0], w / 2, h / 2 - 10); x.fillText(st[1], w / 2, h / 2 + 90);
      x.font = '600 20px Consolas, monospace'; x.fillText(st[2], w / 2, h - 36);
    });
    var poster2 = poster(-2.25, 1.42, 0.42, 0.56, [['while (alive) {', '  code();', '  coffee();', '  ship();', '}'], ['if (bug) {', '  panic();', '} else {', '  deploy();', '}'], ['git add .', 'git commit', 'git push', '// done ✔', '']], function (x, w, h, st, i) {
      x.fillStyle = '#0d0a10'; x.fillRect(0, 0, w, h); x.fillStyle = ['#ff5a6e', '#35e0ff', '#6dff9f'][i % 3]; x.font = '600 26px Consolas, monospace'; x.textAlign = 'left';
      st.forEach(function (l, j) { x.fillText(l, 22, 70 + j * 40); });
      x.strokeStyle = '#ff2a3d'; x.lineWidth = 4; x.strokeRect(10, 10, w - 20, h - 20);
    });

    // стенен часовник (показва реалното време)
    var clkC = mk(256, 256), clx = clkC.getContext('2d'), clkT = tex(clkC);
    var clock = new THREE.Group(); clock.position.set(2.35, 1.72, -0.88); scene.add(clock);
    var clkFace = new THREE.Mesh(new THREE.CircleGeometry(0.15, 40), new THREE.MeshBasicMaterial({ map: clkT, toneMapped: false })); clock.add(clkFace);
    var clkRing = new THREE.Mesh(new THREE.TorusGeometry(0.155, 0.012, 8, 40), bas(0xff2038)); clock.add(clkRing);
    function drawClock() {
      var d = new Date(), x = clx; x.fillStyle = '#0b080d'; x.fillRect(0, 0, 256, 256);
      x.strokeStyle = '#7a5a62'; x.lineWidth = 4; for (var i = 0; i < 12; i++) { var a = i / 12 * 6.283; x.beginPath(); x.moveTo(128 + Math.sin(a) * 104, 128 - Math.cos(a) * 104); x.lineTo(128 + Math.sin(a) * 116, 128 - Math.cos(a) * 116); x.stroke(); }
      function hand(a, len, wd, col) { x.strokeStyle = col; x.lineWidth = wd; x.lineCap = 'round'; x.beginPath(); x.moveTo(128, 128); x.lineTo(128 + Math.sin(a) * len, 128 - Math.cos(a) * len); x.stroke(); }
      var sec = d.getSeconds(), mi = d.getMinutes() + sec / 60, hr = (d.getHours() % 12) + mi / 60;
      hand(hr / 12 * 6.283, 62, 9, '#f4eeee'); hand(mi / 60 * 6.283, 92, 6, '#f4eeee'); hand(sec / 60 * 6.283, 100, 3, '#ff2a3d');
      x.fillStyle = '#ff2a3d'; x.beginPath(); x.arc(128, 128, 8, 0, 7); x.fill(); clkT.needsUpdate = true;
    }
    drawClock();

    box(1.3, 0.04, 0.22, std(0x2b1a14, { r: 0.6 }), 1.75, 1.35, -0.82, scene);
    var bookCols = [0xff2a3d, 0x2a1a3a, 0x3a2a1a, 0x1a2a3a, 0x7a1424, 0x241830];
    for (var bk = 0; bk < 6; bk++) box(0.05 + (bk % 3) * 0.01, 0.2 + (bk % 2) * 0.05, 0.15, std(bookCols[bk], { r: 0.7 }), 1.3 + bk * 0.062, 1.47 + (bk % 2) * 0.025, -0.82, scene);
    var rob = new THREE.Group(); rob.position.set(1.95, 1.37, -0.8); scene.add(rob);
    box(0.13, 0.11, 0.1, std(0xff6a2a, { r: 0.5 }), 0, 0.055, 0, rob);
    box(0.15, 0.12, 0.11, std(0xff6a2a, { r: 0.5 }), 0, 0.17, 0, rob);
    box(0.11, 0.07, 0.01, std(0x120a10), 0, 0.17, 0.057, rob, false);
    var eyeL = box(0.02, 0.02, 0.012, bas(0x5dff9a), -0.027, 0.18, 0.064, rob, false), eyeR = box(0.02, 0.02, 0.012, bas(0x5dff9a), 0.027, 0.18, 0.064, rob, false);
    box(0.012, 0.05, 0.012, std(0xff6a2a), 0, 0.26, 0, rob);
    var antL = box(0.02, 0.02, 0.02, bas(0xff2a3d), 0, 0.29, 0, rob, false);
    rob.add(hitBox(0.24, 0.4, 0.22, 0.15));

    // колонка (Музика вкл/изкл) — пулсира в такта
    var spk = new THREE.Group(); spk.position.set(0.98, 0, -0.2); spk.rotation.y = -0.18; scene.add(spk);
    box(0.17, 0.3, 0.16, std(0x14101a, { r: 0.5, m: 0.2 }), 0, 0.15, 0, spk);
    var woofer = new THREE.Group(); woofer.position.set(0, 0.105, 0.082); spk.add(woofer);
    var wcone = cyl(0.056, 0.05, 0.022, std(0x2a2430, { r: 0.7 }), 0, 0, 0, woofer, 28); wcone.rotation.x = Math.PI / 2;
    var wcap = new THREE.Mesh(new THREE.SphereGeometry(0.02, 12, 12), std(0x0a0809, { r: 0.6 })); wcap.position.z = 0.012; woofer.add(wcap);
    var wring = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.006, 8, 32), bas(0xff2038)); woofer.add(wring);
    var tw = cyl(0.02, 0.02, 0.012, std(0x2a2430, { r: 0.5 }), 0, 0.235, 0.08, spk, 20); tw.rotation.x = Math.PI / 2;
    var spkLed = box(0.012, 0.012, 0.006, bas(0xff2038), 0.06, 0.28, 0.082, spk, false);
    spk.add(hitBox(0.24, 0.36, 0.22, 0.17));

    // лава лампа (клик сменя цвета)
    var lava = new THREE.Group(); lava.position.set(1.5, 0, -0.45); scene.add(lava);
    var LAVA = [0xff2a5a, 0x35e0ff, 0xb36bff, 0x6dff9f], lavaIdx = 0;
    cyl(0.06, 0.07, 0.05, std(0x14101a, { r: 0.4, m: 0.5 }), 0, 0.025, 0, lava);
    var lavaGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.055, 0.28, 24, 1, true), new THREE.MeshStandardMaterial({ color: 0x220610, emissive: LAVA[0], emissiveIntensity: 0.35, transparent: true, opacity: 0.4, roughness: 0.2, side: THREE.DoubleSide, depthWrite: false })); lavaGlass.position.y = 0.19; lava.add(lavaGlass);
    cyl(0.02, 0.04, 0.06, std(0x14101a, { r: 0.4, m: 0.5 }), 0, 0.36, 0, lava);
    var blobs = [];
    for (var lb = 0; lb < 4; lb++) { var bm = new THREE.Mesh(new THREE.SphereGeometry(0.022 + lb * 0.004, 14, 14), new THREE.MeshBasicMaterial({ color: LAVA[0], toneMapped: false })); bm.userData.ph = lb * 1.7; lava.add(bm); blobs.push(bm); }
    var lavaLight = new THREE.PointLight(LAVA[0], 0.7, 1.4, 1.6); lavaLight.position.set(0, 0.2, 0.08); lava.add(lavaLight);
    lava.add(hitBox(0.2, 0.42, 0.2, 0.2));
    function setLava(i) { var col = LAVA[i]; lavaGlass.material.emissive.setHex(col); lavaLight.color.setHex(col); blobs.forEach(function (b) { b.material.color.setHex(col); }); }

    /* ================= ИГРАЧКИ (клик = нещо се случва) ================= */
    var fanBoost = 0, steamBoost = 0, lampOn = true, jokeI = 0, bubbleObj = null, bubbleT = 0, bubbleOff = 0.3, bv = new THREE.Vector3();
    function say(text, obj, off) { if (state.open) return; bubbleEl.textContent = text; bubbleObj = obj; bubbleOff = off || 0.3; bubbleT = 2.4; bubbleEl.classList.add('show'); }
    function hideBubble() { bubbleObj = null; bubbleT = 0; bubbleEl.classList.remove('show'); }
    var JOKES = {
      bg: ['Здрасти! 👋', 'Работя 24/7, без кафе ☕', 'Кликни монитора за проектите!', 'Аз съм тестовият бот. Всичко минава ✔', 'Hello, world!', 'Пази се от бъговете 🐛'],
      en: ['Hi there! 👋', 'I run 24/7, no coffee needed ☕', 'Click the monitor for projects!', 'I am the test bot. All green ✔', 'Hello, world!', 'Beware of bugs 🐛']
    };
    function bg(a, b) { return lang === 'bg' ? a : b; }
    var TOYS = {
      speaker: function () { setSound(!audio.on); say(audio.on ? bg('🔊 Музиката е включена', '🔊 Music on') : bg('🔇 Музиката е спряна', '🔇 Music off'), spk, 0.42); },
      neon: function () {
        neonIdx = (neonIdx + 1) % NEON.length; drawNeon(neonIdx); var col = NEON[neonIdx];
        neonLight.color.setHex(col[2]); rim.color.setHex(col[2]); ambi.material.map = glowTex(col[3][0], col[3][1], col[3][2]); ambi.material.needsUpdate = true;
        gsap.fromTo(neon.material, { opacity: 0.15 }, { opacity: 1, duration: 0.5, ease: 'steps(7)' }); sfx('buzz');
      },
      lamp: function () { lampOn = !lampOn; lampSpot.intensity = lampOn ? 2.6 : 0; bulb.material.color.setHex(lampOn ? 0xffc58a : 0x2a2024); sfx('click'); say(lampOn ? bg('💡 Светна!', '💡 Lights on!') : bg('🌙 Тъмно...', '🌙 Lights out...'), head, 0.3); },
      pc: function () { fanBoost = 1; sfx('whoosh'); say('🚀 TURBO!', pc, 0.75); },
      robot: function () {
        gsap.to(rob.position, { y: 1.37 + 0.14, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' });
        var J = JOKES[lang]; say(J[jokeI++ % J.length], rob, 0.36); sfx('pop');
      },
      mug: function () { steamBoost = 1; sfx('sip'); say(bg('☕ Още кафе!', '☕ More coffee!'), mug, 0.3); },
      gamepad: function () { gsap.fromTo(pad2.rotation, { z: -0.1 }, { z: 0.1, duration: 0.05, repeat: 11, yoyo: true, ease: 'none', onComplete: function () { pad2.rotation.z = 0; } }); sfx('jingle'); say('🎮 PRESS START', pad2, 0.2); },
      lava: function () { lavaIdx = (lavaIdx + 1) % LAVA.length; setLava(lavaIdx); sfx('pop'); },
      poster1: function () { poster1.userData.next(); sfx('click'); },
      poster2: function () { poster2.userData.next(); sfx('click'); }
    };

    function tickToys(t, dt, kp) {
      rob.rotation.y = Math.sin(t * 0.8) * 0.25;
      eyeL.scale.y = eyeR.scale.y = (Math.sin(t * 1.3) > 0.985) ? 0.1 : 1;
      antL.scale.setScalar(1 + 0.3 * Math.sin(t * 5));
      blobs.forEach(function (b, i) { var p = 0.5 + 0.5 * Math.sin(t * 0.55 + b.userData.ph); b.position.set(Math.sin(t * 0.4 + i) * 0.012, 0.07 + p * 0.2, 0); });
      if (Math.floor(t * 2) !== tickToys.lc) { tickToys.lc = Math.floor(t * 2); drawClock(); }
      var wp = 1 + 0.14 * kp; woofer.scale.set(wp, wp, 1 + 0.5 * kp); wring.scale.setScalar(1 + 0.1 * kp);
      spkLed.material.color.setHex(audio.on ? 0xff2038 : 0x2a2024);
      fanBoost *= 0.985; steamBoost *= 0.99; pcLight.intensity = 0.9 + fanBoost * 2.5;
      flash.position.lerp(flashTarget, 0.12); flash.intensity = state.open ? 0 : 0.8;
      if (bubbleObj) {
        bubbleT -= dt; if (bubbleT <= 0) hideBubble();
        else {
          bubbleObj.updateWorldMatrix(true, false); bv.setFromMatrixPosition(bubbleObj.matrixWorld); bv.y += bubbleOff; bv.project(camera);
          bubbleEl.style.left = ((bv.x * 0.5 + 0.5) * window.innerWidth) + 'px'; bubbleEl.style.top = ((-bv.y * 0.5 + 0.5) * window.innerHeight) + 'px';
        }
      }
    }

    // натискане на клавишите (реалната клавиатура натиска 3D клавиши)
    var tmpM = new THREE.Matrix4(), kp3 = new THREE.Vector3(), kq = new THREE.Quaternion(), ks = new THREE.Vector3();
    function moveKey(i, dy) { keys.getMatrixAt(i, tmpM); tmpM.decompose(kp3, kq, ks); kd.position.set(kp3.x, kp3.y + dy, kp3.z); kd.quaternion.copy(kq); kd.scale.copy(ks); kd.updateMatrix(); keys.setMatrixAt(i, kd.matrix); keys.instanceMatrix.needsUpdate = true; }
    function pressKey() { var i = Math.floor(Math.random() * ki); moveKey(i, -0.012); setTimeout(function () { moveKey(i, 0.012); }, 110); }

    var dustN = 140, dustG = new THREE.BufferGeometry(), dp = new Float32Array(dustN * 3);
    for (var d = 0; d < dustN; d++) { dp[d * 3] = (Math.random() - 0.5) * 5; dp[d * 3 + 1] = Math.random() * 2.4; dp[d * 3 + 2] = -0.8 + Math.random() * 2.4; }
    dustG.setAttribute('position', new THREE.BufferAttribute(dp, 3));
    var dust = new THREE.Points(dustG, new THREE.PointsMaterial({ color: 0xffb89a, size: 0.018, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false })); scene.add(dust);

    /* --- интерактивни групи --- */
    interactive.game = mon2; interactive.speaker = spk; interactive.lamp = lamp; interactive.pc = pc; interactive.robot = rob; interactive.mug = mug; interactive.gamepad = pad2; interactive.lava = lava;
    interactive.neon = neonG; interactive.poster1 = poster1; interactive.poster2 = poster2;
    Object.keys(interactive).forEach(function (name) {
      var g = interactive[name]; g.userData.h = 0; g.userData.mats = [];
      g.traverse(function (o) {
        if (!o.isMesh) return; o.userData.sec = name; hits.push(o);
        if (o.material && o.material.isMeshStandardMaterial) g.userData.mats.push(o.material);
      });
    });

    /* --- камера --- */
    var VIEWS = {
      home: { pos: [0, 1.25, 3.5], look: [0, 0.62, 0] },
      projects: { pos: [0, 0.86, 1.6], look: [0, 0.74, -0.38] },
      services: { pos: [0, 0.8, 2.0], look: [0, 0.03, 0.5] },
      about: { pos: [-0.55, 0.6, 1.55], look: [-1.0, 0.2, 0.32] },
      contact: { pos: [0.95, 0.55, 1.75], look: [1.28, 0.1, 0.58] },
      tools: { pos: [-0.5, 0.85, 1.55], look: [-1.12, 0.64, -0.5] },
      game: { pos: [-0.55, 0.68, 0.85], look: [-1.12, 0.64, -0.5] },
      desktop: { pos: [0, 0.86, 1.6], look: [0, 0.74, -0.38] }
    };
    var cam = { pos: new THREE.Vector3(0, 2.8, 8), look: new THREE.Vector3(0, 0.6, 0) };
    var par = { x: 0, y: 0, tx: 0, ty: 0 };
    function viewFor(name) {
      var v = VIEWS[name], a = camera.aspect, look = new THREE.Vector3().fromArray(v.look), pos = new THREE.Vector3().fromArray(v.pos);
      if (name === 'home') {
        if (a < 1.2) { pos.z = Math.min(9, 3.4 / a); pos.y = 1.0; look.y = 0.78; }
        else pos.z = Math.max(3.5, 3.9 / a);
      }
      else if (a < 1.2) pos.sub(look).multiplyScalar(1 + (1.2 - a) * 1.3).add(look);
      return { pos: pos, look: look };
    }
    function flyTo(name, dur) {
      var v = viewFor(name), d = reduceMotion ? 0 : dur;
      gsap.to(cam.pos, { x: v.pos.x, y: v.pos.y, z: v.pos.z, duration: d, ease: 'power3.inOut', overwrite: true });
      gsap.to(cam.look, { x: v.look.x, y: v.look.y, z: v.look.z, duration: d, ease: 'power3.inOut', overwrite: true });
    }

    function resize() {
      var w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix();
      if (!state.open && !gl.flying) { var v = viewFor('home'); cam.pos.copy(v.pos); cam.look.copy(v.look); }
    }
    window.addEventListener('resize', resize);

    /* --- мишка / тап --- */
    var ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
    function pick(e) {
      var r = canvas.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      var h = ray.intersectObjects(hits, false); return h.length ? h[0].object.userData.sec : null;
    }
    canvas.addEventListener('pointermove', function (e) {
      par.tx = (e.clientX / window.innerWidth - 0.5) * 2; par.ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (state.open || state.game || e.pointerType === 'touch') return;
      var s = pick(e); if (s && s !== state.hover) sfx('tick'); state.hover = s;
      if (ray.ray.intersectPlane(wallPlane, wallPt)) flashTarget.copy(wallPt);
      canvas.classList.toggle('pointer', !!s);
      if (s) { tooltip.textContent = tipFor(s); tooltip.style.left = e.clientX + 'px'; tooltip.style.top = e.clientY + 'px'; tooltip.classList.add('show'); }
      else tooltip.classList.remove('show');
    });
    canvas.addEventListener('pointerleave', function () { state.hover = null; tooltip.classList.remove('show'); canvas.classList.remove('pointer'); });
    canvas.addEventListener('click', function (e) { if (state.open || state.game) return; var s = pick(e); if (!s) return; if (s === 'projects') openSection('desktop'); else if (RENDER[s]) openSection(s); else if (TOYS[s]) TOYS[s](); });
    var sw = null;
    canvas.addEventListener('pointerdown', function (e) { sw = state.game ? { x: e.clientX, y: e.clientY } : null; });
    canvas.addEventListener('pointerup', function (e) {
      if (!state.game || !sw) { sw = null; return; }
      var dx = e.clientX - sw.x, dy = e.clientY - sw.y; sw = null;
      if (Math.abs(dx) + Math.abs(dy) < 14) { gameStart(); return; }
      if (Math.abs(dx) > Math.abs(dy)) gameDir(dx > 0 ? [1, 0] : [-1, 0]); else gameDir(dy > 0 ? [0, 1] : [0, -1]);
    });

    TOYS.game = enterGame;
    gl = { enterGame: enterGame, exitGame: exitGame, gameDir: gameDir, gameStart: gameStart, renderer: renderer, camera: camera, cam: cam, flyTo: flyTo, viewFor: viewFor, neon: neon, flying: false, pressKey: pressKey, hideBubble: hideBubble };

    /* --- цикъл --- */
    var clock = new THREE.Clock(), last2 = 0, last1 = 0, running = true, hv = new THREE.Vector3(), prevT = 0, rgbPhase = 0;
    document.addEventListener('visibilitychange', function () { var was = running; running = !document.hidden; if (running && !was) loop(); });
    function loop() {
      if (!running) return; requestAnimationFrame(loop);
      var t = clock.getElapsedTime();
      var dtt = t - prevT; prevT = t; rgbPhase += dtt * (1 + 4 * interactive.services.userData.h);
      if (t - last1 > 0.066) { last1 = t; drawMain(t, interactive.projects.userData.h); drawRGB(rgbPhase); drawPhone(t); }
      gameStep(t); if (t - last2 > (G.focus ? 0.033 : 0.09)) { last2 = t; drawS2(t); }
      fans.forEach(function (f, i) { f.rotation.z -= 0.06 + i * 0.004 + fanBoost * 0.45; });
      steam.forEach(function (sp) { var p = (sp.userData.p + t * 0.12) % 1; sp.position.set(Math.sin(p * 9 + sp.userData.p * 20) * 0.012, 0.12 + p * 0.2, 0); var sc2 = 0.03 + p * 0.09; sp.scale.set(sc2, sc2, 1); sp.material.opacity = 0.16 * (1 + steamBoost * 2.5) * Math.sin(p * Math.PI); });
      var dpA = dust.geometry.attributes.position;
      for (var q = 0; q < dustN; q++) { var yy = dpA.getY(q) + 0.0006 + (q % 5) * 0.0001; if (yy > 2.4) yy = 0; dpA.setY(q, yy); dpA.setX(q, dpA.getX(q) + Math.sin(t * 0.3 + q) * 0.0003); }
      dpA.needsUpdate = true;
      var kpl = kickPulse(); rim.intensity = 1.5 + Math.sin(t * 1.7) * 0.15 + kpl * 0.9; neonLight.intensity = 1.1 + kpl * 0.9; tickToys(t, dtt, kpl);
      Object.keys(interactive).forEach(function (name) {
        var g = interactive[name], target = (state.hover === name && !state.open) ? 1 : 0;
        g.userData.h += (target - g.userData.h) * 0.14; var h = g.userData.h;
        g.userData.mats.forEach(function (m) { m.emissive.setRGB(0.32 * h, 0.03 * h, 0.06 * h); });
        if (!g.userData.noScale) g.scale.setScalar(1 + 0.03 * h);
      });
      ph.rotation.z = Math.sin(t * 38) * 0.035 * interactive.contact.userData.h;
      hp.rotation.y = 0.5 + Math.sin(t * 2.2) * 0.14 * interactive.about.userData.h;
      scene.updateMatrixWorld(); bulb.getWorldPosition(hv); lampSpot.position.copy(hv);
      if (!reduceMotion && !state.open) { par.x += (par.tx - par.x) * 0.05; par.y += (par.ty - par.y) * 0.05; }
      var k = state.open ? 0.15 : 1;
      camera.position.set(cam.pos.x + par.x * 0.32 * k, cam.pos.y - par.y * 0.12 * k, cam.pos.z);
      camera.lookAt(cam.look);
      renderer.render(scene, camera);
    }
    resize(); loop();
    sceneOK = true;
  }

  /* ---------- отваряне / затваряне на секции ---------- */
  function openSection(name) {
    if (state.open || state.busy || !RENDER[name]) return;
    state.busy = true; state.open = name; state.hover = null; sfx('click'); sfx('open');
    tooltip.classList.remove('show'); canvas.classList.remove('pointer'); if (sceneOK) gl.hideBubble();
    body.classList.add('open');
    try { history.replaceState(null, '', '#' + name); } catch (e) {}
    if (sceneOK) gl.flyTo(name, 1.1);
    state.sub = null; showBody();
    panel.classList.add('show'); panel.setAttribute('aria-hidden', 'false');
    var dl = sceneOK ? 0.55 : 0;
    gsap.fromTo(panel, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: dl, ease: 'power2.out' });
    gsap.fromTo('.win', { y: 40, scale: 0.97 }, { y: 0, scale: 1, duration: 0.6, delay: dl, ease: 'power3.out', onComplete: function () { state.busy = false; } });
  }
  function closeSection() {
    if (!state.open) return;
    gsap.killTweensOf(panel); gsap.killTweensOf('.win'); sfx('close');
    state.busy = true;
    gsap.to(panel, { opacity: 0, duration: 0.3, onComplete: function () {
      panel.classList.remove('show'); panel.setAttribute('aria-hidden', 'true'); state.open = null; state.sub = null; state.busy = false; body.classList.remove('open');
    } });
    try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
    if (sceneOK) gl.flyTo('home', 1.0);
  }

  /* ---------- събития ---------- */
  document.querySelectorAll('[data-open]').forEach(function (b) { b.addEventListener('click', function () { openSection(b.getAttribute('data-open')); }); });
  $('#winClose').addEventListener('click', closeSection);
  panel.addEventListener('click', function (e) { if (e.target === panel) closeSection(); });
  document.addEventListener('keydown', function (e) {
    if (state.game && sceneOK) {
      if (e.key === 'Escape') { gl.exitGame(); return; }
      var gm = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] }, gk = e.key.length > 1 ? e.key : e.key.toLowerCase();
      if (gm[gk]) { e.preventDefault(); gl.gameDir(gm[gk]); }
      else if (e.key === ' ' || e.code === 'Space') { e.preventDefault(); if (!e.repeat) gl.gameStart(); }
      return;
    }
    if (e.key === 'Escape') { if (state.sub) backToDesktop(); else closeSection(); return; }
    if (!state.open && !e.repeat && sceneOK && gl.pressKey) { gl.pressKey(); sfx('click'); }
  });
  document.querySelectorAll('[data-set-lang]').forEach(function (b) { b.addEventListener('click', function () { applyLang(b.getAttribute('data-set-lang')); }); });

  /* ---------- старт ---------- */
  try { applyLang(lang); } catch (e) { console.warn(e); }
  var hash = (location.hash || '').replace('#', '');

  function enterSite() {
    $('#loader').classList.add('done');
    setSound(true);
    if (sceneOK && !reduceMotion) {
      gl.flying = true;
      var v = gl.viewFor('home');
      gsap.to(gl.cam.pos, { x: v.pos.x, y: v.pos.y, z: v.pos.z, duration: 3, ease: 'power3.out', onComplete: function () { gl.flying = false; } });
      gsap.to(gl.cam.look, { x: v.look.x, y: v.look.y, z: v.look.z, duration: 3, ease: 'power3.out' });
      var tl = gsap.timeline({ delay: 0.5 });
      tl.fromTo(gl.neon.material, { opacity: 0 }, { opacity: 1, duration: 0.05 }).to(gl.neon.material, { opacity: 0.25, duration: 0.07 }).to(gl.neon.material, { opacity: 1, duration: 0.05 }).to(gl.neon.material, { opacity: 0.4, duration: 0.09 }).to(gl.neon.material, { opacity: 1, duration: 0.3 });
      body.classList.add('intro');
    }
    if (RENDER[hash]) setTimeout(function () { openSection(hash); }, sceneOK && !reduceMotion ? 1200 : 100);
  }

  /* ---------- матрица (код) докато се зарежда, после се разкрива бюрото ---------- */
  var rainOn = true;
  function startRain() {
    var cv = $('#rain'); if (!cv) return;
    var cx = cv.getContext('2d'), W, H, cols, drops, fs = 17, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var CH = '01{}[]<>/\;:=()$#+*&|CFXWEBSTUDIOconstletasyncawait=>'.split('');
    function size() { W = cv.width = Math.ceil(innerWidth * dpr); H = cv.height = Math.ceil(innerHeight * dpr); cols = Math.ceil(W / (fs * dpr)); drops = []; for (var i = 0; i < cols; i++) drops.push(Math.random() * -40); cx.fillStyle = '#0a0709'; cx.fillRect(0, 0, W, H); }
    size(); window.addEventListener('resize', size);
    var last = 0;
    (function frame(ts) {
      if (!rainOn) return; requestAnimationFrame(frame);
      if (ts - last < 38) return; last = ts;
      cx.fillStyle = 'rgba(10,7,9,.12)'; cx.fillRect(0, 0, W, H);
      cx.font = '700 ' + (fs * dpr) + 'px Consolas, "Courier New", monospace';
      for (var i = 0; i < cols; i++) {
        var ch = CH[Math.floor(Math.random() * CH.length)], x = i * fs * dpr, y = drops[i] * fs * dpr;
        cx.fillStyle = '#ffd9dc'; cx.fillText(ch, x, y);
        cx.fillStyle = 'rgba(255,42,61,.95)'; cx.fillText(CH[Math.floor(Math.random() * CH.length)], x, y - fs * dpr);
        if (y > H && Math.random() > 0.975) drops[i] = Math.random() * -12;
        drops[i] += 0.55 + (i % 5) * 0.12;
      }
    })(0);
  }
  startRain();
  var t0 = Date.now();
  setTimeout(function () {
    try { initScene(); }
    catch (err) { console.warn('3D сцената не стартира:', err); body.classList.add('nogl'); }
    var wait = Math.max(300, 2400 - (Date.now() - t0));
    setTimeout(function () { enterSite(); setTimeout(function () { rainOn = false; }, 1400); }, wait);
  }, 90);

  /* музиката се пуска автоматично; ако браузърът я задържи до първо действие — тръгва с първия клик/клавиш/докосване */
  function unlockAudio() {
    if (audio.ctx && audio.on && audio.ctx.state !== 'running') {
      var p = audio.ctx.resume(); if (p && p.then) p.then(function () { if (audio.ctx.state === 'running') offUnlock(); });
    } else if (audio.ctx && audio.ctx.state === 'running') offUnlock();
  }
  function offUnlock() { ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) { document.removeEventListener(ev, unlockAudio, true); }); }
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (ev) { document.addEventListener(ev, unlockAudio, true); });
})();
