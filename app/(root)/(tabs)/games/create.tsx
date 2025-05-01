import CountryApi from "@/api/country.api";
import GameApi from "@/api/game.api";
import RestaurantApi from "@/api/restaurant.api";
import { AAAAAA, ASH_GRAY, ASH_GRAY_TRANSPARENT, BACKDROP_COLOR, CCCCCC, EEEEEE, REDWOOD, WHITE, ZOMP } from "@/constants/colors";
import { calculateRegion } from "@/lib/location";
import globalStyles from "@/lib/styles";
import { CountryModel } from "@/models/country.model";
import { CreateGameModel } from "@/models/create-game.model";
import { useLocationStore } from "@/store/use-location-store";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useLocales } from "expo-localization";
import React, { useEffect, useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import MapView, { LatLng, LongPressEvent, Polygon, PROVIDER_DEFAULT } from "react-native-maps";
// import { CityModel, CountryModel } from "../../../../models/location.model";
// import { getCities, getCountries } from "../../../../api/location.api";
// import { FriendModel } from "models/friend.model";
// import { useLocationStore } from "store/location";
// import { calculateRegion } from "lib/location";
// import { getLocales } from "react-native-localize";
// import { getLangNameFromCode } from "language-name-map";
// import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import RNPickerSelect from 'react-native-picker-select';

// import { CreateGameModel, createMatch } from "api/match.api";
import { SafeAreaView } from 'react-native-safe-area-context';
// import globalStyles from "lib/styles";
// import MapView, { LatLng, LongPressEvent, PROVIDER_DEFAULT } from 'react-native-maps';
// import { AAAAAA, ASH_GRAY, BACKDROP_COLOR, PRIMARY_COLOR, ZOMP } from 'constants/colors';
// import { getRestaurants } from "api/restaurant.api";

type PickerOption = {
  label: string;
  value: string;
}

type CountryPickerOption = CountryModel & PickerOption;

// function countryNameAZ( a: CountryModel, b: CountryModel ) {
//   if ( a.countryName < b.countryName ){
//     return -1;
//   }
//   if ( a.countryName > b.countryName ){
//     return 1;
//   }
//   return 0;
// }

export default function CreateMatchPage() {
  console.log('[CreateMatchPage]');
  const locales = useLocales();
  const mapRef = useRef<MapView>(null);
  const [ showMatchForm, setShowMatchForm ] = useState<boolean>(false);
  const {
    userLongitude,
    userLatitude,
  } = useLocationStore();
  const [ region, setRegion ] = useState(calculateRegion({
    userLatitude,
    userLongitude,
  }));

  const handleOpenCreateMatchForm = () => {
    setShowMatchForm(true);
  }

  const [enableDraw, setEnableDraw] = useState<boolean>(false);
  const [ boundingPolygon, setBoundingPolygon ] = useState<LatLng[]>([]);

  const [ countries, setCountries ] = useState<CountryPickerOption[]>([]);
  const [isCountriesFocus, setIsCountriesFocus] = useState(false);
  // const [ cities, setCities ] = useState<CityModel[]>([]);
  const [isCitiesFocus, setIsCitiesFocus] = useState(false);
  // const [ friends, setFriends ] = useState<FriendModel[]>([]);
  const [isFriendsFocus, setIsFriendsFocus] = useState(false);

  const [ address, setAddress ] = useState<string>('');
  const [ chosenCountry, setChosenCountry ] = useState<string>('');
  const [ chosenCountryId, setChosenCountryId ] = useState<number>();
  const [ chosenCity, setChosenCity ] = useState<string>('');
  const [ chosenCityId, setChosenCityId] = useState<number>();
  const [ budget, setBudget ] = useState<number>(1);

  useEffect(() => {
    const fetchCountries = async () => {
      const fetchedCountries: CountryModel[] = await CountryApi.getCountriesPicker();
    }
    fetchCountries();
  }, []);

  const handleChangeCountry = (thing: any) => {
    setChosenCountryId(thing.id);
    setIsCountriesFocus(false);
  }

  const handleChangeCity = (thing: any) => {
    setChosenCityId(thing.id);
    setChosenCity(thing.value);
    setIsCitiesFocus(false);
  }

  // useEffect(() => {
  //   const fetchCities = async (countryId: number) => {
  //     const fetchedCities: CityModel[] = await getCities(countryId);
  //     setCities(fetchedCities);
  //   }
  //   if (chosenCountryId) {
  //     fetchCities(chosenCountryId);
  //   }
  // }, [chosenCountryId]);

  const handleCloseCreateMatchForm = async () => {
    // const languageCode = getLocales()[0].languageCode;
    // const languageName = getLangNameFromCode(languageCode)!.native;

    const createGameModel: CreateGameModel = {
      address,
      country: chosenCountry,
      city: chosenCity,
      budget,
      categories: ['Korean'],
      // locale: languageName,
    }

    const data = await GameApi.createGame(createGameModel);
    setShowMatchForm(false);
  }

  const handleLongPress = (longPressEvent: LongPressEvent) => {
    if (enableDraw) {
      // console.log('handleLongPress', longPressEvent);
      const pressedCoords = longPressEvent.nativeEvent.coordinate;
      const updatedCoords: LatLng[] = [...boundingPolygon];
      updatedCoords.push(pressedCoords);
      setBoundingPolygon(updatedCoords);
    }
  }

  const handleFetchRestaurants = async () => {
    console.log(region);
    const centerLat = region.latitude + region.latitudeDelta / 2;
    const centerLong = region.longitude + region.longitudeDelta / 2;
    console.log('center coordinates', centerLat, centerLong);
    const approxAddress = await mapRef.current!.addressForCoordinate({
      latitude: centerLat,
      longitude: centerLong,
    });
    console.log('address', approxAddress);
    const compositeAddress = `${approxAddress.name}, ${approxAddress.administrativeArea}, ${approxAddress.country}`;

    // const locales = getLocales();
    // console.log('locales', locales);
    // const languageCode = getLocales()[0].languageCode;
    // console.log('languageCode', languageCode);

    // const locale = `${languageCode}-${approxAddress.countryCode}`;
    // console.log('locale', locale);
    const locale = locales[0];

    await RestaurantApi.getRestaurants(region, compositeAddress, locale);
  }

  const handlePressDraw = () => {
    setEnableDraw(true);
  }

  const handlePressArea = () => {
    setEnableDraw(false);
  }

  return (
    <>
      <SafeAreaView style={globalStyles.safeAreaStyle}>
        <MapView
          ref={mapRef}
          style={localStyles.mapView}
          provider={PROVIDER_DEFAULT}
          tintColor="black"
          mapType="mutedStandard"
          showsPointsOfInterest={false}
          initialRegion={region}
          onRegionChange={setRegion}
          showsUserLocation={false}
          userInterfaceStyle="light"
          zoomEnabled={true}
          onLongPress={handleLongPress}
        >
          {
            enableDraw &&
              <Polygon
                coordinates={boundingPolygon}
                strokeColor={ASH_GRAY}
                fillColor={ASH_GRAY_TRANSPARENT}
                strokeWidth={1}
              />
          }
        </MapView>
        <View style={localStyles.buttonContainer}>
          <Pressable onPress={handlePressArea}>
            <View style={[ localStyles.circleButton, enableDraw ? localStyles.inactiveIconButton : localStyles.activeIconButton ]}>
              <Ionicons name="scan" size={24} />
            </View>
          </Pressable>
          <Pressable onPress={handlePressDraw}>
            <View style={[ localStyles.circleButton, enableDraw ? localStyles.activeIconButton : localStyles.inactiveIconButton ]}>
              <Ionicons name="pencil" size={24} />
            </View>
          </Pressable>
          <Pressable onPress={() => handleOpenCreateMatchForm()}>
            <View style={localStyles.circleButton}>
              <FontAwesome6 name="plus" size={24} />
            </View>
          </Pressable>
        </View>
        {
          enableDraw === false && <View style={localStyles.rectangleSelectionContainer}>

          </View>
        }
      </SafeAreaView>
      {/* <SafeAreaView style={modalStyles.modalContainer}> */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={showMatchForm}
          onRequestClose={() => setShowMatchForm(false)}
          onDismiss={() => setShowMatchForm(false)}
        >
          <View>
            <Pressable>
              {/* <FontAwesome6 name="x" iconStyle="solid" /> */}
              <Ionicons name="close-outline" />
            </Pressable>
          </View>
          <View style={modalStyles.modalView}>
            <Text>Match Settings</Text>

            <RNPickerSelect
              items={countries}
              onValueChange={handleChangeCountry}
            />

            {/* <Dropdown
              style={[modalStyles.dropdown, isCountriesFocus && { borderColor: 'blue' }]}
              placeholderStyle={modalStyles.placeholderStyle}
              selectedTextStyle={modalStyles.selectedTextStyle}
              inputSearchStyle={modalStyles.inputSearchStyle}
              iconStyle={modalStyles.iconStyle}
              data={countries}
              search
              maxHeight={300}
              labelField="countryName"
              valueField="id"
              placeholder={!isCountriesFocus ? 'Country' : '...'}
              searchPlaceholder="Search"
              value={chosenCountryId}
              onFocus={() => setIsCountriesFocus(true)}
              onBlur={() => setIsCountriesFocus(false)}
              onChange={handleChangeCountry}
            /> */}

            {/* {
              chosenCountryId
                ? <Dropdown
                    style={[modalStyles.dropdown, isCitiesFocus && { borderColor: 'blue' }]}
                    placeholderStyle={modalStyles.placeholderStyle}
                    selectedTextStyle={modalStyles.selectedTextStyle}
                    inputSearchStyle={modalStyles.inputSearchStyle}
                    iconStyle={modalStyles.iconStyle}
                    data={cities}
                    search
                    maxHeight={300}
                    labelField="cityName"
                    valueField="id"
                    placeholder={!isCitiesFocus ? 'City' : '...'}
                    searchPlaceholder="Search"
                    value={chosenCityId}
                    onFocus={() => setIsCitiesFocus(true)}
                    onBlur={() => setIsCitiesFocus(false)}
                    onChange={handleChangeCity}
                  />
                : <Dropdown
                    style={[modalStyles.dropdown, isCitiesFocus && { borderColor: 'blue' }]}
                    placeholderStyle={modalStyles.placeholderStyle}
                    selectedTextStyle={modalStyles.selectedTextStyle}
                    inputSearchStyle={modalStyles.inputSearchStyle}
                    iconStyle={modalStyles.iconStyle}
                    data={cities}
                    search
                    maxHeight={300}
                    labelField="cityName"
                    valueField="id"
                    placeholder={!isCitiesFocus ? 'City' : '...'}
                    searchPlaceholder="Search"
                    value={chosenCityId}
                    onFocus={() => setIsCitiesFocus(true)}
                    onBlur={() => setIsCitiesFocus(false)}
                    onChange={handleChangeCity}
                  />
            } */}

            <View style={localStyles.textInputStyle}>
              <TextInput
                placeholder='Address'
                value={address}
                onChangeText={setAddress}
              />
            </View>

            <View style={localStyles.buttonGroup}>
              <Pressable
                style={[localStyles.buttonGroupButton, localStyles.buttonGroupButtonLeft, budget === 1 ? localStyles.buttonGroupButtonChosen : null]}
                onPress={() => setBudget(1)}
              >
                <Text style={localStyles.buttonText}>$</Text>
              </Pressable>
              <Pressable
                style={[localStyles.buttonGroupButton, localStyles.buttonGroupButtonMiddle, budget === 2 ? localStyles.buttonGroupButtonChosen : null]}
                onPress={() => setBudget(2)}
              >
                <Text style={localStyles.buttonText}>$$</Text>
              </Pressable>
              <Pressable
                style={[localStyles.buttonGroupButton, localStyles.buttonGroupButtonMiddle, budget === 3 ? localStyles.buttonGroupButtonChosen : null]}
                onPress={() => setBudget(3)}
              >
                <Text style={localStyles.buttonText}>$$$</Text>
              </Pressable>
              <Pressable
                style={[localStyles.buttonGroupButton, localStyles.buttonGroupButtonRight, budget === 4 ? localStyles.buttonGroupButtonChosen : null]}
                onPress={() => setBudget(4)}
              >
                <Text style={localStyles.buttonText}>$$$$</Text>
              </Pressable>
            </View>

            <Pressable
              style={[modalStyles.button, modalStyles.buttonSubmit]}
              onPress={handleCloseCreateMatchForm}
            >
              <Text style={modalStyles.textStyle}>Start Matching!</Text>
            </Pressable>

            <Pressable
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={handleCloseCreateMatchForm}
            >
              <Text style={modalStyles.textStyle}>Cancel!</Text>
            </Pressable>
          </View>
        </Modal>
      {/* </SafeAreaView> */}
    </>
  )
}

const localStyles = StyleSheet.create({
  mapView: {
    // w-full h-full rounded-2xl
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 48,
    right: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  fabMenu: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  openMenuButton: {
    backgroundColor: ZOMP,
  },
  circleButton: {
    height: 64,
    width: 64,
    borderRadius: 100,
    padding: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveIconButton: {
    backgroundColor: CCCCCC,
  },
  activeIconButton: {
    backgroundColor: AAAAAA,
    borderWidth: 1,
    borderColor: ZOMP,
  },
  iconButtonIcon: {
    backgroundColor: ZOMP,
  },
  rectangleSelectionContainer: {
    position: 'absolute',
    borderWidth: 1,
    borderColor: ZOMP,
  },
  button: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    color: 'white',
  },
  buttonText: {
    color: 'white',
  },
  buttonGroup: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  buttonGroupButton: {
    height: 40,
    padding: 10,
    elevation: 2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: ZOMP,
    width: '25%',
    fontWeight: 'bold',
  },
  buttonGroupButtonLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  buttonGroupButtonMiddle: {
    borderLeftColor: 'white',
    borderLeftWidth: 1,
    borderRightColor: 'white',
    borderRightWidth: 1,
  },
  buttonGroupButtonRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  buttonGroupButtonChosen: {
    backgroundColor: ASH_GRAY,
  },
  textInputStyle: {
    width: '100%',
    height: 40,
    // margin: 12,
    padding: 10,
    borderRadius: 8,
    borderColor: AAAAAA,
    borderWidth: 1,
    color: AAAAAA,
  },
  closeColor: {
    backgroundColor: REDWOOD,
  },
});

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: BACKDROP_COLOR,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    bottom: -64,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: {
    width: '100%',
    borderRadius: 8,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonSubmit: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: REDWOOD,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
