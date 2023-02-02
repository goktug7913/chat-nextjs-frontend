import {useEffect, useState} from "react";

interface Message {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    user: string;
    isMine?: boolean;
}

interface MessageItemProps {
    message: Message;
}

export default function MessageItem({message}: MessageItemProps) {
    const [formattedDate, setFormattedDate] = useState<string>("");

    useEffect(() => {
        // Format date to "HH:mm" if it's today, otherwise add "dd/MM/yyyy" as well
        const date = new Date(message.createdAt);
        const today = new Date();
        const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
        const formattedDate = isToday ? date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : date.toLocaleDateString([], {day: '2-digit', month: '2-digit', year: 'numeric'}) + " " + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        setFormattedDate(formattedDate);
    }, [message.createdAt]);

    return (
        <div className={`flex flex-col rounded-md p-2 m-2 w-64${message.isMine ? " bg-violet-600" : " bg-violet-400"}`}>
            <div className="flex flex-row items-center">
                <h6 className="text-sm font-bold">{message.user}</h6>
                <span className="text-xs ml-2">{formattedDate}</span>
            </div>
            <p className="text-sm">{message.content}</p>
        </div>
    )
}