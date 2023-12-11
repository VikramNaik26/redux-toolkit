import { useEffect } from 'react'
import CartContainer from './components/CartContainer'
import Navbar from './components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { calculateTotals, getCartItems } from './features/cart/cartSlice'
import Modal from './components/Modal'
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

  const { cartItems, isLoading } = useSelector((store) => store.cart)
  const { isOpen } = useSelector((store) => store.modal)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartItems])

  useEffect(() => {
    dispatch(getCartItems())
  }, [])

  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading</h1>
      </div>
    )
  }

  return (
    <main>
      {isOpen && <Modal />}
      <Navbar />
      <CartContainer />
    </main>
  )
}
export default App
