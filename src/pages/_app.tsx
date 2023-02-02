import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import AppBar from "@/components/AppBar";
import {UserProvider} from "@/context/userContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
      <div className="bg-indigo-900 min-h-screen">
        <UserProvider>
            <AppBar />
            <Component {...pageProps} />
            <Analytics />
        </UserProvider>
      </div>
  )
}
