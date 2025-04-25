import globalStyles from "@/lib/styles";
import { useGroupsStore } from "@/store/use-groups-store";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GroupsHome() {
  const { groups } = useGroupsStore();

  return (
    <SafeAreaView style={globalStyles.safeAreaStyle}>
      <View style={localStyles.mainView}>
        {/* <Text style={globalStyles.title}>Groups</Text> */}

        <View style={localStyles.groupsListView}>
          {
            !groups || !groups.length
              ? <View style={localStyles.noGroupsFound}>
                  <Text>No groups found! Create one?</Text>
                  <Link
                    style={globalStyles.primaryButton}
                    href="/(root)/(tabs)/groups/create"
                  >
                    Create a group?
                  </Link>
                </View>
              : groups.map((group) => {
                return (
                  <View key={group.id}>
                    <Text>{group.groupName}</Text>
                  </View>
                );
              })
          }
        </View>
      </View>
    </SafeAreaView>
  );
}

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
