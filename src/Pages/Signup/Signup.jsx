


// import React, { useState, useEffect } from 'react';
// import './Signup.css';
// import logo from '../../assets/logo.png';
// import Signinwithgoogle from '../../Components/Signinwithgoogle';
// import { auth, db } from '../../Components/firebase/firebase'; // Firebase Auth and Firestore
// import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; // Firebase Auth methods
// import { doc, setDoc } from 'firebase/firestore'; // Firestore methods

// const clientId = '875872510172-prcueq9de7fu99pcrr5qq7g6ajgtio2j.apps.googleusercontent.com'; // Replace with your actual client ID

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});
//   const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false);

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.defer = true;

//     script.onload = () => {
//       window.google.accounts.id.initialize({
//         client_id: clientId,
//         callback: handleCredentialResponse,
//       });
//       window.google.accounts.id.renderButton(
//         document.getElementById('googleSignInDiv'),
//         { theme: 'outline', size: 'large', text: 'signup_with' }
//       );
//     };

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   const handleCredentialResponse = async (response) => {
//     const decodedToken = decodeJwtResponse(response.credential);
//     console.log('Decoded JWT ID token', decodedToken);
  
//     setIsGoogleSignedIn(true);
//     setEmail(decodedToken.email);
//     setUsername(decodedToken.name);
  
//     const user = auth.currentUser;
//     if (!user) {
//       console.error('No user is currently signed in.');
//       return;
//     }
  
//     if (!user.emailVerified) {
//       try {
//         await sendEmailVerification(user);
//         alert('Verification email sent. Please check your inbox.');
//       } catch (error) {
//         console.error('Error sending verification email:', error.message);
//       }
//     }
  
//     try {
//       await setDoc(doc(db, "users", user.uid), {
//         username: decodedToken.name,
//         email: decodedToken.email,
//         isVerified: user.emailVerified,
//       });
//       console.log('User data stored in Firestore!');
//     } catch (error) {
//       console.error('Error storing user data in Firestore:', error.message);
//     }
//   };
  
//   const decodeJwtResponse = (token) => {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     return JSON.parse(jsonPayload);
//   };

//   const validate = () => {
//     const errors = {};
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!username.trim()) {
//       errors.username = 'Username is required';
//     }

//     if (!email) {
//       errors.email = 'Email is required';
//     } else if (!emailPattern.test(email)) {
//       errors.email = 'Invalid email address';
//     }

//     if (!password) {
//       errors.password = 'Password is required';
//     } else if (password.length < 6) {
//       errors.password = 'Password must be at least 6 characters long';
//     }

//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length === 0) {
//       if (isGoogleSignedIn) {
//         alert('Google Sign-Up successful!');
//       } else {
//         try {
//           const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//           const user = userCredential.user;
//           console.log('User signed up:', user);

//           await sendEmailVerification(user);
//           alert('Verification email sent. Please check your inbox.');

//           await setDoc(doc(db, "users", user.uid), {
//             username: username,
//             email: email,
//             isVerified: user.emailVerified,
//             createdAt: new Date(),
//           });

//           alert('User data stored in Firestore!');
//         } catch (error) {
//           console.error('Error during sign-up:', error.message);
//           setErrors({ firebase: error.message });
//         }
//       }
//     } else {
//       setErrors(validationErrors);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="logo-signup">
//         <img src={logo} alt="Logo" className="logo" />
//       </div>
//       <div className="form-container">
//         <h2>Signup</h2>
//         <form onSubmit={handleSubmit} className="signup-text">
//           <div className="signup-input">
//             <h3>Username:</h3>
//             <input
//               type="text"
//               placeholder="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             {errors.username && <p className="error">{errors.username}</p>}
//           </div>
//           <div className="signup-input">
//             <h3>Password:</h3>
//             <input
//               type="password"
//               placeholder="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {errors.password && <p className="error">{errors.password}</p>}
//           </div>
//           <div className="signup-input">
//             <h3>Email:</h3>
//             <input
//               type="email"
//               placeholder="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             {errors.email && <p className="error">{errors.email}</p>}
//           </div>
//           <button type="submit" className="signup-submit">
//             Sign Up
//           </button>
//           {errors.firebase && <p className="error">{errors.firebase}</p>}
          
//           <p className="centered-text">or</p>

//           <Signinwithgoogle />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // Correct import
// import './Signup.css';
// import logo from '../../assets/logo.png';
// import Signinwithgoogle from '../../Components/Signinwithgoogle';
// import { auth, db } from '../../Components/firebase/firebase'; // Firebase Auth and Firestore
// import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; // Firebase Auth methods
// import { doc, setDoc } from 'firebase/firestore'; // Firestore methods

// const clientId = '875872510172-prcueq9de7fu99pcrr5qq7g6ajgtio2j.apps.googleusercontent.com'; // Replace with your actual client ID

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});
//   const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.defer = true;

//     script.onload = () => {
//       window.google.accounts.id.initialize({
//         client_id: clientId,
//         callback: handleCredentialResponse,
//       });
//       window.google.accounts.id.renderButton(
//         document.getElementById('googleSignInDiv'),
//         { theme: 'outline', size: 'large', text: 'signup_with' }
//       );
//     };

