import { Alert } from "react-native";

const awaitConfirmation = async ({ title, message }) => {
  return new Promise((resolve) => {
    Alert.alert(title, message, [{ text: "Ok.", onPress: resolve }]);
  });
};

export default awaitConfirmation;
