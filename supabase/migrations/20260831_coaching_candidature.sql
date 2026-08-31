-- Candidature al coaching 1-1 (form /coaching/candidati).
--
-- Perché una tabella dedicata e non `leads`:
--  1. `leads.email` è UNIQUE, ma una persona può candidarsi più volte (a
--     luglio 2026 è già successo) e può essere già lead da exit-popup. Ogni
--     insert successivo falliva con 23505 e veniva ingoiato da un catch.
--  2. `leads` non ha una colonna per le risposte: il codice provava a
--     scrivere `answers` che non è mai esistita. Risultato: nessuna
--     candidatura è mai stata salvata, da quando esiste il form.
--
-- Append-only: ogni invio è una riga, come per `coaching_questionari`.

create table if not exists public.coaching_candidature (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null,
  email text not null,
  telefono text,
  data_nascita text,
  situazione_frustrazione text,
  obiettivo text,
  perche_no text,
  vita_con_fisico text,
  canale_call text,
  impegno text,
  consenso text
);

create index if not exists coaching_candidature_created_at_idx
  on public.coaching_candidature (created_at desc);

-- Stesso schema di sicurezza di `coaching_questionari`: RLS attiva e nessuna
-- lettura pubblica. Scrive solo la service role dell'API, che bypassa RLS.
alter table public.coaching_candidature enable row level security;

drop policy if exists "No public read" on public.coaching_candidature;
create policy "No public read"
  on public.coaching_candidature
  for select
  using (false);

-- Riga di test lasciata dalla verifica dell'endpoint: si può rimuovere.
delete from public.leads where email = 'zztest-claude@example.invalid';
