import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFlag, faPalette, faStar as FaStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import UserContext from "../context/user-context";
export default function ArtCard({ data, onPress, isFavorite }) {
  const ctx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const handleFavorite = async () => {
    setIsLoading(true);
    await ctx.updateFavorites(data.id);
    setIsLoading(false);
  };
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Pressable disabled={isLoading} style={styles.star} onPress={handleFavorite}>
        <FontAwesomeIcon icon={isFavorite ? FaStarSolid : faStar} style={{ color: "yellow" }} size={24} />
      </Pressable>
      <Image style={styles.image} source={{ uri: `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg` }} />
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
  star: {
    position: "absolute",
    zIndex: 1,
    top: 8,
    right: 2,
    width: 32,
    height: 32,
  },
});
