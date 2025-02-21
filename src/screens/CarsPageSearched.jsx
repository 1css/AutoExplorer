import React, { useState, useEffect, useCallback, useMemo } from "react";
import FilterOffCanvas from "../components/Search/FilterContainer"; // Importing the off-canvas component
import qs from "qs";
import axios from "axios";
import { useLocation } from "react-router-dom";

const CarsPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchQuery = params.get("s");

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({}); // Applied filters
  const [tempSelectedFilters, setTempSelectedFilters] = useState({}); // Temporary filters before applying

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

 

  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSearch = useCallback(
    async (searchQuery) => {
      try {
        const params = { s: searchQuery };
        for (const filterName in selectedFilters) {
          params[filterName] = selectedFilters[filterName];
        }
        const response = await axios.get(`${BASE_URL}/api/carlisttwo`, {
          params,
        });
        setCars(response.data);
        console.log(response, "response2");
      } catch (error) {
        console.error(error);
      }
    },
    [selectedFilters]
  );

  const handleFilterChange = useCallback((filterName, value) => {
    setTempSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (newFilters[filterName]?.includes(value)) {
        // Remove filter if already selected
        newFilters[filterName] = newFilters[filterName].filter(
          (v) => v !== value
        );
        if (newFilters[filterName].length === 0) delete newFilters[filterName]; // Remove empty filter key
      } else {
        // Add new filter value
        newFilters[filterName] = [...(newFilters[filterName] || []), value];
      }

      return newFilters;
    });
  }, []);

  const clearFilters = useCallback(() => setSelectedFilters({}), []);

  const toggleOffCanvas = useCallback(
    () => setIsFilterOpen((prev) => !prev),
    []
  );

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, []);

  const getFilteredCars = useMemo(() => {
    if (!cars.length) return [];

    return cars.filter((car) => {
      for (const filterName in selectedFilters) {
        if (filterName === "colors") {
          // Check if car[filterName] is an array before trying to call some() on it
          if (
            Array.isArray(car[filterName]) &&
            !car[filterName].some((color) =>
              selectedFilters[filterName].includes(color)
            )
          ) {
            return false;
          }
        } else if (Array.isArray(selectedFilters[filterName])) {
          // If the filter value is an array, check if the car property is included in the array
          if (!selectedFilters[filterName].includes(car[filterName])) {
            return false;
          }
        } else {
          // If the filter value is not an array, check for strict equality
          if (car[filterName] !== selectedFilters[filterName]) {
            return false;
          }
        }
      }
      return true;
    });
  }, [cars, selectedFilters]);

  useEffect(() => {
    setFilteredCars(getFilteredCars);
  }, [getFilteredCars]);

  const handleApplyFilters = useCallback(async () => {
    setSelectedFilters(tempSelectedFilters); // Apply filters only when button is clicked

    const params = { s: searchQuery }; // Include the search query parameter
    for (const filterName in tempSelectedFilters) {
      if (Array.isArray(tempSelectedFilters[filterName])) {
        params[filterName] = tempSelectedFilters[filterName];
      } else {
        params[filterName] = tempSelectedFilters[filterName];
      }
    }

    try {
      const queryString = qs.stringify(params, {
        arrayFormat: "repeat",
      });
      const response = await axios.get(
        `http://localhost:5000api/carlisttwo?${queryString}`
      );
      setCars(response.data);
      setFilteredCars(response.data); // Update filteredCars state directly
    } catch (error) {
      console.error(error);
    }

    toggleOffCanvas(); // Close filter menu
  }, [tempSelectedFilters, searchQuery, toggleOffCanvas]);

  const handleImageError = (e) => {
    e.target.src = "/default-image.png";
  };
  return (
    <div className="container mt-4" style={{ overflowY: "auto" }}>
      {/* Search Bar */}

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

      {/* Cars Display Section */}
      <div className="row mt-4">
        {filteredCars.slice(0, 10).map((car, index) => (
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
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
                src={car.image}
                className="card-img-top"
                alt={car.name}
                style={{ height: "150px", objectFit: "cover" }}
                onError={handleImageError}
                crossOrigin="anonymous"
              />
              <div className="card-body">
                <h5 className="card-title text-primary">{car.name}</h5>
                <p className="card-text text-success fw-bold">{car.price}</p>
                <p className="card-text text-muted">{car.details}</p>
                <button className="btn btn-outline-primary btn-sm">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarsPage;
