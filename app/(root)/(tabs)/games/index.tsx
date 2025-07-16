import React from 'react';

import globalStyles from '@/lib/styles';
import GameList from '@/components/game-list';
import { games$ as _games$ } from '@/store/games.store';

import { Pressable, StyleSheet, Text, View } from "react-native";
import { useRouter } from 'expo-router';
import { PRIMARY_COLOR } from '@/constants/colors';

export default function GameHome() {
  const router = useRouter();

  return (
    <View style={localStyles.gameHomeView}>
      <GameList games$={_games$} />
      <Pressable
        onPress={() => router.navigate('/(root)/(tabs)/games/create')}
        style={({pressed}) => [
        {
          backgroundColor: pressed ? PRIMARY_COLOR : 'white',
        },
        globalStyles.primaryButton,
      ]}
      >
        <Text>Create Game</Text>
      </Pressable>
    </View>
  )
}

const localStyles = StyleSheet.create({
  gameHomeView: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    padding: 16,
  }
});
