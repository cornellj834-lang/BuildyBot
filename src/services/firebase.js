
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCSJpv7YjkBdDr-wuJayehy3hpLO3_1k5E",
    authDomain: "buildybot-4891d.firebaseapp.com",
    projectId: "buildybot-4891d",
    storageBucket: "buildybot-4891d.firebasestorage.app",
    messagingSenderId: "35056849072",
    appId: "1:35056849072:web:6e44ae1c52f9772626eb75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
