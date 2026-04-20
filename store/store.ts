import { configureStore } from "@reduxjs/toolkit";

import spaceReducer from "./spaceSlice";
import userReducer from "./userSlice";

const store = configureStore({
    reducer: {
        user: userReducer,
        space: spaceReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
