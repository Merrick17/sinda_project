import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./icon/menu.svg";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { BsLock } from "react-icons/bs";

function Header() {
//   const state = useContext(GlobalState);
//   const [isLogged] = state.userAPI.isLogged;
//   const [isAdmin] = state.userAPI.isAdmin;

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/" onClick={logoutUser}>
            {" "}
            <BsLock /> Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/"> capDev</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/formation">Formations </Link>
        </li>
        <li>
          <Link to="/formation">Contact </Link>
        </li>

        <li>
          <Link to="/register">Register </Link>
        </li>

        {/* {isAdmin}

        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login </Link>
          </li>
        )} */}
      </ul>
    </header>
  );
}
export default Header;
