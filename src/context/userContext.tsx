import React, {useReducer} from "react";

export interface User {
    _id: string;
    token: string;
    tokenRefresh: string;
    username: string,
    password?: string | null, // password is optional as it is not returned in a response
    email: string,
    registerDate?: Date,
    lastLogin?: Date,
    rooms?: string[],
    messages?: string[],
    friends?: string[],
    friendRequests?: string[],
    friendRequestsSent?: string[],
    blockedUsers?: string[],
    blockedBy?: string[],
    online?: boolean,
    socketId?: string,
    profilePicture?: string,
    createdAt?: Date,
}

interface UserContext {
    user: User;
    setUser: (user: User) => void;
}

const initialState: UserContext = {
    user: {} as User,
    setUser: () => {},
};

export enum UserActionType {
    SET_USER = "SET_USER",
    SET_USERNAME = "SET_USERNAME",
    SET_TOKEN = "SET_TOKEN",
}

const reducer = (state: UserContext, action: {type: string; payload: User}) => {
    switch (action.type) {
        case UserActionType.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case UserActionType.SET_USERNAME:
            return {
                ...state,
                user: {
                    ...state.user,
                    nickname: action.payload.username,
                }
            };
        case UserActionType.SET_TOKEN:
            return {
                ...state,
                user: {
                    ...state.user,
                    token: action.payload.token,
                }
            };
        default:
            return state;
    }
};

export const UserContext = React.createContext<UserContext>(initialState);

export const UserProvider = ({children}: {children: React.ReactNode}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Load user from local storage
    React.useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            dispatch({type: UserActionType.SET_USER, payload: JSON.parse(user)});
        }
    }, []);

    // Save user to local storage on change
    React.useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    return (
        <UserContext.Provider value={{user: state.user, setUser: (user: User) => dispatch({type: UserActionType.SET_USER, payload: user})}}>
            {children}
        </UserContext.Provider>
    );
};