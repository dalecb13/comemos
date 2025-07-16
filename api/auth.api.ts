import { supabase } from "@/lib/supabase";

const AuthApi = {
  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase
      .auth
      .signUp({
        email,
        password,
      });

    if (error) {
      throw error;
    } else {
      return data;
    }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase
      .auth
      .signInWithPassword({ email, password });

    if (error) {
      console.warn('Error signing in', error)
      alert("Error signing in: " + error.message);
    } else {
      console.log('Sign in data', data)
    }

    return data;
  },
}

export default AuthApi;
