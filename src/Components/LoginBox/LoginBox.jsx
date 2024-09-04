// import React from 'react';
// import './LoginBox.css';
// import { FaUser, FaLock } from "react-icons/fa";

// const LoginBox = ({ onClose }) => {
//   return (
//     <div className="wrapper">
//       <form action="">
//         <h1>Login</h1>
//         <div className="input-box">
//           <input type="text" placeholder="Username" required />
//           <FaUser className='icon' />
//         </div>
//         <div className="input-box">
//           <input type="password" placeholder="Password" required />
//           <FaLock className='icon' />
//         </div>
//         <div className="remember-forgot">
//           <label><input type="checkbox" /> Remember me</label>
//           <a href="#">Forgot password?</a>
//         </div>
//         <button type="submit">Login</button>
//         <div className="register-link">
//           <p> Don't have an account? <a href="/Signup">   Sign up!</a></p>
//         </div>
//         <button className="close-button" onClick={onClose}>X</button>
//       </form>
//     </div>
//   );
// }

// export default LoginBox;

import React, { useState } from 'react';
import './LoginBox.css';
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Components/firebase/firebase'; // Import Firebase auth

const LoginBox = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Authenticate the user with email and password
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Home");

      // Redirect to the home page after successful login
 // Adjust the path to your home page route
    } catch (error) {
      setError('Invalid email or password');
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <FaUser className='icon' />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className='icon' />
        </div>
        {error && <p className="error">{error}</p>}
        <div className="remember-forgot">
          <label><input type="checkbox" /> Remember me</label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p> Don't have an account? <a href="/Signup">   Sign up!</a></p>
        </div>
        <button className="close-button" onClick={onClose}>X</button>
      </form>
    </div>
  );
}

export default LoginBox;
