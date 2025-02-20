import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
} from "../Constants/CartConstant";

const initialState = {
  favorites: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const favoriteExists = state.favorites.find(
        (favorite) => favorite.carId === action.payload.carId
      );
      if (favoriteExists) {
        return state;
      } else {
        const newState = {
          ...state,
          favorites: [...state.favorites, action.payload],
        };
        localStorage.setItem("cartItems", JSON.stringify(newState.favorites));
        return newState;
      }
    case CART_REMOVE_ITEM:
      const newStateRemove = {
        ...state,
        favorites: state.favorites.filter(
          (favorite) => favorite.carId !== action.payload
        ),
      };
      localStorage.setItem(
        "cartItems",
        JSON.stringify(newStateRemove.favorites)
      );
      return newStateRemove;
    case CART_CLEAR_ITEMS:
      localStorage.removeItem("cartItems");
      return { ...state, favorites: [] };
    default:
      return state;
  }
};
