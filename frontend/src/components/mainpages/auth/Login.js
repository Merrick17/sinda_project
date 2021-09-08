import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../mainpages/utils/notification/notification";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import {useDispatch} from 'react-redux'
import { GlobalState } from "../../../GlobalState";
import { loginUserApi } from "../../../redux/actions/user.action";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

function Login() {
  const history = useHistory();
  const [user, setUser] = useState(initialState);
  const { email, password, err, success } = user;
  const state = useContext(GlobalState);
  const dispatch = useDispatch(); 
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     dispatch(loginUserApi(user,history))
    
  };

  const responseGoogle = async (response) => {
    try {
      const res = await axios.post("/user/google_login", {
        tokenId: response.tokenId,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);
      window.location.href = "/";
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  const responseFacebook = async (response) => {
    try {
      const { accessToken, userID } = response;
      const res = await axios.post("/user/facebook_login", {
        accessToken,
        userID,
      });

      setUser({ ...user, error: "", success: res.data.msg });
      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            required
            placeholder="Email"
            value={user.email}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChangeInput}
          />{" "}
        </div>

        <div className="row">
          <button type="submit">Login</button>

          <Link to="/forgotpassword">Forgot your password?</Link>
        </div>
      </form>

      <div className="hr">Or Login With</div>

      <div className="social">
        <GoogleLogin
          clientId="47392835052-o71bcbmnin8b13mv84kgfur9tulcqf1e.apps.googleusercontent.com"
          buttonText="Login with google"
          onSuccess={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <FacebookLogin
          appId="200622818620331"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
        />
      </div>

      <p>
        Vous n'avez pas encore de compte ?{" "}
        <Link to="/register">Inscrivez-vous gratuitement</Link>
      </p>
    </div>
  );
}

export default Login;
