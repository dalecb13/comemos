import { SearchRegion } from "@/models/search-region.model";
import { supabase } from "@/lib/supabase";

export const startGame = async (gameId: string, region: SearchRegion) => {
  const result = await supabase
    .functions
    .invoke('start-game', {
      body: {
        gameId,
        searchRegion: region,
      }
    });

  console.log('[startGame] result', result);

  const restaurant = result.data;

  return restaurant;
}
