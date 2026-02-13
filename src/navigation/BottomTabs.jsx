import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/home/Home";
import ExamList from "../screens/exam/ExamList";
import Mentorship from "../screens/mentorship/Mentorship";
import Profile from "../screens/profile/Profile";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "ExamList":
              iconName = "list-outline";
              break;
            case "Mentorship":
              iconName = "people-outline";
              break;
            case "Profile":
              iconName = "person-outline";
              break;
            default:
              iconName = "ellipse-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#007AFF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="ExamList" component={ExamList} />
      <Tab.Screen name="Mentorship" component={Mentorship} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}