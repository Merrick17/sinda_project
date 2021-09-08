import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Formations from "./formation/Formations";
import Home from "./home/Home";
import DetailFormation from "./Detailformation/DetailFormation";
import Cart from "./cart/Cart";
import ActivationEmail from "./auth/ActivationEmail";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";
import { GlobalState } from "../../GlobalState";
import AdminDash from "../mainpages/dashbord/AdminDash";
import Formateurdash from "../mainpages/dashbord/Formateurdash";
import Categories from "../mainpages/Categories/Categories";
import CreateFormation from "../mainpages/CreateFormation/CreateFormation";
import ListeFormation from "../mainpages/listeformation/ListeFormation";
import Profile from "../mainpages/profile/Profile";
import ListeUser from "../mainpages/listeuser/ListeUser";
import test from "../mainpages/test/test";
import Header from '../headers/Header'
import { BrowserRouter as Router } from 'react-router-dom'
function Pages() {
  const state = useContext(GlobalState);
  return (
    <Router>
       <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/formateurdash" exact component={Formateurdash} />
        <Route path="/list_user" exact component={ListeUser} />
        <Route path="/test" exact component={test} />
        <Route path="/admindash" exact component={AdminDash} />
        <Route path="/formation" exact component={Formations} />
        <Route path="/detail/:id" exact component={DetailFormation} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/forgotpassword" exact component={ForgotPassword} />
        <Route path="/user/reset/:token" exact component={ResetPassword} />
        <Route path="/category" exact component={Categories} />
        <Route path="/create_formation" exact component={CreateFormation} />
        <Route path="/edit_formation/:id" exact component={CreateFormation} />

        <Route path="/formationsdash" exact component={ListeFormation} />
        <Route path="/profile" exact component={Profile} />

        <Route
          path="/user/activate/:activation_token"
          exact
          component={ActivationEmail}
        />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </Router>

  );
}

export default Pages;
