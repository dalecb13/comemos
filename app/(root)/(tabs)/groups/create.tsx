import globalStyles from "@/lib/styles";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function CreateGroupPage() {
  return (
    <SafeAreaView style={globalStyles.safeAreaStyle}>
      <View style={localStyles.mainView}>
        <Text style={globalStyles.title}>Create Group</Text>
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
