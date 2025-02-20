import React from "react";
import { Navbar, Container, Nav, NavLink, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/common/Header.css";
// Import your custom offcanvas CSS
import { useSelector } from "react-redux";

function Header() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [isOffcanvasOpen, setIsOffcanvasOpen] = React.useState(false);
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, userInfo } = useSelector(
    (state) => state.user
  );

  const { favorites } = useSelector((state) => state.cart);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOffcanvasToggle = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const handleSearch2 = () => {
    if (searchTerm !== "") {
      navigate(`/CarsPageSearched?s=${searchTerm}`);
      setSearchTerm("");
    } else {
      window.alert("please enter the search product text");
    }
  };

  const handleLinkClick = (path) => {
    navigate(path, { replace: true });
    setIsOffcanvasOpen(false); // Close the Offcanvas after navigation
  };

  return (
    <div className="header-container">
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Link to="/" style={{ textDecoration: "none" }}>
            <h1 className="logo-text">TopCars</h1>
          </Link>
          <Nav className="me-auto nav-links d-none d-lg-flex">
            <NavLink as={Link} to="/CarList">
              <i className="fa fa-car"></i> New Cars
            </NavLink>
            <NavLink as={Link} to="/AllCarList">
              <i className="fa fa-tags"></i> All Brands Cars
            </NavLink>
            <NavLink as={Link} to="/EnvandHybridCarsList">
              <i className="fa fa-bolt"></i> EVs & Hybrids
            </NavLink>
          </Nav>

          <Nav className="ms-auto nav-links align-items-center media-query-custom">
            <NavLink className="d-none d-lg-flex">
              <div className="search-bar">
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search for cars..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="search-input"
                  />
                  <i
                    className="fas fa-search"
                    onClick={handleSearch2}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </NavLink>

            <NavLink as={Link} to="/FavoritesPage" className="user-icon">
              <i
                className="fa fa-heart cart-number"
                aria-hidden="true"
                data-count={favorites.length}
              ></i>
            </NavLink>

            {!isAuthenticated && (
              <>
                <NavLink as={Link} to="/Login" className="user-icon">
                  <i
                    className="fa fa-sign-in"
                    aria-hidden="true"
                    data-count="8"
                  ></i>
                </NavLink>
              </>
            )}

            <NavLink className="user-icon" as={Link} to="/ProfilePage">
              <i className="fa fa-user" aria-hidden="true"></i>
            </NavLink>
            <NavLink>
              <Button
                className="d-lg-none menu-btn"
                onClick={handleOffcanvasToggle}
              >
                <i className="fa fa-bars"></i>
              </Button>
            </NavLink>
          </Nav>
        </Container>
      </Navbar>

      <div className={`header-offcanvas ${isOffcanvasOpen ? "show" : ""}`}>
        <div className="offcanvas-header">
          <button className="close-btn" onClick={handleOffcanvasToggle}>
            ×
          </button>
          <h2 className="offcanvas-title">Menu</h2>
        </div>
        <div className="offcanvas-body">
          <ul>
            <li>
              <Link to="/CarList" onClick={() => handleLinkClick("/CarList")}>
                Go to New Cars
              </Link>
            </li>
            <li>
              <Link
                to="/AllCarList"
                onClick={() => handleLinkClick("/AllCarList")}
              >
                Go to All Brands Cars
              </Link>
            </li>
            <li>
              <Link
                to="/EnvandHybridCarsList"
                onClick={() => handleLinkClick("/EnvandHybridCarsList")}
              >
                Go to EVs & Hybrids
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {isOffcanvasOpen && (
        <div
          className="offcanvas-backdrop show"
          onClick={handleOffcanvasToggle}
        ></div>
      )}
    </div>
  );
}

export default Header;
