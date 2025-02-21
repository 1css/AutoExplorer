import React, { useEffect, useState, memo, useMemo } from "react";
import "../styles/screens/Home.css";
import FeaturedCom from "../components/Home/FeaturedCom";
import PopularCarBrands from "../components/Home/Brands";
import Brands from "../components/Home/Brands";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { Container } from "react-bootstrap";
import CompareSelections from "../components/Home/CompareSelections";
import ElectricHybridCarsSection from "../components/Home/ElectricHybridCarsSection";
import {
  fetchUpcomingCars,
  fetchTrendingCars,
} from "../actions/FeaturedAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = React.memo(() => {
  const dispatch = useDispatch();

  const upcomingcars = useSelector((state) => state.upcomingcars);
  const { upcom, loading } = upcomingcars || {};

  useEffect(() => {
    if (!upcom || upcom.length === 0) {
      dispatch(fetchUpcomingCars());
      dispatch(fetchTrendingCars());
    }
  }, [dispatch, upcom]);
  const [evhybridhome, setEvhybridhome] = useState([]);
  const [Popular, setPopular] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cars, setCars] = useState([]);

  const fetched = async () => {
    setIsLoading(true);
    try {
      const responses = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/prod/electric-hybrid-home`
        ),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/Upprod/active`),
        axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/brandRouter/topBrand`
        ),
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/prod/seletcars`),
      ]);

      // Check if all responses are successful
      for (const response of responses) {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`Request failed with status ${response.status}`);
        }
      }

      setEvhybridhome(responses[0].data);
      setPopular(responses[2].data);
      console.log(responses[3].data, "fouthResponse.data");
      setCars(responses[3].data);
    } catch (error) {
      setError(error);
      console.log(error, "error homepage");
    } finally {
      setIsLoading(false);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    fetched();
  }, []);

  console.log("Home component rendered");

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-center my-5">Please come back later</p>;
  }
  return (
    <>
      <div className="home-classname-main">
        {/* part 1 */}
        <div className="banner-section">
          <img
            src="assets/banner/hyundaimotorgroup.jpg"
            alt="notfound"
            className="banner-image"
            loading="eager"
          />

          {/* Extras Section */}
          <div className="banner-extras">
            <div className="extra-content">
              <p>Luxury Meets Innovation</p>
              <button
                className="explore-btn"
                onClick={() => navigate("/AllCarList")}
              >
                Explore More
              </button>
            </div>
            <div className="social-icons">
              <a href="/">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="/">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="/">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          <div className="vertical-slider-container">
            <div className="vertical-slider">
              <div className="part-card">
                <img
                  src="assets/parts/pexels-mikebirdy-188777.jpg"
                  alt="Engine"
                  loading="lazy"
                />
                <h4>Engine</h4>
              </div>
              <div className="part-card">
                <img src="assets/parts/Tyre.jpg" alt="Tyre" loading="lazy" />
                <h4>tyre</h4>
              </div>
              <div className="part-card">
                <img
                  src="assets/parts/BrakeSystem.jpg"
                  alt="Brake System"
                  loading="lazy"
                />
                <h4>Brake System</h4>
              </div>
              <div className="part-card">
                <img src="assets/parts/Seat.jpg" alt="Seat" loading="lazy" />
                <h4>Seat</h4>
              </div>
              <div className="part-card">
                <img
                  src="assets/parts/pexels-mikebirdy-188777.jpg"
                  alt="Engine"
                  loading="lazy"
                />
                <h4>Engine</h4>
              </div>
              <div className="part-card">
                <img src="assets/parts/tyre.jpg" alt="Tyre" loading="lazy" />
                <h4>Tyre 3</h4>
              </div>
              <div className="part-card">
                <img
                  src="assets/parts/BrakeSystem.jpg"
                  alt="Brake System"
                  loading="lazy"
                />
                <h4>Brake System</h4>
              </div>
              <div className="part-card">
                <img src="assets/parts/Seat.jpg" alt="Seat" loading="lazy" />
                <h4>Seat</h4>
              </div>
            </div>
          </div>
        </div>

        {/* part 2 */}
        <div>
          <FeaturedCom />
        </div>

        <section className="brands-section">
          <Container className="custom-width">
            {/* <h2 className="section-title">🚗 Popular Car Brands</h2> */}
            <PopularCarBrands Popular={Popular} />
          </Container>
        </section>

        <section>
          <Container className="custom-width">
            <CompareSelections cars={cars} />
          </Container>
        </section>

        <section>
          <Container className="custom-width">
            <ElectricHybridCarsSection evhybridhome={evhybridhome} />
          </Container>
        </section>
      </div>
    </>
  );
});

export default Home;
