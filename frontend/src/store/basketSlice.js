import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { deleteItem, getBasket, updateBasket } from '../services/basket'

const initialState = {
  basket: [],
  status: 'idle',
  error: null,
}
export const getUserBasket = createAsyncThunk(
  'basket/getUserBasket',
  async () => {
    const response = await getBasket()
    return response
  }
)
export const updateUserBasket = createAsyncThunk(
  'basket/updateUserBasket',
  async (data) => {
    const response = await updateBasket(data)
    return response
  }
)
export const removeItemFromBasket = createAsyncThunk(
  'basket/removeItemFromBasket',
  async (data) => {
    const response = await deleteItem(data)
    return response
  }
)

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserBasket.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(getUserBasket.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.basket = action.payload.data
      })
      .addCase(getUserBasket.rejected, (state, action) => {})

      .addCase(updateUserBasket.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(updateUserBasket.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.basket = action.payload.data
      })
      .addCase(updateUserBasket.rejected, (state, action) => {})
      .addCase(removeItemFromBasket.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.basket = action.payload.data
      })
  },
})

export const basket = (state) => state.basket.basket
export const getBasketStatus = (state) => state.basket.status
export const getBasketError = (state) => state.basket.error
export default basketSlice.reducer
