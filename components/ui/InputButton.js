import { Pressable, StyleSheet, View } from "react-native";
import Input from "./Input";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

export default function InputButton({ icon, placeholder, value, onPress, onChangeText }) {
  return (
    <View style={styles.InputButton}>
      <Input value={value} onChangeText={onChangeText} placeholder={placeholder} style={{ flex: 1, borderWidth: 0 }} />
      <Pressable style={styles.searchButton} onPress={onPress}>
        <FontAwesomeIcon icon={icon} style={{ color: "#e6e0e9" }} size={20} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  InputButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#938f99",
    borderRadius: 8,
  },
  searchButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
  },
});
