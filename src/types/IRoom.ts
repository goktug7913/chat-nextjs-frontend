export interface IRoom {
    _id?: string,
    name: string,
    shortDescription: string,
    joinTag: string,
    tags: string[],
    private: boolean,
    owner: string,
    admins: string[],
    users: string[],
    messages: string[],
    createdAt?: string,
}