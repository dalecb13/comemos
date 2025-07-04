import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import globalStyles from '@/lib/styles';
import GameList from '@/components/game-list';
import { games$ as _games$ } from '@/store/games.store';

export default function GameHome() {
  return (
    <SafeAreaView style={globalStyles.safeAreaStyle}>
      <GameList games$={_games$} />
    </SafeAreaView>
  )
}
