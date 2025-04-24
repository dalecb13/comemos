import { supabase } from "@/lib/supabase";
import { CreateGameModel } from "@/models/create-game.model";

export const MATCH_TABLE_NAME = 'match_game';

const GameApi = {
  createGame: async (createGameModel: CreateGameModel) => {
    const { data, error: restaurantsInViewError } = await supabase
      .rpc('restaurants_in_view', {
        min_lat: 40.807,
        min_long: -73.946,
        max_lat: 40.808,
        max_long: -73.945,
      });
  
    const { error: createMatchError } = await supabase
      .from(MATCH_TABLE_NAME)
      .insert({
        address: createGameModel.address,
        country: createGameModel.address,
        city: createGameModel.city,
        budget: createGameModel.budget,
        categories: createGameModel.categories,
      });
  
    if (createMatchError) {
      console.warn(createMatchError);
    }
  }
}

export default GameApi;
