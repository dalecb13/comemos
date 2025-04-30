import globalStyles from "@/lib/styles";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import { observer } from "@legendapp/state/react";
import Group from "@/components/group";
import { groups$ as _groups$ } from '@/store/groups.store';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { ASH_GRAY } from "@/constants/colors";

const GroupList = observer(({ groups$ }: { groups$: typeof _groups$ }) => {
  const groups = groups$.get();

  if (!groups || groups === undefined) {
    return <></>
  }

  const groupsList = Object.values(groups);

  if (groupsList.length === 0) {
    return <></>
  }

  const router = useRouter();

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

      <View style={globalStyles.floatingActionButtonContainer}>
        <FontAwesome6
          name="circle-plus"
          size={48}
          color={ASH_GRAY}
          onPress={handleNavigateToCreateGroup}
        />
      </View>
    </View>
  );
});

export default GroupList;

const localStyles = StyleSheet.create({
  mainView: {
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
  }
});
