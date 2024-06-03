import { Pressable, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import handleApi from "../utils/handleApi";
import FollowBtn from "./ui/FollowBtn";
export default function User({ username, navigation }) {
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
      <FollowBtn user={username} followers={followers} setFollowers={setFollowers}/>
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
