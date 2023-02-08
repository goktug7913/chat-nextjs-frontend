import '@/styles/globals.css';
import type { AppProps } from 'next/app';

import {FirebaseProvider} from "@/api/firebase";
import { Analytics } from '@vercel/analytics/react';

import {UserProvider} from "@/context/userContext";
import {SocketProvider} from "@/context/socketContext";
import React, {useEffect} from "react";

export default function App({ Component, pageProps }: AppProps) {

    useEffect(() => {
        // Load service worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(
                    (registration) => {
                        console.log('SW registered: ', registration);
                    }
                )
            });
        } else {
            console.log("Service worker not supported");
        }
    }, []);

    return (
        <FirebaseProvider>
        <UserProvider>
            <SocketProvider>
                <Analytics />
                <div className="bg-gradient-to-tr from-violet-800 to-purple-400 h-screen flex flex-col max-h-screen overflow-y-scroll">
                    <Component {...pageProps} />
                </div>
            </SocketProvider>
        </UserProvider>
        </FirebaseProvider>
    )
}

