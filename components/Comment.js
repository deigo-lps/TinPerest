import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Comment({ data, navigation }) {
  return (
    <Pressable
      style={styles.comment}
      onPress={() => {
        navigation.navigate("Profile", { user: data.user });
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
