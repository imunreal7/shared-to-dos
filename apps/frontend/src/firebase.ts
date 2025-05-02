import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "YOUR_WEB_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    // …rest of config from Firebase Console
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

