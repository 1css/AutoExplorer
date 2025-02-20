import React, { useState } from "react";
import "../styles/screens/ProfilePage.css";
import { bookedCars, reviews } from "../Data/data";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [userDetails, setUserDetails] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    address: "123 Main St, Springfield, USA",
    password: "", // Added password field
  });

  // Handle Edit Button Click
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  return (
    <div className="profile-container">
      <h1 className="profile-title">User Profile</h1>

      {/* User Details */}
      <div className="profile-section">
        <h2>User Details</h2>
        <div className="user-details">
          <p>
            <strong>Name:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={userDetails.name}
                onChange={handleChange}
              />
            ) : (
              userDetails.name
            )}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={userDetails.email}
                onChange={handleChange}
              />
            ) : (
              userDetails.email
            )}
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="phone"
                value={userDetails.phone}
                onChange={handleChange}
              />
            ) : (
              userDetails.phone
            )}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={userDetails.address}
                onChange={handleChange}
              />
            ) : (
              userDetails.address
            )}
          </p>
          {/* Password Field */}
          {isEditing && (
            <p>
              <strong>Password:</strong>{" "}
              <input
                type="password"
                name="password"
                value={userDetails.password}
                onChange={handleChange}
                placeholder="Enter new password"
              />
            </p>
          )}
        </div>
        <button className="edit-btn" onClick={toggleEdit}>
          {isEditing ? "Save Details" : "Edit Details"}
        </button>
      </div>

      {/* Booked Test Drives */}
      {/* <div className="profile-section">
        <h2>Booked Test Drives</h2>
        {bookedCars.length > 0 ? (
          <ul className="booked-cars">
            {bookedCars.map((car) => (
              <li key={car.id}>
                <span>{car.name}</span>
                <span>Date: {car.date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No cars booked for test drives.</p>
        )}
      </div> */}

      {/* Reviews */}
      <div className="profile-section">
        <h2>My Reviews</h2>
        {/* {reviews.length > 0 ? (
          <ul className="user-reviews">
            {reviews.map((review) => (
              <li key={review.id}>
                <h4>{review.car}</h4>
                <p>{review.review}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>You haven't given any reviews yet.</p>
        )} */}
        <p className="text-center pt-2"> please come back later</p>
      </div>
    </div>
  );
};

export default ProfilePage;
