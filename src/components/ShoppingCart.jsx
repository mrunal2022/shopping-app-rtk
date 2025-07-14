import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCart } from '../reducer/ShoppingCartSlice';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const shoppingCartItems = useSelector(state => state.shoppingCart);
  console.log(shoppingCartItems);
  const dispatch = useDispatch();

  const handleInputChange = (e, item) => {
    const val = parseInt(e.target.value);
    dispatch(updateCart({ id: item.id, val: val }));
    if (val === 0) {
      dispatch(removeFromCart(item.id));
    }
  }

  const deleteItem = (item) => {
    dispatch(removeFromCart(item.id));
  }

  const getSubTotal = () => {
    if (shoppingCartItems.length > 0) {
      return shoppingCartItems.reduce((acc, curr) => acc + parseInt(curr.total), 0)
    }
  }

  return (
    <div className='shopping-cart-wrapper'>
      <div className='shopping-cart'>
        <h2>Your Shopping Cart</h2>
        {shoppingCartItems.length > 0 ?
          <div className='cart-items'>
            {shoppingCartItems.map(item => (
              <div className='cart-item row mb-5' key={item.id} style={{ width: "1400px" }}>
                <Card variant="outlined" style={{ display: 'flex', padding: "10px" }}>
                  <div className='col-2'>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt={item.name}
                      style={{ height: "166px", width: "150px" }}
                    />
                  </div>
                  <div className='d-flex col-3 align-center ms-5' style={{ flexDirection: "column", alignItems: "flex-start", justifyContent: "center" }}>
                    <div className='grocery-name'>
                      {item.name}
                    </div>
                    <div className='grocery-price mt-2'>
                      {item.price} Rs
                    </div>
                  </div>
                  <div className='col-2 align-center'>
                    <TextField
                      type="number"
                      id="quantity"
                      label="Quantity"
                      variant="outlined"
                      value={item.quantity}
                      className="filter-width-small"
                      title="Quantity"
                      onInput={(e) => handleInputChange(e, item)}
                    />
                  </div>
                  <div className='col-2 d-flex' style={{ justifyContent: "center", alignItems: "center" }}>
                    {item.total}
                  </div>
                  <div className='delete-icon align-center col-2 ms-5'>
                    <img src="public/delete-icon.png" className='delete-icon-pic' alt="" onClick={() => deleteItem(item)} />
                  </div>
                </Card>
              </div>
            ))}
          </div> :
          <div className='no-items'>
            <h5>Add Items to Your Shopping Cart!!!!</h5>
          </div>
        }
      </div>
      <div className='sub-total-wrapper'>
        {shoppingCartItems.length > 0 ?
          <div className='sub-total d-flex'>
            <h5>Cart Subtotal: {getSubTotal()} Rs</h5>
          </div> : null
        }
      </div>
    </div>
  )
}

export default ShoppingCart
