import React from 'react';
import './Hero.css';
import dark_arrow from '../../assets/dark-arrow.png';
import { useNavigate } from "react-router-dom";

const Hero = ({ isVisible }) => {
  const navigate = useNavigate();
  return (
    <div className='hero container'>
      {isVisible && (
        <div className='hero-text'>
          <h1>Explore the best place to find your Business!</h1>
          <p>Get started with us</p>
          <button className='btn' onClick={() => navigate("/signup")}>  {/* Update to onClick */}
            Sign up <img src={dark_arrow} alt=""/>
          </button>
        </div>
      )}
    </div>
  );
};

export default Hero;