import axios from 'axios';
import {useRouter} from "next/router";
const deployUrl = "https://chatsv.goktug.xyz/api";
const devUrl = "http://localhost:3001/api";

const axiosInstance = axios.create({
    baseURL: process.env.NODE_ENV === "production" ? deployUrl : devUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
    async (config) => {
        // Do something before request is sent
        // Right now we need to read the token from User object in the local storage
        // and add it to the header of the request
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        } else {
            // Check if the user is trying to login
            if (config.url === '/auth/login' || config.url === '/auth/register') {
                // We don't need to add the token to the header as the user is trying to login or register
            } else {
                console.log("User is not logged in");
                // Redirect the user to login page with NEXT router
                const router = useRouter();
                await router.push('/login');
            }
        }

        return config;
    }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
    (response) => {
        // Do something with response data
        console.log("Response interceptor:");
        console.log(response);

        // If the response is 401, the user is not authorized
        if (response.status === 401) {
            // Redirect the user to login page with NEXT router
            const router = useRouter();
            router.push('/login');
            // TODO: Try to refresh the token, if it fails, redirect to login with a message
        }
        return response;
    }
);

export default axiosInstance;