import React, { useContext } from "react";
import { GlobalState } from "../../../GlobalState";

import { Link, Route ,Switch,useRouteMatch} from "react-router-dom";
import axios from "axios";

import { BsFillHouseDoorFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsEnvelope } from "react-icons/bs";
import { BsClipboardData } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";

import { BsFillPeopleFill } from "react-icons/bs";
import { useSelector } from "react-redux";

import Main from "./content/Main";
import FormAdmin from "./content/FormAdmin";
function AdminDash() {
  const { userData } = useSelector((state) => state.user);
  let { path, url } = useRouteMatch();
  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
      </>
    );
  };

  return (
    <React.Fragment>
      <aside>
        <div id="sidebar" className="nav-collapse ">
          <ul className="sidebar-menu" id="nav-accordion">
            <p className="centered">
              <img
                src={userData && userData.avatar}
                alt=""
                className="img-circle"
                width="100"
              />{" "}
            </p>
            <h5 className="centered"> Welcome {userData && userData.name}</h5>
            <li className="mt">
              <Link className="active" to={url}>
                <span>
                  {" "}
                  <BsFillHouseDoorFill /> Dashboard
                </span>
              </Link>
            </li>
            <li className="sub-menu">
              <Link to={`${url}/form`}>
                <span>
                  {" "}
                  <BsClipboardData /> Formations
                </span>
              </Link>
            </li>
            <li className="sub-menu">
              <a href="/category">
                <span>
                  {" "}
                  <BsFillGridFill /> Categories
                </span>
              </a>
            </li>

            <li className="sub-menu">
              <a href="/list_user">
                <span>
                  {" "}
                  <BsFillPeopleFill /> Users
                </span>
              </a>
            </li>
            <li className="sub-menu">
              <a href="/profile">
                <i className="fa fa-cogs"></i>
                <span>
                  <BsFillPersonFill /> Profile
                </span>
              </a>
            </li>
            <li className="sub-menu">
              <a href="#">
                <span>
                  {" "}
                  <BsEnvelope /> Messages
                </span>
              </a>
            </li>
            <li className="sub-menu">
              <a href="#">
                <i className="fa fa-th"></i>
                <span>Historique</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <section id="main-content">
        <section className="wrapper">
          <div className="body">
            <div className="container">
              <div className="main">
                <Switch>

                  <Route
                    exact
                    path={`${path}/form`}
                    component={FormAdmin}
                  />
                  <Route exact path={path} component={Main} />
                </Switch>

              </div>
            </div>
          </div>
        </section>
      </section>
    </React.Fragment>
  );
}

export default AdminDash;
