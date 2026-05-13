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
      return value;
    }
  };

  const handleImageError = (e) => {
    e.target.src = "/default-image.png";
  };

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  return (
    <div className="car-comparison-container">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Car Comparison
      </h2>

      <div className="overflow-x-auto lg:overflow-x-visible shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 sticky left-0 bg-gray-50 z-10 border-r border-gray-200">
                Features
              </th>
              {carDetails.map((car, index) => (
                <th
                  key={index}
                  className="px-4 py-3 text-center text-sm font-semibold text-gray-700 min-w-48 border-l border-gray-200"
                >
                  <h3 className="font-medium text-gray-900">{car.name}</h3>
                  <img
                    src={`${backendUrl}/uploads/cars/${car.images[0]}`}
                    alt={car.name}
                    className="w-20 h-20 object-cover rounded mx-auto mt-2"
                    onError={handleImageError}
                    crossOrigin="anonymous"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr
                key={key}
                className="even:bg-gray-25 hover:bg-blue-25 transition-colors"
              >
                <td className="px-4 py-3 text-sm font-medium text-gray-900 sticky left-0 bg-white z-10 border-r border-gray-200">
                  {key}
                </td>
                {carDetails.map((car) => (
                  <td
                    key={car._id}
                    className="px-4 py-3 text-sm text-gray-700 text-center border-l border-gray-200"
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
