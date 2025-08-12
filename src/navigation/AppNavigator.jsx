import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IdeaSubmissionScreen from "../screens/IdeaSubmissionScreen";
import IdeaListingScreen from "../screens/IdeaListingScreen";
import LeaderboardScreen from "../screens/LeaderBoardScreen";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        animationEnabled: false,
        tabBarHideOnKeyboard: true,
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={1} />
        ),
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Submit") iconName = "create-outline";
          else if (route.name === "Ideas") iconName = "list-outline";
          else if (route.name === "Leaderboard") iconName = "trophy-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Submit" component={IdeaSubmissionScreen} />
      <Tab.Screen name="Ideas" component={IdeaListingScreen} />
      <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
    </Tab.Navigator>
  );
}
