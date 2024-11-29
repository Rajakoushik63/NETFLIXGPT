import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBCJf0stb3Fv62mlSuSqtONEHaM6MHn23k",
  authDomain: "netflixgpt-e4be9.firebaseapp.com",
  projectId: "netflixgpt-e4be9",
  storageBucket: "netflixgpt-e4be9.firebasestorage.app",
  messagingSenderId: "721095128864",
  appId: "1:721095128864:web:619aa86bfe164d700fc945",
  measurementId: "G-87CJ0C53HH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Log an event to demonstrate usage
logEvent(analytics, "app_initialized");

export const auth = getAuth();
