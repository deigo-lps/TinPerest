import { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
export default function App() {
  const [test, setTest] = useState("asddsa");
  const handlePost = async () => {
    const response = await fetch(process.env.EXPO_PUBLIC_FIREBASE_URL, {
      method: "PUT",
      body: JSON.stringify({
        test: "asd",
      }),
    });
  };

  useEffect(() => {
    handlePost();
  }, []);

  return (
    <View style={styles.container}>
      <Text>{test}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
