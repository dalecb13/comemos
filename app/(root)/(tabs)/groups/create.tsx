import { ZOMP } from "@/constants/colors";
import { useSession } from "@/contexts/auth.context";
import globalStyles from "@/lib/styles";
import { addGroup } from "@/store/groups.store";
import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function CreateGroupPage() {
  const { session } = useSession();
  const [groupName, setGroupName] = React.useState('');
  const [groupDescription, setGroupDescription] = React.useState('');

  const onCreateGroupPress = () => {
    if (session && session.user) {
      console.log('[onCreateGroupPress], groupName, groupDescription, creatorId', groupName, groupDescription, session.user.id);
      addGroup(groupName, groupDescription, session.user.id);
    }
  }

  return (
    <View style={localStyles.mainView}>
      <Text style={globalStyles.title}>Create Group</Text>

      <TextInput
        style={globalStyles.input}
        autoCapitalize="none"
        placeholder="Enter group name"
        value={groupName}
        onChangeText={(groupName) => setGroupName(groupName)}
      />
      <TextInput
        editable
        multiline
        numberOfLines={4}
        style={globalStyles.input}
        autoCapitalize="none"
        placeholder="Description"
        value={groupDescription}
        onChangeText={(description) => setGroupDescription(description)}
      />

      <Pressable
        style={localStyles.submitButton}
        onPress={onCreateGroupPress}
      >
        <Text style={localStyles.buttonText}>Create Group</Text>
      </Pressable>
    </View>
  );
}

const localStyles = StyleSheet.create({
  mainView: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    width: '90%',
    gap: 16,
  },
  submitButton: {
    backgroundColor: ZOMP,
    padding: 16,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  }
});
