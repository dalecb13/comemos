import { ASH_GRAY, DEEP_SKY_BLUE, PRIMARY_COLOR, PRIMARY_COLOR_ACTIONS, WHITE } from "@/constants/colors";
import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  safeAreaStyle: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  link: {
    color: DEEP_SKY_BLUE,
    textDecorationLine: 'underline',
  },
  title: {
    fontSize: 20,
  },
  input: {
    width: '100%',
    padding: 8,
    borderColor: ASH_GRAY,
    borderWidth: 1,
    borderRadius: 8,
  },
  primaryButton: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: PRIMARY_COLOR_ACTIONS,
    color: WHITE,
  },
  floatingActionButtonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  primaryColorBackground: {
    backgroundColor: PRIMARY_COLOR,
  },
  primaryColorTransparentBackground: {
    backgroundColor: PRIMARY_COLOR,
    opacity: 0.7,
  },
  secondaryColorBackground: {
    backgroundColor: ASH_GRAY,
  }
});

export default globalStyles;
