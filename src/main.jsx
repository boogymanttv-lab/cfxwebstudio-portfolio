import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import { remoteEnabled, loadSite, saveSettings, saveProjectsRemote, saveServicesRemote, addProjectRemote, deleteProjectRemote, addServiceRemote, deleteServiceRemote, uploadImageRemote, signIn, signOutRemote, getSession, onAuthChange } from './store.js';

const copy = {
  bg: { nav:[['home','Начало'],['about','За мен'],['projects','Проекти'],['skills','Умения'],['services','Услуги'],['experience','Опит'],['contact','Контакти']], hello:'Здравей, аз съм', role:'Full Stack Developer', intro:'Създавам модерни, бързи и сигурни уеб приложения — от първата идея до production.', work:'Виж проектите ми', contact:'Свържи се с мен', available:'За нови проекти', busy:'В момента съм зает', about:'За мен', aboutText:'Full Stack разработчик с фокус върху ясна архитектура, добър UX и продукти, които решават реални проблеми.', stack:'Технологии, с които работя', projects:'Проекти', projectsIntro:'Подбрани продукти, интерфейси и автоматизации, изградени за реална употреба.', skills:'Умения и услуги', skillsIntro:'Целият stack, с който превръщам идеи в работещи продукти.', experience:'Опит', experienceIntro:'Практически опит с продукти, клиенти и full-stack системи.', cta:'Имаш проект в ума си?', ctaText:'Нека го обсъдим и да създадем нещо страхотно заедно.', send:'Изпрати запитване', sent:'Изпратено!', admin:'Admin', save:'Запази промените', add:'Добави проект', homeBlurb:'Създавам продукти, които са бързи, ясни и готови да растат.', servicesTitle:'Услуги', servicesIntro:'От малък уебсайт до цялостна платформа — подбираме правилния stack според целта.' },
  en: { nav:[['home','Home'],['about','About'],['projects','Projects'],['skills','Skills'],['services','Services'],['experience','Experience'],['contact','Contact']], hello:'Hello, I’m', role:'Full Stack Developer', intro:'I build modern, fast and secure web applications — from the first idea to production.', work:'View my work', contact:'Get in touch', available:'Available for new projects', busy:'Currently booked', about:'About me', aboutText:'A Full Stack developer focused on clear architecture, good UX and products that solve real problems.', stack:'Technologies I work with', projects:'Projects', projectsIntro:'Selected products, interfaces and automations built for real use.', skills:'Skills and services', skillsIntro:'The complete stack I use to turn ideas into working products.', experience:'Experience', experienceIntro:'Hands-on experience with products, clients and full-stack systems.', cta:'Have a project in mind?', ctaText:'Let’s talk about it and build something great together.', send:'Send inquiry', sent:'Sent!', admin:'Admin', save:'Save changes', add:'Add project', homeBlurb:'I build products that are fast, clear and ready to grow.', servicesTitle:'Services', servicesIntro:'From a focused website to a complete platform — we choose the stack around the goal.' }
};
const tech = ['Next.js','TypeScript','JavaScript','React','Node.js','Python','C#','Java','PHP','Go','Ruby','HTML5','CSS3','Tailwind CSS','PostgreSQL','MySQL','MongoDB','Redis','Supabase','Docker','Git','AWS'];
const glyphs = ['N','TS','JS','⚛','⬡','Py','C#','J','PHP','Go','Rb','H','CSS','≈','◉','My','M','R','↯','▣','◆','AWS'];
const defaults = { brand:'cfxwebstudio', domain:'cfxwebstudio.dev', email:'info@cfxwebstudio.agency', location:'Bulgaria · Remote', profileImage:'', logo:'' };
const FORMSPREE_FORM_ID = 'xrpgyddy';
const FORMSPREE_ENDPOINT = `https://formspree.io/f/${FORMSPREE_FORM_ID}`;
const ADMIN_USER = 'boogyman';
const ADMIN_PASS = 'Boogyman#2026';
const initialProjects = [{title:'AI System Income',desc:'Инвестиционна платформа с AI протоколи, депозити и crypto портфейл.',tags:'Next.js · TypeScript · Supabase',langs:'Next.js:45,TypeScript:35,Supabase:20',tone:'violet',image:'',website:'',github:''},{title:'Dani Dinner',desc:'Уебсайт за ресторант с онлайн поръчки, меню и административен панел.',tags:'Next.js · Tailwind CSS · Prisma',langs:'Next.js:50,Tailwind CSS:30,Prisma:20',tone:'green',image:'',website:'',github:''},{title:'Crypto Dashboard',desc:'Реално време crypto борд със статистики, графики и персонализирани alerts.',tags:'React · TypeScript · Chart.js',langs:'React:50,TypeScript:30,Chart.js:20',tone:'blue',image:'',website:'',github:''}];
const initialServices = [{title:'Бизнес уебсайт',desc:'Презентационен сайт за бизнес или личен бранд — модерен дизайн, бърза скорост и SEO основи.',price:'от €349',oldPrice:'от €499',category:'foundation'},{title:'Онлайн магазин',desc:'Пълноценен e-commerce магазин с количка, плащания с карта, наложен платеж и админ панел за продукти и поръчки.',price:'от €899',oldPrice:'от €1400',category:'foundation'},{title:'Full-stack SaaS платформа',desc:'Цялостна платформа с потребители, абонаменти, база данни и админ логика — от идея до production.',price:'от €1899',oldPrice:'от €2900',category:'foundation'},{title:'Маркетплейс платформа',desc:'Платформа с много продавачи/потребители — обяви, съобщения, плащания и модерация, като Bazar.bg или OLX модел.',price:'от €1699',oldPrice:'от €2600',category:'foundation'},{title:'Административен панел / CRM',desc:'Вътрешна система за управление на клиенти, поръчки, служители или наличности, скроена по твоите процеси.',price:'от €699',oldPrice:'от €1100',category:'addon'},{title:'Автоматизации и API интеграции',desc:'Python, C#, Java и REST/API интеграции между системи, които премахват ръчната и повтаряща се работа.',price:'от €249',oldPrice:'от €399',category:'addon'},{title:'Telegram / Discord ботове',desc:'Персонализирани ботове за автоматизация, нотификации, поръчки или community management.',price:'от €199',oldPrice:'от €329',category:'addon'},{title:'AI интеграции',desc:'Вграждане на AI чатботове, автоматизирано съдържание или AI логика в съществуващ продукт.',price:'от €349',oldPrice:'от €549',category:'addon'},{title:'SEO и техническа оптимизация',desc:'Оптимизация на скорост, структура и видимост в Google — за да те намират реалните клиенти.',price:'от €199',oldPrice:'от €299',category:'addon'},{title:'Поддръжка и хостинг',desc:'Месечна поддръжка, ъпдейти, мониторинг и хостинг менажиране, за да работи всичко гладко след старта.',price:'от €69/мес',oldPrice:'от €99/мес',category:'addon'}];
const read = (key, fallback) => { try { const raw = localStorage.getItem(key); if (raw === null) return fallback; return JSON.parse(raw); } catch { return fallback; } };
const parseLangs = (str) => (str||'').split(',').map(x=>x.trim()).filter(Boolean).map(x=>{const [name,pct]=x.split(':').map(v=>v.trim());const n=parseInt(pct,10);return name&&!isNaN(n)?{name,pct:Math.max(0,Math.min(100,n))}:null;}).filter(Boolean);
const pageMeta = (page,t,settings) => {
  const brand = settings.brand || 'cfxwebstudio';
  const byPage = {
    home: { title: brand + ' — Full Stack Developer', desc:t.intro },
    about: { title: t.about + ' — ' + brand, desc:t.aboutText },
    projects: { title: t.projects + ' — ' + brand, desc:t.projectsIntro },
    skills: { title: t.skills + ' — ' + brand, desc:t.skillsIntro },
    services: { title: t.servicesTitle + ' — ' + brand, desc:t.servicesIntro },
    experience: { title: t.experience + ' — ' + brand, desc:t.experienceIntro },
    contact: { title: t.contact + ' — ' + brand, desc:t.ctaText },
  };
  return byPage[page] || byPage.home;
};

