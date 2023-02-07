import Head from "next/head";
import AppBar from "@/components/AppBar";
import React, {useContext} from "react";
import {useSocket} from "@/context/socketContext";
import {UserContext} from "@/context/userContext";

export default function Profile() {
    const user = useContext(UserContext).user;
    const socket = useSocket();

    const regDate = new Date(user.createdAt || 0);
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
                            <h6 className="text-2xl font-bold text-center">You</h6>
                            <p>Username: {user.username}</p>
                            <p>Email: {user.email}</p>
                            <p>Online: {user.online ? "Yes" : "No"}</p>
                            <p>Last Login: {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never"}</p>
                            <p>Registered: {regDate.toLocaleString()}</p>
                            <p>Internal ID: {user._id}</p>
                            <p>Socket ID: {socket.id}</p>
                            <p>Socket Connected: {socket.connected ? "Yes" : "No"}</p>
                        </div>

                        <div className="flex flex-col p-2 m-2 rounded-xl border-violet-600 border shadow-xl">
                            <h6 className="text-2xl font-bold text-center">Friends</h6>
                            <div className="grid row-auto col-auto">
                                {user.friends?.length === 0 && <p>You have no friends...</p>}
                                {user.friends?.map((friend) => (
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
                                {user.friendRequests?.map((request) => (
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
                                {user.blockedUsers?.map((blocked) => (
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