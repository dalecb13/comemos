import ButtonGroup, { ButtonGroupOption } from "@/components/button-group";
import { useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
  import { Dropdown } from 'react-native-element-dropdown';
import MapView, { Details, LatLng, LongPressEvent, Marker, Polygon, PROVIDER_DEFAULT, Region } from "react-native-maps";
import { userLocation$ } from "@/store/location.store";
import { ASH_GRAY, ASH_GRAY_TRANSPARENT, CLEAR, OFFWHITE } from "@/constants/colors";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const restaurantCategories = [
  { label: 'Pizza', value: 'pizza' },
  { label: 'American', value: 'american' },
  { label: 'Salad', value: 'salad' },
  { label: 'Burgers', value: 'burgers' },
  { label: 'Italian', value: 'italian' },
  { label: 'French', value: 'french' },
  { label: 'Chinese', value: 'chinese' },
  { label: 'Korean', value: 'korean' },
];

const budgetOptions: ButtonGroupOption[] = [
  {
    label: '$',
  },
  {
    label: '$$',
  },
  {
    label: '$$$',
  },
  {
    label: '$$$$',
  }
]

const CreateWithoutGroup = () => {
  const userLocation = userLocation$.get();
  const mapRef = useRef<MapView>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isHintDismissed, setIsHintDismissed] = useState(false);

  const [chosenCategories, setChosenCategories] = useState<string[]>([]);
  const [isFocus, setIsFocus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [budget, setBudget] = useState<ButtonGroupOption>(budgetOptions[0]);

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
    if (!isHintDismissed) {
      setIsHintDismissed(true);
    }
    if (isDrawing) {
      const pressedCoords = longPressEvent.nativeEvent.coordinate;
      const updatedCoords: LatLng[] = [...boundingPolygon];
      updatedCoords.push(pressedCoords);
      setBoundingPolygon(updatedCoords);
    }
  }

  const handleUndoDraw = () => {
    if (boundingPolygon.length > 0) {
      const updatedCoords: LatLng[] = boundingPolygon.slice(0, boundingPolygon.length - 1);
      setBoundingPolygon(updatedCoords);
    }
  }

  const handleSaveDraw = () => {
    setModalVisible(false);
  }

  const renderLabel = () => {
    if (chosenCategories || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          Restaurant Category
        </Text>
      );
    }
    return null;
  };

  const handleChooseCategory = (category: string) => {
    if (chosenCategories.includes(category)) {
      setChosenCategories(chosenCategories.filter(item => item !== category));
    } else {
      setChosenCategories([...chosenCategories, category]);
    }
  }

  const handleStart = () => {
    console.log('handleStart');
    console.log('chosenCategories', chosenCategories);
    console.log('budget', budget.label);
    console.log('boundingPolygon', boundingPolygon);
  }

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <MapView
              ref={mapRef}
              style={mapStyles.mapView}
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
              {
                boundingPolygon.length <= 2
                  ? <>
                      {
                        boundingPolygon.map((coord, idx) => {
                          console.log('coord', coord);
                          return <Marker
                            key={idx}
                            coordinate={coord}
                          />
                        })
                      }
                    </>
                  : <Polygon
                      coordinates={boundingPolygon}
                      strokeColor={isDrawing ? ASH_GRAY : CLEAR}
                      fillColor={isDrawing ? ASH_GRAY_TRANSPARENT : CLEAR}
                      strokeWidth={1}
                    />
              }
            </MapView>
            {
              !isHintDismissed &&
              <View style={mapStyles.hintContainer}>
                <Text style={mapStyles.hintText}>Tap and hold to draw area</Text>
                <Text style={mapStyles.hintText}></Text>
              </View>
            }
            <View style={mapStyles.buttonContainer}>
              {
                isDrawing
                  ?
                    <View style={mapStyles.buttonControls}>
                      <Pressable
                        style={[modalStyles.button, modalStyles.buttonClose]}
                        onPress={handleUndoDraw}
                      >
                        <FontAwesome6 name="rotate-left" size={16} color={OFFWHITE} />
                      </Pressable>
                      <Pressable
                        style={[modalStyles.button, modalStyles.buttonClose]}
                        onPress={handleSaveDraw}
                      >
                        <Text style={modalStyles.textStyle}>Save</Text>
                      </Pressable>
                    </View>
                :
                    <Pressable
                      style={[modalStyles.button, modalStyles.buttonClose]}
                      onPress={() => setModalVisible(false)}
                    >
                      <Text>Save</Text>
                    </Pressable>
              }
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container}>
        <Pressable
          style={[modalStyles.button, modalStyles.buttonOpen, styles.locationButton]}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome6 name="location-crosshairs" size={16} color={OFFWHITE} />
          <Text style={modalStyles.textStyle}>Choose Location</Text>
        </Pressable>
      </View>

      <View style={styles.container}>
        {renderLabel()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={restaurantCategories}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? chosenCategories.length !== 0 ? chosenCategories.join(', ') : 'Categories' : '...'}
          searchPlaceholder="Search..."
          value={chosenCategories}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            handleChooseCategory(item.value);
            setIsFocus(false);
          }}
        />
      </View>

      <View style={[styles.container]}>
        <Text style={styles.buttonGroupLabel}>Budget</Text>

        <ButtonGroup
          selectedOption={budget}
          options={budgetOptions}
          onPressOption={(option) => setBudget(option)}
        />
      </View>

      <View style={styles.container}>
        <Pressable
          onPress={handleStart}
          disabled={chosenCategories.length === 0 && boundingPolygon.length < 3}
          style={({pressed}) => pressed
                ? [modalStyles.button, modalStyles.buttonClose]
                : chosenCategories.length === 0 && boundingPolygon.length < 3
                  ? [modalStyles.button, modalStyles.buttonDisabled]
                  : [modalStyles.button, modalStyles.buttonOpen]
          }
        >
          <Text style={modalStyles.textStyle}>Start!</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default CreateWithoutGroup;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
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
  buttonGroupLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  locationButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
});

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    width: '100%',
    height: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  buttonDisabled: {
    backgroundColor: 'gray',
  },
});

const mapStyles = StyleSheet.create({
  mapView: {
    // w-full h-full rounded-2xl
    width: '100%',
    height: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 48,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  hintContainer: {
    position: 'absolute',
    top: 64,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  hintText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonControls: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
});
