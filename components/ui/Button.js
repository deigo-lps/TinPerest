import { StyleSheet, Pressable, Text } from "react-native";
export default function Button({ style, children, onPress, isLoading }) {
  return (
    <Pressable disabled={isLoading} style={[styles.button, style, isLoading && {opacity: 0.7}]} onPress={onPress}>
      <Text style={styles.buttonText}>{isLoading ? "Loading..." : children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: "#D0BCFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 18,
    color: "#381E72",
    textAlign: "center",
    fontWeight: "bold",
  },
});
