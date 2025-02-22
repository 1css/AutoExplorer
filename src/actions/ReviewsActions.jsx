// reviewActions.js
import axios from "axios";
import { toast } from "react-toastify";
import {
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  POST_REVIEW_REQUEST,
  POST_REVIEW_SUCCESS,
  POST_REVIEW_FAIL,
} from "../Constants/reviewConstants";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const postReview = (carId, review) => async (dispatch) => {

  try {
    dispatch({
      type: POST_REVIEW_REQUEST,
    });

    const token = localStorage.getItem("token");
    const config = {
      method: "post",
      url: `${baseURL}/api/reviews/${carId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      data: review,
    };

    const response = await axios(config);

    alert("1");
    const { data } = response;
    dispatch({ type: POST_REVIEW_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error making request:", error);
    dispatch({ type: POST_REVIEW_FAIL, payload: error.message });
  }
};

export const getReviews = (carId) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      method: "get",
      url: `${baseURL}/api/reviews/${carId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    };

    const response = await axios(config);
  
    const { data } = response;
    dispatch({ type: GET_REVIEWS_SUCCESS, payload: data });
  } catch (error) {
    console.error("Error making request:", error);
  }
};
