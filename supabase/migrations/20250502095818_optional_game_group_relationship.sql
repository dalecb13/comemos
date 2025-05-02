-- Make game-group relationship optional
ALTER TABLE "match_games" ALTER COLUMN "group_id" DROP NOT NULL;
