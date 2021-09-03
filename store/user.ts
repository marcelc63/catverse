import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import {
  constructSuccessPayload,
  constructErrorPayload,
  constructDataValidationErrorPayload,
  constructExtraReducer,
} from '~/store/helper'
import { get as getCall, register as registerCall } from '~/api/user'
import { authenticate } from '~/store/auth'
import { schema } from '~/interfaces/Register'

interface IState {
  user: object
  loading: object
  responses: object
}
const initialState: IState = { user: {}, loading: {}, responses: {} }

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
    try {
      const validatedPayload = schema.parse(payload)
      const [res, resErr] = await registerCall(validatedPayload)
      if (resErr) {
        return rejectWithValue(constructErrorPayload(resErr))
      }
      dispatch({
        type: authenticate.toString(),
        payload: constructSuccessPayload(res),
      })
      return constructSuccessPayload(res)
    } catch (err) {
      return rejectWithValue(constructDataValidationErrorPayload(err))
    }
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
