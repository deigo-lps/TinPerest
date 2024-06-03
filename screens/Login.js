import { Alert, Image, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import Container from "../components/ui/Container";
import icon from "../assets/favicon.png";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useContext, useState } from "react";
import handleApi from "../utils/handleApi";
import UserContext from "../context/user-context";
export default function Login({ navigation }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const ctx = useContext(UserContext);

  const handleLogin = async () => {
    setIsLoading(true);
    for (let value of [userName, password]) {
      if (value.trim() === "") {
        Alert.alert("Missing Field", "Fill in every field.", [{ text: "Ok." }]);
        setIsLoading(false);
        return;
      }
    }
    const passwordCheck = await handleApi({ method: "GET", url: `/users/${userName}/password.json` });
    if (!passwordCheck || passwordCheck !== password) Alert.alert("Invalid.", "Invalid username or password.", [{ text: "Ok." }]);
    else {
      ctx.setUser(userName);
      const favorites = await handleApi({ method: "GET", url: `/users/${userName}/favorites.json` });
      ctx.initFavorites(favorites);
      navigation.navigate("Home");
    }
    setIsLoading(false);
  };

  return (
    <Container>
      <Image style={styles.image} source={icon} />
      <View style={styles.container}>
        <Input value={userName} placeholder="Username" onChangeText={(value) => setUserName(value)} />
        <Input value={password} placeholder="Password" onChangeText={(value) => setPassword(value)} />
        <Button isLoading={isLoading} onPress={handleLogin}>
          Login
        </Button>
        <Pressable onPress={() => navigation.navigate("Create Account")}>
          <Text style={styles.createAccount}>Create Account</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </Container>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 32,
  },
  container: {
    width: "70%",
    gap: 16,
  },
  createAccount: {
    fontSize: 14,
    textAlign: "center",
    color: "#E6E0E9",
  },
});
