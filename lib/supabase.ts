import { AppState } from 'react-native'
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'
import { configureSyncedSupabase, syncedSupabase } from '@legendapp/state/sync-plugins/supabase'
import { configureSynced } from '@legendapp/state/sync'
import { observablePersistAsyncStorage } from '@legendapp/state/persist-plugins/async-storage'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";

import { Database } from '../models/database.types'

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_PROJECT_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY!;

export const generateId = () => uuidv4();

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

enableReactTracking({
  auto: true,
});

configureSyncedSupabase({
  generateId
})

export const customSynced = configureSynced(syncedSupabase, {
  persist: {
    plugin: observablePersistAsyncStorage({
      AsyncStorage,
    }),
  },
  generateId,
  supabase,
  changesSince: 'last-sync',
  fieldCreatedAt: 'created_at',
  fieldUpdatedAt: 'updated_at',
  fieldDeleted: 'deleted',
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
});
