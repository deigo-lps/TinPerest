import { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import UserContext from "../../context/user-context";
import handleApi from "../../utils/handleApi";

export default function FollowBtn({ user, followers, setFollowers }) {
  const ctx = useContext(UserContext);

  const handleFollow = async () => {
    let newCurrentUserFollowing;
    let newFollowers;
    if (ctx.following.includes(user)) {
      newCurrentUserFollowing = ctx.following.filter((following) => following !== user);
      newFollowers = followers?.filter((follower) => follower !== ctx.user);
    } else {
      newCurrentUserFollowing = [...ctx.following, user];
      newFollowers = [...followers, ctx.user];
    }
    await handleApi({ method: "PUT", url: `/users/${user}/followers.json`, body: newFollowers });
    await handleApi({ method: "PUT", url: `/users/${ctx.user}/following.json`, body: newCurrentUserFollowing });
    ctx.setFollowing(newCurrentUserFollowing);
    setFollowers && setFollowers(newFollowers);
  };

  return (
    <Pressable style={styles.followBtn} onPress={handleFollow}>
      <Text style={styles.followBtnText}>{ctx.following.includes(user) ? "Unfollow" : "Follow"}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  followBtn: {
    backgroundColor: "#d0bcff",
    borderRadius: 100,
    paddingHorizontal: 16,
    paddingVertical: 8,
    // marginBottom: 16,
  },
  followBtnText: {
    fontSize: 16,
    textAlign: "center",
  },
});
