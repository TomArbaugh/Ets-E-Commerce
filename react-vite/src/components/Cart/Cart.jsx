import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeItemFromCart } from '../../redux/cart';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const shoppingCartId = useSelector((state) => state.session.user.id);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (shoppingCartId) {
      dispatch(fetchCartItems(shoppingCartId));
    }
  }, [dispatch, shoppingCartId]);

  const handleDelete = async (cartItemId) => {
    try {
      await dispatch(removeItemFromCart(cartItemId));
      setMessage('Item was removed from your cart');
      setTimeout(() => setMessage(''), 3000); 
    } catch (error) {
      console.error('Failed to delete cart item:', error);
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {message && <p className='cart-item-delete-success-message'>{message}</p>}
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id}>
              {item.product ? (
                <div id='cart-item-card'>
                  <div className='cart-item-image'>
                  </div>
                  <div className='cart-item-description'>
                    <p>{item.product.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                  </div>
              ) : (
                <p>Product details not available</p>
              )}
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </ul>
    </div>
  );
};

export default Cart;
