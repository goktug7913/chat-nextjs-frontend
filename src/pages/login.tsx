import Head from "next/head";
import React, {useEffect} from "react";
import AppBar from "@/components/AppBar";

import { useRouter } from 'next/router';

import {auth} from '@/api/firebase';
import {useSignInWithGoogle} from "react-firebase-hooks/auth";

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
                <div className="flex flex-col justify-center items-stretch w-full max-w-xs p-4 m-3 bg-white rounded-lg shadow-md">
                    <h6 className="text-2xl font-bold">Chatter Login</h6>

                    <button onClick={handleSubmit}
                            className="px-4 py-2 mt-4 text-white text-xl bg-violet-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition-all">

                        <div className={"flex items-center justify-start"}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google" className="w-8 h-8 bg-white rounded p-1 mr-2"/>
                            Login with Google
                        </div>
                    </button>

                    <button disabled={true} onClick={handleSubmit}
                            className="disabled:bg-gray-600 px-4 py-2 mt-4 text-white text-xl bg-violet-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition-all">


                        <div className={"flex items-center justify-start"}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Twitter-logo.svg" alt="twitter" className="w-8 h-8 bg-white rounded p-1 mr-2"/>
                            Login with Twitter
                        </div>
                    </button>

                    <button disabled={true} onClick={handleSubmit}
                            className="disabled:bg-gray-600 px-4 py-2 mt-4 text-white text-xl bg-violet-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600 transition-all">

                        <div className={"flex items-center justify-start"}>
                            <img src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg" alt="facebook" className="w-8 h-8 bg-white rounded p-1 mr-2"/>
                            Login with Facebook
                        </div>
                    </button>
                </div>
            </div>
        </>
    )
}