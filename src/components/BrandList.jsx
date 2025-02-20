import React from "react";
import "../styles/components/BrandList.css";

const BrandList = ({ brands, onBrandSelect }) => {
  return (
    <div className="brand-list">
      <h3>Brands</h3>
      <ul>
        <li key="all" onClick={() => onBrandSelect("all")}>
          All
        </li>
        {brands.map((brand) => (
          <li key={brand._id} onClick={() => onBrandSelect(brand)}>
            {brand.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandList;
