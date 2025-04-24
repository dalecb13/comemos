export interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  // destinationLatitude: number | null;
  // destinationLongitude: number | null;
  // destinationAddress: string | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  // setDestinationLocation: ({
  //   latitude,
  //   longitude,
  //   address,
  // }: {
  //   latitude: number;
  //   longitude: number;
  //   address: string;
  // }) => void;
}
