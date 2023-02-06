import io, {Socket} from 'socket.io-client';
import React, {useContext, useEffect} from "react";

const SocketContext = React.createContext({} as Socket);

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({children}: any) {
    const deployurl = "https://chatsv.goktug.xyz/";
    const localurl = "http://localhost:3001";

    const socket = io(process.env.NODE_ENV === "production" ? deployurl : localurl);

    // Check if we have a token in the local storage
    // If we have a token, we need to send it to the server to authenticate the user


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.token) {
            socket.emit("authenticate", user.token);
        }
    } , []);

    socket.on("connect", () => {
        console.log("Connected to socket server");
    });

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}