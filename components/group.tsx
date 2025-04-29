import { Text, View } from "react-native";

export default function Group({
  group_name,
  group_description,
}: {
  group_name: string | null;
  group_description: string | null;
}) {
  console.log('[Group]', group_name, group_description);
  return (
    <View>
      <Text>Group Name: {group_name}</Text>
      <Text>Description: {group_description}</Text>
    </View>
  )
}
