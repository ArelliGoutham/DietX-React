import { applyMiddleware, compose } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

export const combinedMiddleware = compose(
    applyMiddleware(
        thunk
    )
)