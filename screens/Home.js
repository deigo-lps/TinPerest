import { StyleSheet } from "react-native";
import Container from "../components/ui/Container";
import { useContext, useEffect, useRef, useState } from "react";
import ArtCard from "../components/ArtCard";
import { FlatList } from "react-native-gesture-handler";
import Loading from "../components/ui/Loading";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import InputButton from "../components/ui/InputButton";
export default function Home({ navigation }) {
  const [data, setData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [search, setSearch] = useState("");
  const [prevSearch, setPrevSearch] = useState(undefined);
  const totalPages = useRef(1);
  const currentPage = useRef(1);

  const handleArtData = async ({ search, page }) => {
    (!page || page <= 1) && setIsLoaded(false);
    let data = { data: [] };
    if (!search || search === "") {
      const response = await fetch(
        `https://api.artic.edu/api/v1/artworks?fields=api_link,id,image_id,artist_id,title,artist_title,date_display,place_of_origin,description,dimensions_detail&limit=15&page=${
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
          const response = await fetch(
            `${linkData.api_link}?fields=id,api_link,image_id,artist_id,title,artist_title,date_display,place_of_origin,description,dimensions_detail`
          );
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
            data={data}
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
            onEndReached={fetchMoreData}
            onEndReachedThreshold={0.5}
            ListFooterComponent={totalPages.current > currentPage.current ? <Loading /> : <></>}
            style={{ width: "100%" }}
            ListHeaderComponent={
              <InputButton
                value={search}
                icon={faMagnifyingGlass}
                placeholder="Search"
                onChangeText={(value) => {
                  setSearch(value);
                }}
                onPress={handleSearch}
              />
            }
          />
        </>
      ) : (
        <Loading />
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    gap: 16,
  },
});
