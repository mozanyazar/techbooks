import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import usersReducer from './userSlice'

export const store = configureStore({
  reducer: {
    user: usersReducer,
  },
})
