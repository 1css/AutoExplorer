import React, { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "../components/CarCard";
import "../styles/screens/CarList.css";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCars = async () => {
    const BASE_URL = import.meta.env.VITE_BACKEND_URL;
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/api/prod/newcars-client`);
      setCars(response.data);
    } catch (err) {
      console.log(err, "CarList");
      
      setError("Failed to load cars. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="car-list-container">
      <h2 className="section-title">Explore Our New Cars</h2>

      {loading ? (
        <div class="loading-container">
          <p class="loading-message">Loading...</p>
          <p class="waiting-message">Please wait</p>
        </div>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="car-list">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarList;
