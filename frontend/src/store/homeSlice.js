import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllBlogs } from '../services/blog'

const initialState = {
  latestBlogs: [],
  status: 'idle',
  error: null,
}
export const latest3Blog = createAsyncThunk('blogs/latest3Blog', async () => {
  const response = await getAllBlogs('?limit=3')
  return response
})

const userSlice = createSlice({
  name: 'latestBlogs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(latest3Blog.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(latest3Blog.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.latestBlogs = action.payload.data
      })
      .addCase(latest3Blog.rejected, (state, action) => {})
  },
})

export const latestBlogs = (state) => state.latestBlogs.latestBlogs
export const latestBlogsStatus = (state) => state.latestBlogs.status
export const latestBlogsError = (state) => state.latestBlogs.error

export default userSlice.reducer
