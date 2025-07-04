import React from 'react';

import { Stack } from 'expo-router';

export default function GamesLayout() {
  return (
    // <Stack screenOptions={{ headerShown: false, headerShadowVisible: false }}>
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="create" />
      <Stack.Screen name="game" />
    </Stack>
  );
}
