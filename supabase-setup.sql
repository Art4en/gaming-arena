-- =========================================================
-- GAMER ARENA — mise en place de la base (à coller une seule fois)
-- Supabase > SQL Editor > New query > coller tout > Run
-- =========================================================

-- Profil public : pseudo + photo, lié au compte (auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  pseudo text not null check (char_length(pseudo) between 2 and 20),
  avatar text,
  created_at timestamptz not null default now()
);

-- Scores : un par partie. board = 'reaction', 'aim', 'lol', 'valorant', 'fortnite', 'apex' ou 'mix'
create table if not exists public.scores (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  board text not null,
  value integer not null,
  hits integer,
  precision integer,
  correct integer,
  created_at timestamptz not null default now()
);

create index if not exists scores_board_value_idx on public.scores (board, value);

-- Sécurité : chacun ne modifie que ses propres données, tout le monde peut lire
alter table public.profiles enable row level security;
alter table public.scores enable row level security;

drop policy if exists "profils lisibles" on public.profiles;
create policy "profils lisibles" on public.profiles
  for select using (true);

drop policy if exists "gerer son profil" on public.profiles;
create policy "gerer son profil" on public.profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "scores lisibles" on public.scores;
create policy "scores lisibles" on public.scores
  for select using (true);

drop policy if exists "ajouter son score" on public.scores;
create policy "ajouter son score" on public.scores
  for insert with check (auth.uid() = user_id);

drop policy if exists "effacer ses scores" on public.scores;
create policy "effacer ses scores" on public.scores
  for delete using (auth.uid() = user_id);
