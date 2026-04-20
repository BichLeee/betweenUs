import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Space = {
    id: string;
    invite_code: string;
    name: string;
};

type SpaceState = {
    spaces: Space[] | null;
};

const initialState: SpaceState = {
    spaces: null,
};

const spaceSlice = createSlice({
    name: "space",
    initialState,
    reducers: {
        createSpace(state: SpaceState, action: PayloadAction<Space>) {
            if (state.spaces) {
                state.spaces.push(action.payload);
            }
        },
        setSpaces(state: SpaceState, action: PayloadAction<Space[]>) {
            state.spaces = action.payload;
        },
        addSpace(state: SpaceState, action: PayloadAction<Space>) {
            if (state.spaces) {
                state.spaces.push(action.payload);
            }
        },
    },
});

export const { createSpace, setSpaces, addSpace } = spaceSlice.actions;
export default spaceSlice.reducer;
