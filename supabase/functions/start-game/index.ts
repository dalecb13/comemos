// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient, SupabaseClient } from 'jsr:@supabase/supabase-js@2'
import mockUesResponse from './ues_response_en_es.json' with { type: "json" };

const IS_PRODUCTION = false;

type LatLng = {
  latitude: number;
  longitude: number;
}

type RectangularRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

type SearchRegion = {
  region: RectangularRegion | LatLng[]
  regionType: 'rectangular' | 'polygon'
}

const findInternalRestaurants = async (supabase: SupabaseClient, searchRegion: SearchRegion) => {
  if (searchRegion.regionType === 'rectangular') {
    const rectangularRegion = searchRegion.region as RectangularRegion;

    const halfLatitudeDelta = rectangularRegion.latitudeDelta / 2;
    const halfLongitudeDelta = rectangularRegion.longitudeDelta / 2;

    const min_lat = rectangularRegion.latitude - halfLatitudeDelta;
    const min_long = rectangularRegion.longitude - halfLongitudeDelta;
    const max_lat = rectangularRegion.latitude + halfLatitudeDelta;
    const max_long = rectangularRegion.longitude + halfLongitudeDelta;

    const { data, error } = await supabase
      .rpc('restaurants_in_box', {
        min_lat,
        min_long,
        max_lat,
        max_long,
      });

    if (error) {
      throw error;
    }

    return data;
  } else {
    // throw error not yet implemented
    return [];
  }
}

const fetchExternalRestaurants = async (searchRegion: SearchRegion): Promise<any[]> => {
  if (!IS_PRODUCTION) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockUesResponse.returnvalue.data as any[]);
      }, 3000);
    });
  } else {
    return [];
  }
}

const storeRestaurants = async (supabase: SupabaseClient, restaurants: any[]) => {
  const { data, error } = await supabase
    .from('restaurants')
    .insert(restaurants);

  if (error) {
    throw error;
  }

  return data;
}

Deno.serve(async (req) => {
  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_ANON_KEY') ?? ''
  );

  const { gameId, searchRegion } = await req.json()

  const { data, error } = await supabaseClient
    .from('match_games')
    .update({ search_region: searchRegion })
    .eq('id', gameId)
    .select();

  if (error) {
    return new Response(
      JSON.stringify({ error }),
      { headers: { "Content-Type": "application/json" } },
    )
  }

  try {
    const restaurants = await findInternalRestaurants(supabaseClient, searchRegion);

    if (!restaurants || restaurants.length === 0) {
      const rs: any[] = await fetchExternalRestaurants(searchRegion);
      await storeRestaurants(supabaseClient, rs);
      return new Response(
        JSON.stringify({ restaurant: rs[0] }),
        { headers: { "Content-Type": "application/json" } },
      )
    }

    return new Response(
      JSON.stringify({ restaurant: restaurants[0] }),
      { headers: { "Content-Type": "application/json" } },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error }),
      { headers: { "Content-Type": "application/json" } },
    )
  }
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/start-game' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
