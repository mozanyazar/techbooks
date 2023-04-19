import { configureStore } from '@reduxjs/toolkit'
// import counterReducer from '../features/counter/counterSlice'
import usersReducer from './userSlice'
import blogsReducer from './blogSlice'
export const store = configureStore({
  reducer: {
    user: usersReducer,
    blogs: blogsReducer,
  },
})
