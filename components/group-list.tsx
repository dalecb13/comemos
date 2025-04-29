import globalStyles from "@/lib/styles";
import { Link } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { For, observer, use$ } from "@legendapp/state/react";
import Group from "@/components/group";
import { groups$ as _groups$ } from '@/store/groups.store';
import { Tables } from "@/models/database.types";

const GroupList = observer(({ groups$ }: { groups$: typeof _groups$ }) => {
  // const groups = use$(groups$);
  const groups = groups$.get();
  console.log('[GroupList] groups', groups)

  if (!groups || groups === undefined) {
    return <></>
  }

  console.log('[GroupList] groups values', Object.values(groups))
  const groupsList = Object.values(groups);
  console.log('[GroupList] groupsList', groupsList)

  if (groupsList.length === 0) {
    return <></>
  }

  // for use with FlatList
  const renderItem = ({ item: group }: { item: Tables<'groups'> }) => <Group
    group_name={group.group_name}
    group_description={group.group_description}
  />

  return (
    <View style={localStyles.mainView}>
      {/* <Text style={globalStyles.title}>Groups</Text> */}

      <View style={localStyles.groupsListView}>
        {
          groupsList.map((group) => {
            return (
              <View key={group.id}>
                <Text>{group.group_name}</Text>
              </View>
            );
          })
        }
      </View>
    </View>
  );
});

export default GroupList;

const localStyles = StyleSheet.create({
  mainView: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    gap: 16,
  },
  noGroupsFound: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  groupsListView: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  }
});
