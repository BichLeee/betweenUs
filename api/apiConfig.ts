import axios from "axios";

import { supabase } from "./supabase";

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL, // BE URL
});

let accessToken: string | null = null;
let failedQueue: any[] = [];
let isRefreshing = false;

supabase.auth.onAuthStateChange((event, session) => {
    accessToken = session?.access_token || null;
});

const processQueue = (error: any, token: string | null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // if no response (network error)
        if (!error.response) {
            return Promise.reject({
                message: "Network error",
            });
        }
        // handle global errors (401, refresh token, etc.)
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                // queue requests while refreshing
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            // call refresh token API
            const res = await axios.post("https://your-api.com/refresh", {
                refreshToken: "your_refresh_token",
            });

            const newToken = res.data.accessToken;

            // update default header
            api.defaults.headers.Authorization = `Bearer ${newToken}`;

            processQueue(null, newToken);

            // retry original request
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            processQueue(refreshError, null);

            // logout user here if needed
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    },
);

export const initAuth = async (access_token: string | null) => {
    accessToken = access_token;
};
