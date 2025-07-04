import globalStyles from "@/lib/styles";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView, Text } from "react-native";

const GamePage = () => {
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView style={globalStyles.safeAreaStyle}>
      <Text>Game Page for Game with ID {id}</Text>
    </SafeAreaView>
  )
}

export default GamePage;
