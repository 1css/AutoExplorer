import React, { useState, useEffect } from "react";
// AllCarList.js
import { Toast } from "react-bootstrap";
import BrandList from "../components/BrandList";
import "../styles/screens/AllCarList.css";
import { fetchBrands, fetchCars } from "../APi/cars";
import { useNavigate } from "react-router-dom";

const AllCarList = () => {
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedBrandname, setSetselectedBrandname] = useState("");
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMoreCars, setHasMoreCars] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sameslected, setsameslected] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrandsData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBrands();
        setBrands(data);
      } catch (error) {
        console.log(error,'alllist');
        
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBrandsData();
  }, []);

  useEffect(() => {
    const fetchCarsData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCars(selectedBrand, pageNumber);
        if (pageNumber === 1) {
          setCars(data.cars);
        } else {
          setCars((prevCars) => [...prevCars, ...data.cars]);
        }
        setHasMoreCars(data.hasMore);
        setIsLoadingMore(false);
      } catch (error) {
        console.log(error,'allList 2');
        
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCarsData();
  }, [selectedBrand, pageNumber]);

  const handleBrandSelect = (brand) => {
    if (selectedBrand === brand._id) {
      setsameslected(true);
      setTimeout(() => {
        setsameslected(false);
      }, 3000); // hide the toast message after 3 seconds
      return;
    }
    setSelectedBrand(brand._id);
    setSetselectedBrandname(brand.name);
    setCars([]);
    setPageNumber(1);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };
  const handleImageError = (e) => {
    e.target.src = "/default-image.png";
  };
  const navigate = useNavigate();

  const handleClick = (carId) => {
    try {
      navigate(`/CarDetailsPage/${carId}`);
    } catch (error) {
      console.error("Error navigating to new page:", error);
    }
  };

   const backendUrl = process.env.VITE_BACKEND_URL;
  return (
    <div className="carlist-container">
      <header className="carlist-header">
        <button
          className="brand-menu-btn"
          onClick={() =>
            document.getElementById("brand-offcanvas").classList.add("show")
          }
        >
          Select Brand
        </button>
      </header>

      {/* Offcanvas for Mobile */}
      <div id="brand-offcanvas" className="offcanvas">
        <button
          className="close-btn"
          onClick={() =>
            document.getElementById("brand-offcanvas").classList.remove("show")
          }
        >
          ×
        </button>
        <BrandList brands={brands} onBrandSelect={handleBrandSelect} />
      </div>

      {sameslected && (
        <Toast
          show={sameslected}
          onClose={() => setsameslected(false)}
          delay={3000}
          autohide
          className="position-absolute top-4 end-0 p-2"
          style={{
            zIndex: 1,
            backgroundColor: "#dc3545",
            color: "white",
            borderRadius: "5px",
          }}
        >
          <Toast.Body>Hello, please select other brand.</Toast.Body>
        </Toast>
      )}

      {/* Main Car List */}
      <main className="carlist-main">
        {isLoading ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <>
            <h2>{selectedBrand ? `${selectedBrandname} Cars` : "All Cars"}</h2>
            <div className="car-grid">
              {cars.map((car) => (
                <div
                  key={car._id}
                  className="car-card"
                  onClick={() => handleClick(car._id)}
                >
                  <img
                    
                    src={`${backendUrl}/uploads/cars/${car.image}`}
                    alt={car.name}
                    className="car-image"
                    onError={handleImageError}
                    crossOrigin="anonymous"
                  />
                  <h3>{car.name}</h3>
                  <p>Brand: {car.brand}</p>
                  <p>
                    Price: $
                    {car.price !== undefined && car.price !== null
                      ? car.price
                      : 500}
                  </p>
                </div>
              ))}
              {hasMoreCars ? (
                <button
                  className="load-more-btn"
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? (
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  ) : (
                    "Load More"
                  )}
                </button>
              ) : (
                <p>No more cars available.</p>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default AllCarList;
