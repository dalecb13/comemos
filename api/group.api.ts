import { supabase } from "@/lib/supabase";
import { GroupModel } from "@/models/group.model";

const GROUP_TABLE_NAME = 'groups';

const GroupApi = {
  getAllGroups: async () => {
    const { data, error } = await supabase
      .from(GROUP_TABLE_NAME)
      .select(`*`)
      .select();

    if (error) {
      console.warn(error);
      return [];
    }

    const groups: GroupModel[] = data.map((group: any) => {
      return {
        id: group.id,
        groupName: group.group_name,
        description: group.group_description,
        ownerId: group.creator_id,
        createdAt: group.created_at,
        updatedAt: group.updated_at,
      }
    });

    return data as GroupModel[];
  },
}

export default GroupApi;
