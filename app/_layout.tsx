import { AuthProvider } from "@/contexts/auth.context";
import { Slot, Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  )
}
