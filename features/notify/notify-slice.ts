import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NotifyState {
    active: boolean,
    content: string,
    severity: any,
}

const initialState: NotifyState = {
    active: false,
    content: '',
    severity: 'error',
}

const notifySlice = createSlice({
    name: 'notify',
    initialState,
    reducers: {
        show(state, action: PayloadAction<any>) {
            state.active = true
            state.content = action.payload.content
            state.severity = action.payload.severity
        },
        hide(state) {
            state.active = false
        }
    },
})

export const { show, hide } = notifySlice.actions
export default notifySlice.reducer