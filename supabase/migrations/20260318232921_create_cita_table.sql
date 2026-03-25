-- Migration: Create cita table for appointment bookings
-- No auth required — public users submit booking requests

CREATE TABLE IF NOT EXISTS public.cita (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre          TEXT NOT NULL,
  telefono        TEXT NOT NULL,
  email           TEXT,
  servicio        TEXT NOT NULL,
  mensaje         TEXT,
  fecha_preferida DATE,
  hora_preferida  TEXT,
  estado          TEXT NOT NULL DEFAULT 'pendiente',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cita_created_at ON public.cita(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cita_estado ON public.cita(estado);

ALTER TABLE public.cita ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public booking form — no login required)
DROP POLICY IF EXISTS "public_can_insert_cita" ON public.cita;
CREATE POLICY "public_can_insert_cita"
  ON public.cita
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users (admins) can read/update/delete
DROP POLICY IF EXISTS "authenticated_can_manage_cita" ON public.cita;
CREATE POLICY "authenticated_can_manage_cita"
  ON public.cita
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);