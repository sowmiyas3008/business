// src/Component/Quest1/Quest1.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
    const navigate = useNavigate();
  return (
    
    <div className="Ques1-container">
      <div className="left-side">
        {/* Left side content (optional) */}
      </div>
      <div className="right-side">
        <button className="button" onClick={() => navigate("/location")}>Find Your Location</button>
        <button className="button">Find Your Business</button>
      </div>
    </div>
  );
};

export default Home;