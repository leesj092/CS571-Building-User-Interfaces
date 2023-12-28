import { StyleSheet, Switch, Text, View } from "react-native";
import { BadgerPreferenceContext } from "../BadgerPreferenceContext";
import { useContext } from "react";

function BadgerPreferencesScreen(props) {
  const { tags, preferences, setPreferences } = useContext(
    BadgerPreferenceContext
  );

  const handleToggle = (tag) => {
    setPreferences((previous) => ({
      ...previous,
      [tag]: !previous[tag],
    }));
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: "center" }}>
        {tags.map((tag) => {
          return (
            <View key={tag} style={styles.card}>
              <Text>{tag}</Text>
              <Switch
                trackColor={{ true: "darksalmon", false: "lightgrey" }}
                value={preferences[tag]}
                onValueChange={() => handleToggle(tag)}
              ></Switch>
            </View>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 13,
    margin: 5,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    alignItems: "center",
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
});

export default BadgerPreferencesScreen;
