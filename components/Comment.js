import { StyleSheet, Text, View } from "react-native";

export default function Comments({ data }) {
  return (
    <View style={styles.comment}>
      <Text style={styles.userName}>{data.user}</Text>
      <Text style={styles.commentText}>{data.comment}</Text>
    </View>
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
