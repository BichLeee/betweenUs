import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
    id: string;
    email: string;
    username: string;
    name?: string;
};

type UserState = {
    user: User | null;
};

const initialState: UserState = {
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state: UserState, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        clearUser(state: UserState) {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
