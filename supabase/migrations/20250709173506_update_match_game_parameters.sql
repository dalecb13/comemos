-- Remove country column from match game parameters
alter table match_games
  drop column country;

-- Remove city column from match game
alter table match_games
  drop column city;
