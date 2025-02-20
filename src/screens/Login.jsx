import React, { useState } from "react";
import "../styles/screens/Login.css";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
// import instance from "./axiosInstance";
import { toast } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const location = useLocation();
  const redirectPath = location.search.split("=")[1];
  const { loading, error, isAuthenticated, userInfo } = useSelector(
    (state) => state.user
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate(redirectPath || "/");
  }
  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <div className="error-message">{error.message}</div>}
        {loading ? (
          <button type="submit" disabled>
            Loading...
          </button>
        ) : (
          <button type="submit">Login</button>
        )}
        <p className="pt-5">
          DON'T HAVE AN ACCOUNT <Link to="/SignUp">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
