import { StatusBar, StyleSheet, Text } from "react-native";
import Container from "../components/ui/Container";
import { useEffect, useState } from "react";
import ArtCard from "../components/ArtCard";
import { FlatList } from "react-native-gesture-handler";
import Loading from "../components/ui/Loading";
export default function Home({ navigation }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const handleArtData = async () => {
      const response = await fetch(
        "https://api.artic.edu/api/v1/artworks?fields=id,image_id,artist_id,title,artist_title,date_display,place_of_origin,description&limit=15"
      );
      const data = await response.json();
      setData(data.data.filter((item) => item.image_id !== null));
      setIsLoaded(true);
    };
    handleArtData();
  }, []);
  return (
    <Container>
      {isLoaded ? (
        <FlatList
          data={data}
          renderItem={({ item }) => <ArtCard data={item} />}
          keyExtractor={(item) => item.image_id}
          contentContainerStyle={styles.contentContainer}
        />
      ) : (
        <Loading />
      )}
      <StatusBar style="auto" />
    </Container>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 16,
  },
});
