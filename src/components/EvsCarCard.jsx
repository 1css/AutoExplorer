import React from "react";
import "../styles/components/EvsCarCard.css";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleClick = (carId) => {

    try {
      navigate(`/CarDetailsPage/${carId}`);
    } catch (error) {
      console.error("Error navigating to new page:", error);
    }
  };
 const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <div className="car-card" onClick={() => handleClick(car._id)}>
      <img
       
        src={`${backendUrl}/uploads/cars/${car.image}`}
        alt={car.name}
        className="car-image"
        crossOrigin="anonymous"
      />
      <h3 className="car-name">{car.name}</h3>
      <p className="car-price">${car.price || 5000}</p>
    </div>
  );
};

export default CarCard;
