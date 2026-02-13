import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Home from "../screens/home/Home";
import ExamList from "../screens/exam/ExamList";
import Mentorship from "../screens/mentorship/Mentorship";
import Profile from "../screens/profile/Profile";
import AppHeader from "../components/layout/AppHeader";

const Tab = createBottomTabNavigator();

const headerTitles = {
  Home: "Home",
  ExamList: "Exam List",
  Mentorship: "Mentorship",
  Profile: "Profile",
};

export default function BottomTabs() {
  const navigation = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: true,
        header: ({ route, options }) => {
          return (
            <AppHeader
              title={headerTitles[route.name] || route.name}
              lightTheme={true}
              onMenuPress={() => navigation.openDrawer()}
              onNotificationPress={() => navigation.navigate("Notifications")}
            />
          );
        },
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
        tabBarStyle: { backgroundColor: "#f8f8f8", borderTopWidth: 0 },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="ExamList" component={ExamList} />
      <Tab.Screen name="Mentorship" component={Mentorship} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

