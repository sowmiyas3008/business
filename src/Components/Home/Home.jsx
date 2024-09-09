import React from 'react';
import {useNavigate} from 'react-router-dom';
import './Home.css';
import logo from '../../assets/logo.png';


const Home = () => {
  const navigate = useNavigate();
  return (

    <div className="Ques1-container">
      <nav className='containerhome'>
        <img src={logo} alt="" className='logo'/>
        <ul>
          <li>Home</li>
          <li>Overview</li>
          <li>Profile</li>
        </ul>
      </nav>
      <div className="left-side">
        {/* Left side content (optional) */}
      </div>
      <div className="right-side">
        <h1>Welcome to xxx!</h1>
        <div className="right-content">
          <h2>Select one of the below to let us know why you are here:</h2>
        </div>
        <div className="choice-btn-container">
          <button className="choice-btn" onClick={() => navigate("/NewBusiness")}>I am a new Business owner and I am here looking for guidance</button>
          <button className="choice-btn">I am here to improve my existing business with different ideas</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
