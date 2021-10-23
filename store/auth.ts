import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {
  constructSuccessPayload,
  constructErrorPayload,
  constructExtraReducer,
} from '~/store/helper'
import { login as loginCall, logout as logoutCall } from '~/api/auth'

interface IState {
  authenticated: boolean
  loading: object
  responses: object
}
const initialState: IState = {
  authenticated: false,
  loading: {},
  responses: {},
}

export const login = createAsyncThunk(
  'auth/login',
  async (payload: object, { rejectWithValue }) => {
    const [res, resErr] = await loginCall(payload)
    if (resErr) {
      return rejectWithValue(constructErrorPayload(resErr))
    }
    return constructSuccessPayload(res)
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    const [res, resErr] = await logoutCall()
    if (resErr) {
      return rejectWithValue(constructErrorPayload(resErr))
    }
    return constructSuccessPayload(res)
  }
)

export const reducerSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticate(state: IState) {
      state.authenticated = true
    },
  },
  extraReducers: (builder) => {
    constructExtraReducer(builder, login, (state: IState) => {
      state.authenticated = true
    })
    constructExtraReducer(builder, logout, (state: IState) => {
      state.authenticated = false
    })
  },
})

export const { authenticate } = reducerSlice.actions
export default reducerSlice.reducer
