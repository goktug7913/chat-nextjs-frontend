import {useEffect, useState} from "react";
import {firestore} from "@/api/firebase";
import {doc} from "firebase/firestore";
import {useDocument} from "react-firebase-hooks/firestore";

interface MessageItemProps {
    message: any;
}

export default function MessageItem({message}: MessageItemProps) {
    const db = firestore;
    const docRef = doc(db, message?.path);
    const [msg, loading, error] = useDocument(docRef);

    const [hydratedMsg, setHydratedMsg] = useState<any>(null);

    useEffect(() => {
        if (msg && !loading) {
            setHydratedMsg(msg.data());
            console.log(msg.data());
        }
    } , [msg, loading, setHydratedMsg]);

    const [formattedDate, setFormattedDate] = useState<string>("");

    useEffect(() => {
        if (hydratedMsg) {
            const date = new Date(hydratedMsg?.createdAt?.seconds * 1000);
            setFormattedDate(date.toLocaleString());
        }
    }, [hydratedMsg, setFormattedDate]);

    return (
        <div className={`text-white flex flex-col rounded-md p-2 m-2 max-w-xl${hydratedMsg?.isSelf ? " bg-violet-600" : " bg-violet-800"}`}>
            <div className="flex flex-row items-center justify-between">
                <h6 className="text-sm font-bold">{hydratedMsg?.sender.id}</h6>
                <span className="text-xs ml-2">{formattedDate}</span>
            </div>
            <p className="text-sm">{hydratedMsg?.content?.toString()}</p>
        </div>
    )
}