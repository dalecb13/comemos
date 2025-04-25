import { create } from "zustand";
import { GroupStore } from "@/models/groups.store.model";

export const useGroupsStore = create<GroupStore>((set) => ({
  groups: [],
  setGroups: (groups) => set(() => ({ groups })),
}));
