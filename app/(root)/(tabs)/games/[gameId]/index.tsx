import { observer } from "@legendapp/state/react";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Text } from "react-native";
import { games$ as _games$ } from '@/store/games.store';

const GamePage = observer(({ games$ }: { games$: typeof _games$ }) => {
  const { gameId } = useLocalSearchParams();

  useEffect(() => {
    const isString = typeof gameId === 'string' && !Array.isArray(gameId);
    if (isString) {
      const game = games$[gameId];

      console.log('[GamePage] game', game);
    } else {
      // TODO: Handle error
    }
  }, [gameId]);

  return (
    <Text>Game Page for Game {gameId}</Text>
  )
});

export default GamePage;
