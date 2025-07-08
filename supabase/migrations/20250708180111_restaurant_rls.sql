-- Enable RLS for restaurants table
alter table public.restaurants
  enable row level security;

-- All authorized users can view restaurants
create policy "Restaurants are viewable by everyone."
  on public.restaurants
  for select
  using (true);
