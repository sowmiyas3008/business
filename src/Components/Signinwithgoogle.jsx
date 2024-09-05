// import React from 'react'
// import googleLogo from "../assets/google.png";


// const Signinwithgoogle = () => {
//   return (
//     <div>
//         <p className="continue-p"> --or continue with--</p>
//         <div>
//           <img src={googleLogo} width={"60%"} />
//         </div>
//     </div>
//   )
// }

// export default Signinwithgoogle

// import { GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
// import React from 'react';
// import googleLogo from '../assets/google.png'; // Importing the image
// import { getAuth } from 'firebase/auth';
// import app from './Firebase'; // Your Firebase config file

// const auth = getAuth(app);


// function googleLogin(){
//   const provider = new GoogleAuthProvider();
//   signInWithPopup(auth,provider).then(async(result)=>{
//     console.log(result);
//   })
// }
// const Signinwithgoogle = () => {
//   return (
//     <div>
//         <div 
//           style={{display:"flex", justifyContent:"center", cursor:"pointer"}}
//           onclick={googleLogin}>
//             <img src={googleLogo} alt="Google sign-in" width="60%" />
//         </div>
//     </div>
//   );
// };

// export default Signinwithgoogle;

// import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import React from 'react';
// import googleLogo from '../assets/google2.png';
// import { app } from '../Components/firebase/firebase'; // Import app as a named export

// const auth = getAuth(app);

// function googleLogin() {
//   const provider = new GoogleAuthProvider();
//   signInWithPopup(auth, provider).then((result) => {
//     console.log(result);
//   }).catch((error) => {
//     console.error("Error during sign-in:", error);
//   });
// }

// const Signinwithgoogle = () => {
//   return (
//     <div>
//       <div
//         style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
//         onClick={googleLogin}>
//         <img src={googleLogo} alt="Google sign-in" width="60%" />
//       </div>
//     </div>
//   );
// };

// export default Signinwithgoogle;

import React from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { app, db } from '../Components/firebase/firebase'; // Import app and Firestore
import googleLogo from '../assets/google2.png'; // Import your Google logo
import { useNavigate } from 'react-router-dom';


const auth = getAuth(app);


const Signinwithgoogle = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User signed in:', user);

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        username: user.displayName,
        email: user.email,
        isVerified: user.emailVerified,
        createdAt: new Date(),
      });

      console.log('User data stored in Firestore!');
      // Optional: Redirect to home page or another page after sign-in
 

    } catch (error) {
      console.error('Error during Google Sign-In:', error.message);
    }
  };

  return (
    <div>
      <div
        style={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={handleGoogleSignIn}>
        <img src={googleLogo} alt="Google sign-in" width="60%" />
      </div>
    </div>
  );
};

export default Signinwithgoogle;


