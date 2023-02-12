import Head from "next/head";
import AppBar from "@/components/AppBar";
import React, {useContext, useState} from "react";
import axiosInstance from "@/api/axiosInstance";
import {useRouter} from "next/router";
import {IRoom} from "@/types/IRoom";
import {UserContext} from "@/context/userContext";

export default function NewRoom()
{
    const [roomname, setRoomname] = useState("");
    const [roomdesc, setRoomdesc] = useState("");
    const [roomJoinTag, setRoomJoinTag] = useState("#");
    const [roonTags, setRoomTags] = useState<string[]>([]);
    const [isPrivate, setIsPrivate] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const user = useContext(UserContext).user;
    const setUser = useContext(UserContext).setUser;

    const router = useRouter();


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const room: IRoom = {
            name: roomname,
            shortDescription: roomdesc,
            joinTag: roomJoinTag,
            tags: roonTags,
            private: isPrivate,
            owner: "", // Backend will set this
            admins: [], // TODO: Ability to add admins on room creation
            messages: [],
            users: [],
            createdAt: new Date().toString(),
        }

        setLoading(true);

        axiosInstance.post("/rooms/new", room).then((response) => {
            console.log(response);
            setLoading(false);
            if (response.status === 200) {
                // Server will return the updated user object, which we can use to update the context
                setUser(response.data.user);

                router.replace("/rooms")
            } else {setError("Something went wrong")}
        }).catch((error) => {
            console.log(error);
            setLoading(false);
            setError(error.response.data.message);
        });
    }

    const SetField = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name)
        {
            case "roomname":
                setRoomname(e.target.value);
                break;
            case "roomdesc":
                setRoomdesc(e.target.value);
                break;
            case "roomJoinTag":
                // There has to be a # at the start of the join tag, which can't be removed
                let value = e.target.value;
                if (value[0] !== "#")
                {
                    value = "#" + value;
                }
                setRoomJoinTag(value);
                break;
            case "roomTags":
                setRoomTags(e.target.value.split(","));
                break;
            case "isPrivate":
                setIsPrivate(e.target.checked);
                break;
        }
    }

    return (
        <>
            <Head>
                <title>Chatter - New Room</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <AppBar />

            <div className="grid h-screen place-items-center">
                <div className="flex flex-col items-center justify-center w-full max-w-sm p-4 m-3 bg-white rounded-lg shadow-md">
                    <h6 className="text-2xl font-bold">Create a Room</h6>

                    <form className="flex flex-col w-full" onSubmit={handleSubmit}>
                        <label htmlFor="roomname" className="text-sm font-medium text-gray-500">Room Name</label>
                        <input type="text" id="roomname" name="roomname" placeholder="Room Name"
                               className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                               onChange={SetField} value={roomname}
                        />

                        <label htmlFor="roomdesc" className="text-sm font-medium text-gray-500">Room Description</label>
                        <input type="text" id="roomdesc" name="roomdesc" placeholder="Room Description"
                               className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                               onChange={SetField} value={roomdesc}
                        />

                        <label htmlFor="roomJoinTag" className="text-sm font-medium text-gray-500">Room Join Tag</label>
                        <input type="text" id="roomJoinTag" name="roomJoinTag" placeholder="Room Join Tag"
                               className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                               onChange={SetField} value={roomJoinTag}
                        />

                        <label htmlFor="roomTags" className="text-sm font-medium text-gray-500">Room Tags</label>
                        <input type="text" id="roomTags" name="roomTags" placeholder="Room Tags"
                               className="px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                               onChange={SetField} value={roonTags}
                        />

                        <div className="flex items-center justify-left items-baseline mt-2">
                            <input type="checkbox" id="isPrivate" name="isPrivate" className="mt-0 mr-1" onChange={SetField} checked={isPrivate}/>
                            <label htmlFor="isPrivate" className="text-sm font-medium text-gray-500">Private Room (Not discoverable, invite only joins.)</label>
                        </div>

                        {error && <p className="text-sm text-red-500">{error}</p>}

                        <button type="submit" className="px-4 py-2 mt-6 font-medium text-white uppercase bg-indigo-500 rounded-md focus:outline-none focus:bg-indigo-600 hover:bg-indigo-600">
                            {loading ? "Loading..." : "Create Room"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}