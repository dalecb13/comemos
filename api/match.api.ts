import { supabase } from "@/lib/supabase";
import { CreateMatchModel, MatchModel } from "@/models/match.model";

export const MATCH_TABLE_NAME = 'match_games';

const MatchApi = {
  getAllMatches: async () => {
    const { data, error } = await supabase
      .from(MATCH_TABLE_NAME)
      .select();

    if (error) {
      console.warn(error);
      return [];
    }

    return data as MatchModel[];
  },

  createMatch: async (createMatchModel: CreateMatchModel) => {
    
  }
}

export default MatchApi;
