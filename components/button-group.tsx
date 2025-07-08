import { Pressable, StyleSheet, Text, View } from "react-native"

export type ButtonGroupOption = {
  label: string
}

export type ButtonGroupProps = {
  options: ButtonGroupOption[],
  selectedOption: ButtonGroupOption,
  onPressOption: (option: ButtonGroupOption) => void
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ options, selectedOption, onPressOption }) => {
  return (
    <View style={localStyles.group}>
      {
        options.map((option, idx) => (
          <Pressable
            key={option.label}
            style={
              [
                localStyles.option,
                idx === 0 && localStyles.firstOption,
                idx === options.length - 1 && localStyles.lastOption,
                option.label === selectedOption.label && { backgroundColor: "lightblue" },
              ]
            }
            onPress={() => onPressOption(option)}
          >
            <Text style={localStyles.selectedOption}>{option.label}</Text>
          </Pressable>
        ))
      }
    </View>
  )
}

export default ButtonGroup;

const localStyles = StyleSheet.create({
  group: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  option: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,

    borderWidth: 1,
  },
  selectedOption: {
    fontWeight: "bold",
  },
  firstOption: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  lastOption: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});