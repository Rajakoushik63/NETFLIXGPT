import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className=" absolute w-screen bg-gradient-to-t from-black z-10 flex justify-between px-2">
      <img className="w-48 px-8 py-2 m-2" src={LOGO} alt="Logo" />

      {user && (
        <div className="flex p-2 mr-6">
          <img
            className="w-12 h-12 my-2"
            src={user?.photoURL}
            alt="user-icon"
          ></img>
          <button className="font-bold text-white" onClick={handleSignOut}>
            (SignOut)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
