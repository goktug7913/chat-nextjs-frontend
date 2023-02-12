import Head from "next/head";
import AppBar from "@/components/AppBar";
import React, {useEffect} from "react";
import {useRouter} from "next/router";

import {auth, firestore} from '@/api/firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import {doc, collection, getDoc} from "firebase/firestore";
import {useCollectionData, useDocument} from "react-firebase-hooks/firestore";
import Link from "next/link";

export default function Profile() {
    //const user = useContext(UserContext).user; // TODO: Change this to use the firebase user
    const router = useRouter();
    const [authUser, authLoading, authError] = useAuthState(auth);

    const db = firestore;
    const docRef = doc(db, "users", authUser?.uid as string);
    const [user, loading, error] = useDocument(docRef);

    const [resolvedRooms, setResolvedRooms] = React.useState<any[]>([]);
    const [resolvedMessages, setResolvedMessages] = React.useState<any[]>([]);

    useEffect(() => {
        if (user && !loading) {
            setResolvedRooms([]);
            setResolvedMessages([]);

            const rooms = user?.data()?.rooms as any[];
            rooms.forEach((room) => {
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
            messages.forEach((message) => {
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

    const resolveRef:any = (ref: any) => {
        const path = ref.path;
        getDoc(doc(db, path)).then((doc) => {
            if (doc.exists()) {
                console.log("Document data:", doc.data());
                const data = {
                    ...doc.data(),
                    id: doc.id
                }

                return data
            } else {
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
            return "Error";
        });
    }

    useEffect(() => {
        if (user && !loading) console.log(user.data());
        if (!user && !loading) { router.push('/login').then(); }
    }, [user,loading]);

    const regDate = new Date(user?.data()?.metadata.creationTime as string);

    return (
        <>
            <Head>
                <title>Chatter</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <AppBar />
            <div className="flex justify-center m-4">
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
                                    <div key={room} className="flex flex-col p-2 m-2 rounded border-violet-600 border shadow-xl">
                                        <Link href={`/room/${room?.id}`}>{room?.name}</Link>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col p-2 m-2 rounded-xl border-violet-600 border shadow-xl">
                            <h6 className="text-2xl font-bold text-center">Messages</h6>
                            <div className="grid row-auto col-auto">
                                {resolvedMessages.length === 0 && <p>You have no messages...</p>}
                                {resolvedMessages.map((message: any) => (
                                    <div key={message} className="flex flex-col p-2 m-2 rounded border-violet-600 border shadow-xl">
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