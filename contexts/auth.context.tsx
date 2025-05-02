import AuthApi from '@/api/auth.api';
import { useStorageState } from '@/store/use-storage-state';
import { useContext, createContext, useState } from 'react';
import { router } from "expo-router";
import { Session } from '@supabase/supabase-js';

interface AuthContextType {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session: Session | null;
  // isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This hook can be used to access the user info.
export const useSession = () => {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production' || value === undefined) {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [[isLoading, session], setSession] = useStorageState('session');
  const [session, setSession] = useState<Session | null>(null);

  const signIn = async (email: string, password: string) => {
    const data = await AuthApi.signIn(email, password);

    if (data) {
      setSession(data.session);
      router.replace("/(root)/(tabs)/games");
    }
  }

  const value = {
    signIn,
    signOut: () => {
      setSession(null);
    },
    session,
    // isLoading,
  }

  return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
}
