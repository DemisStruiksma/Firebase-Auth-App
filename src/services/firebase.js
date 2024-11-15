import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdeE3nI-FYoz_1tSRxmf6L2CJrhYzC-nY",
  authDomain: "careibu-7f119.firebaseapp.com",
  projectId: "careibu-7f119",
  storageBucket: "careibu-7f119.firebasestorage.app",
  messagingSenderId: "668157664675",
  appId: "1:668157664675:web:e169392bf876a392e80e16",
  measurementId: "G-BFZSBBK59P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);