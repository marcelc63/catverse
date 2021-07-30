import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  constructSuccessPayload,
  constructErrorPayload,
  constructExtraReducer,
} from '~/store/helper'
import { get as getCall, register as registerCall } from '~/api/user'
import { authenticate } from '~/store/auth'

interface IState {
  user: object
  loading: object
  responses: object
}
const initialState = { user: {}, loading: {}, responses: {} } as IState

export const get = createAsyncThunk(
  'user/get',
  async (_, { rejectWithValue, dispatch }) => {
    const [res, resErr] = await getCall()
    if (resErr) {
      return rejectWithValue(constructErrorPayload(resErr))
    }
    dispatch({
      type: authenticate.toString(),
      payload: constructSuccessPayload(res),
    })
    return constructSuccessPayload(res)
  }
)

export const register = createAsyncThunk(
  'user/register',
  async (payload: object, { rejectWithValue, dispatch }) => {
    const [res, resErr] = await registerCall(payload)
    if (resErr) {
      return rejectWithValue(constructErrorPayload(resErr))
    }
    dispatch({
      type: authenticate.toString(),
      payload: constructSuccessPayload(res),
    })
    return constructSuccessPayload(res)
  }
)

export const reducerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetResponse(state: any, action: PayloadAction<any>) {
      const apiName = action.payload
      state.responses = {
        ...state.responses,
        [apiName]: null,
      }
    },
  },
  extraReducers: (builder) => {
    constructExtraReducer(
      builder,
      get,
      (_: IState, action: PayloadAction<any>) => {
        return {
          user: action.payload.user,
        }
      }
    )
    constructExtraReducer(builder, register)
  },
})

export const { resetResponse } = reducerSlice.actions
export default reducerSlice.reducer
