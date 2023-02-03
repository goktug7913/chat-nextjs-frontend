import MessageItem from "@/components/MessageItem";
import ChatInputMenu from "@/components/ChatInputMenu";
import {useSocket} from "@/context/socketContext";
import {ReactElement, useEffect, useRef, useState} from "react";
import Message from "@/types/Message";
import AppBar from "@/components/AppBar";

export default function Chat() {
    const [messages, setMessages] = useState([] as Message[]);
    const socket = useSocket();
    const msgListDiv = useRef<HTMLDivElement>(null);

    const InputMenuCallback = (data: Message) => {
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
    useEffect(scrollToBottom, []);

    useEffect(() => {
        socket.on("msg_tx", (data: Message) => {
            setMessages([...messages, {...data, isSelf: false}]);
        });

        return () => {
            socket.off("msg_tx");
        }
    }, [messages]);

    useEffect(() => {
        // Scroll to bottom on new message
        scrollToBottom();
    }, [messages]);

    return (
        <>
        <div className="flex flex-col grow shrink max-h-full" id="chat-wrapper">
            <AppBar />
            <div className="overflow-y-scroll" ref={msgListDiv}>
                {messages.map((message) => (
                    <MessageItem key={message.date} message={message} />
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