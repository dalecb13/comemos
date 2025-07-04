-- Create a join table between Match Games and Restaurants
create table if not exists public.match_game_restaurants (
  id uuid primary key default uuid_generate_v4(),
  matchGameId uuid not null references public.match_games,
  restaurantId uuid not null references public.restaurants,
  createdAt timestamptz default now(),
  updatedAt timestamptz default now(),
  deletedAt boolean default false
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table public.match_game_restaurants
  enable row level security;

-- Everyone can see match_game_restaurants
create policy "Match game restaurants are viewable by everyone."
  on public.match_game_restaurants
  for select
  to authenticated
  using (true);

-- Create an enum called vote_status is either "liked" or "disliked"
create type vote_status as enum ('liked', 'disliked', 'not_voted');

-- Also create a join table between match_game_restaurants and profiles, where profiles is a table. Also include a column for their vote status.
create table if not exists public.match_game_restaurants_votes (
  id uuid primary key default uuid_generate_v4(),
  matchGameRestaurantId uuid not null references match_game_restaurants,
  profileId uuid NOT NULL references profiles,
  voteStatus vote_status default 'not_voted',
  createdAt timestamptz default now(),
  updatedAt timestamptz default now(),
  deletedAt boolean default false
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table public.match_game_restaurants_votes
  enable row level security;

-- Everyone can see match_game_restaurants_votes
create policy "Match game restaurants votes are viewable by everyone."
  on public.match_game_restaurants_votes
  for select
  to authenticated
  using (true);
