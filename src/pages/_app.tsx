import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import AppBar from "@/components/AppBar";
import {UserProvider} from "@/context/userContext";
import {SocketProvider} from "@/context/socketContext";
import {useEffect} from "react";

export default function App({ Component, pageProps }: AppProps) {

    useEffect(() => {
        // Load service worker
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js');
            });
        } else {
            console.log("Service worker not supported");
        }
    }, []);

  return (
      <UserProvider>
          <SocketProvider>
              <Analytics />
              <div className="bg-gradient-to-tr from-violet-800 to-purple-400 h-screen flex flex-col max-h-screen overflow-y-hidden">
                <Component {...pageProps} />
              </div>
          </SocketProvider>
      </UserProvider>
  )
}

