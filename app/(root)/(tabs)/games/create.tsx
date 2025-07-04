import { AAAAAA, ASH_GRAY, ASH_GRAY_TRANSPARENT, BACKDROP_COLOR, CCCCCC, CLEAR, REDWOOD, ZOMP } from "@/constants/colors";
import globalStyles from "@/lib/styles";
import { userLocation$ } from "@/store/location.store";
import { DRAW_STATE, mapDraw$ } from "@/store/map-draw.state";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { observer } from "@legendapp/state/react";
import React, { useRef, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import MapView, { Details, LatLng, LongPressEvent, Polygon, PROVIDER_DEFAULT, Region } from "react-native-maps";
import { SafeAreaView } from 'react-native-safe-area-context';
import { createGameId$ } from "@/store/create-game.store";
import { useRouter } from "expo-router";
import { startGame } from "@/store/games.store";

const CreateMatchPage = observer(() => {
  const drawState = mapDraw$.get();
  const userLocation = userLocation$.get();
  const gameId = createGameId$.get();
  const mapRef = useRef<MapView>(null);
  const router = useRouter();

  console.log('[CreateMatchPage]');

  const [ boundingPolygon, setBoundingPolygon ] = useState<LatLng[]>([]);

  const handleChangeLocation = (region: Region, details: Details) => {
    console.log('[CreateMatchPage.handleChangeLocation] region', region);
    console.log('[CreateMatchPage.handleChangeLocation] details', details);
    // const updatedRegion = calculateRegion({
    //   userLatitude,
    //   userLongitude,
    // });
    // userLocation$.set({
    //   userLatitude: updatedRegion.latitude,
    //   userLongitude: updatedRegion.longitude,
    //   userAddress: '',
    // });
  }

  const handleLongPress = (longPressEvent: LongPressEvent) => {
    if (drawState === 'polygon') {
      // console.log('handleLongPress', longPressEvent);
      const pressedCoords = longPressEvent.nativeEvent.coordinate;
      const updatedCoords: LatLng[] = [...boundingPolygon];
      updatedCoords.push(pressedCoords);
      setBoundingPolygon(updatedCoords);
    }
  }

  const handleChangeDrawState = (drawState: DRAW_STATE) => {
    mapDraw$.set(drawState);
  }

  const handleStartGame = async () => {
    if (drawState === 'polygon') {
      await startGame(gameId, {
        region: boundingPolygon,
        regionType: 'polygon',
      });

      // const navigationDestination = `/(root)/(tabs)/games/${gameId}`;
      // router.navigate('/(root)/(tabs)/games', { id: gameId });
    } else {
      await startGame(gameId, {
        region: {
          latitude: userLocation.region.latitude,
          longitude: userLocation.region.longitude,
          latitudeDelta: userLocation.region.latitudeDelta,
          longitudeDelta: userLocation.region.longitudeDelta,
        },
        regionType: 'rectangular',
      });
    }
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
          initialRegion={userLocation.region}
          onRegionChange={handleChangeLocation}
          showsUserLocation={false}
          userInterfaceStyle="light"
          zoomEnabled={true}
          onLongPress={handleLongPress}
        >
          <Polygon
            coordinates={boundingPolygon}
            strokeColor={drawState === 'polygon' ? ASH_GRAY : CLEAR}
            fillColor={drawState === 'polygon' ? ASH_GRAY_TRANSPARENT : CLEAR}
            strokeWidth={1}
          />
        </MapView>
        <View style={localStyles.buttonContainer}>
          <Pressable onPress={() => handleChangeDrawState('rectangle')}>
            <View style={[ localStyles.circleButton, drawState === 'rectangle' ? localStyles.activeIconButton : localStyles.inactiveIconButton ]}>
              <Ionicons name="scan" size={24} />
            </View>
          </Pressable>
          <Pressable onPress={() => handleChangeDrawState('polygon')}>
            <View style={[ localStyles.circleButton, drawState === 'polygon' ? localStyles.activeIconButton : localStyles.inactiveIconButton ]}>
              <Ionicons name="pencil" size={24} />
            </View>
          </Pressable>
          <Pressable onPress={() => handleStartGame()}>
            <View style={[ localStyles.circleButton, localStyles.createButton ]}>
              <FontAwesome6 name="plus" size={24} />
            </View>
          </Pressable>
        </View>
        {
          drawState === 'rectangle' && <View style={localStyles.rectangleSelectionContainer}>

          </View>
        }
      </SafeAreaView>
    </>
  )
})

export default CreateMatchPage;

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
  createButton: {
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
