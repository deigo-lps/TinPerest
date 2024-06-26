import React, { useState } from "react";
import handleApi from "../utils/handleApi";

const UserContext = React.createContext({
  user: "",
  setUser: () => {},
  favorites: [],
  updateFavorites: async (newFav) => {},
  initFavorites: (fav) => {},
  following: [],
  setFollowing: ()=>{}
});

export const UserContextProvider = (props) => {
  const [user, setUser] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [following, setFollowing] = useState([]);

  const updateFavorites = async (newFav) => {
    if (favorites?.includes(newFav)) {
      await handleApi({ method: "PUT", url: `/users/${user}/favorites.json`, body: favorites.filter((id) => id !== newFav) });
      setFavorites(favorites.filter((id) => id !== newFav));
    } else {
      await handleApi({ method: "PUT", url: `/users/${user}/favorites.json`, body: [...favorites, newFav] });
      setFavorites([...favorites, newFav]);
    }
  };

  const initFavorites = (fav) => {
    setFavorites(fav || []);
  };

  return (
    <UserContext.Provider value={{ user, setUser, favorites, updateFavorites, initFavorites, following, setFollowing }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
