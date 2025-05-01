import { WHITE, ZOMP } from "@/constants/colors";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Group({
  group_name,
  group_description,
}: {
  group_name: string | null;
  group_description: string | null;
}) {
  const router = useRouter();

  const onNavigateGroupDetailsPress = () => {

  }

  const onAddPeoplePress = () => {
    
  }

  const onCreateGamePress = () => {
    router.navigate('/(root)/(tabs)/games/create');
  }

  return (
    <View style={localStyles.group}>
      <Pressable onPress={onNavigateGroupDetailsPress}>
        <View style={localStyles.left}>
          <Text style={localStyles.groupName}>{group_name}</Text>
          {
            group_description && <Text>Description: {group_description}</Text>
          }
        </View>
      </Pressable>

      <View style={localStyles.right}>
        <Pressable
          style={localStyles.actionButton}
          onPress={onAddPeoplePress}
        >
          <FontAwesome6 name="user-plus" size={16} color={WHITE} />
        </Pressable>

        <Pressable
          style={localStyles.actionButton}
          onPress={onCreateGamePress}
        >
          <FontAwesome6 name="gamepad" size={16} color={WHITE} />
        </Pressable>
      </View>
    </View>
  )
}

const localStyles = StyleSheet.create({
  group: {
    // padding: 10,
    // margin: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {

  },
  right: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  groupName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  actionButton: {
    backgroundColor: ZOMP,
    padding: 12,
    borderRadius: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
