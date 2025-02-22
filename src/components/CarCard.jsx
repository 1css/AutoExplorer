import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/components/newCarCard.css";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  const handleClick = (carId) => {

    navigate(`/CarDetailsPage/${carId}`);
  };

  const handleImageError = (e) => {
    e.target.src = "/default-image.png";
  };


   const backendUrl = process.env.VITE_BACKEND_URL;
  return (
    <div
      className="car-card newcarclassname"
      onClick={() => handleClick(car._id)}
    >
      <div className="image-container">
        <img
        
          src={`${backendUrl}/uploads/cars/${car.image}`}
          alt={car.name}
          className="car-image"
          onError={handleImageError}
          crossOrigin="anonymous"
        />
        <span className="fuel-type">{car.fuelType}</span>
      </div>
      <h3 className="car-name">{car.name}</h3>
      <p className="car-price">$500</p>
    </div>
  );
};

export default CarCard;
