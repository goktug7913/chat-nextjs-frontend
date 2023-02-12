import Link from "next/link";
import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router';
import {IRoom} from "@/types/IRoom";

import {auth} from '@/api/firebase';
import {useAuthState} from 'react-firebase-hooks/auth';

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
    const [user, loading, error] = useAuthState(auth);

    const [expanded, setExpanded] = useState(false);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const expandRef = React.useRef<HTMLDivElement>(null);

    const [rooms, setRooms] = useState<IRoom[]>([{} as IRoom]);

    const router = useRouter();

    // useEffect(() => {
    //     let Rooms: IRoom[] = [];
    //     // Fetch rooms from server
    //     user.rooms?.forEach(async (room) => {
    //         const res = await axiosInstance.get(`/rooms/get/${room}`);
    //         Rooms.push(res.data);
    //     });
    //     setRooms(Rooms);
    // }, [user.rooms]);

    const HandleLogout = () => {
        auth.signOut().then(r => {
            router.push("/");
        });
    }

    useEffect(() => {
        if (!rootRef.current) return;
        if (expanded) {
            rootRef.current.style.height = "13.5rem";
            rootRef.current.classList.add("rounded-b-2xl", "shadow-2xl", "bg-gradient-to-tr", "from-violet-800", "to-purple-400");
        } else {
            rootRef.current.style.height = "3.5rem";
            rootRef.current.classList.remove("rounded-b-2xl", "shadow-2xl", "bg-gradient-to-tr", "from-violet-800", "to-purple-400");
            rootRef.current.classList.add("shadow-md", "bg-gradient-to-tr", "from-violet-800", "to-purple-400");
        }
    }, [expanded]);

     function handleTransitionEnd() {
        if (!expandRef.current) return;
        if (expanded) {
            expandRef.current.style.opacity = "1";
        } else {
            expandRef.current.style.opacity = "0";
        }
    }

    useEffect(() => {
        if (!rootRef.current) return;
        rootRef.current.addEventListener("transitionstart", handleTransitionEnd);
        const cleanupRef = rootRef.current;
        return () => {
            if (!cleanupRef) return;
            cleanupRef.removeEventListener("transitionstart", handleTransitionEnd);
        }
    }, [expanded]);

    return (
        <div className={`flex flex-col flex-shrink-0 bg-gradient-to-r from-pink-500 to-purple-600 pb-accent mb-1 transition-all duration-300 ease-in-out overflow-hidden`} ref={rootRef}>
            <div className="bg-indigo-700 px-4 py-2.5 flex flex-row">
                <button className={"bg-purple-600 rounded-md px-1 py-1 mr-2"} onClick={() => setExpanded(prevState => !prevState)}>
                    {expanded ? <DownArrow /> : <RightArrow />}
                </button>

                <p className={"text-white font-sans font-bold text-2xl hover:animate-pulse"}>
                    <Link href="/">Chatter</Link>
                </p>

                <div className={"flex-grow"} />

                {user ? <></> : <button className={"bg-purple-600 rounded-md text-white font-sans font-bold px-2 py-1"}><Link href="/login">Login</Link></button>}
                {/*{user ? <></> : <button className={"bg-purple-600 rounded-md text-white font-sans font-bold px-2 py-1 ml-1.5"}><Link href="/register">Register</Link></button>}*/}

                {user ? <button className={"bg-purple-600 rounded-md text-white font-sans font-bold px-2 py-1 ml-1.5"}><Link href="/profile">Profile</Link></button> : <></>}
                {user ? <button className={"bg-purple-600 rounded-md text-white font-sans font-bold px-2 py-1 ml-1.5"} onClick={HandleLogout}>Logout</button> : <></>}
            </div>

            <div className={`flex grow px-1 py-2 text-white transition-all duration-500 ease-in-out`} ref={expandRef}>
                <div className={"grid grid-cols-3 grid-rows-1"}>
                    <div className={"col-span-1 row-span-1 border-purple-800 border rounded-xl px-1.5 py-1 mx-1.5"}>
                        <p className={"font-bold text-lg"}>Discover</p>
                        <p className={"text-sm"}>Discover new channels and friends</p>
                    </div>

                    {/*{user && <div className={"col-span-1 row-span-1 border-purple-800 border rounded-xl px-1.5 py-1 mx-1.5  overflow-x-hidden overflow-y-scroll"}>*/}
                    {/*    <div className="flex flex-row">*/}
                    {/*        <p className={"font-bold text-lg"}>Rooms</p>*/}
                    {/*        <button className={"bg-purple-600 rounded-md text-white font-sans font-bold ml-1 mt-1 px-2"}*/}
                    {/*        onClick={() => { router.push("/room/newroom") }}>+</button>*/}
                    {/*    </div>*/}
                    {/*    <ul>*/}
                    {/*        {user?.rooms?.length === 0 && <li>No rooms</li>}*/}
                    {/*        {rooms.map((room) => (*/}
                    {/*            <li key={room._id}>*/}
                    {/*                <Link href={`/room/${room._id}`}>*/}
                    {/*                    <div className={"flex flex-row justify-between"}>*/}
                    {/*                        <p className={"text-sm"}>{room.name}</p>*/}
                    {/*                        <p className={"text-sm text-gray-300"}>{room.joinTag}</p>*/}
                    {/*                    </div>*/}
                    {/*                </Link>*/}
                    {/*            </li>*/}
                    {/*        ))}*/}
                    {/*    </ul>*/}
                    {/*</div>}*/}

                    {/*{user && <div className={"col-span-1 row-span-1 border-purple-800 border rounded-xl px-1.5 py-1 mx-1.5"}>*/}
                    {/*    <p className={"font-bold text-lg"}>Friends</p>*/}
                    {/*    <ul>*/}
                    {/*        {user.friends?.length === 0 && <li>No friends</li>}*/}
                    {/*        {user.friends?.map((friend) => (*/}
                    {/*            // We need to fetch friend data from the server from the friend id*/}
                    {/*            <li key={friend}>{friend}</li>*/}
                    {/*        ))}*/}
                    {/*    </ul>*/}
                    {/*</div>}*/}
                </div>
            </div>
        </div>
    )
}