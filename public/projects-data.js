// =====================================================================
// ПРОЕКТИ — тук добавяш новите си завършени проекти
// =====================================================================
// Как да добавиш нов проект (3 стъпки):
//
//  1) Сложи снимка (screenshot) на проекта в папката images/projects/
//     Препоръчителен размер: около 1400×900px, формат .jpg или .png
//     (най-лесно: направи screenshot на сайта в браузъра и го запази там)
//
//  2) Копирай ЦЕЛИЯ блок { ... } на някой от проектите по-долу, постави
//     копието някъде в масива PROJECTS (между квадратните скоби [ ])
//     и промени стойностите с твоите:
//
//       image      -> "images/projects/иметонафайла.jpg" (или "" ако
//                      още нямаш снимка — ще се показват инициалите)
//       initials   -> 2-3 букви, показват се докато няма снимка
//       thumbClass -> цвят на фона зад инициалите:
//                      "thumb-1" циан · "thumb-2" лилаво ·
//                      "thumb-3" розово · "thumb-4" жълто
//       titleBg    -> име на проекта (на български)
//       titleEn    -> име на проекта (на английски, ако е различно)
//       link       -> линк към живия сайт ("" ако няма още)
//       github     -> линк към GitHub (остави "" ако е частен)
//       descBg     -> кратко описание на български
//       descEn     -> кратко описание на английски
//       tags       -> технологии, показват се като етикети
//       featured   -> true = показва се и на началната страница
//
//  3) Запази файла — сайтът автоматично показва новия проект навсякъде.
//     Не е нужно да пипаш нищо друго (HTML/CSS).
// =====================================================================

const PROJECTS = [
  {
    image: "images/projects/3dprintingbg.jpg",
    initials: "3D",
    thumbClass: "thumb-1",
    titleBg: "3DPrintingBG",
    titleEn: "3DPrintingBG",
    link: "https://www.3dprintingbg.com/",
    github: "",
    descBg: "Български маркетплейс за 3D printing общността — обяви, магазини, категории и търсене по градове, свързващ продавачи и хоби ентусиасти в цялата страна.",
    descEn: "A Bulgarian marketplace for the 3D printing community — listings, shops, categories and city-based search, connecting sellers and hobbyists across the country.",
    tags: ["Next.js", "TypeScript", "Supabase", "Vercel"],
    featured: true
  },
  {
    image: "images/projects/maistorix.jpg",
    initials: "MX",
    thumbClass: "thumb-3",
    titleBg: "Maistorix",
    titleEn: "Maistorix",
    link: "https://www.maistorix.com/",
    github: "",
    descBg: "Платформа за управление на бизнеса на майстори — оферти, проекти, клиенти и плащания на едно място, с над 300 вградени услуги за бърза оферта.",
    descEn: "A business management platform for construction tradespeople — quotes, projects, clients and payments in one place, with 300+ built-in services for fast estimates.",
    tags: ["Vite", "Tailwind CSS", "Supabase"],
    featured: true
  },
  {
    image: "images/projects/melisalingo.jpg",
    initials: "ML",
    thumbClass: "thumb-2",
    titleBg: "MelisaLingo",
    titleEn: "MelisaLingo",
    link: "https://melisa-lingo.vercel.app/",
    github: "",
    descBg: "Геймифицирана платформа за изучаване на английски с тест за ниво, живи сесии с преподаватели и Stripe плащания за достъп до курсовете.",
    descEn: "A gamified English-learning platform with placement testing, live instructor sessions and Stripe-powered payments for course access.",
    tags: ["Vite", "JavaScript", "Stripe API", "Vercel"],
    featured: false
  },
  {
    image: "",
    initials: "PC",
    thumbClass: "thumb-4",
    titleBg: "Персонализиран скрипт/програма",
    titleEn: "Custom Script / Program",
    link: "",
    github: "",
    descBg: "Правя и персонализирани програми и скриптове за игри, Windows и всичко останало — на C#, Python, Java или каквото пасне на задачата, от малки помощни инструменти до по-сложни desktop приложения.",
    descEn: "I also build custom programs and scripts for games, Windows and pretty much anything else — in C#, Python, Java or whatever fits the task, from small utility tools to more complex desktop apps.",
    tags: ["C#", ".NET", { bg: "По заявка", en: "Custom-built" }],
    featured: false
  }
];
