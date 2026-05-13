import React from "react";
import "../../styles/components/FilterOffCanvas.css";

const FilterOffCanvas = ({
  isOpen,
  toggleOffCanvas,
  primaryFilters,
  additionalFilters,
  handleFilterChange,
  tempSelectedFilters,
  clearFilters,
  handleApplyFilters,
}) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="overlay" onClick={toggleOffCanvas}></div>}

      {/* Offcanvas */}
      <div className={`filter-offcanvas ${isOpen ? "show" : ""}`}>
        {/* Header */}
        <div className="filter-offcanvas-header">
          <button className="btn btn-secondary" onClick={toggleOffCanvas}>
            Close
          </button>

          <h3 className="fs-4 fw-bold">Filters</h3>
        </div>

        {/* Body */}
        <div className="filter-offcanvas-body">
          {/* Primary Filters */}
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
                        tempSelectedFilters[filterName]?.includes(value) ||
                        false
                      }
                      onChange={() => handleFilterChange(filterName, value)}
                    />

                    <label className="form-check-label">{value}</label>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Additional Filters */}
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
                        tempSelectedFilters[filterName]?.includes(value) ||
                        false
                      }
                      onChange={() => handleFilterChange(filterName, value)}
                    />

                    <label className="form-check-label">{value}</label>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="filter-offcanvas-footer">
          <button className="btn btn-secondary" onClick={clearFilters}>
            Clear Filters
          </button>

          <button className="btn btn-primary" onClick={handleApplyFilters}>
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterOffCanvas;
