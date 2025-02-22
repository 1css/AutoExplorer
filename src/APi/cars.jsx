import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const fetchBrands = async () => {
  const response = await axios.get(`${BASE_URL}/api/prod/getBrands`);
  return response.data;
};

const fetchCars = async (brand = "all", pageNumber = 1) => {
  const params = {
    brand,
    page: pageNumber,
  };
  const response = await axios.get(`${BASE_URL}/api/prod/getCars`, {
    params,
  });

  return response.data;
};

export { fetchBrands, fetchCars };
