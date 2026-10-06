-- Inscripciones a los Encuentros Terra Ignis.
-- Idempotente: se puede ejecutar más de una vez (npm run db:setup o SQL Editor de Neon).

CREATE TABLE IF NOT EXISTS registrations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_slug      TEXT NOT NULL,
  full_name       TEXT NOT NULL,
  organization    TEXT NOT NULL,
  role            TEXT NOT NULL,
  sector          TEXT NOT NULL,
  sector_other    TEXT,
  city            TEXT NOT NULL,
  region          TEXT,
  country         CHAR(2) NOT NULL,
  email           TEXT NOT NULL,
  phone           TEXT,
  consent         BOOLEAN NOT NULL,
  consent_at      TIMESTAMPTZ NOT NULL,
  privacy_version TEXT NOT NULL,
  email_sent      BOOLEAN NOT NULL DEFAULT false,
  email_sent_at   TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),

  -- Una inscripción por email y por encuentro; la misma persona puede anotarse a futuros encuentros.
  CONSTRAINT registrations_event_email_key UNIQUE (event_slug, email),
  CONSTRAINT registrations_email_normalized CHECK (email = lower(btrim(email))),
  CONSTRAINT registrations_consent_given CHECK (consent),
  CONSTRAINT registrations_sector_other CHECK (sector <> 'other' OR sector_other IS NOT NULL)
);

CREATE INDEX IF NOT EXISTS registrations_event_created_idx
  ON registrations (event_slug, created_at DESC);
