import * as React from 'react'
import { Text, TextInput, Button, View, StyleSheet, Pressable } from 'react-native'
import { Link, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import globalStyles from '@/lib/styles'
import { ASH_GRAY } from '@/constants/colors'
import AuthApi from '@/api/auth.api'

export default function SignUpScreen() {
  const router = useRouter();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const onSignUpPress = async () => {
    await AuthApi.signUp(email, password);
  }

  return (
    <SafeAreaView style={globalStyles.safeAreaStyle}>
      <View style={localStyles.mainView}>
        <Text style={localStyles.title}>Sign up</Text>
        <TextInput
          style={globalStyles.input}
          autoCapitalize="none"
          value={email}
          placeholder="Enter email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={globalStyles.input}
          value={password}
          placeholder="Enter password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TextInput
          style={globalStyles.input}
          value={confirmPassword}
          placeholder="Confirm password"
          secureTextEntry={true}
          onChangeText={(password) => setConfirmPassword(password)}
        />
        <Button
          title="Continue"
          disabled={password !== confirmPassword && !confirmPassword}
          onPress={onSignUpPress}
        />
        <View style={localStyles.signInView}>
          <Text>Already have an account?</Text>
          <Pressable>
            <Link
              style={globalStyles.link}
              href={'/sign-in'}
            >
              <Text>Sign in</Text>
            </Link>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const localStyles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    padding: 16,
  },
  title: {
    fontSize: 20,
  },
  input: {
    width: '100%',
    padding: 8,
    borderColor: ASH_GRAY,
    borderWidth: 1,
    borderRadius: 8,
  },
  signInView: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 16,
    gap: 8,
  },
});
