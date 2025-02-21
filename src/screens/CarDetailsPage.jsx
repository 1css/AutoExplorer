import React, { useEffect, useState } from "react";
import { Accordion, Carousel, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../styles/screens/CarDetailsPage.css";
import "../styles/components/CarReviewScreen.css";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { postReview, getReviews } from "../actions/ReviewsActions";
import Rating from "react-rating";
// import Loader from "../components/Loader";
// import Message from "../components/Message";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_BACKEND_URL;
import { addToCart } from "../actions/cartActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const availableDates = [
  new Date("2025-01-03"),
  new Date("2025-01-07"),
  new Date("2025-01-12"),
  new Date("2025-01-15"),
  new Date("2025-01-18"),
  new Date("2025-01-21"),
  new Date("2025-01-25"),
  new Date("2025-01-28"),
  new Date("2025-02-02"),
  new Date("2025-02-05"),
];

const CarDetailsPage = () => {
  const { carId } = useParams();

  const [value, setValue] = React.useState(null);
  const [car2, setCar] = useState({
    id: "",
    name: "",
    model: "",
    year: "",
    trimLevel: "",
    vin: "",
    Transmissiontype: "",
    specifications: {
      engineType: "",
      horsepower: "",
      torque: "",
      fuelEconomy: "",
      drivetrain: "",
      transmission: "",
    },
    dimensions: {
      length: "",
      width: "",
      height: "",
      wheelbase: "",
      curbWeight: "",
    },
    features: {
      interior: "",
      safety: "",
      exterior: "",
      wheels: "",
    },
    performance: {
      acceleration: "",
      towingCapacity: "",
    },
    images: [],
    reviews: [],
    price: "",
    fuelType: "",
    color: "",
    priceUnit: "",
  });

  const [needi, setNeedi] = useState(carId);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/prod/getCardetails/${carId}`
        );

        const fetchedData = response.data.data;

        const mappedData = {
          id: fetchedData._id,
          name: fetchedData.name,
          model: fetchedData.model || "",
          year: fetchedData.year || "",
          trimLevel: fetchedData.trimLevel || "",
          Transmissiontype: fetchedData.transmissionType || " ",
          vin: fetchedData.VIN,
          specifications: {
            engineType: fetchedData.fuelType,
            horsepower: fetchedData.engine.horsepower,
            torque: fetchedData.engine.torque,
            fuelEconomy: fetchedData.fuelEconomy || "",
            drivetrain: fetchedData.drivetrain || "N/A",
            // transmission: fetchedData.transmissionType,
          },
          dimensions: {
            length: fetchedData.dimensions.length || "",
            width: fetchedData.dimensions.width,
            height: fetchedData.dimensions.height,
            wheelbase: fetchedData.dimensions.wheelbase,
            curbWeight: fetchedData.curbWeight,
          },
          features: {
            interior: fetchedData.features.interior,
            safety: fetchedData.features.safety.join(", "),
            exterior: fetchedData.features.exterior.join(", "),
            wheels: fetchedData.features.wheelsAndTires,
          },
          performance: {
            acceleration:
              (fetchedData.performance &&
                fetchedData.performance.acceleration) ||
              "",
            towingCapacity:
              (fetchedData.performance &&
                fetchedData.performance.towingCapacity) ||
              "",
          },
          images: fetchedData.images,
          reviews: [],
          price: fetchedData.carPrice,
          fuelType: fetchedData.fuelType,
          color: fetchedData.colors.join(", "),
          priceUnit: fetchedData.priceUnit || "",
        };
        const reviewsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/reviews/${carId}`
        );
        mappedData.reviews = reviewsResponse.data || "";
        setCar(mappedData);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    console.log("fetchCarData function defined");
    fetchCarData();
    console.log("fetchCarData function called");
  }, [carId]);

  const handleLoginClick = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
    console.log(car2, "car2");
  }, [car2]);

  useEffect(() => {
    // This effect is not doing anything useful, consider removing it
    setSelectedDate("");
  }, []);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const TestDriveBooking = () => {
    const [selectedDate, setSelectedDate] = useState(null);
  };

  const handleImageError = (e) => {
    e.target.src = "/default-image.png";
  };

  // review

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, userInfo } = useSelector((state) => state.user);
  const { cartDone } = useSelector((state) => state.cart);
  // useEffect(() => {
  //   dispatch(getReviews(carId));
  // }, [dispatch, carId]);
  const navigate = useNavigate();
  const submitHandlerdetails = (e) => {
    // e.preventDefault();
    console.log("Submit handler called");
    console.log("Default behavior prevented");
    if (rating === 0 || comment.length < 10) {
      alert(
        "Please select a rating and write a review with at least 10 characters"
      );
      return;
    }

    dispatch(postReview(carId, { rating, comment }));
    console.log("Review posted");
    setRating(0);
    setComment("");
    // navigate('/CartPage');
    // navigate(0);
  };

  const handleRatingChange = (rating) => {
    setRating(rating);
  };

  const handleFavorite = (carId, carName, fuelType) => {
    return () => {
      dispatch(addToCart(carId, carName, fuelType));
      toast.success("Car added to favorites!");
    };
  };

  return (
    <div className="container car-details-page mt-4">
      {/* Car Images */}
      <div className="car-images mb-4">
        <Carousel>
          {car2.images.map((img, idx) => (
            <Carousel.Item key={idx}>
              <img
                src={`http://localhost:5000/uploads/cars/${img}`}
                alt={`Car image ${idx + 1}`}
                onError={handleImageError}
                crossOrigin="anonymous"
              />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      {/* Basic Information */}
      <div className="car-basic-info p-4 rounded shadow-lg">
        <h2 className="car-title">
          {car2.name} {car2.model} {car2.year}
        </h2>
        {/* <p>
          <strong>Trim Level:</strong> {car2.trimLevel}
        </p> */}
        <p>
          <strong>VIN:</strong> {car2.vin}
        </p>
        <p>
          <strong>Fuel Type:</strong> {car2.fuelType}
        </p>
        <p>
          <strong>Color:</strong> {car2.color}
        </p>
        <p>
          <strong>Transmission Type :</strong> {car2.Transmissiontype}
        </p>
      </div>

      {/* Specifications */}
      <Accordion defaultActiveKey="0" className="mt-4">
        {/* Specifications */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>⚙️ Specifications</Accordion.Header>
          <Accordion.Body>
            <table className="table table-bordered table-hover text-center">
              <tbody>
                <tr>
                  <th>Engine Type</th>
                  <td>{car2.specifications.engineType}</td>
                </tr>
                <tr>
                  <th>Horsepower</th>
                  <td>{car2.specifications.horsepower}</td>
                </tr>
                <tr>
                  <th>Torque</th>
                  <td>{car2.specifications.torque}</td>
                </tr>
                <tr>
                  <th>Fuel Economy</th>
                  <td>{car2.specifications.fuelEconomy}</td>
                </tr>
                <tr>
                  <th>Drivetrain</th>
                  <td>{car2.specifications.drivetrain}</td>
                </tr>
                <tr>
                  <th>Transmission</th>
                  <td>{car2.specifications.transmission}</td>
                </tr>
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>

        {/* Dimensions */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>📏 Dimensions</Accordion.Header>
          <Accordion.Body>
            <table className="table table-bordered table-hover text-center">
              <tbody>
                <tr>
                  <th>Length</th>
                  <td>{car2.dimensions.length}</td>
                </tr>
                <tr>
                  <th>Width</th>
                  <td>{car2.dimensions.width}</td>
                </tr>
                <tr>
                  <th>Height</th>
                  <td>{car2.dimensions.height}</td>
                </tr>
                <tr>
                  <th>Wheelbase</th>
                  <td>{car2.dimensions.wheelbase}</td>
                </tr>
                <tr>
                  <th>Curb Weight</th>
                  <td>{car2.dimensions.curbWeight}</td>
                </tr>
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>

        {/* Features */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>🛋️ Features</Accordion.Header>
          <Accordion.Body>
            <table className="table table-bordered table-hover text-center">
              <tbody>
                <tr>
                  <th>Interior</th>
                  <td>{car2.features.interior}</td>
                </tr>
                <tr>
                  <th>Safety</th>
                  <td>{car2.features.safety}</td>
                </tr>
                <tr>
                  <th>Exterior</th>
                  <td>{car2.features.exterior}</td>
                </tr>
                <tr>
                  <th>Wheels/Tires</th>
                  <td>{car2.features.wheels}</td>
                </tr>
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>

        {/* Performance */}
        <Accordion.Item eventKey="3">
          <Accordion.Header>🏁 Performance</Accordion.Header>
          <Accordion.Body>
            <table className="table table-bordered table-hover text-center">
              <tbody>
                <tr>
                  <th>Acceleration</th>
                  <td>{car2.performance.acceleration}</td>
                </tr>
                <tr>
                  <th>Towing Capacity</th>
                  <td>{car2.performance.towingCapacity}</td>
                </tr>
              </tbody>
            </table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Price and Buttons */}
      <div className="price-section d-flex justify-content-between align-items-center mt-4 p-3 rounded shadow">
        <h4 className="mb-0">
          <strong>Price:</strong> {car2.price} - {car2.priceUnit}
        </h4>
        <div>
          <button
            className="btn btn-outline-danger me-2"
            onClick={handleFavorite(car2.id, car2.name, car2.fuelType)}
          >
            ❤️ Add to Favorites
          </button>
          <ToastContainer />
          {/* {isLoggedIn ? (
            <button className="btn btn-success" onClick={toggleModal}>
              🚗 Book Test Drive
            </button>
          ) : (
            <button className="btn btn-warning">
              🔒 Login to Book Test Drive
            </button>
          )} */}
        </div>
      </div>

      {/* {selectedDate && (
        <div className="mt-3">
          <strong>Selected Date for Test Drive:</strong>{" "}
          {formatDate(selectedDate)}
        </div>
      )} */}
      {/* Reviews */}
      <div class="review-container">
        {isAuthenticated ? (
          <div class="review-form-container">
            <h2 class="review-form-title">Write a Review</h2>
            <form class="review-form">
              <div class="form-group">
                <label class="form-label" for="rating">
                  Rating:
                </label>
                <Rating
                  initialRating={rating}
                  onChange={(rating) => handleRatingChange(rating)}
                  emptySymbol={<i class="far fa-star" />}
                  fullSymbol={<i class="fas fa-star" />}
                  fractions={2}
                />
              </div>
              <div class="form-group">
                <label class="form-label" for="comment">
                  Comment:
                </label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  class="form-textarea"
                />
              </div>
              <button
                type="button"
                onClick={() => submitHandlerdetails()}
                class="form-submit"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <p class="review-login">Please login to write a review</p>
        )}
        <h4 class="review-title">📝 Reviews</h4>
        <div class="review-list">
          {car2.reviews.map((review, idx) => (
            <div key={idx} class="review-item">
              <div class="review-rating">
                {Array(Math.floor(review.rating))
                  .fill()
                  .map((_, i) => (
                    <i key={i} class="fas fa-star" />
                  ))}
                {review.rating % 1 !== 0 ? (
                  <i class="fas fa-star-half-alt" />
                ) : null}
                {Array(Math.floor(5 - review.rating))
                  .fill()
                  .map((_, i) => (
                    <i key={i} class="far fa-star" />
                  ))}
              </div>
              <p class="review-content">
                <strong class="review-user">{review.user.name}</strong>:{" "}
                {review.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select a Date</h5>
                <button type="button" className="close" onClick={toggleModal}>
                  <i class="fa fa-times" aria-hidden="true"></i>
                </button>
              </div>
              <div className="modal-body">
                <div className="date-grid">
                  {availableDates.map((date, index) => (
                    <button
                      key={index}
                      className={`date-card ${
                        selectedDate === date ? "selected" : ""
                      }`}
                      onClick={() => setSelectedDate(date)}
                    >
                      {formatDate(date)}
                    </button>
                  ))}
                </div>
                {selectedDate && (
                  <div className="selected-date">
                    <strong>Selected Date:</strong> {formatDate(selectedDate)}
                  </div>
                )}

                <button className="book-btn">Confirm Booking</button>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailsPage;
