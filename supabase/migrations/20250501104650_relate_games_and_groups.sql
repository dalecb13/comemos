alter table match_games
  add column group_id uuid references groups (id);
