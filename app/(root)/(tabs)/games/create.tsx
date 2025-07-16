import { ASH_GRAY, CLEAR, LICORICE, OFFWHITE, PRIMARY_COLOR } from "@/constants/colors";
import { observer } from "@legendapp/state/react";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const CreateMatchPage = observer(() => {
  const router = useRouter();

  return (
    <View style={localStyles.mainView}>
      <Text style={localStyles.title}>Game Type?</Text>
      <Pressable
        onPress={() => router.navigate('/(root)/(tabs)/games/create-with-group')}
        style={({pressed}) => [localStyles.button, { backgroundColor: pressed ? PRIMARY_COLOR : 'white' }]}
      >
        <Text style={localStyles.buttonText}>Use existing group</Text>
      </Pressable>
      <Pressable
        onPress={() => router.navigate('/(root)/(tabs)/games/create-without-group')}
        style={({pressed}) => [localStyles.button, { backgroundColor: pressed ? PRIMARY_COLOR : 'white' }]}
      >
        <Text style={localStyles.buttonText}>Add people later</Text>
      </Pressable>
    </View>
  )
})

export default CreateMatchPage;

const localStyles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: OFFWHITE,
    padding: 16,
  },
  title: {
    fontSize: 24,
    alignSelf: 'center',
  },
  button: {
    padding: 16,
    backgroundColor: CLEAR,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: ASH_GRAY,
    borderRadius: 8,
    flex: 0.5,
  },
  buttonText: {
    color: LICORICE,
    fontSize: 20,
  }
});