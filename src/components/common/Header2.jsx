import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";

function Header2() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { isAuthenticated } = useSelector((state) => state.user);
  const { favorites } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const handleSearch = (e) => setSearchTerm(e.target.value);

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
      <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid">
          {/* Brand */}
          <Link className="navbar-brand logo-text" to="/">
            TopCars
          </Link>

          {/* Nav Links for Large Screens */}
          <ul className="navbar-nav d-none d-lg-flex flex-row ms-3">
            <li className="nav-item me-3">
              <Link className="nav-link" to="/CarList">
                <i className="fa fa-car"></i> New Cars
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link" to="/AllCarList">
                <i className="fa fa-tags"></i> All Brands Cars
              </Link>
            </li>
            <li className="nav-item me-3">
              <Link className="nav-link" to="/EnvandHybridCarsList">
                <i className="fa fa-bolt"></i> EVs & Hybrids
              </Link>
            </li>
          </ul>

          {/* Right Side: Search, Icons, Toggler */}
          <div className="d-flex align-items-center ms-auto">
            {/* Search for Large Screens */}
            <form className="d-none d-lg-flex me-2">
              <input
                className="form-control me-sm-2"
                type="search"
                placeholder="Search"
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

            {/* Favorites Icon */}
            <NavLink as={Link} to="/FavoritesPage" className="user-icon me-2">
              <i
                className="fa fa-heart cart-number"
                aria-hidden="true"
                data-count={favorites.length}
              ></i>
            </NavLink>

            {/* Login Icon */}
            {!isAuthenticated && (
              <NavLink as={Link} to="/Login" className="user-icon me-2">
                <i className="fa fa-sign-in" aria-hidden="true"></i>
              </NavLink>
            )}

            {/* Offcanvas Toggler Button for Mobile */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </div>
      </nav>

      {/* Offcanvas Sidebar for Mobile/Tablet */}
      <div
        className="offcanvas offcanvas-start d-lg-none"
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa fa-car"></i> New Cars
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa fa-tags"></i> All Brands Cars
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <i className="fa fa-bolt"></i> EVs & Hybrids
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header2;
