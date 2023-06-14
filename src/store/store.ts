import {configureStore} from '@reduxjs/toolkit';
import post from "./post";
export const store = configureStore({
	reducer: post
})

export type AppDispatch = typeof store.dispatch;
export type RootSelector = ReturnType<typeof store.getState>