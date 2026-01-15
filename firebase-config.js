// --- Firebase Imports ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
import {
  getFirestore,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// --- Firebase Config (your data here) ---
const firebaseConfig = {
  apiKey: "AIzaSyAu54CmBqqiJWedHlv53C5bO1HnaOB28R0",
  authDomain: "slap-declaration.firebaseapp.com",
  projectId: "slap-declaration",
  storageBucket: "slap-declaration.firebasestorage.app",
  messagingSenderId: "606681425370",
  appId: "1:606681425370:web:bf8e0b6f16fa6268c1cce3",
  measurementId: "G-651NJTZQTV"
};

// --- Initialize Firebase ---
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// --- Detect Location & Save Participant ---
async function trackParticipant() {
  try {
    // Fetch geolocation info without storing IP
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();

    const country = data.country_name || "Unknown";

    // Save to Firestore
    await addDoc(collection(db, "participants"), {
      country: country,
      timestamp: new Date().toISOString(),
      device: navigator.userAgent
    });

    console.log("Participant saved:", country);
  } catch (err) {
    console.error("Tracking failed:", err);
  }
}

// --- Execute Automatically on Page Load ---
trackParticipant();