//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     };
//   }, [navigate]); // Added navigate to dependency array

//   const handleCredentialResponse = async (response) => {
//     const decodedToken = decodeJwtResponse(response.credential);
//     console.log('Decoded JWT ID token', decodedToken);
  
//     setIsGoogleSignedIn(true);
//     setEmail(decodedToken.email);
//     setUsername(decodedToken.name);
  
//     const user = auth.currentUser;
//     if (!user) {
//       console.error('No user is currently signed in.');
//       return;
//     }
  
//     if (!user.emailVerified) {
//       try {
//         await sendEmailVerification(user);
//         alert('Verification email sent. Please check your inbox.');
//       } catch (error) {
//         console.error('Error sending verification email:', error.message);
//       }
//     }
  
//     try {
//       await setDoc(doc(db, "users", user.uid), {
//         username: decodedToken.name,
//         email: decodedToken.email,
//         isVerified: user.emailVerified,
//       });
//       console.log('User data stored in Firestore!');
//       navigate('/home');
//     } catch (error) {
//       console.error('Error storing user data in Firestore:', error.message);
//     }
//   };
  
//   const decodeJwtResponse = (token) => {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//     }).join(''));
//     return JSON.parse(jsonPayload);
//   };

//   const validate = () => {
//     const errors = {};
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!username.trim()) {
//       errors.username = 'Username is required';
//     }

//     if (!email) {
//       errors.email = 'Email is required';
//     } else if (!emailPattern.test(email)) {
//       errors.email = 'Invalid email address';
//     }

//     if (!password) {
//       errors.password = 'Password is required';
//     } else if (password.length < 6) {
//       errors.password = 'Password must be at least 6 characters long';
//     }

//     return errors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length === 0) {
//       if (isGoogleSignedIn) {
//         alert('Google Sign-Up successful!');
//         navigate('/home'); // Corrected from Navigate('/home')

//       } else {
//         try {
//           const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//           const user = userCredential.user;
//           console.log('User signed up:', user);

//           await sendEmailVerification(user);
//           alert('Verification email sent. Please check your inbox.');

//           await setDoc(doc(db, "users", user.uid), {
//             username: username,
//             email: email,
//             isVerified: user.emailVerified,
//             createdAt: new Date(),
//           });

//           alert('User data stored in Firestore!');
//           navigate('/home'); // Corrected from Navigate('/home')
//         } catch (error) {
//           console.error('Error during sign-up:', error.message);
//           setErrors({ firebase: error.message });
//         }
//       }
//     } else {
//       setErrors(validationErrors);
//     }

//   };

//   return (
//     <div className="signup-container">
//       <div className="logo-signup">
//         <img src={logo} alt="Logo" className="logo" />
//       </div>
//       <div className="form-container">
//         <h2>Signup</h2>
//         <form onSubmit={handleSubmit} className="signup-text">
//           <div className="signup-input">
//             <h3>Username:</h3>
//             <input
//               type="text"
//               placeholder="username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             {errors.username && <p className="error">{errors.username}</p>}
//           </div>
//           <div className="signup-input">
//             <h3>Password:</h3>
//             <input
//               type="password"
//               placeholder="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             {errors.password && <p className="error">{errors.password}</p>}
//           </div>
//           <div className="signup-input">
//             <h3>Email:</h3>
//             <input
//               type="email"
//               placeholder="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//             {errors.email && <p className="error">{errors.email}</p>}
//           </div>
//           <button type="submit" className="signup-submit">
//             Sign Up
//           </button>
//           {errors.firebase && <p className="error">{errors.firebase}</p>}
          
//           <p className="centered-text">or</p>

//           <Signinwithgoogle />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react'; // Removed useEffect since it's not used
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import logo from '../../assets/logo.png';
import Signinwithgoogle from '../../Components/Signinwithgoogle';
import { auth, db } from '../../Components/firebase/firebase'; // Firebase Auth and Firestore
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; // Firebase Auth methods
import { doc, setDoc } from 'firebase/firestore'; // Firestore methods



const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username.trim()) {
      errors.username = 'Username is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      errors.email = 'Invalid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log('User signed up:', user);

        await sendEmailVerification(user);
        alert('Verification email sent. Please check your inbox.');

        await setDoc(doc(db, "users", user.uid), {
          username: username,
          email: email,
          isVerified: user.emailVerified,
          createdAt: new Date(),
        });

        // Polling to check email verification status
        const intervalId = setInterval(async () => {
          await user.reload();
          if (user.emailVerified) {
            clearInterval(intervalId);
            navigate('/home');
          }
        }, 3000); // Check every 3 seconds
      } catch (error) {
        console.error('Error during sign-up:', error.message);
        setErrors({ firebase: error.message });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="signup-container">
      <div className="logo-signup">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="form-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit} className="signup-text">
          <div className="signup-input">
            <h3>Username:</h3>
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="signup-input">
            <h3>Password:</h3>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <div className="signup-input">
            <h3>Email:</h3>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <button type="submit" className="signup-submit">
            Sign Up
          </button>
          {errors.firebase && <p className="error">{errors.firebase}</p>}
          
          <p className="centered-text">or</p>

          <Signinwithgoogle />
        </form>
      </div>
    </div>
  );
};

export default Signup;
