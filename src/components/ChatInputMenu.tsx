import {useState} from "react";

export default function ChatInputMenu() {
    const [message, setMessage] = useState("");
    return (
        <div className="flex flex-col w-full h-full items-stretch">
            <div className="flex flex-row justify-between w-full h-12">

                <input type={"text"} value={message}
                       onChange={(e) => setMessage(e.target.value)}
                       className="w-full h-full rounded-md" />

                <button className="w-32 h-full rounded-md bg-violet-600 text-white">Send</button>
            </div>
        </div>
    );
}