import { StyleSheet, View } from "react-native";
export default function Container({children, style}) {
  return (
    <View style={[styles.container, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#211F26",
    alignItems: "center",
    justifyContent: "center",
  },
});
