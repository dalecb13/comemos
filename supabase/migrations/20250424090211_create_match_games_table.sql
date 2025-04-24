create table match_games (
  id uuid primary key default uuid_generate_v4(),
  searchAddress varchar,
  country varchar,
  city varchar,
  budget int,
  categories varchar ARRAY null,
  locale varchar,
  creator_id uuid NOT NULL references profiles,
  createdAt timestamptz default now()
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table match_games
  enable row level security;

create policy "Match games are viewable by everyone."
  on match_games
  for select
  using (true);

create policy "Enable insert into match_games for users based on creator_id"
  on "public"."match_games"
  as PERMISSIVE
  for INSERT
  to authenticated
  with check (
    (select auth.uid()) = creator_id
  );

create policy "Enable update by authenticated users."
  on "public"."match_games"
  as PERMISSIVE
  for update
  to authenticated;
