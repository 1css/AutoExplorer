import React from "react";
import { Card, Row, Col } from "react-bootstrap";
// import { FaStar, FaTag } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../styles/components/popular2.css";

function UpcomingCard({ image, title, price, rating }) {
   const backendUrl = process.env.VITE_BACKEND_URL;
  const handleImageError = (e) => {
    e.target.src = "/default-image.png";
  };

    const imageUrl = `${backendUrl}/uploads/upcomingcar/${image}`;
    console.log("Generated Image URL:", imageUrl);
  return (
    <Card className="popular-card">
      <Card.Img
        variant="top"
      
        src={`${backendUrl}/uploads/upcomingcar/${image}`}
        alt={title}
        className="popular-card-img"
        onError={handleImageError}
        crossOrigin="anonymous"
      />
      <Card.Body className="card-body-real">
        <Card.Title className="card-title">{title}</Card.Title>
        <div className="card-body-section2 flex-container">
          <div className="rating flex-item">
            {/* <FontAwesomeIcon icon={faStar} className="rating-icon" /> */}
            {/* <span style={{ color: "black" }}>status</span>- {rating} */}
          </div>
          <div className="price flex-item text-end">
            {price},{rating}{" "}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default UpcomingCard;
