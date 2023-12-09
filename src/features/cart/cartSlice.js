import { createSlice } from '@reduxjs/toolkit'
import cartItems from '../../cartItems'

const initialState = {
  cartItems: cartItems,
  amount: 2,
  total: 0,
  isLoading: true,
}
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
  },
})

export const { clearCart, removeItem } = cartSlice.actions
export default cartSlice.reducer
