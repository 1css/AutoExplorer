import React, { useEffect, useState } from "react";
import "./../styles/screens/CarComparison.css";
import { carData as cars } from "../Data/data";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { use } from "react";

const keys = [
  "name",
  "brand",
  "VIN",
  "engineType",
  "engineCapacity",
  "engineHorsepower",
  "engineTorque",
  "drivetrain",
  "transmissionType",
  "fuelType",
  "mileageCity",
  "mileageHighway",
  "safetyRatings",
  "airbags",
  "seatingCapacity",
  "colors",
  "dimensionsWidth",
  "dimensionsHeight",
  "dimensionsWheelbase",
  "curbWeight",
  "featuresAdditional",
  "featuresInterior",
  "featuresSafety",
  "featuresExterior",
  "featuresWheelsAndTires",
  "performanceAcceleration",
  "performanceTowingCapacity",
  "testDriveAvailable",
  "testDrivePrice",
  "testDriveDates",
  "carPrice",
  // "priceUnit",
];

const CarComparison = () => {
  const location = useLocation();
  const selectedCarIds = location.state?.selectedCarIds;
  const [carDetails, setCarDetails] = useState([]);

  const fetchCarDetails = async (selectedCarIds) => {
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/cars/details`;
      const params = { ids: selectedCarIds.join(",") };
      const response = await axios.get(url, { params });
      setCarDetails(response.data);
    } catch (error) {
      console.error("Error fetching car details:", error);
    }
  };

  useEffect(() => {
    fetchCarDetails(selectedCarIds);
  }, [selectedCarIds]);

  const handleNestedFields = (car, key) => {
    switch (key) {
      case "engineType":
        return car.engine?.type || "-";
      case "brand":
        return car.brand?.name || "-";
      case "engineCapacity":
        return car.engine?.capacity || "-";
      case "engineHorsepower":
        return car.engine?.horsepower || "-";
      case "engineTorque":
        return car.engine?.torque || "-";
      case "drivetrain":
        return car.drivetrain || "-";
      case "mileageCity":
        return car.mileage?.city || "-";
      case "mileageHighway":
        return car.mileage?.highway || "-";
      case "dimensionsWidth":
        return car.dimensions?.width || "-";
      case "dimensionsHeight":
        return car.dimensions?.height || "-";
      case "dimensionsWheelbase":
        return car.dimensions?.wheelbase || "-";
      case "featuresAdditional":
        return car.features?.additional?.join(", ") || "-";
      case "featuresSafety":
        return car.features?.safety?.join(", ") || "-";
      case "featuresExterior":
        return car.features?.exterior?.join(", ") || "-";
      case "featuresInterior":
        return car.features?.interior || "-";
      case "featuresWheelsAndTires":
        return car.features?.wheelsAndTires || "-";
      case "performanceAcceleration":
        return car.performance?.acceleration || "-";
      case "performanceTowingCapacity":
        return car.performance?.towingCapacity || "-";
      case "testDriveAvailable":
        return car.testDrive?.available ? "Yes" : "No";
      case "testDrivePrice":
        return `$${car.testDrive?.price || 0}`;
      case "testDriveDates":
        return car.testDrive?.dates?.join(", ") || "-";
      case "reviews":
        return car.reviews?.length ? `${car.reviews.length} Reviews` : "-";
      case "colors":
        return car.colors?.join(", ") || "-";
      case "carPrice":
        return `${car.carPrice} ${car.priceUnit || ""}`.trim();
      default:
        return car[key] || "-";
    }
  };

  const handleDisplayValue = (value) => {
    if (typeof value === "object" && value !== null) {
      return JSON.stringify(value);
    } else if (Array.isArray(value)) {
      return value.join(", ");
    } else if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    } else if (typeof value === "object") {
      return value ? "Yes2" : "No2";
    } else {
      console.log(value, "value3");
      return value;
    }
  };

  const handleImageError = (e) => {
    e.target.src = "/default-image.png";
  };

  console.log(carDetails, "carDetails");

  return (
    <div className="car-comparison-container">
      <h2 style={{ fontSize: 28, color: "#333", marginBottom: 20 }}>
        Car Comparison
      </h2>
      <div
        className="car-table"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ backgroundColor: "#f2f2f2" }}>
            <tr>
              <th
                style={{
                  padding: 10,
                  textAlign: "left",
                  border: "1px solid #ddd",
                  fontWeight: "bold",
                }}
              >
                Features
              </th>
              {carDetails.map((car, index) => (
                <th
                  key={index}
                  style={{
                    padding: 10,
                    textAlign: "center",
                    border: "1px solid #ddd",
                    fontWeight: "bold",
                  }}
                >
                  <h3 style={{ fontSize: 18, marginBottom: 10 }}>{car.name}</h3>
                  <img
                    src={car.images[0]}
                    alt={car.name}
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                    onError={handleImageError}
                    crossOrigin="anonymous"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key}>
                <td
                  style={{
                    padding: 10,
                    textAlign: "left",
                    border: "1px solid #ddd",
                  }}
                >
                  {key}
                </td>
                {carDetails.map((car) => (
                  <td
                    key={car._id}
                    style={{
                      padding: 10,
                      textAlign: "center",
                      border: "1px solid #ddd",
                    }}
                  >
                    {handleDisplayValue(handleNestedFields(car, key))}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CarComparison;
