import {
  configureStore,
  combineReducers,
  createAction,
  Action,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import authReducer from '~/store/auth'
import userReducer from '~/store/user'

export const RESET_REDUX = createAction<void>('RESET_REDUX')

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
})
const rootReducer = (state: any, action: Action) => {
  if (RESET_REDUX.match(action)) {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}
const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
