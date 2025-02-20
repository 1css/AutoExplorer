import React, { useState } from "react";
import "../../styles/components/CompareSelections.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

function CompareSelections({ cars }) {
  // State to control modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCars, setSelectedCars] = useState([]);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();
  const [currentCarIndex, setCurrentCarIndex] = useState(null);
  console.log(cars, "cars");

  const handleCarSelect = (index) => {
    setCurrentCarIndex(index);
    openModal();
  };

  const handleCarChange = (event, value) => {
    if (value) {
      const newSelectedCars = [...selectedCars];
      newSelectedCars[currentCarIndex] = value;
      setSelectedCars(newSelectedCars);
    }
  };

  const handleCompare = () => {
    if (selectedCars.length > 1) {
      const selectedCarIds = selectedCars.map((car) => car._id);
      navigate("/CarComparison", { state: { selectedCarIds } });
    } else {
      // Display an error message or notification
      // For example, using react-toastify
      toast.error("Please select at least two cars to compare.");
    }
  };

  return (
    <div className="compareselection-main-classname">
      {/* Main Container */}
      <div className="custom-width">
        <p className="text-center mb-4 section-title">Compare Cars</p>
        <div className="car-box-container">
          {/* Car Selection Boxes */}
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <div
                key={`car-box-${index}`}
                className="car-box"
                onClick={() => handleCarSelect(index)}
              >
                {selectedCars[index] ? (
                  <p key={selectedCars[index]._id}>
                    {selectedCars[index].name}
                  </p>
                ) : (
                  <>
                    <i className="fas fa-plus plus-icon"></i>
                    <p key={`select-car-${index}`}>Select Car {index + 1}</p>
                  </>
                )}
              </div>
            ))}
        </div>

        {/* Compare Button */}
        <div className="text-center mt-4 button-style">
          <button className="compare-btn" onClick={handleCompare}>
            Compare
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select a Car</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body">
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={cars}
                  getOptionLabel={(option) => option.name}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Select a car" />
                  )}
                  onChange={handleCarChange}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={closeModal}
                >
                  Select
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompareSelections;
