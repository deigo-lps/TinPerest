import { Image, Pressable, StyleSheet } from "react-native";
import ArtContent from "./ArtContent";
import FavoriteButton from "./FavoriteButton";
export default function ArtCard({ data, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <FavoriteButton data={data} />
      <Image style={styles.image} source={{ uri: `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg` }} />
      <ArtContent data={data} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#49454F",
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    aspectRatio: 3 / 1.5,
    borderRadius: 8,
  },
});
