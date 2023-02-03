import MessageItem from "@/components/MessageItem";
import ChatInputMenu from "@/components/ChatInputMenu";
import {useSocket} from "@/context/socketContext";
import {useEffect, useState} from "react";
import Message from "@/types/Message";

export default function Chat() {
    const [messages, setMessages] = useState([] as Message[]);
    const socket = useSocket();

    const InputMenuCallback = (data: Message) => {
        setMessages([...messages, data]);
    }

    useEffect(() => {
        socket.on("msg_tx", (data: Message) => {
            setMessages([...messages, data]);
        });
    }, [messages]);

    return (
        <div className="flex flex-col grow">
            <div className="flex flex-col overflow-y-auto grow">
                {messages.map((message) => (
                    <MessageItem key={message.date} message={message} />
                ))}
            </div>
            <div className="flex flex-row justify-between w-full h-12 self-end">
                <ChatInputMenu setter={InputMenuCallback} messageList={messages}/>
            </div>
        </div>
    )
}