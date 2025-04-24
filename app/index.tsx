import { StyleSheet } from "react-native";
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import Onboarding from 'react-native-onboarding-swiper';

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={localStyles.mainView}>
      <Onboarding
        pages={[
          {
            backgroundColor: '#fff',
            // image: <Image source={require('./images/circle.png')} />,
            image: <></>,
            title: 'The perfect restaurant is just one swipe away!',
            subtitle: 'Your journey begins with Perfect Plate. Find your ideal restaurant effortlessly.',
          },
          {
            backgroundColor: '#fff',
            // image: <Image source={require('./images/circle.png')} />,
            image: <></>,
            title: 'Find your ideal meal with Perfect Plate',
            subtitle: 'Have fun finding the perfect restaurant with your friends.',
          },
          {
            backgroundColor: '#fff',
            // image: <Image source={require('./images/circle.png')} />,
            image: <></>,
            title: 'Your restaurant, your way. Let\'s go!',
            subtitle: 'Pick your settings, look at your choices, and swipe away!',
          },
        ]}
        onDone={() => router.navigate('/(auth)/sign-up')}
        onSkip={() => router.navigate('/(auth)/sign-up')}
      />
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  mainView: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});
