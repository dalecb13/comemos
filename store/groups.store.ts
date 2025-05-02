import { customSynced, generateId, supabase } from "@/lib/supabase";
import { observable } from "@legendapp/state";

export const groups$ = observable(
  customSynced({
    supabase,
    collection: 'groups',
    select: (from) => from.select('id,group_name,group_description,creator_id,created_at,updated_at,deleted'),
    // filter: (select) => select.eq('user_id', supabase.auth.getUser()?.id),
    actions: ['read', 'create', 'update'],
    realtime: true,
    // Persist data and pending changes locally
    persist: {
      name: 'groups',
      retrySync: true, // Persist pending changes and retry
    },
    retry: {
      infinite: true, // Retry changes with exponential backoff
    },
    onError(error, params) {
      console.warn(error, params);
    },
    onSaved(params) {
      console.log("SV", params);
    },
  })
);

export function addGroup(group_name: string, group_description: string, creator_id: string) {
  console.log('[groups.store.addGroup]', group_name, group_description, creator_id);
  const id = generateId();
  // Add keyed by id to the todos$ observable to trigger a create in Supabase
  groups$[id].assign({
    id,
    group_name,
    group_description,
    creator_id,
  });
}
