import Head from "next/head";
import React, {useEffect} from "react";
import AppBar from "@/components/AppBar";

import { useRouter } from 'next/router';

import {auth} from '@/api/firebase';
import {useAuthState, useSignInWithGoogle} from "react-firebase-hooks/auth";

export default function Login() {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push('/profile').then(r => console.log(r));
        }
    }, [user]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        signInWithGoogle().then((result) => {
            if (result?.user) { router.push('/profile').then().catch(err => alert(err)); }
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
                    <button onClick={handleSubmit} className="px-4 py-2 mt-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600">Login with Google</button>
                </div>
            </div>
        </>
    )
}