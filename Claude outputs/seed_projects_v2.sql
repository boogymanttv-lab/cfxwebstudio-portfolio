-- Изчиства старите демо проекти (включително "Dani Dinner", за да няма объркване с реалния DannyFoods)
delete from projects where title in ('AI System Income','Dani Dinner','Crypto Dashboard');

insert into projects (id, title, description, tags, langs, tone, image, website, github, sort_order) values
(gen_random_uuid(), '3DPrintingBG',
 'Маркетплейс за 3D принтиране и печат по поръчка в България — продавачи с магазини, обяви, количка с поръчки от няколко магазина, заявки „поръчай печат“ с оферти от продавачи, чат в реално време, плащания с карта (Stripe Connect) и наложен платеж, и пълен админ панел.',
 'Next.js · Stripe Connect · Supabase',
 'Next.js:45,Stripe Connect:25,Supabase:30',
 'violet', '', 'https://3dprintingbg.com', '', 0),

(gen_random_uuid(), 'DannyFoods',
 'Пълнофункционален сайт за поръчки на храна с онлайн доставка — публична част за клиенти (меню, количка, плащане с карта, проследяване на поръчка) и админ панел.',
 'Next.js · Tailwind CSS · Prisma',
 'Next.js:50,Tailwind CSS:30,Prisma:20',
 'green', '', 'https://dannyfoods.bg', '', 1),

(gen_random_uuid(), 'AI System Income (демо проект)',
 'Концептна инвестиционна платформа с AI протоколи, депозити и crypto портфейл — самостоятелен демо проект, разработен за да покаже работа с AI интеграции и финансови борд-панели.',
 'Next.js · TypeScript · Supabase',
 'Next.js:45,TypeScript:35,Supabase:20',
 'blue', '', '', '', 2),

(gen_random_uuid(), 'Crypto Dashboard (демо проект)',
 'Концептен crypto борд в реално време със статистики, графики и персонализирани alerts — самостоятелен демо проект за визуализация на данни и live обновявания.',
 'React · TypeScript · Chart.js',
 'React:50,TypeScript:30,Chart.js:20',
 'orange', '', '', '', 3),

(gen_random_uuid(), 'BookFlow (демо проект)',
 'Концептна SaaS платформа за онлайн резервации и записване на часове — календар, автоматични напомняния по имейл/SMS, управление на услуги и клиенти.',
 'React · Node.js · PostgreSQL',
 'React:40,Node.js:35,PostgreSQL:25',
 'rose', '', '', '', 4),

(gen_random_uuid(), 'FitTrack (демо проект)',
 'Концептно приложение за проследяване на тренировки и хранене — статистики за прогрес, персонализирани планове и графики за резултати във времето.',
 'React Native · Firebase · Chart.js',
 'React Native:45,Firebase:35,Chart.js:20',
 'green', '', '', '', 5),

(gen_random_uuid(), 'EstateList (демо проект)',
 'Концептна платформа за обяви на имоти — филтри по локация и цена, галерии със снимки, карта с локации и панел за агенции за управление на обявите.',
 'Next.js · Tailwind CSS · Supabase',
 'Next.js:40,Tailwind CSS:30,Supabase:30',
 'violet', '', '', '', 6);
