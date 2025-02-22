import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { userLoginReducer, userSignupReducer } from "./reducer/UserReducer";
import { cartReducer } from "./reducer/cartReducer";
import {
  upcomingCarsReducer,
  trendingCarsReducer,
} from "./reducer/FeaturedComReducer";

import {
  reviewCreateReducer,
  reviewListReducer,
} from "./reducer/reviewReducers";

const rootReducer = {
  user: userLoginReducer,
  sign: userSignupReducer,
  cart: cartReducer,
  upcomingcars: upcomingCarsReducer,
  trendingcars: trendingCarsReducer,
  reviewList: reviewListReducer,
  reviewCreate: reviewCreateReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
