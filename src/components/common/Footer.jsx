import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faYoutube,
  faInstagram,
  faFacebook,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import "../../styles/common/Footer.css";

function Footer() {
  return (
    <>
      <div id="footer-main-classname">
        <Container>
          <Row>
            <Col md={12} lg={3}>
              <ul className="footer-list">
                <li className="footer-col2-head">
                  <h3>Eccommerce</h3>
                </li>
                <li>
                  <input
                    type="email"
                    id="footer-col1-email"
                    className="footer-input-filed"
                    placeholder="Enter Your Email*"
                  />
                </li>
                <li className="footer-col2">
                  <button type="submit" id="footer-btn-col1">
                    Subscribe
                  </button>
                </li>
                <li className="footer-col2 footer-note">
                  Get monthly New Cars.
                </li>
              </ul>
            </Col>

            <Col sm={12} md={12} lg={3} xl={3}>
              <ul className="footer-list">
                <li className="footer-col2-head">SHOPE</li>
                <li className="footer-col2">Phone: +1 (0) 000 0000 001</li>
                <li className="footer-col2">Email: mail@example.com</li>
                <li className="footer-col2">
                  Address: 1234 Street Name City, AA 99999
                </li>
                <li className="footer-icons">
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faTwitter} size="2x" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faLinkedin} size="2x" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faYoutube} size="2x" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faInstagram} size="2x" />
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faFacebook} size="2x" />
                  </a>
                  <a
                    href="https://whatsapp.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={faWhatsapp} size="2x" />
                  </a>
                </li>
              </ul>
            </Col>

            <Col md={12} lg={3}>
              <ul className="footer-list">
                <li className="footer-col2-head">RECENT NEWS</li>
                <li className="footer-col2">Services</li>
                <li className="footer-col2">About Us</li>
                <li className="footer-col2">Get In Touch</li>
              </ul>
            </Col>

            <Col>
              <ul className="footer-list">
                <li className="footer-col2-head">CONSUMER POLICY</li>
                <li className="footer-col2">Terms of Use</li>
                <li className="footer-col2">Privacy</li>
                <li className="footer-col2">FAQ</li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Footer;
