import axios from "axios";

// cars.js
const fetchBrands = async () => {
  const response = await axios.get("http://localhost:5000/api/prod/getBrands");

  return response.data;
};

const fetchCars = async (brand = "all", pageNumber = 1) => {
  const params = {
    brand,
    page: pageNumber,
  };
  const response = await axios.get("http://localhost:5000/api/prod/getCars", {
    params,
  });
  console.log(response.data, "response.data");
  return response.data;
};

export { fetchBrands, fetchCars };
