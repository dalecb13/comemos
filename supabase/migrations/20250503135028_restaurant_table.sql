-- Create a dedicated separate schema
create schema if not exists "gis";

-- Example: enable the "postgis" extension
create extension postgis with schema "gis";

create table if not exists public.restaurants (
  id uuid primary key default uuid_generate_v4(),
  restaurantName varchar,
  restaurantCoords "gis".geography(POINT) not null,
  restaurantDetails json,
  createdAt timestamptz default now(),
  updatedAt timestamptz default now(),
  deletedAt boolean default false
);

create index restaurants_geo_index
  on public.restaurants
  using GIST (restaurantCoords);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table public.restaurants
  enable row level security;

-- All authorized users can view restaurants
create policy "Restaurants are viewable by everyone."
  on public.restaurants
  for select
  using (true);
