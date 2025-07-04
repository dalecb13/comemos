import { customSynced, generateId, supabase } from "@/lib/supabase";
import { SearchRegion } from "@/models/search-region.model";
import { observable } from "@legendapp/state";
import { router } from "expo-router";
import { createGameId$ } from "./create-game.store";

export const games$ = observable(
  customSynced({
    supabase,
    collection: 'match_games',
    select: (from) => from.select('id,search_address,search_region,country,city,budget,categories,locale,creator_id,group_id,created_at,updated_at,deleted,status'),
    actions: ['read', 'create', 'update'],
    fieldCreatedAt: 'created_at',
    fieldUpdatedAt: 'updated_at',
    fieldDeleted: 'deleted',
    realtime: true,
    persist: {
      name: 'match_games',
      retrySync: true,
    },
    retry: {
      infinite: true,
    },
    onError(error, params) {
      console.warn(error, params);
    },

    onSaved(params) {
      console.log("SV", params);
    },
  })
);

export function createGame(creator_id: string) {
  console.log('[games.store.createGame]', creator_id);
  const id = generateId();
  // Add keyed by id to the todos$ observable to trigger a create in Supabase
  games$[id].assign({
    id,
    creator_id,
  });

  console.log('[games.store.createGame] id', id);

  createGameId$.set(id);

  router.navigate('/(root)/(tabs)/games/create');
}

export function startGame(game_id: string, search_region: SearchRegion) {
  console.log('[games.store.startGame]', game_id, search_region);
  // Add keyed by id to the todos$ observable to trigger a create in Supabase
  games$[game_id].assign({
    search_region,
    status: 'started',
  });

  router.navigate('/(root)/(tabs)/games/game/', { id: game_id });
}
