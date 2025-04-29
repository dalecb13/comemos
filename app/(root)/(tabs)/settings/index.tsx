import globalStyles from "@/lib/styles";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function SettingsPage({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (session) getProfile()
    }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user)
        throw new Error('No user on the session!');
      
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, first_name, last_name, avatar_url`)
        .eq('id', session?.user.id)
        .single();
        
      if (error && status !== 406) {
        throw error
      }
      
      if (data) {
        setUsername(data.username);
        setFirstName(data.first_name);
        setLastName(data.last_name);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({
    username,
    firstName,
    lastName,
    avatar_url,
  }: {
    username: string
    firstName: string
    lastName: string
    avatar_url: string
  }) {
    try {
      setLoading(true);
      if (!session?.user)
        throw new Error('No user on the session!');
      
      const updates = {
        id: session?.user.id,
        username,
        firstName,
        lastName,
        avatar_url,
        updated_at: new Date(),
      }
      
      const { error } = await supabase
        .from('profiles')
        .upsert(updates);
        
      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={globalStyles.safeAreaStyle}>
      <View style={localStyles.mainView}>
        <Text style={globalStyles.title}>Settings</Text>
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  mainView: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
});
