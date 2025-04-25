create table groups (
  id uuid primary key default gen_random_uuid(),
  group_name varchar,
  group_description varchar,
  creator_id uuid NOT NULL references profiles,
  createdAt timestamptz default now(),
  updatedAt timestamptz default now()
);

alter table groups
  enable row level security;

create policy "Groups are viewable by everyone."
  on groups
  for select
  using (true);

create policy "Groups are insertable by authenticated users only."
  on groups
  for insert
  with check (auth.uid() is not null);

create policy "Groups are updateable by authenticated users only."
  on groups
  for update
  using (auth.uid() = creator_id);
