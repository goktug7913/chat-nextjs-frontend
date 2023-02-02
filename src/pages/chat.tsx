import MessageItem from "@/components/MessageItem";
import ChatInputMenu from "@/components/ChatInputMenu";

const MockMessages = [
    {
        id: 1,
        content: "Hello World!",
        createdAt: "2021-03-21T15:00:00.000Z",
        updatedAt: "2021-03-21T15:00:00.000Z",
        user: "John Doe",
        isMine: true,
    },
    {
        id: 2,
        content: "Hello World!",
        createdAt: "2021-03-21T15:00:00.000Z",
        updatedAt: "2021-03-21T15:00:00.000Z",
        user: "Jane Doe",
    },
    {
        id: 3,
        content: "Hello World!",
        createdAt: "2021-03-21T15:00:00.000Z",
        updatedAt: "2021-03-21T15:00:00.000Z",
        user: "John Doe",
        isMine: true,
    },
    {
        id: 4,
        content: "Hello World!",
        createdAt: "2021-03-21T15:00:00.000Z",
        updatedAt: "2021-03-21T15:00:00.000Z",
        user: "Jane Doe",
    },
    {
        id: 5,
        content: "Hello World!",
        createdAt: "2021-03-21T15:00:00.000Z",
        updatedAt: "2021-03-21T15:00:00.000Z",
        user: "John Doe",
        isMine: true,
    },
    {
        id: 6,
        content: "Hello World!",
        createdAt: "2021-03-21T15:00:00.000Z",
        updatedAt: "2021-03-21T15:00:00.000Z",
        user: "Jane Doe",
    }
];


export default function Chat() {

    return (
        <div style={{width: "100vw", height:"100%", minHeight:"100%", boxSizing:"border-box", overflow:"hidden"}}>
            <div className="flex-1 overflow-y-auto">
                {MockMessages.map((message) => (
                    <MessageItem key={message.id} message={message} />
                ))}
            </div>
            <div className="flex flex-row justify-between w-full h-12 self-end">
                <ChatInputMenu />
            </div>
        </div>
    )
}