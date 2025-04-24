import { supabase } from "@/lib/supabase";
import { Region } from "@/models/region.model";
import { Locale } from "expo-localization";

const RestaurantApi = {
  getRestaurants: async (region: Region, address: string, locale: Locale) => {
    console.log('[RestaurantApi.getRestaurants]', region, address, locale);
    let min_lat, min_long, max_lat, max_long;
    if (region.latitudeDelta > 0) {
      min_lat = region.latitude;
      max_lat = region.latitude + region.latitudeDelta;
      console.log('region.latitudeDelta > 0', min_lat, max_lat)
    } else {
      min_lat = region.latitude + region.latitudeDelta;
      max_lat = region.latitude;
      console.log('region.latitudeDelta < 0', min_lat, max_lat)
    }

    if (region.longitudeDelta > 0) {
      min_long = region.longitude;
      max_long = region.longitude + region.longitudeDelta;
      console.log('region.longitudeDelta > 0', min_long, max_long)
    } else {
      min_long = region.longitude + region.longitudeDelta;
      max_long = region.longitude;
      console.log('region.longitudeDelta < 0', min_long, max_long)
    }

    const { data, error } = await supabase
      .rpc('restaurants_in_box', {
        min_lat,
        min_long,
        max_lat,
        max_long,
      });

    if (error) {
      console.warn(error);
    }

    if (!data) {
      console.log('no data; fetching from UES');
      // const uesParameters: UESParameters = {
      //   maxRows: 100,
      //   query: 'Pizza',
      //   address,
      //   locale,
      //   page: 1,
      // }
      // const uesResult = await handleFetchUES(uesParameters);
      // console.log('uesResult', uesResult);
    }
  }
}

export default RestaurantApi;
