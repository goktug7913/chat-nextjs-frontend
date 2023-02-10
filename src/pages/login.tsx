import Head from "next/head";
import React, {useContext, useEffect, useState} from "react";
import AppBar from "@/components/AppBar";
import {UserContext} from "@/context/userContext";
import { useRouter } from 'next/router';

import FirebaseContext from "@/api/firebase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const setUser = useContext(UserContext).setUser;

    const firebase = useContext(FirebaseContext);
    const db = firebase.database;

    const router = useRouter();

    useEffect(() => {
        if (firebase.auth.currentUser) {
            router.push('/profile').then(r => console.log(r));
        }
    }, [firebase.auth.currentUser]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Login with: " + email + " and " + password + "")
        firebase.signInWithEmailAndPassword(email, password).then((userCredential: { user: any; }) => {
            console.log("Response: " + userCredential);
            const user = userCredential.user;
            if (user) {
                const userRef = db.ref('users/' + user.uid);
                userRef.once('value', (snapshot: { val: () => any; }) => {
                    const data = snapshot.val();
                    if (data) {
                        console.log(data);
                        setUser(data);
                        localStorage.setItem("user", JSON.stringify(data));
                        router.push('/profile').then(r => console.log(r));
                    }
                });
            }
        }).catch((error: any) => {
            console.log(error);
        });
    }

    return (
        <>
            <Head>
                <title>Login</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <AppBar />
            <div className="grid h-screen place-items-center">
                <div className="flex flex-col items-center justify-center w-full max-w-sm p-4 m-3 bg-white rounded-lg shadow-md">
                    <h6 className="text-2xl font-bold">Chatter Login</h6>

                    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                        <label htmlFor="email" className="text-sm font-medium text-gray-500">Email</label>
                        <input type="email" id="email" name="email" placeholder="Email" value={email}
                               onChange={(e) => setEmail(e.target.value)}
                                 className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>

                        <label htmlFor="password" className="text-sm font-medium text-gray-500">Password</label>
                        <input type="password" id="password" name="password" placeholder="Password" value={password}
                               onChange={(e) => setPassword(e.target.value)}
                                    className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"/>

                        <div className="flex items-center justify-left items-baseline mt-4">
                            <input type="checkbox" id="remember" name="remember" className="mt-2 mr-1" checked={rememberMe} onChange={(e) =>setRememberMe(prevState => !prevState)}/>
                            <label htmlFor="remember" className="text-sm font-medium text-gray-500">Remember me</label>
                        </div>

                        <button type="submit" className="px-4 py-2 mt-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Login</button>
                    </form>
                    <button onClick={() => {firebase.signInWithGoogle()}} className="px-4 py-2 mt-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Login with Google</button>
                </div>
            </div>
        </>
    )
}