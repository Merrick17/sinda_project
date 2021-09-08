import React, { createContext, useState, useEffect } from "react";
import FormationsAPI from "./api/FormationsAPI";
import axios from "axios";
import UserAPI from "./api/UserAPI";
import CategoriesAPI from "./api/CategoriesAPI";
import UsersAPI from "./api/UsersAPI";

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const refreshToken = async () => {
    const token = await axios.get("/user/refresh_token");
    console.log(token);

    setToken(token.data.access_token);
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) refreshToken();
  }, []);

  const state = {
    token: [token, setToken],
    FormationsAPI: FormationsAPI(),
    userAPI: UserAPI(token),
    CategoriesAPI: CategoriesAPI(),
    usersAPI: UsersAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
