import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
// import cartItems from '../../cartItems'
import axios from 'axios'
import { openModal } from '../modal/modalSlice'

const url = 'https://course-api.com/react-useReducer-cart-project'

const initialState = {
  cartItems: [],
  amount: 2,
  total: 0,
  isLoading: true,
}

/* export const getCartItems = createAsyncThunk('cart/getCartItems', () => {
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err))
}) */

export const getCartItems = createAsyncThunk(
  'cart/getCartItems',
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url)
      // console.log(thunkAPI)
      // console.log(thunkAPI.getState())
      // console.log(thunkAPI.dispatch(openModal()))
      return resp.data
    } catch (error) {
      return thunkAPI.rejectWithValue('Something went wrong')
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = []
      // return { ...initialState, cartItems: [] }
    },
    removeItem: (state, action) => {
      // console.log(action)
      const itemId = action.payload
      state.cartItems = state.cartItems.filter((items) => items.id !== itemId)
    },
    increase: (state, { payload }) => {
      // console.log(payload)
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      // console.log({ ...cartItem })
      cartItem.amount = cartItem.amount + 1
    },
    decrease: (state, { payload }) => {
      // console.log(payload)
      const cartItem = state.cartItems.find((item) => item.id === payload.id)
      cartItem.amount = cartItem.amount - 1
    },
    calculateTotals: (state) => {
      let amount = 0
      let value = 0
      state.cartItems.forEach((item) => {
        amount += item.amount
        value = item.amount * item.price
      })
      state.amount = amount
      state.total = value
    },
  },
  /* extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false
      // console.log(action.payload)
      state.cartItems = action.payload
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false
      console.log(action)
    },
  }, */
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.isLoading = false
        // console.log(action.payload)
        state.cartItems = action.payload
      })
      .addCase(getCartItems.rejected, (state, action) => {
        state.isLoading = false
        console.log(action)
      })
  },
})

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions
export default cartSlice.reducer
