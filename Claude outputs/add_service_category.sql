-- Add "category" column to services table and backfill existing rows
-- to match the new foundation/add-on split in the site code.

ALTER TABLE services ADD COLUMN IF NOT EXISTS category text DEFAULT 'addon';

-- Foundation tier (core packages, mutually exclusive)
UPDATE services SET category = 'foundation' WHERE title = 'Бизнес уебсайт';
UPDATE services SET category = 'foundation' WHERE title = 'Онлайн магазин';
UPDATE services SET category = 'foundation' WHERE title = 'Full-stack SaaS платформа';
UPDATE services SET category = 'foundation' WHERE title = 'Маркетплейс платформа';

-- Add-ons (combine freely with any foundation package)
UPDATE services SET category = 'addon' WHERE title = 'Административен панел / CRM';
UPDATE services SET category = 'addon' WHERE title = 'Автоматизации и API интеграции';
UPDATE services SET category = 'addon' WHERE title = 'Telegram / Discord ботове';
UPDATE services SET category = 'addon' WHERE title = 'AI интеграции';
UPDATE services SET category = 'addon' WHERE title = 'SEO и техническа оптимизация';
UPDATE services SET category = 'addon' WHERE title = 'Поддръжка и хостинг';

-- Any future service left uninitialized defaults to 'addon' already,
-- via the column default and the app's client-side fallback.
