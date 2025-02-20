import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Header from "./components/common/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import Footer from "./components/common/Footer";
import CarDetailsPage from "./screens/CarDetailsPage";
import CarComparison from "./screens/CarComparison";
import CarList from "./screens/NewCarList";
import EnvandHybridCarsList from "./screens/EvsandHybridCarslist";
import AllCarList from "./screens/AllCarList";
import CartPage from "./screens/CartPage";
import ProfilePage from "./screens/ProfilePage";
import CarsPageSearched from "./screens/CarsPageSearched";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";

import LazyLoad from "react-lazy-load";
import CarsPagesearched2 from "./screens/CarsPagesearched2";

const ScrollToTopButton = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = useCallback(() => {
    if (window.scrollY > 500) {
      setShowScrollTop(true);
    } else {
      setShowScrollTop(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {showScrollTop && (
        <button onClick={scrollToTop} className="scroll-to-top">
          <i className="fas fa-car"></i>
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
};

const routes = [
  { path: "/", element: <Home />, lazyLoad: false },
  {
    path: "/CarDetailsPage/:carId",
    element: <CarDetailsPage />,
    lazyLoad: true,
  },
  { path: "/CarComparison", element: <CarComparison />, lazyLoad: true },
  { path: "/CarList", element: <CarList />, lazyLoad: true },
  { path: "/AllCarList", element: <AllCarList />, lazyLoad: true },
  { path: "/Login", element: <Login />, lazyLoad: false },
  { path: "/SignUp", element: <SignUp />, lazyLoad: false },
  { path: "/FavoritesPage", element: <CartPage />, lazyLoad: true },
  { path: "/ProfilePage", element: <ProfilePage />, lazyLoad: true },
  // { path: "/CarsPageSearched", element: <CarsPageSearched />, lazyLoad: true },
  {
    path: "/CarsPageSearched",
    element: <CarsPagesearched2 />,
    lazyLoad: true,
  },
  {
    path: "/EnvandHybridCarsList",
    element: <EnvandHybridCarsList />,
    lazyLoad: true,
  },
];

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.lazyLoad ? (
                  <LazyLoad offset={100}>{route.element}</LazyLoad>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
        <Footer />
      </BrowserRouter>
      <ScrollToTopButton />
    </div>
  );
}

export default App;
