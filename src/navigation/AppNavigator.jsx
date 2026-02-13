import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./DrawerNavigator";
import AuthStack from "./AuthStack";  
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/common/Loader";

export default function AppNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader message="Loading..." />;

  return (
    <NavigationContainer>
      {user ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
}