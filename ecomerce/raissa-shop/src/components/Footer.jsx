import React from "react";
import "../styles/Footer.css";
import logo from "../assets/icon.png";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-left">
        <img src={logo} alt="logo" className="footer-logo" />
        <span className="footer-brand">SUN CO.</span>
      
      </div>

      <div className="footer-center">
        <p>© 2023 dot.cards text task. All rights reserved</p>
      </div>

      <div className="footer-right">
      <div className="social-icons">
          <a href="#"><FaFacebookF /></a>
          <a href="#"><FaInstagram /></a>
          <a href="#"><FaTwitter /></a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
