import React, { useState, useEffect, useCallback, useMemo } from "react";
import FilterOffCanvas from "../components/Search/FilterContainer"; // Importing the off-canvas component
import qs from "qs";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const CarsPagesearched2 = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("s");

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [tempSelectedFilters, setTempSelectedFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const primaryFilters = useMemo(
    () => ({
      Budget: ["Upto 2 lakh", "1.00+ Cr"],
      "Body Type": ["SUV", "Sedan", "Hatchback"],
      "Transmission Type": ["Automatic", "Manual"],
    }),
    []
  );

  const additionalFilters = useMemo(
    () => ({
      fuelType: ["Petrol", "Diesel", "Electric"],
      "Seating Capacity": ["2", "4", "5", "7+", "9+"],
      Mileage: ["10 kmpl", "15 kmpl", "20+ kmpl"],
      "Safety Ratings": ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
      Airbags: ["2", "4", "6+", "None"],
      "Additional Features": ["Sunroof", "Rear Camera", "Touchscreen"],
      "Engine Capacity": ["1000 cc", "1500 cc", "2000+ cc"],
      Power: ["50 bhp", "100 bhp", "150+ bhp"],
      Torque: ["100 Nm", "200 Nm", "300+ Nm"],
      colors: ["Red", "Blue", "Black", "White", "Silver", "Grey"],
    }),
    []
  );

  const api2 = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
  });
  const toggleOffCanvas = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (filter, value) => {
    setTempSelectedFilters((prevFilters) => {
      if (prevFilters[filter]?.includes(value)) {
        return {
          ...prevFilters,
          [filter]: prevFilters[filter].filter((v) => v !== value),
        };
      } else {
        return {
          ...prevFilters,
          [filter]: [...(prevFilters[filter] || []), value],
        };
      }
    });
  };

  const clearFilters = () => {
    setTempSelectedFilters({});
  };

  const handleApplyFilters = () => {
    setSelectedFilters(tempSelectedFilters);
    fetchFilteredCars();
    toggleOffCanvas();
  };

  const fetchCars = async (query) => {
    setLoading(true);
    try {
      const response = await api2.get("/api/search", { params: { s: query } });
      setCars(response.data);
      setFilteredCars(response.data);
    } catch (error) {
      setError("Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  };

  const fetchFilteredCars = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      for (const [key, values] of Object.entries(tempSelectedFilters)) {
        if (Array.isArray(values)) {
          values.forEach((value) => queryParams.append(key, value));
        } else {
          queryParams.set(key, values);
        }
      }
      queryParams.set("s", searchQuery);
      const response = await api2.get(`/api/filter?${queryParams.toString()}`);
      setFilteredCars(response.data);
    } catch (error) {
      console.error("Failed to fetch filtered cars:", error);
      setError("Failed to fetch filtered cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      fetchCars(searchQuery);
    }
  }, [searchQuery]);

  const handleImageError = (e) => {
    console.log("Image failed to load, using fallback image.");
    e.target.src = "/default-image.png"; // Ensure this path is correct
  };

  const navigate = useNavigate();
  const handleClick = (carId) => {
    try {
      navigate(`/CarDetailsPage/${carId}`);
    } catch (error) {
      console.error("Error navigating to new page:", error);
    }
  };

  return (
    <div className="container mt-4" style={{ overflowY: "auto" }}>
      {/* Search Bar */}

      <h3 className="text-center my-3">
        <span style={{ color: "green" }}>Searched car :</span> {searchQuery}
      </h3>

      {/* Toggle Filters Button */}
      <button className="btn btn-primary" onClick={toggleOffCanvas}>
        Toggle Filters
      </button>

      {/* Filters OffCanvas */}
      <FilterOffCanvas
        isOpen={isFilterOpen}
        toggleOffCanvas={toggleOffCanvas}
        primaryFilters={primaryFilters}
        additionalFilters={additionalFilters}
        selectedFilters={selectedFilters}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
        handleApplyFilters={handleApplyFilters}
        tempSelectedFilters={tempSelectedFilters}
      />

      {/* Loading State */}
      {loading && <p>Loading...</p>}

      {/* Error State */}
      {error && <p>{error}</p>}

      {/* Cars Display Section */}
      {/* Cars Display Section */}
      {!loading && filteredCars.length > 0 && (
        <div className="row mt-4">
          {filteredCars.map((car, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={car._id}>
              <div
                className="card"
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  overflow: "hidden",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={`http://localhost:5000/uploads/cars/${car.firstImage}`}
                  className="card-img-top"
                  // alt={car.name}
                  style={{ height: "150px", objectFit: "cover" }}
                  onError={handleImageError} // Attach the error handler
                  crossOrigin="anonymous"
                />
                <div className="card-body">
                  <h5 className="card-title text-primary">{car.name}</h5>
                  <p className="card-text text-success fw-bold">{car.price}</p>
                  <p className="card-text text-muted">{car.details}</p>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleClick(car._id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsPagesearched2;
