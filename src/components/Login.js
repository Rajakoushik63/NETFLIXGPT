import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BGIMG, PHOTOURL } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  const [errorMessage, seterrorMessage] = useState(null);
  const dispatch = useDispatch();
  const email = useRef();
  const password = useRef();
  const name = useRef();

  // Toggle between SignIn and SignUp form
  const toggleisSignForm = () => {
    setisSignInForm(!isSignInForm);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    // Get values from the input fields
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    const nameValue = !isSignInForm ? name.current.value : "koushik";

    // Validate input data
    const isValid = checkValidData(emailValue, passwordValue, nameValue);
    console.log(isValid);
    const message = isValid === null ? "Valid Form Submitting....." : isValid;
    seterrorMessage(message);

    if (isValid) return; // If form is valid, proceed

    // Sign Up Process
    if (!isSignInForm) {
      // Check if name is provided in SignUp form
      if (!nameValue) {
        seterrorMessage("Name is required for SignUp.");
        return;
      }

      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameValue,
            photoURL: PHOTOURL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              seterrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrorMessage(errorCode + "  " + errorMessage);
        });
    } else {
      // Sign In Process
      if (!emailValue || !passwordValue) {
        seterrorMessage("Email and Password cannot be empty.");
        return;
      }

      // Validate email format
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(emailValue)) {
        seterrorMessage("Invalid email format.");
        return;
      }

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {})
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error("Error Code:", errorCode);
          console.error("Error Message:", errorMessage);
          seterrorMessage(errorCode + " - " + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img src={BGIMG} alt="bg-img" />
      </div>
      <form className="w-3/12 p-12 absolute bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="p-2 my-2 text-3xl">
          {isSignInForm ? "SignIn" : "SignUp"}
        </h1>
        {/* Name field only for SignUp */}
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-3  w-full rounded-sm  bg-gray-700"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-2 my-3 w-full rounded-sm bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-2 my-3 w-full rounded-sm bg-gray-700"
          autoComplete="current-password"
        />
        <p className="text-lg py-0 text-red-500">{errorMessage}</p>
        <button
          className="bg-red-700 py-4 my-6 w-full rounded-sm"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "SignIn" : "SignUp"}
        </button>
        <p className="text-gray-500">
          {!isSignInForm ? "Already Registered?  " : "New to Netflix?  "}
          <span
            className="text-white hover:underline cursor-pointer"
            onClick={toggleisSignForm}
          >
            {!isSignInForm ? "SignIn" : "SignUp"}
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
