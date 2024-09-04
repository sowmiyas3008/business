
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './Components/Navbar/Navbar';
// import Hero from './Components/Hero/Hero';
// import LoginBox from './Components/LoginBox/LoginBox';
// import Signup from './Pages/Signup/Signup'; // Adjust the path if needed
// import Home from './Components/Home/Home';  // Adjust the path if needed

// const App = () => {
//   const [isHeroContentVisible, setHeroContentVisible] = useState(true);
//   const [showLoginBox, setShowLoginBox] = useState(false);

//   const handleLoginClick = () => {
//     setHeroContentVisible(false);
//     setShowLoginBox(true);
//   };

//   const handleCloseLoginBox = () => {
//     setHeroContentVisible(true); // Show the Hero content again
//     setShowLoginBox(false);
//   };

//   return (
//     <Router>
//       <div>
//         <Navbar onLoginClick={handleLoginClick} />
//         <Routes>
//           <Route path="/" element={<Hero isVisible={isHeroContentVisible} />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/home" element={<Home />} /> {/* Home page route */}
//           <Route path="/login" element={
//             showLoginBox ? <LoginBox onClose={handleCloseLoginBox} /> : <Hero isVisible={isHeroContentVisible} />
//           } />
//         </Routes>
//         {showLoginBox && <LoginBox onClose={handleCloseLoginBox} />}
//       </div>
//     </Router>
//   );
// };

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Hero from './Components/Hero/Hero';
import LoginBox from './Components/LoginBox/LoginBox';
import Signup from './Pages/Signup/Signup'; // Adjust the path if needed
import Home from './Components/Home/Home';  // Adjust the path if needed

const App = () => {
  const [isHeroContentVisible, setHeroContentVisible] = useState(true);
  const [showLoginBox, setShowLoginBox] = useState(false);

  const handleLoginClick = () => {
    setHeroContentVisible(false);
    setShowLoginBox(true);
  };

  const handleCloseLoginBox = () => {
    setHeroContentVisible(true); // Show the Hero content again
    setShowLoginBox(false);
  };

  return (
    <Router>
      <AppWithNavbar
        handleLoginClick={handleLoginClick}
        handleCloseLoginBox={handleCloseLoginBox}
        isHeroContentVisible={isHeroContentVisible}
        showLoginBox={showLoginBox}
      />
    </Router>
  );
};

const AppWithNavbar = ({ handleLoginClick, handleCloseLoginBox, isHeroContentVisible, showLoginBox }) => {
  const location = useLocation(); // useLocation must be inside the Router component

  return (
    <div>
      {location.pathname === '/' && <Navbar onLoginClick={handleLoginClick} />}
      <Routes>
        <Route path="/" element={<Hero isVisible={isHeroContentVisible} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} /> {/* Home page route */}
        <Route path="/login" element={
          showLoginBox ? <LoginBox onClose={handleCloseLoginBox} /> : <Hero isVisible={isHeroContentVisible} />
        } />
      </Routes>
      {showLoginBox && <LoginBox onClose={handleCloseLoginBox} />}
    </div>
  );
};

export default App;
