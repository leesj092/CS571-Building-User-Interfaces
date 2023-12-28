import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import ArticleStack from "../navigation/ArticleStack";
import { useEffect } from "react";

function BadgerTabs(props) {
  const BottomTabs = createBottomTabNavigator();

  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="Articles"
        component={ArticleStack}
        options={{
          tabBarLabel: "News",
          tabBarActiveTintColor: "red",
          headerShown: false,
        }}
      />
      <BottomTabs.Screen
        name="Preferences"
        component={BadgerPreferencesScreen}
        options={{ tabBarActiveTintColor: "red" }}
      />
    </BottomTabs.Navigator>
  );
}

export default BadgerTabs;
