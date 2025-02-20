import {
  GET_REVIEWS_REQUEST,
  GET_REVIEWS_SUCCESS,
  GET_REVIEWS_FAIL,
  POST_REVIEW_REQUEST,
  POST_REVIEW_SUCCESS,
  POST_REVIEW_FAIL,
} from "../Constants/reviewConstants";

const initialState = {
  review: [],
  loading: false,
  error: null,
};

export const reviewCreateReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_REVIEW_REQUEST:
      return { ...state, loading: true };
    case POST_REVIEW_SUCCESS:
      return { ...state, review: action.payload, loading: false };
    case POST_REVIEW_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const initialState2 = {
  reviews: [],
  loading: false,
  error: null,
};

export const reviewListReducer = (state = initialState2, action) => {
  switch (action.type) {
    case GET_REVIEWS_REQUEST:
      return { ...state, loading: true };
    case GET_REVIEWS_SUCCESS:
      return { ...state, reviews: action.payload, loading: false };
    case GET_REVIEWS_FAIL:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};
