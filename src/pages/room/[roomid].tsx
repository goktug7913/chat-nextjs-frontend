import {useRouter} from "next/router";
import Head from "next/head";
import AppBar from "@/components/AppBar";
import {IRoom} from "@/types/IRoom";
import {useEffect, useState} from "react";
import AxiosInstance from "@/api/axiosInstance";

export default function Room()
{
    // Query parameters
    const router = useRouter();
    const { roomid } = router.query;
    const [room, setRoom] = useState<IRoom>(null as unknown as IRoom);

    useEffect(() => {
        // Load room data
        AxiosInstance.get(`/rooms/get/${roomid}`).then((response) => {
            if (response.status === 200) {
                setRoom(response.data);
            }
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <Head>
                <title>Room {roomid}</title>
            </Head>

            <AppBar/>

            <div className="flex flex-col items-center justify-center h-screen text-white">
                <h6 className="text-2xl font-bold m-1">{room?.name+" "+room?.joinTag}</h6>
                <p className="text-xl m-1">{room?.shortDescription}</p>

                <p className="text-l m-1">{"Created by: "+room?.owner}</p>
                <p className="text-l m-1">{room?.private ? "Private" : "Public"}</p>

                <div className="flex flex-col items-center justify-center m-1">
                    <p className="text-l m-1">Users:</p>
                    <ul className={"list-disc m-1"}>
                    {
                        room?.users.map((user) => {
                            return <li key={user}>{user}</li>
                        })
                    }
                    </ul>
                </div>

            </div>
        </>
    )
}
