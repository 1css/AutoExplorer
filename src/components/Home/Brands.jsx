import React from "react";
import { motion } from "framer-motion";
import "../../styles/components/Brands.css";
import { carBrands } from "../../Data/data";

const PopularCarBrands = ({ Popular }) => {
  if (!Popular || Popular.length === 0) return null; // Handle empty state

  const topBrand = Popular.topBrand;
  const otherBrands = Popular.otherBrands || [];

  const handleImageError = (e) => {
    e.target.src = "/default-image.png";
  };
  return (
    <div className="popular-brands-container">
      <h2 className="section-title">Popular Car Brands</h2>
      <div className="brands-grid">
        {/* Top Brand Card */}
        {topBrand && (
          <div key={topBrand._id} className="brand-card top-brand-card">
            <span className="top-brand-badge">Top Brand</span>
            <img
              src={`http://localhost:5000/uploads/brands/${topBrand.logo}`}
              alt={topBrand.name}
              className="brand-logo"
              onError={handleImageError}
              crossOrigin="anonymous"
            />
            <h3 className="brand-name">{topBrand.name}</h3>
          </div>
        )}

        {/* Other Brands */}
        {otherBrands.map((brand) => (
          <motion.div
            key={brand._id}
            className="brand-card"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={`http://localhost:5000/uploads/brands/${brand.logo}`}
              alt={brand.name}
              className="brand-logo"
              onError={handleImageError}
              crossOrigin="anonymous"
            />
            <h3 className="brand-name">{brand.name}</h3>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default PopularCarBrands;
