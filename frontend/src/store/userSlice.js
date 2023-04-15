import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import {
  createUser,
  resetPassword,
  userLogin,
  userLogout,
  verifiedToken,
} from '../services/auth'

const initialState = {
  user: [],
  status: 'idle',
  error: null,
}
// CHECK THE USER STILL EXIST
export const isUserExist = createAsyncThunk('user/isUserExist', async () => {
  const response = await verifiedToken({})
  return response
})

// CREATE NEW USER
export const createUserThunk = createAsyncThunk(
  'user/createUserThunk',
  async (data) => {
    const response = await createUser(data)
    return response
  }
)

// LOGOUT
export const logout = createAsyncThunk('user/logout', async () => {
  const response = await userLogout()
  return response
})

// LOGIN
export const login = createAsyncThunk('user/login', async (data) => {
  const response = await userLogin(data)
  return response
})

// RESET PASSWORD
export const userPasswordReset = createAsyncThunk(
  'user/userPasswordReset',
  async (data) => {
    const response = await resetPassword(data)
    return response
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // create user
      .addCase(createUserThunk.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(createUserThunk.fulfilled, (state, action) => {
        state.user = action.payload.data.user
        state.status = 'succeeded'
      })
      .addCase(createUserThunk.rejected, (state, action) => {
        console.log(action.payload)
      })

      // Send a request to the backend and check the cookie.
      .addCase(isUserExist.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(isUserExist.fulfilled, (state, action) => {
        if (action.payload.status !== 'fail') {
          state.status = 'succeeded'
          state.user = action.payload.currentUser
        } else {
          state.status = 'idle'
        }
      })
      .addCase(isUserExist.rejected, (state, action) => {
        console.log(action.payload)
      })

      // logout
      .addCase(logout.fulfilled, (state, action) => {
        state.user = []
        state.status = 'idle'
      })

      // login
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data.user
        state.status = 'succeeded'
      })

      // reset password

      .addCase(userPasswordReset.fulfilled, (state, action) => {
        state.user = action.payload.data.user
        state.status = 'succeeded'
      })
  },
})

export const getUser = (state) => state.user.user
export const getUserStatus = (state) => state.user.status
export const getUserError = (state) => state.user.error

export default userSlice.reducer
