// Location.jsx
import React from 'react';
import './Location.css'// Adjust the path if necessary
import { Navigate } from 'react-router-dom';


const Location = () => {
  return (
    <div className="ques1bg">
      <nav className='loccontainer'>
        {/* <img src={} alt="" className='logo'/> */}
        <ul>
          <li>Overview</li>
          <li><button className='btn' onClick={() => Navigate('/Home')}>Profile</button></li>
        </ul>
      </nav>
    </div>
  )
}

export default Location;