function MatrixRain() {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const fontSize = 15;
    let columns = Math.max(1, Math.floor(w / fontSize));
    let drops = Array(columns).fill(0).map(() => Math.random() * -40);
    const chars = 'アイウエオカキクケコサシスセソ0123456789<>{}[]/=+-*;:';
    const colors = ['#8b5cf6','#5eead4','#60a5fa','#c7bcff'];
    let raf, last = 0;
    const draw = () => {
      ctx.fillStyle = 'rgba(6,9,18,0.08)';
      ctx.fillRect(0,0,w,h);
      ctx.font = fontSize + 'px monospace';
      for (let i=0;i<drops.length;i++) {
        const ch = chars[Math.floor(Math.random()*chars.length)];
        ctx.fillStyle = colors[i % colors.length];
        ctx.globalAlpha = 0.5;
        ctx.fillText(ch, i*fontSize, drops[i]*fontSize);
        ctx.globalAlpha = 1;
        if (drops[i]*fontSize > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const loop = t => { if (t - last > 65) { draw(); last = t; } raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      columns = Math.max(1, Math.floor(w / fontSize));
      drops = Array(columns).fill(0).map(() => Math.random() * -40);
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); };
  }, []);
  return <canvas ref={canvasRef} className="matrix-rain" aria-hidden="true"></canvas>;
}

