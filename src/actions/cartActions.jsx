import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_CLEAR_ITEMS,
} from "../Constants/CartConstant";

export const addToCart = (carId, carName, fuelType) => (dispatch) => {
  dispatch({
    type: CART_ADD_ITEM,
    payload: { carId, carName, fuelType },
  });
};

export const removeFromCart = (carId) => (dispatch) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: carId,
  });
};

export const clearCart = () => (dispatch) => {
  dispatch({
    type: CART_CLEAR_ITEMS,
  });
};
