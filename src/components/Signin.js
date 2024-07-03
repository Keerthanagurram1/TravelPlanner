
import Image from "./Image";
import { useRef, useState } from "react";
import CheckValidate from "../utils/validate";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
  } from "firebase/auth";
  import { auth } from "../utils/firebase";
  import { useNavigate } from "react-router-dom";
  
const Signin = ()=>{
    const [isSignInForm, setIsSignForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    const message = CheckValidate(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            
          })
            .then(() => {
              navigate("/mainpage");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/mainpage");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

    
    const toggleForm = () => {
        setIsSignForm(!isSignInForm);
        setErrorMessage(null); // Clear error message when toggling forms
    };

    return (
        <div>
          <Image />
          
          <form onSubmit={(e)=> e.preventDefault()} className=" w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
            <h1 className="font-bold text-3xl py-4">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </h1>
    
            {!isSignInForm && (
              <input
               ref={name}

                type="text"
                placeholder="Full Name"
                className="p-4 my-4 w-full bg-gray-700"
              />
            )}
            <input
              ref={email}
              type="text"
              placeholder="Email Address"
              className="p-4 my-4 w-full bg-gray-700"
            />
            <input
              ref={password}
              type="password"
              placeholder="Password"
              className="p-4 my-4 w-full bg-gray-700"
            />
            <p className="text-red-700 font-bold text:sm md:text-lg">{errorMessage}</p>
            <button
            onClick={handleButtonClick} 
            className="p-4 my-6 bg-red-700 w-full rounded-lg">
              {isSignInForm ? "Sign In" : "Sign Up"}
            </button>
            <p className="py-4 cursor-pointer" onClick={toggleForm}>
              {isSignInForm
                ? "New to Travel Planner? Sign Up Now"
                : "Already registered? Sign In Now."}
            </p>
          </form>
        </div>
      );
   
};
export default Signin;
