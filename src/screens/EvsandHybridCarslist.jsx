import React, { useEffect, useState } from "react";
import axios from "axios";
import CarCard from "../components/EvsCarCard";
import "../styles/screens/EvsandHybridCarslist.css";
import { useNavigate } from "react-router-dom";

const EnvandHybridCarsList = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/prod/electric-hybrid`
        );
        setCars(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const evCars = cars.filter((car) => car.fuelType === "Electric");
  const hybridCars = cars.filter((car) => car.fuelType === "Hybrid");

  const navigate = useNavigate();

  const handleClick = (carId) => {
  
    try {
      navigate(`/CarDetailsPage/${carId}`);
    } catch (error) {
      console.error("Error navigating to new page:", error);
    }
  };

  return (
    <div className="EnvandHybridCarsList-main-classname">
      {loading ? (
        <div class="loading-container">
          <p class="loading-message">Loading...</p>
          <p class="waiting-message">Please wait</p>
        </div>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <h2 className="section-title">Electric Vehicles (EVs)</h2>
          <div className="car-list">
            {evCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>

          <h2 className="section-title">Hybrids</h2>
          <div className="car-list">
            {hybridCars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EnvandHybridCarsList;
