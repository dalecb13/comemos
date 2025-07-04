import { observable } from "@legendapp/state";
import { Region } from "react-native-maps";

export type UserMapLocation = {
  region: Region,
  userAddress: string,
}

export const userLocation$ = observable<UserMapLocation>({
  region: {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  },
  userAddress: '',
  },
);
