import { useEffect } from 'react'
import CartContainer from './components/CartContainer'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotals } from './features/cart/cartSlice'
function App() {
  /* 
    redux consists of following libries
    - redux (core library, state management)
    - immer (allows to mutate state)
    - redux-thunk (handles async actions)
    - reselects (simplifies reducer function) 
  */
  /* 
    Setup cart slice
    - application feature
    - create features folders/cart
    - create cartSlice.js
  */

  const { cartItems } = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])
  
  return (
    <main>
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App
