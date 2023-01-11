import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
    user: {},
}

const initialState: UserState = {
    user: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, payload) {
            state.user = payload
        }
    }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer