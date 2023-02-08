export interface IRoom {
    name: string,
    shortDescription: string,
    joinTag: string,
    tags: string[],
    private: boolean,
    owner: string,
    admins: string[],
    users: string[],
    messages: string[],
    createdAt?: Date,
}