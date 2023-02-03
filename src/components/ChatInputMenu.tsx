import {useState} from "react";
import {useSocket} from "@/context/socketContext";
import Message from "@/types/Message";

interface Props {
    setter: (data: Message) => void;
    messageList: Message[];
}
export default function ChatInputMenu( {setter, messageList}: Props ) {
    const [message, setMessage] = useState("Test message for layout.");
    const socket = useSocket();
    const [debugNick, setDebugNick] = useState("John Doe");

    const HandleSubmit = (e: any) => {
        e.preventDefault();
        if (message.trim().length === 0) return;

        let data = {
            sender: debugNick,
            message: message,
            date: new Date().toISOString(),
            isSelf: false,
        };

        socket.emit("msg_rx", data);
        data.isSelf = true;
        setter(data);
        setMessage("");
    }

    return (
        <div className="flex flex-col w-full h-full items-stretch">
            <form onSubmit={HandleSubmit} className="flex flex-row justify-between w-full h-12">

                <input type={"text"} value={message} placeholder="Message"
                       onChange={(e) => setMessage(e.target.value)}
                       className="w-full h-full rounded-md px-3" />

                <button className="w-32 h-full rounded-md bg-violet-600 text-white">Send</button>
            </form>
        </div>
    );
}