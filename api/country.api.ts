import { supabase } from "@/lib/supabase";
import { CountryModel } from "@/models/country.model";

const COUNTRIES_TABLE_NAME = 'countries';

function countryNameAZ( a: CountryModel, b: CountryModel ) {
  if ( a.countryName < b.countryName ){
    return -1;
  }
  if ( a.countryName > b.countryName ){
    return 1;
  }
  return 0;
}

const CountryApi = {
  getCountries: async () => {
    const { data, error } = await supabase
      .from(COUNTRIES_TABLE_NAME)
      .select();

    if (error) {
      console.warn(error);
      return [];
    }

    return data as CountryModel[];
  },

  getCountriesPicker: async () => {
    const data = await CountryApi.getCountries();
    const pickerData = data
      .sort(countryNameAZ)
      .map((country: CountryModel) => {
        return {
          ...country,
          label: country.countryName,
          value: country.countryName,
        }
      });

    return pickerData;
  }
}

export default CountryApi;
