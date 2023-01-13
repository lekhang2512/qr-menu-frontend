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

export const googleLoginCallback = createAsyncThunk('oauth/google/callback', async (params: any, { rejectWithValue, dispatch }) => {
    let { status, response } = await authRepo.googleLoginCallback(params)

    if (!status) {
        dispatch(show({
            content: response,
            severity: 'error'
        }))
        return rejectWithValue(response)
    }

    dispatch(show({
        content: 'Google sign in success',
        severity: 'success'
    }))

    return response
  }
)

export const resetPassword = createAsyncThunk('user/reset-password', async (data: any, { rejectWithValue, dispatch }) => {
    let { status, response } = await authRepo.resetPassword(data)

    if (!status) {
        dispatch(show({
            content: response,
            severity: 'error'
        }))
        return rejectWithValue(response)
    }

    dispatch(show({
        content: 'Reset password success please check email',
        severity: 'success'
    }))

    return response
  }
)

export const createPassword = createAsyncThunk('user/create-password', async (data: any, { rejectWithValue, dispatch }) => {
    let { status, response } = await authRepo.createPassword(data)

    if (!status) {
        dispatch(show({
            content: response,
            severity: 'error'
        }))
        return rejectWithValue(response)
    }

    dispatch(show({
        content: 'Reset password success',
        severity: 'success'
    }))

    return response
  }
)

interface UserState {
    isLoading: boolean,
    errorMessage: string,
    tokens: any,
    isAuthenticated: boolean,
    user: {},
    isRegistered: boolean,
    isCreatePassword: boolean,
}

let userToken = null

if (typeof document !== 'undefined') {
    userToken = getCookie('dd_tokens')
      ? getCookie('dd_tokens')
      : null
}

const initialState: UserState = {
    isLoading: false,
    errorMessage: '',
    tokens: userToken ? JSON.parse(`${userToken}`) : {},
    isAuthenticated: false,
    user: {},
    isRegistered: false,
    isCreatePassword: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTokens(state, payload) {
            state.tokens = payload
        },
        resetStateLogin(state) {
            state.isAuthenticated = false
        },
        resetStateSignUp(state) {
            state.isRegistered = false
        },
        resetStateCreatePassword(state) {
            state.isCreatePassword = false
        }
    },
    extraReducers: (builder) => {
        builder.addCase(signIn.pending, (state) => {
            state.isLoading = true
            state.isAuthenticated = false
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
            state.isRegistered = false
        })

        builder.addCase(signUp.fulfilled, (state, action) => {
            state.isLoading = false
            state.user = action.payload.user
            state.isRegistered = true
            state.isAuthenticated = false
        })

        builder.addCase(signUp.rejected, (state, action) => {
            state.isLoading = false
        })

        builder.addCase(googleLoginCallback.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(googleLoginCallback.fulfilled, (state, action) => {
            state.isLoading = false
            state.tokens = action.payload.tokens
            state.isAuthenticated = true
            state.isRegistered = false
        })

        builder.addCase(googleLoginCallback.rejected, (state, action) => {
            state.isLoading = false
        })

        builder.addCase(resetPassword.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.isLoading = false
        })

        builder.addCase(resetPassword.rejected, (state, action) => {
            state.isLoading = false
        })

        builder.addCase(createPassword.pending, (state) => {
            state.isLoading = true
        })

        builder.addCase(createPassword.fulfilled, (state, action) => {
            state.isLoading = false
            state.isCreatePassword = true
            state.isAuthenticated = false
        })

        builder.addCase(createPassword.rejected, (state, action) => {
            state.isLoading = false
        })
    },
})

export const { setTokens, resetStateLogin, resetStateSignUp, resetStateCreatePassword } = userSlice.actions
export default userSlice.reducer