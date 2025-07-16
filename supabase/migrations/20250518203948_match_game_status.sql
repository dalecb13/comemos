-- Create an enum called match_game_status which can be any of "created", "started", "ended", "inactive"
create type match_game_status
  as enum ('created', 'started', 'ended', 'inactive');

-- Update the match_game table and add a column called status which is of type match_game_status
alter table match_games
  add column status match_game_status not null default 'created';
