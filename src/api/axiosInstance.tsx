import axios from 'axios';
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
            if (config.url === '/auth/login') {
                // We don't need to add the token to the header as the user is trying to login
            } else {
                // TODO: Redirect to login page
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
        return response;
    }
);

export default axiosInstance;