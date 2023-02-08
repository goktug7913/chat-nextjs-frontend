import Head from "next/head";
import AppBar from "@/components/AppBar";
import React, {useContext} from "react";
import {useSocket} from "@/context/socketContext";
import {UserContext} from "@/context/userContext";
import FirebaseContext from "@/api/firebase";

export default function Profile() {
    //const user = useContext(UserContext).user; // TODO: Change this to use the firebase user
    const socket = useSocket();

    const firebase = useContext(FirebaseContext);
    const user = firebase?.auth?.currentUser;

    const regDate = new Date(user?.metadata?.creationTime);
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
                                <img className={"rounded-full w-8"} src={user?.photoURL} alt={"Profile Picture"}/>
                                <h6 className="text-2xl font-bold ml-3 text-center">You</h6>
                            </div>

                            <p>Name: {user.displayName}</p>
                            <p>Email: {user.email}</p>
                            <p>Email Verified: {user.emailVerified ? "Yes" : "No"}</p>
                            <p>Phone: {user.phoneNumber ? user.phoneNumber : "No number"}</p>
                            <p>Registered: {regDate.toLocaleString()}</p>
                            <p>Socket ID: {socket.id}</p>
                            <p>Socket Connected: {socket.connected ? "Yes" : "No"}</p>
                        </div>

                        <div className="flex flex-col p-2 m-2 rounded-xl border-violet-600 border shadow-xl">
                            <h6 className="text-2xl font-bold text-center">Friends</h6>
                            <div className="grid row-auto col-auto">
                                {user.friends?.length === 0 && <p>You have no friends...</p>}
                                {user.friends?.map((friend: React.Key | null | undefined) => (
                                    <div key={friend} className="flex flex-col p-2 m-2 rounded border-violet-600 border shadow-xl">
                                        friend
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col p-2 m-2 rounded-xl border-violet-600 border shadow-xl">
                            <h6 className="text-2xl font-bold text-center">Friend Requests</h6>
                            <div className="grid row-auto col-auto">
                                {user.friendRequests?.length === 0 && <p>You have no friend requests...</p>}
                                {user.friendRequests?.map((request: React.Key | null | undefined) => (
                                    <div key={request} className="flex flex-col p-2 m-2 rounded border-violet-600 border shadow-xl">
                                        request
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col p-2 m-2 rounded-xl border-violet-600 border shadow-xl">
                            <h6 className="text-2xl font-bold text-center">Blocked Users</h6>
                            <div className="grid row-auto col-auto">
                                {user.blockedUsers?.length === 0 && <p>You have not blocked anyone...</p>}
                                {user.blockedUsers?.map((blocked: React.Key | null | undefined) => (
                                    <div key={blocked} className="flex flex-col p-2 m-2 rounded border-violet-600 border shadow-xl">
                                        blocked
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