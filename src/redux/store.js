import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { combinedMiddleware } from "./combineMiddleware";

export const store = configureStore({
    reducer: rootReducer,
    combinedMiddleware
});