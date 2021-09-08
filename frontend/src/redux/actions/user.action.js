import axios from "axios";
import Swal from 'sweetalert2'
const { LOGIN_USER, LOGIN_USER_SUCCESS } = require("../actionTypes");
const BASE_URL = "http://localhost:5000";

const loginUser = () => {
  return {
    type: LOGIN_USER,
  };
};

const loginUserSuccess = (data) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
};

export const registerUserApi = (body) => async dispatch => {
  try {
    let result = await axios.post(`${BASE_URL}/user/register`, body);
    if (result.data) {
      Swal.fire({
        title: 'Success!',
        text: 'Registration Succedd please Login',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
    }
    console.log("RESULT", result)
  } catch (error) {
    Swal.fire({
      title: 'Error!',
      text: 'Something Went Wrong!',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }
}

export const loginUserApi = (body, navigation) => async (dispatch) => {
  try {
    dispatch(loginUser());
    let response = await axios.post(`${BASE_URL}/user/login`, body);
    console.log(response.data);
    localStorage.setItem("token", response.data.token);
    dispatch(loginUserSuccess(response.data));
    switch (response.data.user.role) {
      case 1:
        navigation.replace("/admindash");
      case 2:
        navigation.replace("/admindash");
      case 0:
        navigation.replace("/admindash");
      default:
        break;
    }
  } catch (e) { }
};
