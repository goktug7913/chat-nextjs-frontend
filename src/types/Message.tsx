export default interface Message {
    sender: string,
    message: string
    date: string,
    isSelf?: boolean
}