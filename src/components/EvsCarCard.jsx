import React from "react";
import "../styles/components/EvsCarCard.css";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleClick = (carId) => {
    console.log(carId, "carId");
    try {
      navigate(`/CarDetailsPage/${carId}`);
    } catch (error) {
      console.error("Error navigating to new page:", error);
    }
  };

  return (
    <div className="car-card" onClick={() => handleClick(car._id)}>
      <img
        src={`http://localhost:5000/uploads/cars/${car.image}`}
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
