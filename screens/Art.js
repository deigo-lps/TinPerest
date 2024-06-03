import { Image, ScrollView, StyleSheet, Text } from "react-native";
import Container from "../components/ui/Container";
import ArtContent from "../components/ArtContent";
import FavoriteButton from "../components/FavoriteButton";
import removeHtmlTags from "../utils/removeHtmlTags";
export default function Art({ route }) {
  const { data } = route.params;
  let aspectRatio;
  if (data.dimensions_detail[0]?.height && data.dimensions_detail[0]?.width)
    aspectRatio = { aspectRatio: data.dimensions_detail[0]?.height / data.dimensions_detail[0]?.width };
  else aspectRatio = { aspectRatio: 1 / 1 };
  return (
    <Container style={{ paddingTop: 0 }}>
      <ScrollView style={{ width: "100%" }}>
        <FavoriteButton data={data} />
        <Image style={[styles.image, aspectRatio]} source={{ uri: `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg` }} />
        <ArtContent data={data} />
        <Text style={styles.desc}>{removeHtmlTags(data.description)}</Text>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 8,
  },
  desc:{
    color: "#e6e0e9",
    fontSize: 16,
  }
});
