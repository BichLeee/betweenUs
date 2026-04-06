import axios from "axios";
import { supabase } from "./supabase";

export const api = axios.create({
    baseURL: process.env.EXPO_PUBLIC_API_URL, // BE URL
});

let accessToken: string | null = null;
supabase.auth.onAuthStateChange((event, session) => {
    accessToken = session?.access_token || null;
});

api.interceptors.request.use((config) => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export const initAuth = async () => {
    const { data } = await supabase.auth.getSession();
    accessToken = data.session?.access_token || null;
};
