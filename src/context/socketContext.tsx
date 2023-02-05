import io, {Socket} from 'socket.io-client';
import React, {useContext} from "react";

const SocketContext = React.createContext({} as Socket);

export function useSocket() {
    return useContext(SocketContext);
}

export function SocketProvider({children}: any) {
    const deployurl = "https://chatsv.goktug.xyz/";
    const localurl = "http://localhost:3001";

    const socket = io(process.env.NODE_ENV === "production" ? deployurl : localurl);

    socket.on("connect", () => {
        console.log("Connected to socket server");
    });

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
}