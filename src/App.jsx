import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// Importing Header & Footer
import Header from "./components/common/Header";
import Header2 from './components/common/Header2'
import Footer from "./components/common/Footer";
import {  useNavigate } from "react-router-dom";
// Lazy Load Screens
const Home = lazy(() => import("./screens/Home"));
const CarDetailsPage = lazy(() => import("./screens/CarDetailsPage"));
const CarComparison = lazy(() => import("./screens/CarComparison"));
const CarList = lazy(() => import("./screens/NewCarList"));
const EnvandHybridCarsList = lazy(() =>
  import("./screens/EvsandHybridCarslist")
);
const AllCarList = lazy(() => import("./screens/AllCarList"));
const CartPage = lazy(() => import("./screens/CartPage"));
const ProfilePage = lazy(() => import("./screens/ProfilePage"));
const CarsPagesearched2 = lazy(() => import("./screens/CarsPagesearched2"));
const Login = lazy(() => import("./screens/Login"));
const SignUp = lazy(() => import("./screens/SignUp"));

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
  { path: "/", element: <Home /> },
  { path: "/CarDetailsPage/:carId", element: <CarDetailsPage /> },
  { path: "/CarComparison", element: <CarComparison /> },
  { path: "/CarList", element: <CarList /> },
  { path: "/AllCarList", element: <AllCarList /> },
  { path: "/Login", element: <Login /> },
  { path: "/SignUp", element: <SignUp /> },
  { path: "/FavoritesPage", element: <CartPage /> },
  { path: "/ProfilePage", element: <ProfilePage /> },
  { path: "/CarsPageSearched", element: <CarsPagesearched2 /> },
  { path: "/EnvandHybridCarsList", element: <EnvandHybridCarsList /> },
];

function App() {
   const [searchTerm, setSearchTerm] = React.useState("");
   const handleSearch = (e) => setSearchTerm(e.target.value);
   const navigate = useNavigate();
   const handleSearch2 = () => {
     if (searchTerm !== "") {
       navigate(`/CarsPageSearched?s=${searchTerm}`);
       setSearchTerm("");
     } else {
       window.alert("Please enter the search product text");
     }
   };
   
  return (
    <div>
      <>
        {/* <Header /> */}
        <Header2 />
        <form className="d-lg-none d-flex p-2 me-2">
          <input
            className="form-control me-sm-2"
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleSearch2}
          >
            Search
          </button>
        </form>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
          </Routes>
        </Suspense>
        <Footer />
      </>
      <ScrollToTopButton />
    </div>
  );
}

export default App;
