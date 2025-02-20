import {
  FETCH_UPCOMING_CARS_REQUEST,
  FETCH_UPCOMING_CARS_SUCCESS,
  FETCH_UPCOMING_CARS_FAILURE,
  FETCH_TRENDING_CARS_REQUEST,
  FETCH_TRENDING_CARS_SUCCESS,
  FETCH_TRENDING_CARS_FAILURE,
} from "../Constants/FeaturedContstant";

const initialState = {
  upcom: [],
  loading: false,
  error: null,
};

const initialState2 = {
  trending: [],
  loading: false,
  error: null,
};

export const upcomingCarsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_UPCOMING_CARS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_UPCOMING_CARS_SUCCESS:
      return { ...state, upcom: action.payload, loading: false };
    case FETCH_UPCOMING_CARS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

export const trendingCarsReducer = (state = initialState2, action) => {
  switch (action.type) {
    case FETCH_TRENDING_CARS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TRENDING_CARS_SUCCESS:
      return { ...state, trending: action.payload, loading: false };
    case FETCH_TRENDING_CARS_FAILURE:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
