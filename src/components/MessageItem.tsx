import {useEffect, useState} from "react";
import {auth, firestore} from "@/api/firebase";
import {doc, getDoc} from "firebase/firestore";
import {useDocument} from "react-firebase-hooks/firestore";
import {useAuthState} from "react-firebase-hooks/auth";

interface MessageItemProps {
    message: any;
}

export default function MessageItem({message}: MessageItemProps) {
    const [authUser, authLoading, authError] = useAuthState(auth);

    const db = firestore;
    const docRef = doc(db, message?.path);
    const [msg, loading, error] = useDocument(docRef);

    let senderRef;

    const [hydratedMsg, setHydratedMsg] = useState<any>(null);
    const [resolvedSender, setResolvedSender] = useState<any>(null);
    const [resolvedSenderName, setResolvedSenderName] = useState<string>("");
    const [formattedDate, setFormattedDate] = useState<string>("");

    useEffect(() => {
        if (msg && !loading) {
            setHydratedMsg(msg.data());
        }
    } , [msg, loading, setHydratedMsg]);

    useEffect(() => {
        if (hydratedMsg) {
            const date = new Date(hydratedMsg?.createdAt);
            // Display only hh:mm if the message was sent today, otherwise display the full date
            const formattedDate = date.toLocaleDateString() === new Date().toLocaleDateString() ? date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : date.toLocaleDateString();
            setFormattedDate(formattedDate);

            senderRef = doc(db, hydratedMsg?.sender?.path);
            getDoc(senderRef).then((doc) => {
                if (doc.exists()) {
                    setResolvedSender(doc.data());
                    setResolvedSenderName(doc.data()?.displayName);
                } else {
                    console.log("No such document!");
                }
            });
        }
    }, [hydratedMsg, setFormattedDate]);

    return (
        loading ?
            <div className={`text-white flex flex-col rounded-md p-2 m-2 max-w-xl transition-all bg-gray-600`}>
                <div className="flex flex-row items-center justify-between">
                    <img src={resolvedSender?.photoURL} className="w-8 h-8 rounded-md mr-2 flex shrink" />
                    <div className="flex flex-col items-start grow">
                        <div className="flex flex-row items-center justify-between">
                            <h6 className="text-sm font-bold">{resolvedSenderName ? resolvedSenderName : "Loading..."}</h6>
                            <span className="text-xs ml-2">...</span>
                        </div>
                        <p className="text-sm">{hydratedMsg?.content ? hydratedMsg.content : "Loading..."}</p>
                    </div>
                </div>
            </div>
            :
            <div className={`text-white flex flex-col rounded-md py-1.5 px-2 my-0.5 max-w-xl min-w-[15em] transition-all${resolvedSenderName==authUser?.displayName ? " bg-violet-700 justify-self-end":" bg-violet-900 justify-self-start"}`}>
                <div className="flex flex-row items-center justify-between">
                    <img src={resolvedSender?.photoURL} className="w-10 h-10 rounded-md mr-2 flex flex-shrink" />

                    <div className="flex flex-col items-start grow">
                        <div className="flex flex-row items-center justify-between">
                            <h6 className="text-sm font-bold">{resolvedSenderName ? resolvedSenderName : "Loading..."}</h6>
                            <span className="text-xs ml-2">{formattedDate}</span>
                        </div>
                        <p className="text-sm">{hydratedMsg?.content ? hydratedMsg.content : "Loading..."}</p>
                    </div>

                </div>
            </div>
    )
}