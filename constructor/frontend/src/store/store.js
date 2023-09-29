import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {postAPI} from "../services/rtkAPI";

const rootReducer = combineReducers({
    [postAPI.reducerPath]: postAPI.reducer,
})

export const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(postAPI.middleware)
})
