import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { observer } from "@legendapp/state/react";
import Group from "@/components/group";
import { groups$ as _groups$ } from '@/store/groups.store';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { PRIMARY_COLOR_ACTIONS, WHITE } from "@/constants/colors";

const GroupList = observer(({ groups$ }: { groups$: typeof _groups$ }) => {
  const groups = groups$.get();
  const router = useRouter();

  if (!groups || groups === undefined) {
    return <></>
  }

  const groupsList = Object.values(groups);

  if (groupsList.length === 0) {
    return <></>
  }

  const handleNavigateToCreateGroup = () => {
    router.navigate('/(root)/(tabs)/groups/create');
  }

  return (
    <View style={localStyles.mainView}>
      <View style={localStyles.groupsListView}>
        {
          groupsList.map((group) => <Group
            key={group.id}
            group_name={group.group_name}
            group_description={group.group_description}
          />)
        }
      </View>

      <Pressable
        style={localStyles.createGroupButton}
        onPress={handleNavigateToCreateGroup}
      >
        <FontAwesome6
          name="plus"
          size="16"
          color={WHITE}
        />
        <Text style={localStyles.createGroupButtonText}>Create Group</Text>
      </Pressable>
    </View>
  );
});

export default GroupList;

const localStyles = StyleSheet.create({
  mainView: {
    paddingLeft: 16,
    paddingRight: 16,
    display: 'flex',
    height: '100%',
    width: '100%',
    flexDirection: 'column',
    gap: 16,
  },
  groupsListView: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    margin: 16,
  },
  createGroupButton: {
    backgroundColor: PRIMARY_COLOR_ACTIONS,
    padding: 16,
    borderRadius: 8,

    width: '100%',

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  createGroupButtonText: {
    color: WHITE,
  }
});
