import MessageItem from "@/components/MessageItem";
import ChatInputMenu from "@/components/ChatInputMenu";
import {useEffect, useRef, useState} from "react";
import IMessage from "@/types/IMessage";
import AppBar from "@/components/AppBar";

import {auth, firestore} from "@/api/firebase";
import { useDocument} from 'react-firebase-hooks/firestore';
import {doc, setDoc, addDoc, collection, arrayUnion} from "firebase/firestore";
import dynamic from "next/dynamic";
import {useAuthState} from "react-firebase-hooks/auth";

const DevSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

interface IChatProps {
    roomid: string | undefined;
}

function Chat( {roomid}: IChatProps ) {
    const [authUser, authLoading, authError] = useAuthState(auth);
    const db = firestore;
    const [docRef, setDocRef] = useState<any>(null);

    const [messages, setMessages] = useState([] as string[]);
    const msgListDiv = useRef<HTMLDivElement>(null); // Reference to the message list container

    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        if (authLoading) return;
        setDocRef(doc(db, "rooms", roomid as string));
    }, [authLoading]);
    const [snapshot, loading, error] = useDocument(docRef);

    const [room, setRoom] = useState({
        Name: "Loading...",
        Description: "Loading...",
        Messages: [],
        Owner: "Loading..."
    });

    useEffect(() => {
        if (loading) return;
        console.log("Loading finished, setting room title:" + snapshot?.data.name);
        setRoom({
            ...room,
            Name: snapshot?.data()?.name,
            Description: snapshot?.data()?.description,
            Messages: snapshot?.data()?.messages,
        });
        //console.log("Messages: " + snapshot?.data()?.messages);
        setMessages(snapshot?.data()?.messages);
    }, [snapshot, loading]);

    useEffect(() => {
        console.log(error);
    }, [error]);

    const InputMenuCallback = (data: IMessage) => {
        // Create a new document in the messages collection, add reference to the room and user
        const newMessage = {
            sender: doc(db, "users", authUser?.uid as string),
            content: data.content,
            createdAt: new Date().getTime(),
            editedAt: new Date().getTime(),
            deleted: false,
        }

        const msgCollection = collection(db, "messages");
        const newMessageRef = addDoc(msgCollection, newMessage).then((docRef) => {
            // Add the message to the room
            const roomRef = doc(db, "rooms", roomid as string);
            setDoc(roomRef, {
                messages: arrayUnion(docRef)
            },{merge: true});

            // Add the message to the user
            const userRef = doc(db, "users", authUser?.uid as string);
            setDoc(userRef, {
                messages: arrayUnion(docRef)
            },{merge: true});
        }).catch((error) => {
            console.error("Error adding document: ", error);
        });
    }

    const scrollToBottom = () => {
        // If first render, scroll to bottom
        if (isFirstRender) {
            setIsFirstRender(false);
            msgListDiv.current?.scrollTo({
                top: msgListDiv.current.scrollHeight,
                behavior: "smooth"
            });
            return;
        }
        // If we are not at the bottom of the chat, don't scroll but if first render, scroll to bottom
        if (msgListDiv.current && msgListDiv.current.scrollTop + msgListDiv.current.clientHeight < msgListDiv.current.scrollHeight - 100) return;
        // Smooth scroll to bottom
        msgListDiv.current?.scrollTo({
            top: msgListDiv.current.scrollHeight,
            behavior: "smooth"
        });
    }

    useEffect(scrollToBottom, [messages, msgListDiv.current?.scrollHeight, roomid, isFirstRender]);

    return (
        <>
        <div className="grid grid-cols-1 max-h-full" id="chat-wrapper">
            <AppBar />
            <div className="flex flex-col flex-shrink bg-gray-600 shadow-xl">
                <div className={"text-white m-0 p-1 items-center flex flex-row"}>
                    <DevSvg />
                    <h1 className="text-xl font-bold ml-2">{room.Name}</h1>
                </div>

                <div className={"ml-2"}>
                    <p className="text-white text-sm m-0 p-1">{room.Description}</p>
                </div>
            </div>

            <div className="overflow-y-scroll justify-self-center grid grid-cols-1" ref={msgListDiv}>
                {messages?.map((message) => (
                    <MessageItem key={message} message={message} />
                ))}
            </div>

            <div className="flex grow shrink"></div>

            <div className="justify-between w-full h-12 self-end mt-2">
                <ChatInputMenu setter={InputMenuCallback} messageList={messages} roomid={roomid as string}/>
            </div>
        </div>
        </>
    )
}

// export it with SSR disabled
const ChatCSR = dynamic(() => Promise.resolve(Chat), {
    ssr: false,
})

export default ChatCSR