// Initialize Firebase
import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "@firebase/auth";
import React, {createContext, useContext} from "react";
import {useSignInWithGoogle, useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import { User } from "firebase/auth";

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
    firestore: any,
    auth: any,
    // analytics: any,
    user: User | null | undefined,
    loading: boolean,
    error: any,
    signInWithGoogle: any,
    signInWithEmailAndPassword: any,
    signOut: any,
}

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
export const auth = getAuth(app);

// TODO: Analytics is not working, window is not defined (this code might be running before the page is loaded)
// export const analytics = getAnalytics(app);

const FirebaseContext = createContext<IFirebase>({} as IFirebase);

const FirebaseProvider = ({children}: {children: React.ReactNode}) => {

    const Firebase = useContext(FirebaseContext);

    Firebase.app = app;
    Firebase.database = database;
    Firebase.firestore = firestore;
    Firebase.auth = auth;
    // Firebase.analytics = analytics;

    // @ts-ignore
    [Firebase.signInWithGoogle, Firebase.user, Firebase.loading, Firebase.error] = useSignInWithGoogle(auth);
    [Firebase.signInWithEmailAndPassword, Firebase.user, Firebase.loading, Firebase.error] = useSignInWithEmailAndPassword(auth);
    return (
        <FirebaseContext.Provider value={Firebase}>
            {children}
        </FirebaseContext.Provider>
    )
}
export default FirebaseContext;
export {FirebaseProvider};