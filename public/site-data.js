// =====================================================================
// ДАННИ ЗА 3D САЙТА — услуги, за мен, контакти, текстове (BG / EN)
// Проектите се четат от projects-data.js (както досега).
// =====================================================================
const SITE = {
  email: "wellecfx@gmail.com",
  ui: {
    bg: {
      hint: "Движи мишката и кликай по обектите — почти всичко на бюрото е живо",
      hintTouch: "Докосвай обектите — почти всичко е живо",
      loading: "Зареждане на бюрото…",
      back: "Назад към бюрото",
      classic: "Класически сайт",
      available: "Свободен за freelance проекти",
      tagline: "Full-Stack разработчик — от идея до готов продукт.",
      projects: "Проекти", services: "Услуги", about: "За мен", contact: "Контакти",
      projectsTip: "Отвори работния плот 🖥️", servicesTip: "Услуги и цени", aboutTip: "Кой съм аз", contactTip: "Свържи се с мен",
      selected: "Избрани проекти",
      viewSite: "Виж сайта ↗",
      fixed: "Фиксирана цена", extra: "Екстра:",
      servicesIntro: "Пакети с ясен обхват и честна стартова цена. Крайната оферта е индивидуална, според твоя проект.",
      notSure: "Не си сигурен коя услуга ти трябва?",
      notSureText: "Кажи ми какво искаш да построиш — ще ти кажа правилния обхват и цена.",
      writeMe: "Пиши ми",
      aboutTitle: "Кой съм аз",
      aboutP1: "Аз съм CFXWEBSTUDIO — full-stack разработчик от България, който превръща идеи в работещи продукти бързо.",
      aboutP2: "Фокусът ми е върху Next.js и Supabase, съчетани с изчистен и ефективен работен процес, който ми позволява да мина от концепция до готов, production-ready продукт за дни, а не месеци. Създал съм реална маркетплейс платформа, обучително приложение с живи сесии и плащания, както и desktop автоматизационни инструменти, използвани от гейминг общности.",
      aboutP3: "Ако имаш идея и искаш тя да бъде реализирана правилно — и бързо — да говорим.",
      location: "Локация", focus: "Фокус", availability: "Наличност",
      focusVal: "Уеб приложения и автоматизация", availVal: "Отворен за нови проекти",
      skills: "С какво работя",
      contactTitle: "Да работим заедно",
      contactText: "Най-бързият начин да се свържеш с мен е имейл — обикновено отговарям до ден.",
      email: "Имейл", emailSub: "Най-добре за запитвания за проекти.",
      tools: "Инструменти", toolsTip: "Игрови инструменти", from: "от", enter: "Влез в бюрото", enterNote: "със звук 🔊", soundOn: "Звук", close: "Затвори", desktop: "Работен плот", packages: "Пакети", addons: "Добавки", addonsSub: "Комбинират се свободно с всеки от пакетите по-горе.", custom: "индивидуална оферта", details: "Виж детайли →", stackTitle: "// технологичен stack", stackSub: "Целият stack, с който превръщам идеи в работещи продукти.", techUnit: "технологии", how: "Как работя", toolsWord: "tools"
    },
    en: {
      hint: "Move your mouse and click the objects — almost everything on the desk is alive",
      hintTouch: "Tap the objects — almost everything is alive",
      loading: "Loading the desk…",
      back: "Back to the desk",
      classic: "Classic site",
      available: "Available for freelance projects",
      tagline: "Full-Stack Developer — from idea to live product.",
      projects: "Projects", services: "Services", about: "About", contact: "Contact",
      projectsTip: "Open the desktop 🖥️", servicesTip: "Services & prices", aboutTip: "Who I am", contactTip: "Get in touch",
      selected: "Selected work",
      viewSite: "Visit site ↗",
      fixed: "Fixed price", extra: "Extra:",
      servicesIntro: "Packages with a clear scope and a fair starting price. The final quote is custom to your project.",
      notSure: "Not sure which service fits?",
      notSureText: "Tell me what you're trying to build — I'll tell you the right scope and price.",
      writeMe: "Email me",
      aboutTitle: "Who I am",
      aboutP1: "I'm CFXWEBSTUDIO, a full-stack developer based in Bulgaria who turns ideas into working products fast.",
      aboutP2: "My focus is Next.js and Supabase, paired with a streamlined workflow that lets me move from concept to a polished, production-ready build in days rather than months. I've shipped a real marketplace platform, a learning app with live sessions and payments, and desktop automation tools used by gaming communities.",
      aboutP3: "If you have an idea and need it built right — and built fast — let's talk.",
      location: "Location", focus: "Focus", availability: "Availability",
      focusVal: "Web apps & automation", availVal: "Open to new projects",
      skills: "What I work with",
      contactTitle: "Let's work together",
      contactText: "The fastest way to reach me is email — usually reply within a day.",
      email: "Email", emailSub: "Best for project inquiries.",
      tools: "Tools", toolsTip: "Game tools", from: "from", enter: "Enter the desk", enterNote: "with sound 🔊", soundOn: "Sound", close: "Close", desktop: "Desktop", packages: "Packages", addons: "Add-ons", addonsSub: "Freely combined with any of the packages above.", custom: "custom quote", details: "See details →", stackTitle: "// tech stack", stackSub: "The full stack I use to turn ideas into working products.", techUnit: "technologies", how: "How I work", toolsWord: "tools"
    }
  },
  packages: [
    { n:"01", old:"€499", price:"€349",
      title:{bg:"Бизнес уебсайт",en:"Business website"},
      desc:{bg:"Презентационен сайт за бизнес или личен бранд — модерен дизайн, бърза скорост и SEO основи.",en:"A presentation site for a business or personal brand — modern design, fast speed and SEO basics."} },
    { n:"02", old:"€1400", price:"€899",
      title:{bg:"Онлайн магазин",en:"Online store"},
      desc:{bg:"Пълноценен e-commerce магазин с количка, плащания с карта, наложен платеж и админ панел за продукти и поръчки.",en:"A full e-commerce store with cart, card payments, cash on delivery and an admin panel for products and orders."} },
    { n:"03", old:"€2900", price:"€1899",
      title:{bg:"Full-stack SaaS платформа",en:"Full-stack SaaS platform"},
      desc:{bg:"Цялостна платформа с потребители, абонаменти, база данни и админ логика — от идея до production.",en:"A complete platform with users, subscriptions, database and admin logic — from idea to production."} },
    { n:"04", old:"€2600", price:"€1699",
      title:{bg:"Маркетплейс платформа",en:"Marketplace platform"},
      desc:{bg:"Платформа с много продавачи/потребители — обяви, съобщения, плащания и модерация, като Bazar.bg или OLX модел.",en:"A platform with many sellers/buyers — listings, messages, payments and moderation, like the Bazar.bg or OLX model."} }
  ],
  addons: [
    { n:"05", old:"€1100", price:"€699",
      title:{bg:"Административен панел / CRM",en:"Admin panel / CRM"},
      desc:{bg:"Вътрешна система за управление на клиенти, поръчки, служители или наличности, скроена по твоите процеси.",en:"An internal system to manage clients, orders, staff or inventory, tailored to your processes."} },
    { n:"06", old:"€399", price:"€249",
      title:{bg:"Автоматизации и API интеграции",en:"Automations & API integrations"},
      desc:{bg:"Python, C#, Java и REST/API интеграции между системи, които премахват ръчната и повтаряща се работа.",en:"Python, C#, Java and REST/API integrations between systems that remove manual, repetitive work."} },
    { n:"07", old:"€329", price:"€199",
      title:{bg:"Telegram / Discord ботове",en:"Telegram / Discord bots"},
      desc:{bg:"Персонализирани ботове за автоматизация, нотификации, поръчки или community management.",en:"Custom bots for automation, notifications, orders or community management."} },
    { n:"08", old:"€549", price:"€349",
      title:{bg:"AI интеграции",en:"AI integrations"},
      desc:{bg:"Вграждане на AI чатботове, автоматизирано съдържание или AI логика в съществуващ продукт.",en:"Embedding AI chatbots, automated content or AI logic into an existing product."} },
    { n:"09", old:"€99", price:"€69",per:{bg:"/мес",en:"/mo"},
      title:{bg:"Поддръжка и хостинг",en:"Support & hosting"},
      desc:{bg:"Месечна поддръжка, ъпдейти, мониторинг и хостинг менажиране, за да работи всичко гладко след старта.",en:"Monthly support, updates, monitoring and hosting management so everything runs smoothly after launch."} },
    { n:"10", old:"€299", price:"€199",
      title:{bg:"SEO и техническа оптимизация",en:"SEO & technical optimization"},
      desc:{bg:"Оптимизация на скорост, структура и видимост в Google — за да те намират реалните клиенти.",en:"Optimization of speed, structure and Google visibility — so real customers can find you."} }
  ],
  stack: [
    { n:"01", t:"Frontend", d:{bg:"Интерфейси, които изглеждат добре и работят бързо.",en:"Interfaces that look good and run fast."}, items:[
      ["Next.js","N","#c9c9ff"],["TypeScript","TS","#4c9bff"],["JavaScript","JS","#f7df1e"],["React","⚛","#61dafb"],["HTML5","H","#ff6b3d"],["CSS3","CSS","#4aa3ff"],["Tailwind CSS","≈","#38bdf8"]] },
    { n:"02", t:"Backend", d:{bg:"Стабилна логика, API и системи зад продукта.",en:"Stable logic, APIs and the systems behind the product."}, items:[
      ["Node.js","⬢","#6cc24a"],["Python","Py","#ffd43b"],["C#","C#","#a179dc"],["Java","J","#f89820"],["PHP","PHP","#8f94d6"],["Go","Go","#00c4e8"],["Ruby","Rb","#ff4d4d"]] },
    { n:"03", t:"Data & DevOps", d:{bg:"Данни, инфраструктура и сигурен deployment.",en:"Data, infrastructure and safe deployment."}, items:[
      ["PostgreSQL","Pg","#5b9bd5"],["MySQL","My","#2aa5c9"],["MongoDB","M","#47c248"],["Redis","R","#ff4a3d"],["Supabase","ϟ","#3ecf8e"],["Docker","▣","#2496ed"],["Git","◆","#ff5a3d"],["AWS","AWS","#ff9900"]] }
  ],
  skills: [
    { t: { bg: "Frontend", en: "Frontend" }, l: ["Next.js / React", "TypeScript", "Tailwind CSS", "Vite"] },
    { t: { bg: "Backend и данни", en: "Backend & Data" }, l: ["Supabase", "PostgreSQL", "REST / API integrations", "Stripe payments"] },
    { t: { bg: "Автоматизация", en: "Automation" }, l: ["C# desktop tools", { bg: "Процес и workflow ботове", en: "Process & workflow bots" }, { bg: "Игрови помощни инструменти", en: "Game utility tools" }, { bg: "Python / Java при нужда", en: "Python / Java on request" }] },
    { t: { bg: "Доставка", en: "Delivery" }, l: [{ bg: "Бързо, лично изпълнение", en: "Fast, hands-on delivery" }, { bg: "Бързо прототипиране", en: "Rapid prototyping" }, "Vercel deployment"] }
  ]
};


