import axios from "axios";
import {
  FETCH_UPCOMING_CARS_REQUEST,
  FETCH_UPCOMING_CARS_SUCCESS,
  FETCH_UPCOMING_CARS_FAILURE,
  FETCH_TRENDING_CARS_REQUEST,
  FETCH_TRENDING_CARS_SUCCESS,
  FETCH_TRENDING_CARS_FAILURE,
} from "../Constants/FeaturedContstant";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export const fetchUpcomingCars = () => async (dispatch) => {
  dispatch({
    type: FETCH_UPCOMING_CARS_REQUEST,
  });
  try {
    const response = await instance.get("/Upprod/active");
    dispatch({
      type: FETCH_UPCOMING_CARS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_UPCOMING_CARS_FAILURE,
      payload: error.response.data,
    });
  }
};

export const fetchTrendingCars = () => async (dispatch) => {
  dispatch({
    type: FETCH_TRENDING_CARS_REQUEST,
  });
  try {
    const response = await instance.get("/prod/trendingcar");
    dispatch({
      type: FETCH_TRENDING_CARS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_TRENDING_CARS_FAILURE,
      payload: error.response.data,
    });
  }
};
