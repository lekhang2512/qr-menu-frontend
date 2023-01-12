import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import AuthRepository from '../../app/repositories/AuthRepository'
import { show } from '../notify/notify-slice'
import { getCookie, setCookie } from 'typescript-cookie'

const authRepo = new AuthRepository()

export const signIn = createAsyncThunk('user/sign/in', async (data: any, { rejectWithValue, dispatch }) => {
    let { status, response } = await authRepo.signIn(data)

    if (!status) {
        dispatch(show({
            content: response,
            severity: 'error'
        }))
        return rejectWithValue(response)
    }

    dispatch(show({
        content: 'Sign in success',
        severity: 'success'
    }))

    setCookie('dd_tokens', JSON.stringify(response.tokens))

    return response
  }
)

export const signUp = createAsyncThunk('user/sign/up', async (data: any, { rejectWithValue, dispatch }) => {
    let { status, response } = await authRepo.signUp(data)

    if (!status) {
        dispatch(show({
            content: response,
            severity: 'error'
        }))
        return rejectWithValue(response)
    }

    dispatch(show({
        content: 'Sign up success',
        severity: 'success'
    }))

    return response
  }
)

export const googleLogin = async (params = {}) => {
    let { status, response } = await authRepo.googleLogin(params)

    if (!status) {
        return response
    }

    return response
}


interface UserState {
    isLoading: boolean,
    errorMessage: string,
    tokens: any,
    isAuthenticated: boolean,
    user: {},
    isRegistered: boolean,
}

let userToken = null

if (typeof document !== 'undefined') {
    userToken = getCookie('dd_tokens')
      ? getCookie('dd_tokens')
      : {}
}

const initialState: UserState = {
    isLoading: false,
    errorMessage: '',
    tokens: userToken ? JSON.parse(`${userToken}`) : {},
    isAuthenticated: false,
    user: {},
    isRegistered: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTokens(state, payload) {
            state.tokens = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(signIn.fulfilled, (state, action) => {
            state.isLoading = false
            state.tokens = action.payload.tokens
            state.isAuthenticated = true
        })

        builder.addCase(signIn.rejected, (state, action) => {
            state.isLoading = false
        })

        builder.addCase(signUp.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(signUp.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.isRegistered = true
        })

        builder.addCase(signUp.rejected, (state, action) => {
            state.isLoading = false
        })
    },
})

export const { setTokens } = userSlice.actions
export default userSlice.reducer