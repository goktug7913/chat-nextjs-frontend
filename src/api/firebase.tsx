// Initialize Firebase
import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import {getAnalytics} from "firebase/analytics";
import {getAuth} from "@firebase/auth";
import React, {createContext, useContext} from "react";
import {useSignInWithGoogle} from "react-firebase-hooks/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAf5WQbDPjJYJqFf9JeZTQu-9qofz2jRDs",
    authDomain: "chatter-a69a2.firebaseapp.com",
    projectId: "chatter-a69a2",
    storageBucket: "chatter-a69a2.appspot.com",
    messagingSenderId: "5359423524",
    appId: "1:5359423524:web:c505069e2242b34be948b1",
    measurementId: "G-YMZT8HYNKL"
};

export interface IFirebase {
    app: any,
    database: any,
    auth: any,
    // analytics: any,
    user: firebase.User | null,
    loading: boolean,
    error: any,
    signInWithGoogle: any,
}

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);

// TODO: Analytics is not working, window is not defined
// export const analytics = getAnalytics(app);

const FirebaseContext = createContext<IFirebase>({} as IFirebase);

const FirebaseProvider = ({children}: {children: React.ReactNode}) => {

    const Firebase = useContext(FirebaseContext);

    Firebase.app = app;
    Firebase.database = database;
    Firebase.auth = auth;
    // Firebase.analytics = analytics;

    [Firebase.signInWithGoogle, Firebase.user, Firebase.loading, Firebase.error] = useSignInWithGoogle(auth);

    return (
        <FirebaseContext.Provider value={Firebase}>
            {children}
        </FirebaseContext.Provider>
    )
}
export default FirebaseContext;
export {FirebaseProvider};
