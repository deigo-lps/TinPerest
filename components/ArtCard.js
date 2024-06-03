import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFlag, faPalette, faStar as FaStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { useContext, useState } from "react";
import UserContext from "../context/user-context";
import ArtContent from "./ArtContent";
import FavoriteButton from "./FavoriteButton";
export default function ArtCard({ data, onPress }) {
  const ctx = useContext(UserContext);
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
