import React, { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "../components/CarCard";
import "../styles/screens/CarList.css";

const CarList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCars = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${BASE_URL}/api/prod/newcars-client`);
      setCars(response.data);
    } catch (err) {
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
        <p className="loading">Loading cars...</p>
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
