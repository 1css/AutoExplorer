import React from "react";
import { Offcanvas } from "react-bootstrap"; // Import Offcanvas from react-bootstrap
import "../../styles/components/FilterOffCanvas.css"; // Add your styles here

const FilterOffCanvas = ({
  isOpen,
  toggleOffCanvas,
  primaryFilters,
  additionalFilters,
  selectedFilters,
  handleFilterChange,
  tempSelectedFilters,
  clearFilters,
  handleApplyFilters,
}) => {
  return (
    <div className={`filter-offcanvas ${isOpen ? "show" : ""}`}>
      <div className="filter-offcanvas-header">
        <button className="btn btn-secondary" onClick={toggleOffCanvas}>
          Close
        </button>
        <h3 className="fs-4 fw-bold">Filters</h3>
      </div>
      <div className="filter-offcanvas-body">
        <div>
          <h3 className="fs-5 fw-bold mb-3">Primary Filters</h3>
          {Object.keys(primaryFilters).map((filterName) => (
            <div key={filterName} className="mb-4">
              <h4 className="fs-6 fw-bold mb-2">{filterName}</h4>
              {primaryFilters[filterName].map((value) => (
                <div key={value} className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={
                      tempSelectedFilters[filterName]?.includes(value) || false
                    }
                    onChange={(e) => {
                      e.stopPropagation();
                      handleFilterChange(filterName, value);
                    }}
                  />
                  <label className="form-check-label fs-6">{value}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div>
          <h3 className="fs-5 fw-bold mb-3">Additional Filters</h3>
          {Object.keys(additionalFilters).map((filterName) => (
            <div key={filterName} className="mb-4">
              <h4 className="fs-6 fw-bold mb-2">{filterName}</h4>
              {additionalFilters[filterName].map((value) => (
                <div key={value} className="form-check mb-2">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={
                      tempSelectedFilters[filterName]?.includes(value) || false
                    }
                    onChange={(e) => {
                      e.stopPropagation();
                      handleFilterChange(filterName, value);
                    }}
                  />
                  <label className="form-check-label fs-6">{value}</label>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="filter-offcanvas-footer">
        <button className="btn btn-secondary" onClick={clearFilters}>
          Clear Filters
        </button>
        <button className="btn btn-primary" onClick={handleApplyFilters}>
          Apply Filters
        </button>
      </div>
      {isOpen && <div className="overlay" onClick={toggleOffCanvas} />}
    </div>
  );
};

export default FilterOffCanvas;
