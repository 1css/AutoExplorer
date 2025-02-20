// userActions.js
import axios from "axios";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
} from "../Constants/UserConstants";
import instance from "../axios/axiosInstance";

export const login = (email, password) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });
  try {
    const response = await instance.post("/api/l", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.log(error, "error");
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data,
    });
  }
};

// userActions.js
export const signUpAction = (userData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: "SIGN_UP_REQUEST",
      });
      const response = await axios.post(
        "http://localhost:5000/api/sign",
        userData
      );
      dispatch({
        type: "SIGN_UP_SUCCESS",
        payload: response.data.message,
      });
    } catch (error) {
      dispatch({
        type: "SIGN_UP_ERROR",
        payload: error.response.data,
      });
    }
  };
};
export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT_REQUEST,
  });
  try {
    localStorage.removeItem("token");
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.error(error);
  }
};

//   try {
//     dispatch({ type: USER_REGISTER_REQUEST });
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };
//     const { data } = await axios.post(
//       "/api/register",
//       { name, email, password },
//       config
//     );
//     dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
//   } catch (error) {
//     dispatch({
//       type: USER_REGISTER_FAILURE,
//       payload:
//         error.response && error.response.data
//           ? error.response.data
//           : error.message,
//     });
//   }
// };
