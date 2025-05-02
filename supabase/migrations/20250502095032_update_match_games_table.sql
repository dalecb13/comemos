-- Add columns to match_games table for updated_at
alter table match_games
  add column updated_at timestamptz default now();

-- Modify searchAddress column to be named search_address
alter table match_games
  rename searchAddress to search_address;

-- Modify createdAt column to be named created_at
alter table match_games
  rename createdAt to created_at;

-- Add deleted column to match_games table
alter table match_games
  add column deleted boolean default false;
