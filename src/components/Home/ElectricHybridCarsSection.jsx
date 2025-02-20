import React from "react";
import { Button, Col, Row, Card } from "react-bootstrap";
import "../../styles/components/ElectricHybridCarsSection.css";
import { useNavigate } from "react-router-dom";

const ElectricHybridCarsSection = ({ evhybridhome }) => {
  const cars = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x200?text=Car+1",
      name: "Tesla Model S",
      price: "$79,990",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/300x200?text=Car+2",
      name: "BMW i4",
      price: "$55,400",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/300x200?text=Car+3",
      name: "Audi e-Tron GT",
      price: "$99,900",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/300x200?text=Car+4",
      name: "Porsche Taycan",
      price: "$82,700",
    },
  ];
  const handleImageError = (e) => {
    e.target.src = "/default-image.png";
  };

  const navigate = useNavigate();

  const handleClick = (carId) => {
    try {
      navigate(`/CarDetailsPage/${carId}`);
    } catch (error) {
      console.error("Error navigating to new page:", error);
    }
  };

  return (
    <div className="electric-hybrid-cars-section py-5 mt-2">
      <h2 className="text-center mb-4 text-primary">Electric & Hybrid Cars</h2>
      <Row className="g-4">
        {evhybridhome.map((car) => (
          <Col md={6} lg={3} key={car._id}>
            <Card
              className="shadow-sm rounded custom-home-evhy-cardmain"
              onClick={() => handleClick(car._id)}
            >
              <Card.Img
                variant="top"
                src={`http://localhost:5000/uploads/cars/${car.image}`}
                onError={handleImageError}
                crossOrigin="anonymous"
                className="home-eveandhyb-img"
              />
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="text-center text-dark">
                  {car.name}
                </Card.Title>
                <Card.Text className="text-center text-muted">
                  {car.price}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center mt-4">
        <Button className="btn-lg rounded-pill cutom-btn-ele">
          View All Electric & Hybrid Cars
        </Button>
      </div>
    </div>
  );
};

export default ElectricHybridCarsSection;
