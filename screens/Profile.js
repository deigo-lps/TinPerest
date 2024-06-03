import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Container from "../components/ui/Container";
import { useContext, useEffect, useState } from "react";
import handleApi from "../utils/handleApi";
import Loading from "../components/ui/Loading";
import ArtCard from "../components/ArtCard";
import UserContext from "../context/user-context";
export default function Profile({ navigation, route }) {
  const ctx = useContext(UserContext);
  const { user } = route.params;
  const [userData, setUserData] = useState();
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [CurrentUserFollowing, setCurrentUserFollowing] = useState();

  const handleFollow = async () => {
    let newCurrentUserFollowing;
    let newFollowers;
    if (CurrentUserFollowing.includes(user)) {
      newCurrentUserFollowing = CurrentUserFollowing.filter((CurrentUserFollowing) => CurrentUserFollowing !== user);
      newFollowers = followers.filter((follower) => follower !== ctx.user);
    } else {
      newCurrentUserFollowing = [...CurrentUserFollowing, user];
      newFollowers = [...followers, ctx.user];
    }
    await handleApi({ method: "PUT", url: `/users/${user}/followers.json`, body: newFollowers });
    await handleApi({ method: "PUT", url: `/users/${ctx.user}/following.json`, body: newCurrentUserFollowing });
    setCurrentUserFollowing(newCurrentUserFollowing);
    setFollowers(newFollowers);
  };

  useEffect(() => {
    const initialFetch = async () => {
      setIsLoaded(false);
      const userData = await handleApi({ method: "GET", url: `/users/${user}.json` });
      setUserData(userData);
      const links = userData.favorites || [];
      await Promise.all(
        links.map(async (link) => {
          const response = await fetch(
            `${link}?fields=id,api_link,image_id,artist_id,title,artist_title,date_display,place_of_origin,description,dimensions_detail`
          );
          const indivData = await response.json();
          setFavorites((prev) => [...prev, indivData.data]);
        })
      );

      const following = await handleApi({ method: "get", url: `/users/${user}/following.json` });
      setFollowing(following || []);

      const CurrentUserFollowingList = await handleApi({ method: "GET", url: `/users/${ctx.user}/CurrentUserFollowing.json` });
      const followersList = await handleApi({ method: "GET", url: `/users/${user}/followers.json` });
      setFollowers(followersList || []);
      setCurrentUserFollowing(CurrentUserFollowingList || []);
      setIsLoaded(true);
    };
    initialFetch();
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
            <View style={styles.container}>
              <Text style={styles.userName}>{user}</Text>
              <Text style={styles.desc}>{userData.description}</Text>
              <View style={styles.row}>
                <Pressable>
                  <Text style={styles.text}>Followers: {followers.length}</Text>
                </Pressable>
                <Pressable>
                  <Text style={styles.text}>Following: {following.length}</Text>
                </Pressable>
              </View>
              {user !== ctx.user ? (
              <Pressable style={styles.followBtn} onPress={handleFollow}>
                <Text style={styles.followBtnText}>{CurrentUserFollowing.includes(user) ? "Unfollow" : "Follow"}</Text>
              </Pressable>
              ) : <></>}
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
  container: {
    alignItems: "center",
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
  favTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#e6e0e9",
    textAlign: "center",
  },
  followBtn: {
    backgroundColor: "#d0bcff",
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 16,
  },
  followBtnText: {
    fontSize: 16,
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  text: {
    color: "#e6e0e9",
  },
});
