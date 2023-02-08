import Head from "next/head";
import React, {useContext, useState} from "react";
import axiosInstance from "@/api/axiosInstance";
import AppBar from "@/components/AppBar";
import {UserContext} from "@/context/userContext";
import { useRouter } from 'next/router';
import {useSocket} from "@/context/socketContext";

import FirebaseContext from "@/api/firebase";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const setUser = useContext(UserContext).setUser;

    const firebase = useContext(FirebaseContext);

    const socket = useSocket();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        axiosInstance.post("/auth/login", {
            email,
            password,
            rememberMe,
        }
        ).then((response) => {
            console.log(response);
            localStorage.setItem("user", JSON.stringify(response.data));
            setUser(response.data);
            socket.emit("authenticate", response.data.token);
            router.replace("/profile");
        }).catch((error) => {
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
                    <button onClick={() => {
                        firebase.signInWithGoogle().then((result: any) => {
                            console.log(result);
                        }).catch((error: any) => {
                            console.log(error);
                        });
                    }} className="px-4 py-2 mt-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Login with Google</button>
                </div>
            </div>
        </>
    )
}