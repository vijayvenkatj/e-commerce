"use client"

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart/cartSlice";

export const store = configureStore({
    reducer:{
        cart: cartReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredPaths: ['payload.headers'],
            },
        }),
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;