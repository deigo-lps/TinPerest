import { TextInput, StyleSheet } from "react-native";
export default function Input({ style, placeholder, onChangeText, multiline, value, type }) {
  return <TextInput value={value} keyboardType={type || "default"} style={[styles.input, style]} placeholder={placeholder} placeholderTextColor="#e6e0e9" multiline={multiline} onChangeText={onChangeText} />;
}

const styles = StyleSheet.create({
  input: {
    color: "#e6e0e9",
    borderWidth: 2,
    borderColor: "#938f99",
    fontSize: 16,
    paddingHorizontal: 16,
    padding: 8,
    borderRadius: 8,
  },
});
