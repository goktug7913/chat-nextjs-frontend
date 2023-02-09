import {useContext, useState} from "react";
import IMessage from "@/types/IMessage";
import {UserContext} from "@/context/userContext";

interface Props {
    setter: (data: IMessage) => void;
    messageList: IMessage[];
}
export default function ChatInputMenu( {setter, messageList}: Props ) {
    const [message, setMessage] = useState("");
    const user = useContext(UserContext);

    const HandleSubmit = (e: any) => {
        e.preventDefault();
        if (message.trim().length === 0) return;
        console.log(user);
        let data = {
            senderInternalId: user.user._id,
            sender: user.user.username,
            message: message,
            date: new Date(),
            isSelf: false,
            room: "test",
        };

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