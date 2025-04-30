import { StyleSheet, Text, View } from "react-native";

export default function Group({
  group_name,
  group_description,
}: {
  group_name: string | null;
  group_description: string | null;
}) {
  return (
    <View style={localStyles.group}>
      <Text style={localStyles.groupName}>{group_name}</Text>
      {
        group_description && <Text>Description: {group_description}</Text>
      }
    </View>
  )
}

const localStyles = StyleSheet.create({
  group: {
    padding: 10,
    margin: 10,
  },
  groupName: {
    fontWeight: 'bold',
  },
});
