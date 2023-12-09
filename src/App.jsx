import Navbar from './components/Navbar'
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
  return (
    <main>
      <Navbar />
    </main>
  )
}
export default App
