import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import Container from "../components/ui/Container";
import { useEffect, useState } from "react";
import ArtCard from "../components/ArtCard";
import { FlatList } from "react-native-gesture-handler";
import Loading from "../components/ui/Loading";
import Input from "../components/ui/Input";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
export default function Home({ navigation }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [prevSearch, setPrevSearch] = useState(undefined);

  const handleArtData = async (search) => {
    setIsLoaded(false);
    let data = {data: []};
    if (!search || search === "") {
      const response = await fetch(
        "https://api.artic.edu/api/v1/artworks?fields=id,image_id,artist_id,title,artist_title,date_display,place_of_origin,description&limit=15"
      );
      data = await response.json();
    } else {
      const linksResponse = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${search}&fields=api_link&limit=15`);
      const linksData = await linksResponse.json();
      await Promise.all(
        linksData.data.map(async (linkData) => {
          const response = await fetch(`${linkData.api_link}?fields=id,image_id,artist_id,title,artist_title,date_display,place_of_origin,description`);
          const indivData = await response.json();
          data.data.push(indivData.data);
        })
      );
    }
    setData(data.data.filter((item) => item.image_id !== null));
    setIsLoaded(true);
  };

  useEffect(() => {
    if (search === "" && search !== prevSearch) handleArtData();
  }, [search]);

  const handleSearch = () => {
    if (search.trim() !== "" && search !== prevSearch) {
      setPrevSearch(search);
      handleArtData(search);
    }
  };

  return (
    <Container>
      {isLoaded ? (
        <>
          <FlatList
            data={[...data]}
            renderItem={({ item }) => <ArtCard data={item} />}
            keyExtractor={(item) => item.image_id}
            contentContainerStyle={styles.contentContainer}
            ListHeaderComponent={
              <View style={styles.searchBar}>
                <Input
                  value={search}
                  onChangeText={(value) => {
                    setSearch(value);
                  }}
                  placeholder="Search"
                  style={{ flex: 1, borderWidth: 0 }}
                />
                <Pressable style={styles.searchButton} onPress={() => handleSearch()}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#e6e0e9" }} size={20} />
                </Pressable>
              </View>
            }
          />
        </>
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
  searchBar: {
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
