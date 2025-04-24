import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

const AuthApi = {
  signUp: async (email: string, password: string) => {
    const { error } = await supabase
      .auth
      .signUp({
        email,
        password,
      });

    if (error) {
      alert("Error signing up: " + error.message);
    } else {
      alert("Sign-up successful! Please sign in.");
      router.replace("/(auth)/sign-in");
    }
  },

  signIn: async (email: string, password: string) => {
    const { error } = await supabase
      .auth
      .signInWithPassword({ email, password });

    if (error) {
      console.warn('Error signing in', error)
      alert("Error signing in: " + error.message);
    } else {
      router.replace("/(root)/(tabs)/match");
    }
  },
}

export default AuthApi;
