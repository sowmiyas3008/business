


import React, { useState } from 'react';
import './NewBusiness.css'; // Ensure CSS is updated as per design
import logo from '../../assets/logo.png';
import img1 from '../../assets/hero.png';
import img2 from '../../assets/illus-1.png';


const NewBusiness = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const testimonials = [
    {
      name: 'Find your Location',
      image: img1,
      comment: 'Helps you discover the best shop locations based on city and business type, optimizing their decision-making.'
    },
    {
      name: 'Find your Business',
      image: img1,
      comment: 'Guides you to ideal shop locations and business types based on the chosen city for success.'
    },
  ];

  const handleCardClick = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  return (
    <div className="testimonial-section">
      <nav className='containernb'>
        <img src={logo} alt="" className='logo'/>
        <ul>
          <li>Home</li>
          <li>Overview</li>
          <li>Profile</li>
        </ul>
      </nav>

      <div className="testimonial-cards">
        {testimonials.map((testimonial, index) => (
          <div className="card" key={index} onClick={index === 0 ? handleCardClick : null}>
            <img src={testimonial.image} alt={`${testimonial.name}`} className="profile-image" />
            <h3>{testimonial.name}</h3>
            <p className="comment">{testimonial.comment}</p>
          </div>
        ))}
      </div>

      {/* Popup box for the first card */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-box">
            {/* Close button */}
            <button className="close-btn" onClick={closePopup}>×</button>

            <div className="popup-content">
              {/* Left section - illustration */}
              <div className="popup-left">
                <img src={img2} alt="Premium Illustrations" className="popup-image" />
              </div>

              {/* Right section - form */}
              <div className="popup-right">

                <form className="popup-form">

                  <h2>Preferred Location</h2>
                  <input type="text" placeholder="Prefered Location" className="popup-input" />
                  <h2>Preferred Business type</h2>
                  <input type="dropdown" placeholder="Preferred Business" className="popup-input" />

                  <button type="submit" className="popup-button">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewBusiness;
