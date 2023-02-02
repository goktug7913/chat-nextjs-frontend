import Link from "next/link";
import {useEffect, useState} from "react";

const DownArrow = () => {
    return (
        <svg className="w-6 h-6 hover:-rotate-90 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M19 9l-7 7-7-7" color={"white"} />
        </svg>
    )
}

const RightArrow = () => {
    return (
        <svg className="w-6 h-6 hover:rotate-90 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" color={"white"} />
        </svg>
    )
}

export default function AppBar() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className={`flex flex-grow flex-col bg-gradient-to-r from-purple-600 to-pink-600 pb-accent mb-4 ${expanded ? " rounded-xl" : ""}`}>
            <div className="bg-indigo-700 h-full px-4 py-2.5 flex flex-row grow ">
                <button className={"bg-purple-600 rounded-md px-1 py-1 mr-2"} onClick={() => setExpanded(prevState => !prevState)}>
                    {expanded ? <DownArrow /> : <RightArrow />}
                </button>

                <p className={"text-white font-sans font-bold text-2xl hover:animate-pulse"}>
                    <Link href="/">Chatter</Link>
                </p>

                <div className={"flex-grow"} />

                <button className={"bg-purple-600 rounded-md text-white font-sans font-bold px-2 py-1"}><Link href="/login">Login</Link></button>
                <button className={"bg-purple-600 rounded-md text-white font-sans font-bold px-2 py-1 ml-1.5"}><Link href="/register">Register</Link></button>
            </div>

            {expanded && <div className="px-4 py-2.5 text-white">
                Menu stuff...
                {
                    // A loop to fill placeholder menu items
                    Array.from(Array(6).keys()).map((i) => {
                         return (
                             <p key={i}>Menu Item {i}</p>
                         )
                    })
                }
            </div>}
        </div>
    )
}