import {useRouter} from "next/router";
import Chat from "@/components/chat";

export default function Room()
{
    // Query parameters
    const router = useRouter();
    const {roomid} = router.query;

    return (
        <>
            <Chat roomid={roomid?.toString()}/>
        </>
    )
}