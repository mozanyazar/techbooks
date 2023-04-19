import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllBlogs } from '../services/blog'

const initialState = {
  blogs: [],
  status: 'idle',
  error: null,
}
// CHECK THE USER STILL EXIST
export const allBlogs = createAsyncThunk('blogs/allBlogs', async (query) => {
  console.log(query)
  const response = await getAllBlogs(query)
  return response
})

const userSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(allBlogs.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(allBlogs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.blogs = action.payload.data
      })
      .addCase(allBlogs.rejected, (state, action) => {})
  },
})

export const getBlogs = (state) => state.blogs.blogs
export const getBlogsStatus = (state) => state.blogs.status
export const getBlogsError = (state) => state.blogs.error

export default userSlice.reducer
