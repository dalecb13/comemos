import ButtonGroup, { ButtonGroupOption } from "@/components/button-group";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
  import { Dropdown } from 'react-native-element-dropdown';

const restaurantCategories = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
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
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [budget, setBudget] = useState<ButtonGroupOption>(budgetOptions[0]);

  const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'blue' }]}>
            Restaurant Category
          </Text>
        );
      }
      return null;
    };

  return (
    <View>
      <Pressable>
        <Text>Location Details</Text>
      </Pressable>

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
          placeholder={!isFocus ? 'Categories' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
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
    }
  });
