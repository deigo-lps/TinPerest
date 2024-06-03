import { Pressable, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar as FaStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import UserContext from "../context/user-context";
import { useContext, useState } from "react";

export default function FavoriteButton({ data }) {
  const ctx = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorite = async () => {
    setIsLoading(true);
    await ctx.updateFavorites(data.id);
    setIsLoading(false);
  };
  return (
    <Pressable disabled={isLoading} style={styles.star} onPress={handleFavorite}>
      <FontAwesomeIcon icon={ctx.favorites?.includes(data.id) ? FaStarSolid : faStar} style={{ color: "yellow" }} size={24} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  star: {
    position: "absolute",
    zIndex: 1,
    top: 8,
    right: 2,
    width: 32,
    height: 32,
  },
});
