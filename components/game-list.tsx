import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Computed, Memo, observer } from "@legendapp/state/react";
import { games$ as _games$, createGame } from '@/store/games.store';
import { PRIMARY_COLOR_ACTIONS, WHITE } from '@/constants/colors';
import { supabase } from '@/lib/supabase';

const GameList = observer(({ games$ }: { games$: typeof _games$ }) => {
  const handleCreateGame = async () => {
    const session = await supabase.auth.getSession();
    if (session.data.session) {
      const userId = session.data.session.user.id;
      createGame(userId);
    }
  }

  const games = games$.get();

  if (!games || Object.keys(games).length === 0) {
    return <>
      <Text>No games</Text>
      <Pressable onPress={handleCreateGame}>
        <Text>Create Game</Text>
      </Pressable>
    </>;
  }

  const activeMatches = Object
    .keys(games)
    .filter((key) => games[key].status === 'created' || games[key].status === 'started');

  const inactiveMatches = Object
    .keys(games)
    .filter((key) => games[key].status === 'inactive');

  return <>
    <Text>Active Games</Text>

    <View>
      {
        activeMatches.map((matchId) => <Text key={matchId}>{matchId}</Text>)
      }
    </View>

    <Text>Inactive Games</Text>

    <View>
      {
        inactiveMatches.map((matchId) => <Text key={matchId}>{matchId}</Text>)
      }
    </View>
  </>;
});

export default GameList;

const localStyles = StyleSheet.create({
  mainView: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  halfView: {
    display: 'flex',
    height: '50%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  createGameButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: PRIMARY_COLOR_ACTIONS,
    
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 8,
  },
  createGameButtonText: {
    color: WHITE,
    fontSize: 20,
  }
});
