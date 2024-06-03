import { Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import Container from "../components/ui/Container";
import { useEffect, useRef, useState } from "react";
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
  const totalPages = useRef(1);
  const currentPage = useRef(1);

  const handleArtData = async ({ search, page }) => {
    (!page || page <= 1) && setIsLoaded(false);
    let data = { data: [] };
    if (!search || search === "") {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?fields=id,image_id,artist_id,title,artist_title,date_display,place_of_origin,description&limit=15&page=${
          page || 1
        }`
      );
      data = await response.json();
      totalPages.current = data.pagination.total_pages;
    } else {
      const linksResponse = await fetch(`https://api.artic.edu/api/v1/artworks/search?q=${search}&fields=api_link&limit=15&page=${page || 1}`);
      const linksData = await linksResponse.json();
      totalPages.current = linksData.pagination.total_pages;
      await Promise.all(
        linksData.data.map(async (linkData) => {
          const response = await fetch(`${linkData.api_link}?fields=id,image_id,artist_id,title,artist_title,date_display,place_of_origin,description`);
          const indivData = await response.json();
          data.data.push(indivData.data);
        })
      );
    }
    !page || page <= 1 ? setData(data.data) : setData((prev) => [...prev, ...data.data.filter((item) => item.image_id !== null)]);
    setIsLoaded(true);
  };

  useEffect(() => {
    if ((search === "" || !search) && search !== prevSearch) {
      currentPage.current = 1;
      setPrevSearch(undefined);
      handleArtData({});
    }
  }, [search]);

  const handleSearch = () => {
    if (search.trim() !== "" && search !== prevSearch) {
      currentPage.current = 1;
      setPrevSearch(search);
      handleArtData({ search, page: 1 });
    }
  };

  const fetchMoreData = () => {
    handleArtData({ search, page: currentPage.current + 1 });
    currentPage.current = currentPage.current + 1;
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
            onEndReached={fetchMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={totalPages.current > currentPage.current ? <Loading /> : <></>}
            style={{width: "100%"}}
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
