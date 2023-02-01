import Head from 'next/head'
import { Inter } from '@next/font/google'
import Link from "next/link";
import AppBar from "@/components/AppBar";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Chatter</title>
        <meta name="description" content="Chatter App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AppBar />
          <div className="flex flex-col items-center">
            <h1 className={"text-white font-sans font-bold text-2xl"}>Welcome to Chatter!</h1>
            <p className={"text-white"}>Chatter is a chat application that allows you to connect with people of similar interests from all over the world.</p>
            <p className={"text-white"}><Link href={"/register"}>Join now!</Link></p>
            <p className={"text-white"}><Link href={"/login"}>Already have an account?</Link></p>
            <button className={"bg-purple-600 rounded-md text-white font-sans font-bold px-2 py-1"}><Link href={"/chat"}>Development Testing Room</Link></button>
          </div>

      </main>
    </>
  )
}
