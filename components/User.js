import { Pressable, StyleSheet, Text } from "react-native";
import { useContext, useEffect, useState } from "react";
import handleApi from "../utils/handleApi";
import FollowBtn from "./ui/FollowBtn";
import UserContext from "../context/user-context";
export default function User({ username, navigation }) {
  const ctx = useContext(UserContext)
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const initialFetch = async () => {
      const followersList = await handleApi({ method: "GET", url: `/users/${username}/followers.json` });
      setFollowers(followersList || []);
    };
    initialFetch();
  }, []);

  return (
    <Pressable style={styles.card} onPress={()=>{navigation.navigate("Profile",{user: username})}}>
      <Text style={styles.text}>{username}</Text>
      {username !== ctx.user && <FollowBtn user={username} followers={followers} setFollowers={setFollowers}/>}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#36343b",
    padding: 8,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  text: {
    color: "#e6e0e9",
    fontSize: 20,
  },
});
