import {useEffect, useState} from "react";
import IMessage from "@/types/IMessage";

interface MessageItemProps {
    message: IMessage;
}

export default function MessageItem({message}: MessageItemProps) {
    const [formattedDate, setFormattedDate] = useState<string>("");

    useEffect(() => {
        // Format date to "HH:mm" if it's today, otherwise add "dd/MM/yyyy" as well
        const date = new Date(message.date);
        const today = new Date();
        const isToday = date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
        const formattedDate = isToday ? date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : date.toLocaleDateString([], {day: '2-digit', month: '2-digit', year: 'numeric'}) + " " + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        setFormattedDate(formattedDate);
    }, [message.date]);

    return (
        <div className={`text-white flex flex-col rounded-md p-2 m-2 max-w-xl${message.isSelf ? " bg-violet-600" : " bg-violet-800"}`}>
            <div className="flex flex-row items-center justify-between">
                <h6 className="text-sm font-bold">{message.sender}</h6>
                <span className="text-xs ml-2">{formattedDate}</span>
            </div>
            <p className="text-sm">{message.message}</p>
        </div>
    )
}