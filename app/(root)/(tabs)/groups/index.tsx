import globalStyles from "@/lib/styles";
import { groups$ as _groups$ } from '@/store/groups.store';
import React from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import GroupList from "@/components/group-list";

export default function GroupsHome() {
  return (
    <SafeAreaView style={globalStyles.safeAreaStyle}>
      <GroupList groups$={_groups$} />
    </SafeAreaView>
  );
}
