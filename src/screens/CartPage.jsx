import React, { useEffect } from "react";
import "../styles/screens/CartPage.css";

import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../actions/cartActions";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.favorites);

  console.log(cartItems, "cartItems");

  const handleAddToCart = (item) => {
    dispatch(addToCart(item.carId, item.carName, item.fuelType));
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  console.log(cartItems, "cartItems");

  return (
    <div className="cart-container">
      <h1 className="cart-title">Your Favorites Page</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Your Favorites is empty!</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.carId} className="cart-item">
                <div className="cart-item-details">
                  <h3>{item.carName}</h3>
                  <p>{item.fuelType}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveFromCart(item.carId)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
