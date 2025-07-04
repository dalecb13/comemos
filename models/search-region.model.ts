import { LatLng } from "react-native-maps";

export type RectangularRegion = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export type SearchRegion = {
  region: RectangularRegion | LatLng[]
  regionType: 'rectangular' | 'polygon'
}
