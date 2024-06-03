import React, { useState } from "react";
import handleApi from "../utils/handleApi";

const UserContext = React.createContext({
  data: [],
  setData: () => {},
  user: "",
  setUser: () => {},
  favorites: [],
  updateFavorites: async (newFav) => {},
  initFavorites: (fav) => {},
});

export const UserContextProvider = (props) => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState("");
  const [favorites, setFavorites] = useState([]);

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
    <UserContext.Provider value={{ data, setData, user, setUser, favorites, updateFavorites, initFavorites }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
