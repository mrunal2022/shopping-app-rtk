import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ShoppingCart from './components/ShoppingCart';
import ShoppingMenu from './components/ShoppingMenu';
import { useSelector } from 'react-redux'

function App() {
  const navigate = useNavigate();
  const shoppingCartItems = useSelector(state => state.shoppingCart);


  const goToShoppingCart = () => {
    navigate('/shoppingCart');
  }

  const goToMenu = () => {
    navigate('/shoppingMenu');
  }

  return (
    <>
      <div className='d-flex main-wrapper header'>
        <div onClick={() => goToMenu()} style={{ cursor: "pointer" }}>
          <h2>RTK Mart</h2>
        </div>

        <div className='shopping-img-block'>
          <img
            src="public/shopping-cart.jpg"
            alt="Cart"
            className='shopping-cart-img'
            onClick={() => goToShoppingCart()}
          />
          {shoppingCartItems?.length > 0 && (
            <span
            className='super-script'
            >
              {shoppingCartItems.length}
            </span>
          )}
        </div>
      </div>

      <br />
      <Routes>
        <Route path="/shoppingMenu" element={<ShoppingMenu />} />
        <Route path="*" element={<Navigate to="/shoppingMenu" />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
      </Routes>
    </>
  )
}

export default App
