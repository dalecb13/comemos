import { groups$ as _groups$ } from '@/store/groups.store';
import React from "react";
import GroupList from "@/components/group-list";

export default function GroupsHome() {
  return (
    <GroupList groups$={_groups$} />
  );
}
