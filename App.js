import "react-native-gesture-handler";
import Login from "./screens/Login";
import CreateAccount from "./screens/CreateAccount";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./screens/Home";
import { UserContextProvider } from "./context/user-context";
export default function App() {
  const LoginStack = () => {
    const Stack = createStackNavigator();
    return (
      <Stack.Navigator
        screenOptions={{
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Create Account" component={CreateAccount} options={{ headerTitle: () => null }} />
      </Stack.Navigator>
    );
  };

  return (
    <UserContextProvider>
      <NavigationContainer>
        <LoginStack />
      </NavigationContainer>
    </UserContextProvider>
  );
}
