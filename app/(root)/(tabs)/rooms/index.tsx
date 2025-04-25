import globalStyles from "@/lib/styles";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoomsHome() {
  return (
    <SafeAreaView style={globalStyles.safeAreaStyle}>
      <View style={localStyles.mainView}>
        <Text style={globalStyles.title}>Rooms</Text>
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  mainView: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
});
