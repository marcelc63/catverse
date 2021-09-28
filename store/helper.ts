import {
  ActionReducerMapBuilder,
  AsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit'
import { Loading } from '~/interfaces/Responses'

export const constructStaticPayload = (res: any) => {
  return {
    status: 200,
    statusText: 'Static',
    body: res,
  }
}
export const constructSuccessPayload = (res: any) => {
  return {
    status: res.status,
    statusText: res.statusText,
    body: res.data,
  }
}

export const constructErrorPayload = (err: any) => {
  return {
    status: err.status,
    statusText: err.statusText,
    body: err.data,
  }
}

export const constructDataValidationErrorPayload = (err: any) => {
  return {
    status: 412,
    statusText: 'Data Validation Error',
    body: err.data,
  }
}

export const mutateStateOnFulfilled = (
  state: any,
  apiName: string,
  payload: any
) => {
  return {
    ...state,
    loading: {
      ...state.loading,
      [apiName]: 'fulflled' as Loading,
    },
    responses: {
      ...state.responses,
      [apiName]: payload,
    },
  }
}

export const mutateStateOnPending = (state: any, apiName: string) => {
  return {
    ...state,
    loading: {
      ...state.loading,
      [apiName]: 'pending' as Loading,
    },
    responses: {
      ...state.responses,
      [apiName]: null,
    },
  }
}

export const mutateStateOnRejected = (
  state: any,
  apiName: string,
  payload: any
) => {
  return {
    ...state,
    loading: {
      ...state.loading,
      [apiName]: 'failed' as Loading,
    },
    responses: {
      ...state.responses,
      [apiName]: payload,
    },
  }
}

export const constructExtraReducer = (
  builder: ActionReducerMapBuilder<any>,
  thunk: AsyncThunk<any, any, {}>,
  mapState?: Function
) => {
  builder.addCase(thunk.fulfilled, (state, action: PayloadAction<any>) => {
    if (mapState) {
      const payload: PayloadAction<any> = {
        payload: action.payload.body,
        type: action.type,
      }
      return {
        ...mutateStateOnFulfilled(state, thunk.typePrefix, action),
        ...mapState(state, payload),
      }
    }
    return {
      ...mutateStateOnFulfilled(state, thunk.typePrefix, action),
    }
  })
  builder.addCase(thunk.pending, (state) => {
    return {
      ...mutateStateOnPending(state, thunk.typePrefix),
    }
  })
  builder.addCase(thunk.rejected, (state, action) => {
    return {
      ...mutateStateOnRejected(state, thunk.typePrefix, action),
    }
  })
}
