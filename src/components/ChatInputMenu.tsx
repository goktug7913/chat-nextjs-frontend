import {useState} from "react";
import IMessage from "@/types/IMessage";
import {useRouter} from "next/router";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, firestore} from "@/api/firebase";
import {useDocument} from "react-firebase-hooks/firestore";
import {doc} from "firebase/firestore";
import dynamic from "next/dynamic";

interface Props {
    setter: (data: IMessage) => void;
    messageList: IMessage[];
    roomid: string;
}

function ChatInputMenu( {setter, messageList, roomid}: Props ) {
    const [message, setMessage] = useState("");

    const router = useRouter();
    const [authUser, authLoading, authError] = useAuthState(auth);

    const db = firestore;
    const docRef = doc(db, "rooms", roomid);
    const [user, loading, error] = useDocument(docRef);

    const HandleSubmit = (e: any) => {
        e.preventDefault();

        if (message.trim().length === 0) return;

        let data = {
            senderInternalId: user?.data()?.uid,
            sender: user?.data()?.displayName,
            content: message,
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

// export it with SSR disabled
const ChatInputMenuCSR = dynamic(() => Promise.resolve(ChatInputMenu), {
    ssr: false,
})

export default ChatInputMenuCSR