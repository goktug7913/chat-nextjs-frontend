import Head from 'next/head'
//import { Inter } from '@next/font/google'
import Link from "next/link";
import AppBar from "@/components/AppBar";

//const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Chatter</title>
        <meta name="description" content="Chatter App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={""}>
          <AppBar />
          <div className="flex flex-col items-start mx-5 py-8">
              <div className="self-center max-w-md rounded-xl bg-violet-800 shadow-2xl p-3">
                <h1 className="text-4xl text-center font-bold text-white bg-clip-text">The Ultimate Communication App</h1>
              </div>
              <div className="mx-6 py-6">
                  <p className="text-xl text-center text-white">Chatter is a powerful communication app that lets you
                      chat with friends, family, and colleagues in private or in groups. Whether you&apos;re at work, at
                      home, or on the go, Chatter makes it easy to stay connected with the people who matter most.</p>
                  <div className="mt-10">
                      <h2 className="text-lg font-bold text-white">Features</h2>
                      <ul className="list-disc mt-4 ml-10">
                          <li className="text-base text-white">Private Messaging: Chat one-on-one with friends and
                              family in a private, secure, and encrypted space.
                          </li>
                          <li className="text-base text-white">Group Chatting: Create and join group chats with
                              unlimited members. Perfect for family gatherings, team meetings, and social clubs.
                          </li>
                          <li className="text-base text-white">Media Sharing: Share photos, videos, and other media
                              with your friends and family. Keep your memories safe and accessible in one place.
                          </li>
                          <li className="text-base text-white">End-to-end Encryption: Chatter uses the latest
                              encryption technology to keep your conversations and media private and secure.
                          </li>
                      </ul>
                  </div>
              </div>
              <div className="flex flex-col items-start self-center rounded-xl bg-violet-800 shadow-2xl p-3">
                <p className={"text-white hover:text-blue-400"}><Link href={"/register"}>Join now!</Link></p>
                <p className={"text-white hover:text-blue-400"}><Link href={"/login"}>Already have an account?</Link></p>
                <button className={"bg-purple-600 rounded-md text-white font-sans font-bold mt-2 px-2 py-1"}><Link href={"/chat"}>Development Testing Room</Link></button>
              </div>
          </div>

      </main>
    </>
  )
}
