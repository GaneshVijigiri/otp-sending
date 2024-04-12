import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDKNWnkdNuD4sRu_Yd3OV04v1bvUcQsgF4",
  authDomain: "otp-sending-c1ba7.firebaseapp.com",
  projectId: "otp-sending-c1ba7",
  storageBucket: "otp-sending-c1ba7.appspot.com",
  messagingSenderId: "935054164548",
  appId: "1:935054164548:web:3da65d514b9b86063ab211",
  measurementId: "G-T8P3RR1888"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
