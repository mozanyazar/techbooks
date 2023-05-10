import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './userSlice'
import blogsReducer from './blogSlice'
import latestReducer from './homeSlice'
import productsReducers from './productSlice'
import basketReducers from './basketSlice'

export const store = configureStore({
  reducer: {
    user: usersReducer,
    blogs: blogsReducer,
    latestBlogs: latestReducer,
    products: productsReducers,
    basket: basketReducers,
  },
})
