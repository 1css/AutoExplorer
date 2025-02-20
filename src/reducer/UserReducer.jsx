import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_ERROR,
} from "../Constants/UserConstants";

// userLoginReducer.js
export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, isAuthenticated: false, loading: true };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        userInfo: action.payload,
      };
    case LOGIN_FAILURE:
      return { ...state, isAuthenticated: false, loading: false };
    // case LOGOUT:
    //   return {};
    default:
      return state;
  }
};

export const userSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_UP_REQUEST:
      return { ...state, isLoading: true, error: null, success: null };
    case SIGN_UP_SUCCESS:
      return { ...state, isLoading: false, success: action.payload };
    case SIGN_UP_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;

    // case USER_lOGOUT:
    //   return {};
  }
};