SITE.tools = {
  intro: {
    bg: "Правя автоматизационни инструменти и помощни програми за игри и Windows — на C#, Python или Java. Доказани в реална употреба от гейминг общност.",
    en: "I build automation tools and helper programs for games and Windows — in C#, Python or Java. Field-tested by a real gaming community."
  },
  items: [
    { n: "01", t: { bg: "C# desktop инструменти", en: "C# desktop tools" },
      d: { bg: "Персонализирани програми за Windows, които автоматизират повтарящи се действия.", en: "Custom Windows programs that automate repetitive tasks." } },
    { n: "02", t: { bg: "Игрови помощни инструменти", en: "Game utility tools" },
      d: { bg: "Малки помощни програми за игри — на C#, Python или Java, според задачата.", en: "Small helper programs for games — in C#, Python or Java, whichever fits the task." } },
    { n: "03", price: "€199", t: { bg: "Telegram / Discord ботове", en: "Telegram / Discord bots" },
      d: { bg: "Модерация, роли и събития за общности. Изграден и тестван в реална MMORPG Discord общност.", en: "Moderation, roles and events for communities. Built and battle-tested in a real MMORPG Discord community." } },
    { n: "04", price: "€249", t: { bg: "Автоматизации и API", en: "Automations & API" },
      d: { bg: "Python, C#, Java и REST/API интеграции, които махат ръчната и повтаряща се работа.", en: "Python, C#, Java and REST/API integrations that remove manual, repetitive work." } }
  ]
};
