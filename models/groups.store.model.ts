import { GroupModel } from "./group.model";

export interface GroupStore {
  groups: GroupModel[];
  setGroups: (groups: GroupModel[]) => void;
}
