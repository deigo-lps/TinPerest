import { StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFlag, faPalette } from "@fortawesome/free-solid-svg-icons";

export default function ArtContent({ data }) {
  return (
    <View style={styles.content}>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.row}>
        <FontAwesomeIcon icon={faFlag} style={{ color: "#e6e0e9" }} />
        <Text style={styles.desc}>{data.place_of_origin}</Text>
      </View>
      <View style={styles.row}>
        <FontAwesomeIcon icon={faPalette} style={{ color: "#e6e0e9" }} />
        <Text style={styles.desc}>{data.artist_title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 8,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  title: {
    fontSize: 20,
    color: "#e6e0e9",
  },
  desc: {
    fontSize: 16,
    color: "#e6e0e9",
  },
});
