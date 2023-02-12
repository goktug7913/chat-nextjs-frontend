import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAf5WQbDPjJYJqFf9JeZTQu-9qofz2jRDs",
    authDomain: "chatter-a69a2.firebaseapp.com",
    projectId: "chatter-a69a2",
    storageBucket: "chatter-a69a2.appspot.com",
    messagingSenderId: "5359423524",
    appId: "1:5359423524:web:c505069e2242b34be948b1",
    measurementId: "G-YMZT8HYNKL"
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(FirebaseApp);
export const firestore = getFirestore(FirebaseApp);