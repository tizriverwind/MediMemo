// src/components/HomePage.jsx

import React from "react";
import WelcomeMessage from "../WelcomeMessage/WelcomeMessage.jsx";
// Adjust the path as necessary
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <h1>Home Page</h1>
      <WelcomeMessage />
      {/* Add more content here */}
    </div>
  );
};

export default HomePage;
