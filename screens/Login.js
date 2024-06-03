import { Image, Pressable, StatusBar, StyleSheet, Text, TextInput, View } from "react-native";
import Container from "../components/ui/Container";
import icon from "../assets/favicon.png";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
export default function Login({navigation}) {
  return (
    <Container>
      <Image style={styles.image} source={icon} />
      <View style={styles.container}>
        <Input placeholder="Email" />
        <Input placeholder="Password" />
        <Button>Login</Button>
        <Pressable onPress={()=>navigation.navigate("Create Account")}>
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
