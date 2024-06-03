import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import UserContext from "../context/user-context";

export default function Comment({ data, navigation }) {
  const ctx = useContext(UserContext);
  return (
    <Pressable
      style={styles.comment}
      onPress={() => {
        data.user === ctx.user ? navigation.navigate("MyProfile") : navigation.navigate("Profile", { user: data.user });
      }}
    >
      <Text style={styles.userName}>{data.user}</Text>
      <Text style={styles.commentText}>{data.comment}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  comment: {
    backgroundColor: "#36343b",
    padding: 8,
    borderRadius: 8,
  },
  userName: {
    color: "#e6e0e9",
    fontSize: 18,
  },
  commentText: {
    color: "#e6e0e9",
    fontSize: 14,
  },
});
