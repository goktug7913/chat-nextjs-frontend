export default interface IMessage {
    senderInternalId: string,
    sender: string,
    content: string
    date: Date,
    dateEdited?: Date,
    room: string,
    edited?: boolean,
    deleted?: boolean,
    isSelf?: boolean,
}