function App() {
  const [lang,setLang] = useState('bg');
  const initialPath = location.pathname.replace(/^\//,'').replace(/\/$/,'') || 'home';
  const [page,setPage] = useState(() => initialPath === 'admin' ? 'home' : initialPath);
  const [loaded,setLoaded] = useState(false);
  const [available,setAvailable] = useState(true);
  const [settings,setSettings] = useState(defaults);
  const [projects,setProjects] = useState(initialProjects);
  const [services,setServices] = useState(initialServices);
  const [adminOpen,setAdminOpen] = useState(() => initialPath === 'admin');
  const [sent,setSent] = useState(false);
  const [menuOpen,setMenuOpen] = useState(false);
  const [draft,setDraft] = useState({title:'',desc:'',tags:'',langs:'',image:'',website:'',github:''});
  const [draftService,setDraftService] = useState({title:'',desc:'',price:'',oldPrice:'',category:'addon'});
  const t = copy[lang];
  useEffect(() => { const change = () => { const p = location.pathname.replace(/^\//,'').replace(/\/$/,'') || 'home'; if (p === 'admin') { setAdminOpen(true); } else { setPage(p); setAdminOpen(false); } }; addEventListener('popstate',change); return () => removeEventListener('popstate',change); },[]);
  useEffect(() => { (async () => { const site = await loadSite(defaults,initialProjects,initialServices); setSettings(site.settings); setAvailable(site.available); setProjects(site.projects); setServices(site.services); setLoaded(true); })(); },[]);
  useEffect(() => { if (!remoteEnabled && loaded) localStorage.setItem('cfx-settings',JSON.stringify(settings)); },[settings]);
  useEffect(() => { if (!remoteEnabled && loaded) localStorage.setItem('cfx-projects',JSON.stringify(projects)); },[projects]);
  useEffect(() => { if (!remoteEnabled && loaded) localStorage.setItem('cfx-services',JSON.stringify(services)); },[services]);
  useEffect(() => { if (!remoteEnabled && loaded) localStorage.setItem('cfx-available',JSON.stringify(available)); },[available]);
  useEffect(() => setMenuOpen(false),[page]);
  useEffect(() => {
    const meta = pageMeta(page,t,settings);
    document.title = meta.title;
    const setMeta = (selector, attr, value) => { const el = document.querySelector(selector); if (el) el.setAttribute(attr,value); };
    setMeta('meta[name="description"]','content',meta.desc);
    setMeta('meta[property="og:title"]','content',meta.title);
    setMeta('meta[property="og:description"]','content',meta.desc);
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel','canonical'); document.head.appendChild(canonical); }
    canonical.setAttribute('href', 'https://' + settings.domain + location.pathname);
  },[page,lang,settings.brand,settings.domain]);
  const navigate = target => { const path = target === 'home' ? '/' : `/${target}`; if (location.pathname !== path) history.pushState({}, '', path); setPage(target); setAdminOpen(false); window.scrollTo({top:0,behavior:'smooth'}); };
  const readFile = async (file, done) => { if (!file) return; if (remoteEnabled) { const res = await uploadImageRemote(file); if (res && res.ok) done(res.url); else alert('Качването на снимката не успя. Опитай пак.'); return; } const r = new FileReader(); r.onload = () => done(r.result); r.readAsDataURL(file); };
  const submitProject = async e => { e.preventDefault(); if (!draft.title.trim()) return; const tone = ['violet','green','blue'][projects.length%3]; const saved = await addProjectRemote({...draft,tone}); if (saved) setProjects([...projects,saved]); setDraft({title:'',desc:'',tags:'',langs:'',image:'',website:'',github:''}); };
  const updateProject = (key,field,value) => setProjects(projects.map((p,i) => (remoteEnabled?p.id===key:i===key) ? {...p,[field]:value} : p));
  const removeProject = async key => { if (remoteEnabled) { await deleteProjectRemote(key); setProjects(projects.filter(p=>p.id!==key)); } else { setProjects(projects.filter((_,i)=>i!==key)); } };
  const submitService = async e => { e.preventDefault(); if (!draftService.title.trim()) return; const saved = await addServiceRemote({...draftService}); if (saved) setServices([...services,saved]); setDraftService({title:'',desc:'',price:'',oldPrice:'',category:'addon'}); };
  const updateService = (key,field,value) => setServices(services.map((sv,i) => (remoteEnabled?sv.id===key:i===key) ? {...sv,[field]:value} : sv));
  const removeService = async key => { if (remoteEnabled) { await deleteServiceRemote(key); setServices(services.filter(sv=>sv.id!==key)); } else { setServices(services.filter((_,i)=>i!==key)); } };
  const closeAdmin = () => { setAdminOpen(false); if (location.pathname === '/admin') { const path = page === 'home' ? '/' : `/${page}`; history.pushState({}, '', path); } };
  const title = page === 'home' ? null : ({about:t.about,projects:t.projects,skills:t.skills,services:t.servicesTitle,experience:t.experience,contact:t.contact}[page]);
  return <>
    <MatrixRain/>
    <div className="site-shell">
    <header><nav className="wrap"><button className="logo" onClick={() => navigate('home')}>{settings.logo?<img src={settings.logo} alt={settings.brand}/>:<span>&lt;/&gt;</span>}<b>{settings.brand}</b></button><div className="nav-links desktop-only">{t.nav.map(([key,label]) => <button key={key} className={page===key?'active':''} onClick={() => navigate(key)}>{label}</button>)}</div><div className="nav-actions"><div className="lang-toggle"><button className={lang==='bg'?'active':''} onClick={() => setLang('bg')}>BG</button><button className={lang==='en'?'active':''} onClick={() => setLang('en')}>EN</button></div><button className="btn primary small hide-mobile" onClick={() => navigate('contact')}>{t.contact} ↗</button><button className={`menu-toggle${menuOpen?' open':''}`} aria-label="Menu" onClick={() => setMenuOpen(o=>!o)}><i></i><i></i><i></i></button></div></nav>{menuOpen&&<div className="nav-drawer"><div className="nav-drawer-links">{t.nav.map(([key,label]) => <button key={key} className={page===key?'active':''} onClick={() => navigate(key)}>{label}</button>)}</div><button className="btn primary" onClick={() => navigate('contact')}>{t.contact} ↗</button></div>}</header>
    <main>{title && <section className="page-head"><div className="wrap"><span>{settings.domain}</span><h1>{title}</h1></div></section>}{page==='home'&&<Home t={t} settings={settings} available={available} navigate={navigate}/>} {page==='about'&&<About t={t} settings={settings} available={available}/>} {page==='projects'&&<Projects t={t} projects={projects}/>} {page==='skills'&&<Skills t={t}/>} {page==='services'&&<Services t={t} services={services}/>} {page==='experience'&&<Experience t={t} settings={settings}/>} {page==='contact'&&<Contact t={t} settings={settings} available={available} sent={sent} setSent={setSent}/>}</main>
    <footer><div className="wrap"><span>© {new Date().getFullYear()} {settings.brand}. {lang==='bg'?'Всички права запазени.':'All rights reserved.'}</span><span>{settings.domain}</span><span>GitHub ↗　LinkedIn ↗</span></div></footer>
    {adminOpen&&<Admin t={t} settings={settings} setSettings={setSettings} available={available} setAvailable={setAvailable} projects={projects} updateProject={updateProject} removeProject={removeProject} draft={draft} setDraft={setDraft} readFile={readFile} submitProject={submitProject} services={services} updateService={updateService} removeService={removeService} draftService={draftService} setDraftService={setDraftService} submitService={submitService} close={closeAdmin}/>}
    </div>
  </>;
}

function Home({t,settings,available,navigate}) { return <><section className="hero"><div className="wrap hero-grid"><div><div className="status"><i className={available?'':'busy'}></i>{available?t.available:t.busy}</div><p className="hello">{t.hello}</p><h1>{settings.brand}</h1><h2>{t.role}<span>|</span></h2><p className="hero-intro">{t.intro}</p><div className="hero-actions"><button className="btn primary" onClick={() => navigate('projects')}>{t.work} →</button><button className="btn ghost" onClick={() => navigate('contact')}>{t.contact} ◯</button></div><code className="domain-line">https://{settings.domain}</code></div><div className="hero-visual"><div className="dev-desk"><div className="code-stream"><span>const future = build();</span><span>npm run deploy --production</span><span>git push origin main</span><span>await ship(product)</span></div><div className="monitor secondary-monitor"><div className="screen-top"><i></i><i></i><i></i><b>api.ts</b></div><pre><em>01</em> import express from 'express';{`\n`}<em>02</em> const app = express();{`\n`}<em>03</em> app.get('/api', handler);{`\n`}<em>04</em> <strong>✓ server ready</strong></pre></div><div className="monitor main-monitor"><div className="screen-top"><i></i><i></i><i></i><b>{settings.domain}</b><small>● LIVE</small></div><div className="editor"><aside>01<br/>02<br/>03<br/>04<br/>05<br/>06<br/>07</aside><pre><em>const</em> <strong>product</strong> = <mark>build</mark>({`{`}{`\n`}  interface: <u>'beautiful'</u>,{`\n`}  stack: <u>'fullstack'</u>,{`\n`}  status: <u>'shipping'</u>{`\n`}{`}`});{`\n`}<b>▌</b></pre></div></div><div className="desk-keyboard"><div>{['esc','1','2','3','4','5','6','7','8','9','0','⌫'].map(x=><i key={x}>{x}</i>)}</div><div>{['tab','Q','W','E','R','T','Y','U','I','O','P','[',']'].map(x=><i key={x}>{x}</i>)}</div><div>{['caps','A','S','D','F','G','H','J','K','L',';','enter'].map(x=><i key={x}>{x}</i>)}</div><div><i className="wide-key">{settings.brand}</i><i>⌘</i><i>↵</i></div></div><div className="terminal-badge">$ <span>building a better web</span><b>●</b></div>{settings.profileImage&&<img className="profile-chip" src={settings.profileImage} alt={settings.brand}/>}</div></div></div></section><section className="command-bar"><span>BUILD</span><b>✦</b><span>CODE</span><b>✦</b><span>DEPLOY</span><b>✦</b><span>SHIP</span><b>✦</b><span>FULL STACK</span><b>✦</b><span>BUILD</span><b>✦</b><span>CODE</span></section><section className="home-console"><div className="wrap"><div className="console-header"><span>// LIVE DEVELOPMENT ENVIRONMENT</span><small>STATUS: <b>ONLINE</b></small></div><div className="console-grid"><article className="terminal-window"><div className="window-head"><i></i><i></i><i></i><span>terminal — zsh</span></div><pre><b>➜</b> ~/projects/{settings.brand} git:(main){`\n`}<em>$</em> npm run build{`\n`}<small>✓ Type checking complete{`\n`}✓ Static pages generated{`\n`}✓ Ready in 1.24s</small>{`\n`}<em>$</em> <strong className="typing">deploy --production</strong><span className="caret">▋</span></pre></article><article className="activity-card"><span>ACTIVE SPRINT</span><strong>01<span>/</span>04</strong><p>Designing systems that feel effortless.</p><div><i></i><i></i><i></i><i></i></div></article><article className="signal-card"><span>BUILD SIGNAL</span><b>99.9<small>%</small></b><p>Uptime across current projects</p><div className="signal-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></article></div></div></section><section className="home-links"><div className="wrap"><p>{t.homeBlurb}</p><button onClick={() => navigate('skills')}>Explore stack <span>22 technologies</span> →</button><button onClick={() => navigate('experience')}>Explore experience <span>2022 — now</span> →</button></div></section></> }
function About({t,settings,available}) {
  const bg = t.about === 'За мен';
  const content = bg ? {
    lead:'Не просто пиша код. Превръщам идея, дизайн и технология в продукт, който е ясен за хората и стабилен за бизнеса.',
    support:'Подхождам към всеки проект като към система: мисля за детайлите, потребителите и следващата стъпка още преди първия deploy.',
    profile:'Профил на разработчик', process:'Начин на работа', terminal:'активна среда', headline:['const','продукт','build','със смисъл'],
    principles:[['01','Ясна комуникация','Без излишен технически шум — знаеш какво се случва на всяка стъпка.'],['02','Чиста архитектура','Код, който е лесен за поддръжка, развитие и предаване.'],['03','Production mindset','Скорост, сигурност и детайли, готови за реални потребители.']],
    labels:['Име','Локация','Статус'], chips:['Full stack','Product thinking','Remote ready']
  } : {
    lead:'I do more than write code. I turn an idea, design and technology into a product people understand and businesses can rely on.',
    support:'I approach every project as a system: considering its details, users and next step before the first deploy.',
    profile:'Developer profile', process:'How I work', terminal:'active environment', headline:['const','product','build','with intent'],
    principles:[['01','Clear communication','No unnecessary technical noise — you know what happens at every step.'],['02','Clean architecture','Code that is easy to maintain, extend and hand over.'],['03','Production mindset','Speed, security and details ready for real users.']],
    labels:['Name','Location','Status'], chips:['Full stack','Product thinking','Remote ready']
  };
  return <section className="single-page about-shell"><div className="wrap">
    <div className="about-intro">
      <div className="about-copy">
        <span className="section-tag">// {t.about.toUpperCase()}</span>
        <h2 className="about-code-heading"><span>{content.headline[0]}</span> {content.headline[1]} <b>=</b> <strong>{content.headline[2]}</strong><i>(</i><em>'{content.headline[3]}'</em><i>);</i></h2>
        <p className="about-lead">{content.lead}</p>
        <p className="about-support">{content.support}</p>
        <div className="about-chips">{content.chips.map(chip=><span key={chip}>✦ {chip}</span>)}</div>
      </div>
      <aside className="identity-card">
        <div className="identity-top"><span>{content.profile}</span><b><i className={available?'':'busy'}></i>{available?t.available:t.busy}</b></div>
        <div className="identity-main">
          <div className="identity-avatar">{settings.profileImage?<img src={settings.profileImage} alt={settings.brand}/>:<><small>&lt;/&gt;</small><strong>CFX</strong></>}</div>
          <div><small>{bg?'FULL STACK DEVELOPER':'FULL STACK DEVELOPER'}</small><h3>{settings.brand}</h3><p>{settings.domain}</p></div>
        </div>
        <div className="identity-data">
          <div><span>{content.labels[0]}</span><strong>{settings.brand}</strong></div>
          <div><span>{content.labels[1]}</span><strong>{settings.location}</strong></div>
          <div><span>Email</span><strong>{settings.email}</strong></div>
          <div><span>{content.labels[2]}</span><strong>{available?t.available:t.busy}</strong></div>
        </div>
      </aside>
    </div>
    <div className="about-lower">
      <section className="principles"><div className="principles-title"><span className="section-tag">// {content.process.toUpperCase()}</span><h3>{bg?'От първата идея до готовия продукт.':'From the first idea to the finished product.'}</h3></div><div className="principle-grid">{content.principles.map(([number,title,text])=><article key={number}><span>{number}</span><h4>{title}</h4><p>{text}</p></article>)}</div></section>
      <aside className="about-terminal"><div className="about-terminal-head"><i></i><i></i><i></i><span>about.ts</span><b>● {content.terminal}</b></div><pre><em>const</em> developer = {'{'}{`\n`}  focus: <strong>'quality'</strong>,{`\n`}  stack: <strong>'fullstack'</strong>,{`\n`}  approach: <strong>'build with intent'</strong>{`\n`}{'}'};{`\n`}{`\n`}<small>✓ ready to create</small><b className="caret">▋</b></pre></aside>
    </div>
  </div></section>
}
function Projects({t,projects}) {
  const [expanded,setExpanded] = useState({});
  const toggleDesc = i => setExpanded(e=>({...e,[i]:!e[i]}));
  const bg = t.projects === 'Проекти';
  return <section className="single-page portfolio-page"><div className="wrap">
    <div className="portfolio-top"><p className="page-intro">{t.projectsIntro}</p><div className="portfolio-stats"><span><b>{String(projects.length).padStart(2,'0')}</b>{bg?'подбрани проекта':'selected builds'}</span><span><i></i>{bg?'изградени за реална употреба':'built for real use'}</span></div></div>
    <div className="project-grid">{projects.map((p,i)=><article className="project enhanced-project" key={`${p.title}-${i}`}><div className={`thumb ${p.tone}${p.image?" has-photo":""}`}>{p.image?<img src={p.image} alt={p.title}/>:<div className="project-browser"><div className="browser-bar"><i></i><i></i><i></i><span>{p.title.toLowerCase().replaceAll(' ','-')}.app</span><b>● LIVE</b></div><div className="browser-body"><aside><i></i><i></i><i></i><i></i></aside><main><div className="browser-title"><span></span><b></b></div><div className="browser-metrics"><i></i><i></i><i></i></div><div className="browser-chart"><b></b><b></b><b></b><b></b><b></b><b></b><b></b></div></main></div></div>}<span className="project-number">0{i+1}</span><span className="project-live"><i></i>{bg?'готов за старт':'launch ready'}</span></div><div className="project-info"><span className="project-kicker">// {bg?'FULL STACK BUILD':'FULL STACK BUILD'}</span><h3>{p.title}</h3><p>{expanded[i]||p.desc.length<=30?p.desc:p.desc.slice(0,30).trimEnd()+'…'}{p.desc.length>30&&<button type="button" className="desc-toggle" onClick={()=>toggleDesc(i)}>{expanded[i]?(bg?' Скрий':' Show less'):(bg?' Виж още':' Read more')}</button>}</p>{parseLangs(p.langs).length?<div className="project-langs">{parseLangs(p.langs).map(l=><div className="lang-row" key={l.name}><span>{l.name}</span><i><b style={{width:l.pct+'%'}}></b></i><small>{l.pct}%</small></div>)}</div>:<small className="project-tags-plain">{p.tags}</small>}</div>{(p.website||p.github)&&<div className="project-links">{p.website&&<a href={p.website} target="_blank" rel="noopener noreferrer">{bg?'Виж проекта':'View project'} <b>↗</b></a>}{p.github&&<a href={p.github} target="_blank" rel="noopener noreferrer">GitHub <b>◇</b></a>}</div>}</article>)}</div>
  </div></section>
}
function Skills({t}) {
  const bg = t.skills === 'Умения и услуги';
  const groups = bg ? [
    {number:'01',title:'Frontend',subtitle:'Интерфейси, които изглеждат добре и работят бързо.',items:[0,1,2,3,11,12,13]},
    {number:'02',title:'Backend',subtitle:'Стабилна логика, API и системи зад продукта.',items:[4,5,6,7,8,9,10]},
    {number:'03',title:'Data & DevOps',subtitle:'Данни, инфраструктура и сигурен deployment.',items:[14,15,16,17,18,19,20,21]}
  ] : [
    {number:'01',title:'Frontend',subtitle:'Interfaces that look sharp and perform fast.',items:[0,1,2,3,11,12,13]},
    {number:'02',title:'Backend',subtitle:'Reliable logic, APIs and systems behind the product.',items:[4,5,6,7,8,9,10]},
    {number:'03',title:'Data & DevOps',subtitle:'Data, infrastructure and confident deployment.',items:[14,15,16,17,18,19,20,21]}
  ];
  return <section className="single-page skills-page"><div className="wrap">
    <div className="skills-top"><div><span className="section-tag">// {bg?'ТЕХНОЛОГИЧЕН STACK':'TECHNOLOGY STACK'}</span><p className="page-intro">{t.skillsIntro}</p></div><div className="skills-top-card"><span>{bg?'пълен stack':'full stack'}</span><b>{tech.length}<small>{bg?' технологии':' technologies'}</small></b><code>ship(product);</code></div></div>
    <div className="skills-groups">{groups.map(group=><section className="skill-group" key={group.number}><header><span>{group.number}</span><div><h2>{group.title}</h2><p>{group.subtitle}</p></div><code>// {group.items.length} tools</code></header><div className="skill-items">{group.items.map(i=><article key={tech[i]}><b className={`glyph g${i}${glyphs[i].length>=3?" glyph-wide":glyphs[i].length===2?" glyph-mid":""}`}>{glyphs[i]}</b><div><strong>{tech[i]}</strong><span>{group.title}</span></div><i>↗</i></article>)}</div></section>)}</div>
  </div></section>
}
function ServiceGrid({items,startIndex,bg}) {
  return <div className="service-grid">{items.map((s,i)=><article key={s.id||i}><span>{String(startIndex+i+1).padStart(2,'0')}</span><i>✦</i><h3>{s.title}</h3><p>{s.desc}</p><div><div className="price-row">{s.oldPrice&&<s className="old-price">{s.oldPrice}</s>}<b>{s.price}</b></div><small>{bg?'индивидуална оферта':'tailored quote'}</small></div></article>)}</div>;
}

function Services({t,services}) {
  const bg = t.servicesTitle === 'Услуги';
  const foundation = services.filter(s => (s.category||'addon') === 'foundation');
  const addons = services.filter(s => (s.category||'addon') !== 'foundation');
  return <section className="single-page services-page"><div className="wrap">
    <div className="services-heading"><span className="section-tag">// {bg?'УСЛУГИ':'SERVICES'}</span><h2>{bg?'Как мога да помогна.':'What I can help you build.'}</h2><p>{t.servicesIntro}</p></div>
    {!!foundation.length && <div className="services-group">
      <div className="services-group-head"><h3>{bg?'Основни пакети':'Core packages'}</h3><p>{bg?'Избираш едно от тези като основен продукт — те са различни нива, не се комбинират едно с друго.':'Pick one of these as your core product — different tiers, not meant to be combined.'}</p></div>
      <ServiceGrid items={foundation} startIndex={0} bg={bg}/>
    </div>}
    {!!addons.length && <div className="services-group">
      <div className="services-group-head"><h3>{bg?'Добавки':'Add-ons'}</h3><p>{bg?'Комбинират се свободно с всеки от пакетите по-горе.':'Combine freely with any package above.'}</p></div>
      <ServiceGrid items={addons} startIndex={foundation.length} bg={bg}/>
    </div>}
    {!services.length&&<p className="admin-empty">{bg?'Няма добавени услуги.':'No services added yet.'}</p>}
  </div></section>
}
function RocketField() {
  const rockets = React.useMemo(() => Array.from({length:7}).map((_,i) => ({
    id:i,
    top: 6 + Math.random()*80,
    dur: 14 + Math.random()*16,
    delay: -(Math.random()*20),
    dir: i%2===0 ? 'right' : 'left',
    size: 16 + Math.round(Math.random()*14),
  })), []);
  return <div className="rocket-field" aria-hidden="true">{rockets.map(r => <span key={r.id} className={`rocket rocket-${r.dir}`} style={{top:`${r.top}%`,fontSize:`${r.size}px`,animationDuration:`${r.dur}s`,animationDelay:`${r.delay}s`}}>🚀</span>)}</div>;
}

function InteractiveDesk({bg}) {
  const [lines,setLines] = React.useState([bg?'добре дошъл в терминала — напиши "help"':'welcome to the terminal — type "help"']);
  const [buf,setBuf] = React.useState('');
  const responses = {
    help: bg?'налични: build, deploy, coffee, ai, rocket, whoami, sudo, joke, clear':'available: build, deploy, coffee, ai, rocket, whoami, sudo, joke, clear',
    build: bg?'✓ компилиране... готово за 0.8s':'✓ building... done in 0.8s',
    deploy: bg?'🚀 качено на production':'🚀 shipped to production',
    coffee: '☕ brewing...',
    ai: bg?'AI е добър, но не може да ме замени.':"AI is good, but it can't replace me.",
    rocket: bg?'towards the moon 🌕':'towards the moon 🌕',
    whoami: bg?'разработчик, който си играе твърде много':'a developer who plays around too much',
    sudo: bg?'хубав опит 😏 нямаш root достъп тук':"nice try 😏 you don't have root here",
  };
  const jokes = bg ? [
    'защо програмистите бъркат Halloween с Коледа? Защото Oct 31 == Dec 25.',
    'има 10 вида хора — тези, които разбират двоичната бройна система, и тези, които не.',
    'работи на моята машина 🤷',
    '99 малки бъга в кода... поправяш един, стават 127.',
    'защо програмистът фалира? защото използваше своя стек грешно.',
  ] : [
    'why do programmers confuse Halloween with Christmas? Because Oct 31 == Dec 25.',
    "there are 10 kinds of people — those who understand binary and those who don't.",
    'works on my machine 🤷',
    '99 little bugs in the code... fix one, 127 remain.',
    'why did the developer go broke? he used up all his cache.',
  ];
  const run = cmd => {
    const c = cmd.trim().toLowerCase();
    if (c === 'clear') { setLines([]); return; }
    if (c === 'joke') { setLines(prev => [...prev.slice(-8), `$ ${cmd}`, jokes[Math.floor(Math.random()*jokes.length)]]); return; }
    const out = responses[c] || (c ? (bg?`команда не е намерена: ${c}`:`command not found: ${c}`) : '');
    setLines(prev => [...prev.slice(-8), `$ ${cmd}`, out].filter(Boolean));
  };
  const press = key => {
    if (key === 'enter') { run(buf); setBuf(''); return; }
    if (key === '⌫') { setBuf(b => b.slice(0,-1)); return; }
    if (key === 'space') { setBuf(b => b + ' '); return; }
    if (key.length === 1) setBuf(b => b + key);
  };
  React.useEffect(() => {
    const onKey = e => {
      if (e.key === 'Enter') { run(buf); setBuf(''); }
      else if (e.key === 'Backspace') setBuf(b => b.slice(0,-1));
      else if (e.key.length === 1) setBuf(b => b + e.key);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [buf]);
  const rows = [['esc','1','2','3','4','5','6','7','8','9','0','⌫'],['tab','q','w','e','r','t','y','u','i','o','p'],['caps','a','s','d','f','g','h','j','k','l','enter'],['shift','z','x','c','v','b','n','m','space']];
  return <div className="interactive-desk">
    <div className="mini-monitor"><div className="screen-top"><i></i><i></i><i></i><b>terminal</b><small>● {bg?'на линия':'online'}</small></div>
      <pre className="desk-screen">{lines.map((l,i)=><span key={i}>{l}{`\n`}</span>)}<em>$ {buf}<b className="caret">▌</b></em></pre>
    </div>
    <div className="mini-keyboard">{rows.map((row,ri)=><div key={ri}>{row.map(k => <i key={k} onClick={()=>press(k)}>{k}</i>)}</div>)}</div>
    <small className="game-hint">{bg?'Натисни клавишите (реални или тук) — пробвай "help"':'Press keys (real or here) — try "help"'}</small>
  </div>;
}

function LiveCodeMonitor({bg}) {
  const snippets = React.useMemo(() => [
    '<h1>Hello World</h1>',
    'const handleClick = () => setOpen(true);',
    'function App(){ return <Home/> }',
    'app.get("/api/users", getUsers);',
    'const { data } = await supabase.from("orders").select();',
    'export default function Product(){ ... }',
    'ai.pair(me).build(faster);',
    'git commit -m "ship it"',
  ], []);
  const [completed,setCompleted] = React.useState([]);
  const [current,setCurrent] = React.useState('');
  const stateRef = React.useRef({snipIndex:0, charIndex:0});
  React.useEffect(() => {
    const id = setInterval(() => {
      const st = stateRef.current;
      const snip = snippets[st.snipIndex % snippets.length];
      st.charIndex++;
      setCurrent(snip.slice(0, st.charIndex));
      if (st.charIndex >= snip.length) {
        setCompleted(prev => { const next = [...prev, snip]; return next.length > 13 ? next.slice(-13) : next; });
        setCurrent('');
        st.snipIndex++;
        st.charIndex = -8;
      }
    }, 38);
    return () => clearInterval(id);
  }, [snippets]);
  return <div className="mini-monitor journey-monitor">
    <div className="screen-top"><i></i><i></i><i></i><b>build.log</b><small>● {bg?'на линия':'online'}</small></div>
    <pre className="desk-screen journey-screen">{completed.map((l,i)=><span key={i}>{'> '}{l}{`\n`}</span>)}{current&&<span>{'> '}{current}<b className="caret">▌</b></span>}</pre>
  </div>;
}

function Experience({t,settings}) {
  const bg = t.experience === 'Опит';
  const stats = bg ? [['10+','години опит'],['40+','завършени проекта'],['20+','доволни клиента']] : [['10+','years experience'],['40+','projects delivered'],['20+','happy clients']];
  const journey = bg ? [
    ['01','Първи редове код','HTML и CSS — първият сайт, който изобщо проработи.'],
    ['02','JavaScript & логика','От статични страници към интерактивност — DOM, събития, асинхронен код.'],
    ['03','React & компоненти','Мислене в компоненти — state, props, hooks и модерни интерфейси.'],
    ['04','Backend & бази данни','API-та, автентикация, PostgreSQL/Supabase — цели системи, не само страници.'],
    ['05','Full-stack продукти','От идея до production — реални приложения, използвани от истински хора.'],
    ['06','AI-асистирана разработка','Работа рамо до рамо с AI — по-бързо изграждане, по-малко грешки, повече продукт.'],
  ] : [
    ['01','First lines of code','HTML and CSS — the first site that actually worked.'],
    ['02','JavaScript & logic','From static pages to interactivity — the DOM, events, async code.'],
    ['03','React & components','Thinking in components — state, props, hooks and modern UI.'],
    ['04','Backend & databases','APIs, auth, PostgreSQL/Supabase — whole systems, not just pages.'],
    ['05','Full-stack products','From idea to production — real apps used by real people.'],
    ['06','AI-assisted development','Working side by side with AI — faster builds, fewer bugs, more product.'],
  ];
  return <section className="single-page experience-page-fun">
    <RocketField/>
    <div className="wrap experience-wrap">
      <div className="portfolio-top"><p className="page-intro">{t.experienceIntro}</p><div className="portfolio-stats">{stats.map(([value,label])=><span key={label}><b>{value}</b>{label}</span>)}</div></div>
      <div className="journey-layout">
        <div className="journey-steps">{journey.map(([num,title,desc])=><div className="journey-step" key={num}><span className="step-num">{num}</span><h3>{title}</h3><p>{desc}</p></div>)}</div>
        <LiveCodeMonitor bg={bg}/>
      </div>
      <div className="playground">
        <div className="playground-head"><span className="section-tag">// PLAYGROUND</span><h2>{bg?'Малко забавление между редовете код':'A little fun between the lines of code'}</h2><p className="playground-note">{bg?'Този терминал — е построен директно в браузъра, от нас. Пиши свободно.':'This terminal — was built right in the browser, by us. Type away.'}</p></div>
        <InteractiveDesk bg={bg}/>
      </div>
    </div>
  </section>
}

function Contact({t,settings,available,sent,setSent}) {
  const bg = t.send === 'Изпрати запитване';
  const [sending,setSending] = useState(false);
  const [formError,setFormError] = useState(false);
  const submitContact = async e => {
    e.preventDefault();
    if (sending) return;
    setSending(true); setFormError(false);
    const form = e.target;
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, { method:'POST', headers:{Accept:'application/json'}, body:new FormData(form) });
      if (res.ok) { setSent(true); form.reset(); setTimeout(()=>setSent(false),6000); } else { setFormError(true); }
    } catch { setFormError(true); }
    setSending(false);
  };
  const steps = bg ? [
    ['01','Запитване','Пишеш ми накратко за проекта, целите и бюджета.'],
    ['02','Оферта и план','Получаваш ясен timeline, technology stack и точна цена.'],
    ['03','Разработка и launch','Изграждаме продукта, тестваме го и го пускаме на живо.']
  ] : [
    ['01','Inquiry','You tell me briefly about the project, goals and budget.'],
    ['02','Proposal & plan','You get a clear timeline, tech stack and exact price.'],
    ['03','Build & launch','We build the product, test it and ship it live.']
  ];
  return <section className="contact standalone"><div className="wrap">
    <div className="contact-top">
      <div className="contact-copy">
        <span className="section-tag">{t.contact.toUpperCase()}</span>
        <h2>{t.cta}</h2>
        <p>{t.ctaText}</p>
        <div className="contact-info">
          <div><span>Email</span><strong>{settings.email}</strong></div>
          <div><span>{bg?'Локация':'Location'}</span><strong>{settings.location}</strong></div>
          <div><span>{bg?'Наличност':'Availability'}</span><strong><i className={available?'':'busy'}></i>{available?t.available:t.busy}</strong></div>
          <div><span>{bg?'Отговор':'Response time'}</span><strong>{bg?'до 24 часа':'within 24 hours'}</strong></div>
        </div>
        <div className="contact-channels"><button>GitHub ↗</button><button>LinkedIn ↗</button></div>
      </div>
      <div className="contact-form-card"><form onSubmit={submitContact}><input required name="name" placeholder="Name"/><input required type="email" name="email" placeholder="Email"/><textarea required name="message" placeholder="Tell me about the project..."/>{formError&&<p className="admin-error">{bg?`Нещо се обърка. Пиши директно на ${settings.email}.`:`Something went wrong. Email ${settings.email} directly.`}</p>}<button className="btn primary" type="submit" disabled={sending}>{sending?(bg?'Изпраща се...':'Sending...'):sent?t.sent:t.send} ↗</button></form></div>
    </div>
    <div className="contact-steps"><div className="principles-title"><span className="section-tag">// {bg?'ПРОЦЕС':'PROCESS'}</span><h3>{bg?'Как работим заедно.':'How we work together.'}</h3></div><div className="principle-grid">{steps.map(([number,title,text])=><article key={number}><span>{number}</span><h4>{title}</h4><p>{text}</p></article>)}</div></div>
  </div></section>
}
function Admin({t,settings,setSettings,available,setAvailable,projects,updateProject,removeProject,draft,setDraft,readFile,submitProject,services,updateService,removeService,draftService,setDraftService,submitService,close}) {
  const [authed,setAuthed] = useState(() => remoteEnabled ? false : localStorage.getItem('cfx-admin-auth') === '1');
  const [checkingSession,setCheckingSession] = useState(remoteEnabled);
  const [loginForm,setLoginForm] = useState({user:'',pass:''});
  const [loginError,setLoginError] = useState('');
  const [loggingIn,setLoggingIn] = useState(false);
  const [tab,setTab] = useState('brand');
  const [savedFlash,setSavedFlash] = useState(false);
  useEffect(() => { if (!remoteEnabled) return; getSession().then(session=>{ setAuthed(!!session); setCheckingSession(false); }); const unsub = onAuthChange(session=>setAuthed(!!session)); return unsub; },[]);
  const saveNow = async () => { await saveSettings(settings,available); await saveProjectsRemote(projects); await saveServicesRemote(services); setSavedFlash(true); setTimeout(()=>setSavedFlash(false),2400); };
  const submitLogin = async e => { e.preventDefault(); setLoginError(''); if (remoteEnabled) { setLoggingIn(true); const res = await signIn(loginForm.user.trim(),loginForm.pass); setLoggingIn(false); if (res.ok) { setAuthed(true); } else { setLoginError(res.error||'Грешен имейл или парола.'); } } else { if (loginForm.user.trim()===ADMIN_USER && loginForm.pass===ADMIN_PASS) { localStorage.setItem('cfx-admin-auth','1'); setAuthed(true); } else { setLoginError('Грешно потребителско име или парола.'); } } };
  const logout = async () => { if (remoteEnabled) { await signOutRemote(); } else { localStorage.removeItem('cfx-admin-auth'); } setAuthed(false); setLoginForm({user:'',pass:''}); close(); };
  if (checkingSession) { return <div className="admin-backdrop" onClick={close}><div className="admin-login" onClick={e=>e.stopPropagation()}><p className="admin-kicker">CFX CONTROL PANEL</p><p className="admin-sub">Зареждане...</p></div></div>; }
  if (!authed) { return <div className="admin-backdrop" onClick={close}><div className="admin-login" onClick={e=>e.stopPropagation()}><button className="close" onClick={close}>×</button><p className="admin-kicker">CFX CONTROL PANEL</p><h2>Вход в администрацията</h2><p className="admin-sub">{remoteEnabled?'Въведи имейл и парола, за да продължиш.':'Въведи потребителско име и парола, за да продължиш.'}</p><form onSubmit={submitLogin}><label>{remoteEnabled?'Имейл':'Потребителско име'}<input autoFocus type={remoteEnabled?'email':'text'} value={loginForm.user} onChange={e=>setLoginForm({...loginForm,user:e.target.value})}/></label><label>Парола<input type="password" value={loginForm.pass} onChange={e=>setLoginForm({...loginForm,pass:e.target.value})}/></label>{loginError&&<p className="admin-error">{loginError}</p>}<button className="btn primary done" type="submit" disabled={loggingIn}>{loggingIn?'Влизане...':'Влез'}</button></form></div></div>; }
  return <div className="admin-dashboard">
    <aside className="admin-side">
      <div>{settings.logo?<img className="admin-logo" src={settings.logo} alt="logo"/>:null}<p className="admin-kicker">CFX CONTROL PANEL</p><h2>Табло</h2></div>
      <nav><button className={tab==='brand'?'active':''} onClick={()=>setTab('brand')}>Бранд и статус</button><button className={tab==='projects'?'active':''} onClick={()=>setTab('projects')}>Проекти <small>({projects.length})</small></button><button className={tab==='services'?'active':''} onClick={()=>setTab('services')}>Услуги <small>({services.length})</small></button></nav>
      <div className="admin-side-bottom"><button className="btn ghost" onClick={close}>Затвори панела</button><button className="text-action" onClick={logout}>Изход от акаунта</button></div>
    </aside>
    <div className="admin-content"><button className="close" onClick={close}>×</button><div className="admin-content-inner">
      {tab==='brand'&&<>
        <div className="admin-section"><h3>Бранд и контакти</h3><label>Име на бранда<input value={settings.brand} onChange={e=>setSettings({...settings,brand:e.target.value})}/></label><label>Домейн<input value={settings.domain} onChange={e=>setSettings({...settings,domain:e.target.value})}/></label><label>Email<input value={settings.email} onChange={e=>setSettings({...settings,email:e.target.value})}/></label><label>Локация<input value={settings.location} onChange={e=>setSettings({...settings,location:e.target.value})}/></label></div>
        <div className="admin-section"><h3>Профилна снимка</h3><label className="upload">Качи снимка<input type="file" accept="image/*" onChange={e=>readFile(e.target.files?.[0],image=>setSettings({...settings,profileImage:image}))}/></label>{settings.profileImage&&<button className="text-action" onClick={()=>setSettings({...settings,profileImage:''})}>Премахни снимката</button>}</div>
        <div className="admin-section"><h3>Лого</h3><p className="admin-sub">Ако не качиш лого, в менюто ще се показва иконата &lt;/&gt;.</p>{settings.logo&&<img className="admin-logo-preview" src={settings.logo} alt="logo"/>}<label className="upload">{settings.logo?'Смени логото':'Качи лого'}<input type="file" accept="image/*" onChange={e=>readFile(e.target.files?.[0],image=>setSettings({...settings,logo:image}))}/></label>{settings.logo&&<button className="text-action" onClick={()=>setSettings({...settings,logo:''})}>Премахни логото</button>}</div>
        <div className="admin-section status-row"><div><h3>Работен статус</h3><p>{available?t.available:t.busy}</p></div><button className={`toggle ${available?'on':''}`} onClick={()=>setAvailable(!available)}><i></i></button></div>
      </>}
      {tab==='projects'&&<>
        <div className="admin-section"><h3>{t.add}</h3><form className="project-form" onSubmit={submitProject}><input placeholder="Име на проекта" value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/><textarea placeholder="Кратко описание" value={draft.desc} onChange={e=>setDraft({...draft,desc:e.target.value})}/><input placeholder="Технологии: React · Node.js" value={draft.tags} onChange={e=>setDraft({...draft,tags:e.target.value})}/><input placeholder="Проценти (по избор): React:60, Node.js:40" value={draft.langs} onChange={e=>setDraft({...draft,langs:e.target.value})}/><label className="upload">Качи портфолио снимка<input type="file" accept="image/*" onChange={e=>readFile(e.target.files?.[0],image=>setDraft({...draft,image}))}/></label><input placeholder="Website (по избор): https://..." value={draft.website} onChange={e=>setDraft({...draft,website:e.target.value})}/><input placeholder="GitHub (по избор): https://github.com/..." value={draft.github} onChange={e=>setDraft({...draft,github:e.target.value})}/><button className="btn primary" type="submit">+ {t.add}</button></form></div>
        <div className="admin-section"><h3>Съществуващи проекти <small>({projects.length})</small></h3><div className="admin-projects-list">{projects.map((p,i)=><div className="admin-project-row" key={p.id||i}><label>Име<input value={p.title} onChange={e=>updateProject(remoteEnabled?p.id:i,'title',e.target.value)}/></label><label>Описание<textarea value={p.desc} onChange={e=>updateProject(remoteEnabled?p.id:i,'desc',e.target.value)}/></label><label>Технологии<input value={p.tags} onChange={e=>updateProject(remoteEnabled?p.id:i,'tags',e.target.value)}/></label><label>Проценти (по избор) <small>(напр. React:60, Node.js:40 — показва мини progress bar-ове)</small><input placeholder="React:60, Node.js:40" value={p.langs||''} onChange={e=>updateProject(remoteEnabled?p.id:i,'langs',e.target.value)}/></label><label className="upload">{p.image?'Смени снимката':'Качи снимка'}<input type="file" accept="image/*" onChange={e=>readFile(e.target.files?.[0],image=>updateProject(remoteEnabled?p.id:i,'image',image))}/></label><label>Website <small>(по избор — ако е празно, бутонът не се показва)</small><input placeholder="https://..." value={p.website||''} onChange={e=>updateProject(remoteEnabled?p.id:i,'website',e.target.value)}/></label><label>GitHub <small>(по избор)</small><input placeholder="https://github.com/..." value={p.github||''} onChange={e=>updateProject(remoteEnabled?p.id:i,'github',e.target.value)}/></label><button type="button" className="text-action" onClick={()=>removeProject(remoteEnabled?p.id:i)}>Изтрий проекта</button></div>)}{!projects.length&&<p className="admin-empty">Няма добавени проекти.</p>}</div></div>
      </>}
      {tab==='services'&&<>
        <div className="admin-section"><h3>Добави услуга</h3><form className="project-form" onSubmit={submitService}><input placeholder="Име на услугата" value={draftService.title} onChange={e=>setDraftService({...draftService,title:e.target.value})}/><textarea placeholder="Кратко описание" value={draftService.desc} onChange={e=>setDraftService({...draftService,desc:e.target.value})}/><input placeholder="Стара цена (по избор, задраскана): от €799" value={draftService.oldPrice} onChange={e=>setDraftService({...draftService,oldPrice:e.target.value})}/><input placeholder="Нова цена: от €499" value={draftService.price} onChange={e=>setDraftService({...draftService,price:e.target.value})}/><label>Вид услуга<select value={draftService.category||'addon'} onChange={e=>setDraftService({...draftService,category:e.target.value})}><option value="foundation">Основен пакет</option><option value="addon">Добавка</option></select></label><button className="btn primary" type="submit">+ Добави услуга</button></form></div>
        <div className="admin-section"><h3>Съществуващи услуги <small>({services.length})</small></h3><div className="admin-projects-list">{services.map((sv,i)=><div className="admin-project-row" key={sv.id||i}><label>Име<input value={sv.title} onChange={e=>updateService(remoteEnabled?sv.id:i,'title',e.target.value)}/></label><label>Описание<textarea value={sv.desc} onChange={e=>updateService(remoteEnabled?sv.id:i,'desc',e.target.value)}/></label><label>Стара цена <small>(по избор — показва се задраскана)</small><input placeholder="от €799" value={sv.oldPrice||''} onChange={e=>updateService(remoteEnabled?sv.id:i,'oldPrice',e.target.value)}/></label><label>Нова цена<input value={sv.price} onChange={e=>updateService(remoteEnabled?sv.id:i,'price',e.target.value)}/></label><label>Вид услуга<select value={sv.category||'addon'} onChange={e=>updateService(remoteEnabled?sv.id:i,'category',e.target.value)}><option value="foundation">Основен пакет</option><option value="addon">Добавка</option></select></label><button type="button" className="text-action" onClick={()=>removeService(remoteEnabled?sv.id:i)}>Изтрий услугата</button></div>)}{!services.length&&<p className="admin-empty">Няма добавени услуги.</p>}</div></div>
      </>}
      <div className="admin-savebar"><span className={`admin-saved${savedFlash?' show':''}`}>✓ Промените са запазени</span><button className="btn primary" onClick={saveNow}>{t.save}</button></div>
    </div></div>
  </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
