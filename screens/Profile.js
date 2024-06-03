import { FlatList, StyleSheet, Text, View } from "react-native";
import Container from "../components/ui/Container";
import { useEffect, useState } from "react";
import handleApi from "../utils/handleApi";
import Loading from "../components/ui/Loading";
import ArtCard from "../components/ArtCard";
export default function Profile({ navigation, route }) {
  const { user } = route.params;
  const [userData, setUserData] = useState();
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchFavorites = async () => {
      setIsLoaded(false);
      const userData = await handleApi({ method: "GET", url: `/users/${user}.json` });
      setUserData(userData);
      const links = userData.favorites;
      await Promise.all(
        links.map(async (link) => {
          const response = await fetch(`${link}?fields=id,api_link,image_id,artist_id,title,artist_title,date_display,place_of_origin,description,dimensions_detail`);
          const indivData = await response.json();
          setFavorites((prev) => [...prev, indivData.data]);
        })
      );
      setIsLoaded(true);
    };
    fetchFavorites();
  }, []);
  return (
    <Container style={{ paddingTop: 0 }}>
      {isLoaded ? (
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <ArtCard
              onPress={() => {
                navigation.navigate("Art", { data: item });
              }}
              data={item}
            />
          )}
          keyExtractor={(item) => item.image_id}
          contentContainerStyle={styles.contentContainer}
          style={{ width: "100%" }}
          ListHeaderComponent={
            <View>
              <Text style={styles.userName}>{user}</Text>
              <Text style={styles.desc}>{userData.description}</Text>
              <Text style={styles.favTitle}>Favorites</Text>
            </View>
          }
        />
      ) : (
        <Loading />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 8,
  },
  contentContainer: {
    gap: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#e6e0e9",
    textAlign: "center",
  },
  desc: {
    fontSize: 18,
    color: "#e6e0e9",
    textAlign: "center",
    marginBottom: 8,
  },
  favTitle:{
    fontSize: 18,
    fontWeight: "bold",
    color: "#e6e0e9",
    textAlign: "center",
  }
});
