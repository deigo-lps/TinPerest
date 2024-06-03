import { FlatList, Image, StyleSheet, Text } from "react-native";
import Container from "../components/ui/Container";
import ArtContent from "../components/ArtContent";
import FavoriteButton from "../components/FavoriteButton";
import removeHtmlTags from "../utils/removeHtmlTags";
import Comment from "../components/Comment";
import InputButton from "../components/ui/InputButton";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/user-context";
import handleApi from "../utils/handleApi";
export default function Art({ route }) {
  const ctx = useContext(UserContext);
  const { data } = route.params;
  let aspectRatio;
  if (data.dimensions_detail[0]?.height && data.dimensions_detail[0]?.width)
    aspectRatio = { aspectRatio: data.dimensions_detail[0]?.height / data.dimensions_detail[0]?.width };
  else aspectRatio = { aspectRatio: 1 / 1 };

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  useEffect(() => {
    const getComments = async () => {
      const comments = await handleApi({ method: "GET", url: `/comments/${data.id}.json` });
      setComments(comments || []);
    };
    getComments();
  }, []);

  const handleComment = async () => {
    const body = [...comments, { user: ctx.user, comment: comment }];
    await handleApi({ method: "PUT", url: `/comments/${data.id}.json`, body: body });
    setComments(body);
    setComment("");
  };

  return (
    <Container style={{ paddingTop: 0 }}>
      <FlatList
        data={comments}
        renderItem={({ item }) => <Comment data={item} />}
        keyExtractor={(item, i) => i}
        contentContainerStyle={styles.contentContainer}
        style={{ width: "100%" }}
        ListHeaderComponent={
          <>
            <FavoriteButton data={data} />
            <Image style={[styles.image, aspectRatio]} source={{ uri: `https://www.artic.edu/iiif/2/${data.image_id}/full/843,/0/default.jpg` }} />
            <ArtContent data={data} />
            <Text style={styles.desc}>{removeHtmlTags(data.description)}</Text>
            <InputButton placeholder="Comment" icon={faComment} value={comment} onChangeText={(value) => setComment(value)} onPress={handleComment} />
          </>
        }
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 8,
  },
  desc: {
    color: "#e6e0e9",
    fontSize: 16,
  },
  contentContainer: {
    gap: 16,
  },
});
