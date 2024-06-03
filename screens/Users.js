import Container from "../components/ui/Container";
import { FlatList, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import handleApi from "../utils/handleApi";
import Loading from "../components/ui/Loading";
import UserContext from "../context/user-context";
import User from "../components/User";
export default function Users({navigation}) {
  const ctx = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoaded(false);
      const usersData = await handleApi({ method: "GET", url: "/users.json" });
      delete usersData[ctx.user]
      setUsers(usersData);
      setIsLoaded(true);
    };
    fetchUsers();
  }, []);
  return (
    <Container>
      {isLoaded ? (
        <FlatList
          data={Object.keys(users)}
          renderItem={({ item }) => <User username={item} data={users} navigation={navigation}/>}
          keyExtractor={(item, i) => i}
          contentContainerStyle={styles.contentContainer}
          style={{ width: "100%" }}
        />
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
  text: {
    color: "#e6e0e9",
  },
});
