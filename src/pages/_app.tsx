import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import AppBar from "@/components/AppBar";
import {UserProvider} from "@/context/userContext";
import {SocketProvider} from "@/context/socketContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <div className="bg-indigo-900 h-screen flex flex-col">
        <UserProvider>
            <SocketProvider>
                <AppBar />
                <Component {...pageProps} />
                <Analytics />
            </SocketProvider>
        </UserProvider>
      </div>
  )
}
