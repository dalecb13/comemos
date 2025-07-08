import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import globalStyles from '@/lib/styles';
import GameList from '@/components/game-list';
import { games$ as _games$ } from '@/store/games.store';

import { Pressable, StyleSheet, Text } from "react-native";
import { useRouter } from 'expo-router';
import { PRIMARY_COLOR } from '@/constants/colors';

export default function GameHome() {
  const router = useRouter();

  const onCreateGamePress = () => {
    router.navigate('/(root)/(tabs)/games/create');
  }

  return (
    <SafeAreaView style={globalStyles.safeAreaStyle}>
      <GameList games$={_games$} />
      <Pressable
        onPress={onCreateGamePress}
        style={({pressed}) => [
        {
          backgroundColor: pressed ? PRIMARY_COLOR : 'white',
        },
        globalStyles.primaryButton,
      ]}
      >
        <Text>Create Game</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const localStyles = StyleSheet.create({

});
