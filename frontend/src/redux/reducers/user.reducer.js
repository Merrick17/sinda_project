const { LOGIN_USER, LOGIN_USER_SUCCESS } = require("../actionTypes");

const initUserState = {
  loading: false,
  isAuth: false,
  token: "",
  userData: null,
};

const userReducer = (state = initUserState, action) => {
  let { type, payload } = action;
  switch (type) {
    case LOGIN_USER:
      return { ...state, loading: true };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        userData: payload.user,
        token: payload.token,
      };

    default:
      return state;
  }
};

export default userReducer;
