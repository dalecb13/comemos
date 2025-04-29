create table groups (
  id uuid primary key default gen_random_uuid(),
  group_name varchar,
  group_description varchar,
  creator_id uuid NOT NULL references profiles,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  deleted boolean default false
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

create policy "Groups are updatable by authenticated users only."
  on groups
  for update
  using (auth.uid() = creator_id);

-- Legend-State helper to facilitate "Sync only diffs" (changesSince: 'last-sync') mode
CREATE OR REPLACE FUNCTION handle_times()
    RETURNS trigger AS
    $$
    BEGIN
    IF (TG_OP = 'INSERT') THEN
        NEW.created_at := now();
        NEW.updated_at := now();
    ELSEIF (TG_OP = 'UPDATE') THEN
        NEW.created_at = OLD.created_at;
        NEW.updated_at = now();
    END IF;
    RETURN NEW;
    END;
    $$ language plpgsql;

CREATE TRIGGER handle_times
    BEFORE INSERT OR UPDATE ON groups
    FOR EACH ROW
EXECUTE PROCEDURE handle_times();
