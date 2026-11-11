-- Run with: npm run db:init   (safe to re-run)
CREATE TABLE IF NOT EXISTS leads (
  id          SERIAL PRIMARY KEY,
  type        TEXT NOT NULL DEFAULT 'newsletter',
  email       TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'new',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS sell_submissions (
  id            SERIAL PRIMARY KEY,
  make          TEXT NOT NULL,
  model         TEXT NOT NULL,
  year          INT  NOT NULL,
  mileage       INT  NOT NULL,
  desired_price NUMERIC,
  contact_name  TEXT NOT NULL,
  contact_phone TEXT NOT NULL,
  status        TEXT NOT NULL DEFAULT 'new',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS vehicles (
  id           SERIAL PRIMARY KEY,
  slug         TEXT UNIQUE NOT NULL,
  make         TEXT NOT NULL,
  model        TEXT NOT NULL,
  year         INT  NOT NULL,
  price        NUMERIC NOT NULL,
  mileage      INT  NOT NULL,
  body         TEXT, fuel TEXT, transmission TEXT, hp INT, engine TEXT, color TEXT,
  status       TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('draft','available','reserved','sold','archived')),
  sold_at      TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_vehicles_status_make ON vehicles (status, make);
CREATE TABLE IF NOT EXISTS events (
  id           BIGSERIAL PRIMARY KEY,
  type         TEXT NOT NULL,          -- page_view | call | whatsapp | inquiry | compare
  path         TEXT,
  vehicle_slug TEXT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_events_type_day ON events (type, created_at);
