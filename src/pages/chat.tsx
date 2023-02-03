import MessageItem from "@/components/MessageItem";
import ChatInputMenu from "@/components/ChatInputMenu";
import {useSocket} from "@/context/socketContext";
import {ReactElement, useEffect, useRef, useState} from "react";
import Message from "@/types/Message";

export default function Chat() {
    const [messages, setMessages] = useState([] as Message[]);
    const socket = useSocket();
    const inputMenuRef = useRef<HTMLDivElement>(null);

    const InputMenuCallback = (data: Message) => {
        setMessages([...messages, data]);
    }

    // Scroll to bottom on page load, because on mobile, the URL bar is visible and the page is scrolled up
    const scrollToBottom = () => {
        if (inputMenuRef.current) {
            // URL bar is visible, scroll down
            inputMenuRef.current.scrollIntoView({behavior: "smooth"});
        }
    }
    useEffect(scrollToBottom, []);

    useEffect(() => {
        socket.on("msg_tx", (data: Message) => {
            setMessages([...messages, {...data, isSelf: false}]);
        });
    }, [messages]);

    return (
        <div className="flex flex-col grow" id="chat-wrapper">
            <div className="flex flex-col overflow-y-auto grow">
                {messages.map((message) => (
                    <MessageItem key={message.date} message={message} />
                ))}
            </div>
            <div className="justify-between w-full h-12 self-end" ref={inputMenuRef}>
                <ChatInputMenu setter={InputMenuCallback} messageList={messages}/>
            </div>
        </div>
    )
}