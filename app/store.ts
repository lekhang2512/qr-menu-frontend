import { configureStore } from "@reduxjs/toolkit"
import notifyReducers from '../features/notify/notify-slice'
import userReducers from '../features/user/user-slice'

export const store = configureStore({
    reducer: {
        notify: notifyReducers,
        user: userReducers
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>