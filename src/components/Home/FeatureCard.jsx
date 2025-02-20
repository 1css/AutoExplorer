import React from "react";
import { Card, Row, Col } from "react-bootstrap";
// import { FaStar, FaTag } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "../../styles/components/popular2.css";

function FeatureCard({ image, title, price, rating }) {
  const handleImageError = (e) => {
    e.target.src = "/default-image.png";
  };
  return (
    <Card className="popular-card">
      <Card.Img
        variant="top"
        src={image}
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
            {rating}
          </div>
          <div className="price flex-item text-end">{price}</div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default FeatureCard;
