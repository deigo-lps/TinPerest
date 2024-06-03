import "react-native-gesture-handler";
import Login from "./screens/Login";
import CreateAccount from "./screens/CreateAccount";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import { UserContextProvider } from "./context/user-context";
import Art from "./screens/Art";
import Profile from "./screens/Profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRightFromBracket, faHouse, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import { View } from "react-native";
import Users from "./screens/Users";
export default function App() {
  const Tab = createBottomTabNavigator();
  const LoginStack = () => {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#211F26",
            shadowColor: "transparent",
            elevation: 0,
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Create Account" component={CreateAccount} options={{ headerTitle: () => null }} />
      </Stack.Navigator>
    );
  };

  const MainStack = () => {
    const Stack = createStackNavigator();

    return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#211F26",
            shadowColor: "transparent",
            elevation: 0,
          },
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Art" component={Art} options={{ headerTitle: () => null }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerTitle: () => null }} />
        <Stack.Screen name="FollowersFollowing" component={Users} options={{ headerTitle: () => null }} />
      </Stack.Navigator>
    );
  };

  return (
    <UserContextProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarLabel: () => null,
            tabBarStyle: {
              backgroundColor: "#221c27",
              display: route.name === "LoginStack" ? "none" : "flex",
            },
            tabBarIcon: ({ focused }) => {
              if (route.name === "Main Navigation") {
                return focused ? (
                  <View style={{ borderRadius: 1000, backgroundColor: "#4a4458", padding: 10 }}>
                    <FontAwesomeIcon icon={faHouse} size={20} style={{ color: "white" }} />
                  </View>
                ) : (
                  <FontAwesomeIcon icon={faHouse} size={20} style={{ color: "white" }} />
                );
              } else if (route.name === "MyProfile") {
                return focused ? (
                  <View style={{ borderRadius: 1000, backgroundColor: "#4a4458", padding: 10 }}>
                    <FontAwesomeIcon icon={faUser} size={20} style={{ color: "#e6e0e9" }} />
                  </View>
                ) : (
                  <FontAwesomeIcon icon={faUser} size={20} style={{ color: "#e6e0e9" }} />
                );
              } else if (route.name === "LoginStack") {
                return <FontAwesomeIcon icon={faArrowRightFromBracket} size={20} style={{ color: "#e6e0e9" }} />;
              } else if (route.name === "Users") {
                return focused ? (
                  <View style={{ borderRadius: 1000, backgroundColor: "#4a4458", padding: 10 }}>
                    <FontAwesomeIcon icon={faUsers} size={20} style={{ color: "#e6e0e9" }} />
                  </View>
                ) : (
                  <FontAwesomeIcon icon={faUsers} size={20} style={{ color: "#e6e0e9" }} />
                );
              }
            },
          })}
        >
          <Tab.Screen name="LoginStack" component={LoginStack} options={{ headerShown: false }} />
          <Tab.Screen name="Main Navigation" component={MainStack} options={{ headerShown: false }} />
          <Tab.Screen name="MyProfile" component={Profile} options={{ headerShown: false }} />
          <Tab.Screen name="Users" component={Users} options={{ headerShown: false }} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserContextProvider>
  );
}
