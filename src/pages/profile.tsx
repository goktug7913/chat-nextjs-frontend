import Head from "next/head";
import AppBar from "@/components/AppBar";
import React, {useEffect} from "react";
import {useRouter} from "next/router";

import {auth, firestore} from '@/api/firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import {arrayUnion, doc, getDoc, setDoc} from "firebase/firestore";
import {useDocument} from "react-firebase-hooks/firestore";
import Link from "next/link";
import dynamic from "next/dynamic";

function Profile() {
    const router = useRouter();
    const [authUser, authLoading, authError] = useAuthState(auth);

    useEffect(() => {
        if (!authUser && !authLoading) {
            router.push('/login').then(r => console.log(r));
        }
    }, [authUser, authLoading]);

    const db = firestore;
    const [docRef, setDocRef] = React.useState<any>(null);
    const [user, loading, error] = useDocument(docRef);

    useEffect(() => {
        if (authUser && !authLoading) {
            setDocRef(doc(db, "users", authUser?.uid as string));
        }
    }, [authUser, authLoading]);

    const [resolvedRooms, setResolvedRooms] = React.useState<any[]>([]);
    const [resolvedMessages, setResolvedMessages] = React.useState<any[]>([]);

    // TODO: Dev only.
    // Add the user to the dev room. This is a temporary solution until the user can create rooms.
    useEffect(() => {
        if (user && !loading && docRef && db) {
            // Let's check if the user is already in the dev room
            const rooms = user?.data()?.rooms as any[];
            const hasDevRoom = rooms?.find((room) => room.path === "rooms/wdHlCnVr7No551nfiljL");
            if (hasDevRoom) {
                console.log("User already in dev room");
                return;
            }
            const devRoom = doc(db, "rooms", "wdHlCnVr7No551nfiljL");
            setDoc(docRef, {
                rooms: arrayUnion(devRoom)
            }, {merge: true}).then(() => {
                console.log("Added user to dev room");
                // Now add the user to the room
                setDoc(devRoom, {
                    users: arrayUnion(docRef)
                }, {merge: true}).then(() => {
                    console.log("Added dev room to user");
                });
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [user, loading, docRef, db]);

    useEffect(() => {
        if (user && !loading) {
            setResolvedRooms([]);
            setResolvedMessages([]);

            const rooms = user?.data()?.rooms as any[];
            rooms?.forEach((room) => {
                const path = room.path;
                getDoc(doc(db, path)).then((doc) => {
                    if (doc.exists()) {
                        console.log("Document data:", doc.data());

                        const data = {
                            ...doc.data(),
                            id: doc.id
                        }

                        setResolvedRooms((prev) => [...prev, data]);
                    } else {
                        console.log("No such document!");
                    }
                });
            });

            const messages = user?.data()?.messages as any[];
            messages?.forEach((message) => {
                const path = message.path;
                getDoc(doc(db, path)).then((doc) => {
                    if (doc.exists()) {
                        console.log("Document data:", doc.data());
                        const data = doc.data();
                        setResolvedMessages((prev) => [...prev, data]);
                    } else {
                        console.log("No such document!");
                    }
                });
            });
        }
    }, [user,loading]);

    const regDate = new Date(user?.data()?.metadata.creationTime as string);

    return (
        <>
            <Head>
                <title>Chatter</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <AppBar />
            <div className="flex justify-center m-4 overflow-y-scroll">
                <div className="flex flex-col items-center justify-center w-full max-w-screen-xl p-4 bg-white rounded-lg shadow-2xl">
                    <h6 className="text-2xl font-bold">Profile</h6>

                    <div className="grid row-auto col-auto">
                        <div className="flex flex-col p-2 m-2 rounded-xl border-violet-600 border shadow-xl">

                            <div className="flex flex-row items-center justify-center">
                                <img className={"rounded-full w-8"} src={user?.data()?.photoURL} alt={"Profile Picture"}/>
                                <h6 className="text-2xl font-bold ml-3 text-center">You</h6>
                            </div>

                            <p>Name: {user?.data()?.displayName}</p>
                            <p>Email: {user?.data()?.email}</p>
                            <p>Email Verified: {user?.data()?.emailVerified ? "Yes" : "No"}</p>
                            <p>Phone: {user?.data()?.phoneNumber ? user?.data()?.phoneNumber : "No number"}</p>
                            <p>Registered: {regDate.toLocaleString()}</p>
                            <p>UID: {user?.data()?.uid}</p>
                        </div>

                        <div className="flex flex-col p-2 m-2 rounded-xl border-violet-600 border shadow-xl">
                            <h6 className="text-2xl font-bold text-center">Rooms</h6>
                            <div className="grid row-auto col-auto">
                                {resolvedRooms.length === 0 && <p>You have no rooms...</p>}
                                {resolvedRooms.map((room: any) => (
                                    <div key={room} className="grid grid-cols-1 text-white justify-items-stretch">
                                        <Link href={`/room/${room?.id}`} className={"bg-purple-600 rounded-md p-1"}>
                                            <button><p>{room?.name}</p></button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col p-2 m-2 rounded-xl border-violet-600 border shadow-xl overflow-y-scroll max-h-64">
                            <h6 className="text-2xl font-bold text-center">Messages</h6>
                            <div className="grid row-auto col-auto">
                                {resolvedMessages.length === 0 && <p>You have no messages...</p>}
                                {resolvedMessages.map((message: any) => (
                                    <div key={message} className="flex flex-col p-1 m-0.5 border-violet-600 border-b">
                                        {message?.content.toString()}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
// export it with SSR disabled
const ProfileCSR = dynamic(() => Promise.resolve(Profile), {
    ssr: false,
})

export default ProfileCSR