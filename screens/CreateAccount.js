import { Alert, Image, StatusBar, StyleSheet, View } from "react-native";
import Container from "../components/ui/Container";
import icon from "../assets/favicon.png";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import handleApi from "../utils/handleApi";
import { useState } from "react";
import awaitConfirmation from "../utils/awaitConfirmation";

export default function CreateAccount({navigation}) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const createUser = async () => {
    setIsLoading(true);
    const users = await handleApi({ method: "GET", url: "/users.json" });
    for (text of [userName, email, password, description]) {
      if (text.trim() === "") {
        Alert.alert("Missing Field", "Fill in every field.", [{ text: "Ok." }]);
        setIsLoading(false);
        return;
      }
    }
    if (users) {
      if (Object.keys(users).some((el) => el === userName)) {
        Alert.alert("Username Taken", "Choose another username.", [{ text: "Ok." }]);
        setIsLoading(false);
        return;
      }
    }
    const body = users || {};
    body[`${userName}`] = {
      email: email,
      password: password,
      description: description,
    };
    const data = await handleApi({ body, method: "PUT", url: "/users.json" });
    if (data) {
      await awaitConfirmation({ title: "User Created", message: `${userName} created.` });
      navigation.navigate("Login");
    }else{
      // TODO
    }
    setIsLoading(false);
  };
  return (
    <Container>
      <Image style={styles.image} source={icon} />
      <View style={styles.container}>
        <Input value={userName} placeholder="User Name" onChangeText={(value) => setUserName(value)} />
        <Input value={email} type="email-address" placeholder="Email" onChangeText={(value) => setEmail(value)} />
        <Input value={password} placeholder="Password" onChangeText={(value) => setPassword(value)} />
        <Input value={description} placeholder="Description" multiline={true} onChangeText={(value) => setDescription(value)} />
        <Button isLoading={isLoading} onPress={createUser}>
          Create Account
        </Button>
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
});
