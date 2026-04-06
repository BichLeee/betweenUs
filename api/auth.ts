import { api } from "./apiConfig";
import { supabase } from "./supabase";

export const signUp = async (email: string, password: string, username: string, name: string) => {
    return supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username,
                name,
            },
        },
    });
};

export const signIn = async (email: string, password: string) => {
    // to get token
    await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return api.get("/auth/me");
};

export const signOut = async () => {
    return supabase.auth.signOut();
};

export const getUser = async () => {
    return supabase.auth.getUser();
};
