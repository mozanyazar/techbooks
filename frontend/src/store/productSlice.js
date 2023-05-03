import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getAllProducts } from '../services/products'

const initialState = {
  products: [],
  status: 'idle',
  error: null,
}
export const allProducts = createAsyncThunk(
  'products/allProducts',
  async (query) => {
    const response = await getAllProducts(query)
    return response
  }
)

const userSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(allProducts.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(allProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.products = action.payload.data
      })
      .addCase(allProducts.rejected, (state, action) => {})
  },
})

export const getProducts = (state) => state.products.products
export const getProductsStatus = (state) => state.products.status
export const getProductsError = (state) => state.products.error

export default userSlice.reducer
