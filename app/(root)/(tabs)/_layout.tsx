import { Tabs } from 'expo-router';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { PRIMARY_COLOR_ACTIONS } from '@/constants/colors';

const ICON_SIZE = 24;

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: PRIMARY_COLOR_ACTIONS }}>
      <Tabs.Screen
        name="games/index"
        options={{
          title: 'Games',
          tabBarIcon: ({ color }) => <FontAwesome6 name="gamepad" size={ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="games/create"
        options={{
          href: null,
          title: 'Games',
          tabBarIcon: ({ color }) => <FontAwesome6 name="gamepad" size={ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="groups/index"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => <FontAwesome6 name="people-group" size={ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="groups/create"
        options={{
          href: null,
          title: 'Groups',
          tabBarIcon: ({ color }) => <FontAwesome6 name="people-group" size={ICON_SIZE} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome6 size={ICON_SIZE} name="user-gear" color={color} />,
        }}
      />
    </Tabs>
  );
}
