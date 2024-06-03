import "react-native-gesture-handler";
import Login from "./screens/Login";
import CreateAccount from "./screens/CreateAccount";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
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
        <Stack.Screen name="Create Account" component={CreateAccount} options={{ headerTitle: () => null }} />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <LoginStack />
    </NavigationContainer>
  );
}
