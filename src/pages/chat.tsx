import MessageItem from "@/components/MessageItem";
import ChatInputMenu from "@/components/ChatInputMenu";
import {useEffect, useRef, useState} from "react";
import IMessage from "@/types/IMessage";
import AppBar from "@/components/AppBar";

const DevSvg = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-2 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

export default function Chat() {
    const [messages, setMessages] = useState([] as IMessage[]);
    const msgListDiv = useRef<HTMLDivElement>(null);

    const InputMenuCallback = (data: IMessage) => {
        setMessages([...messages, data]);
    }

    const scrollToBottom = () => {
        // If we are not at the bottom of the chat, don't scroll
        if (msgListDiv.current && msgListDiv.current.scrollTop + msgListDiv.current.clientHeight < msgListDiv.current.scrollHeight - 100) return;
        // Smooth scroll to bottom
        msgListDiv.current?.scrollTo({
            top: msgListDiv.current.scrollHeight,
            behavior: "smooth"
        });
    }
    useEffect(scrollToBottom, [messages]);

    useEffect(() => {
        // Scroll to bottom on new message
        scrollToBottom();
    }, [messages]);

    return (
        <>
        <div className="flex flex-col grow shrink max-h-full" id="chat-wrapper">
            <AppBar />
            <div className={"text-white m-0 p-1 items-center flex flex-row"}>
                <DevSvg />
                <h1 className="text-2xl font-bold ml-2">Development Room</h1>
            </div>
            <div className="overflow-y-scroll" ref={msgListDiv}>
                {messages.map((message) => (
                    <MessageItem key={message.date.toLocaleString()} message={message} />
                ))}
            </div>
            <div className="flex grow shrink"></div>
            <div className="justify-between w-full h-12 self-end">
                <ChatInputMenu setter={InputMenuCallback} messageList={messages}/>
            </div>
        </div>
        </>
        )
}