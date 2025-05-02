import { customSynced, supabase } from "@/lib/supabase";
import { observable } from "@legendapp/state";

export const games$ = observable(
  customSynced({
    supabase,
    collection: 'match_games',
    select: (from) => from.select('id,search_address,country,city,budget,categories,locale,creator_id,group_id,created_at,updated_at,deleted'),
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
