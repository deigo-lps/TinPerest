import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Container from "../components/ui/Container";
import { useContext, useEffect, useState } from "react";
import handleApi from "../utils/handleApi";
import Loading from "../components/ui/Loading";
import ArtCard from "../components/ArtCard";
import UserContext from "../context/user-context";
import FollowBtn from "../components/ui/FollowBtn";
export default function Profile({ navigation, route }) {
  const ctx = useContext(UserContext);
  const { user } = route.params || { user: ctx.user };
  const [userData, setUserData] = useState();
  const [favorites, setFavorites] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const initialFetch = async () => {
      setIsLoaded(false);
      setFavorites([]);
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

      const following = await handleApi({ method: "GET", url: `/users/${user}/following.json` });
      if(user === ctx.user) ctx.setFollowing(following || [])
      else setFollowing(following || []);
      const followersList = await handleApi({ method: "GET", url: `/users/${user}/followers.json` });
      setFollowers(followersList || []);
      setIsLoaded(true);
    };
    initialFetch();
  }, [ctx.favorites]);
  return (
    <Container style={user !== ctx.user && { paddingTop: 0 }}>
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
                <Pressable onPress={()=>{navigation.navigate("FollowersFollowing",{routeUsers: followers})}}>
                  <Text style={styles.text}>Followers: {followers.length}</Text>
                </Pressable>
                <Pressable onPress={()=>{navigation.navigate("FollowersFollowing",{routeUsers: user !== ctx.user ? following : ctx.following})}}>
                  <Text style={styles.text}>Following: {user !== ctx.user ? following.length : ctx.following.length}</Text>
                </Pressable>
              </View>
              {user !== ctx.user ? (
                <FollowBtn user={user} followers={followers} setFollowers={setFollowers}/>
              ) : (
                <></>
              )}
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
    marginTop:16,
    fontSize: 18,
    fontWeight: "bold",
    color: "#e6e0e9",
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
