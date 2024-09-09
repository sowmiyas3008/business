import React from 'react'
import './NewBusiness.css'
import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';


const NewBusiness = () => {
  const navigate = useNavigate();
  return (

    <div className="newBusiness-container">
      <nav className='containernb'>
      
        <img src={logo} alt="" className='logo'/>
        <ul>
          <li>Home</li>
          <li>Overview</li>
          <li>Profile</li>
        </ul>
      </nav>
      <div className="left-side1">
        <h3> Starting a new business can be challenging, but we're here to simplify your journey. From choosing the right location to providing insights and resources, our platform guides you every step of the way to ensure your business thrives.</h3>

        <div className="btn-loc-bus">
          <button className="btn-loc" onClick={() => navigate("/Location")}>Find your Location</button>
          <button className="btn-bus" onClick={() => navigate("/Location")}>Find your Business</button>
        </div>
      </div>
      <div className="right-side1">
        {/* Left side content (optional) */}
      </div>
    </div>
  )
}

export default NewBusiness