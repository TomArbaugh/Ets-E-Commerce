import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, removeItemFromCart, updateCartItemQuantityThunk } from '../../redux/cart';
import OpenModalButton from '../OpenModalButton';
import CheckoutModal from './CheckoutModal';
import LoginFormModal from '../LoginFormModal';
import './Cart.css';

const Cart = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [message, setMessage] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (sessionUser?.id) {
      dispatch(fetchCartItems(sessionUser.id));
    }
  }, [dispatch, sessionUser]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce((sum, item) => {
        if (item.product && typeof item.product.price === 'number') {
          return sum + (item.product.price * item.quantity);
        } else {
          console.warn(`Product price is missing for cart item ID ${item.id}`, item);
          return sum;
        }
      }, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cartItems]);

  const handleDelete = async (cartItemId) => {
    try {
      await dispatch(removeItemFromCart(cartItemId));
      setMessage('Item was removed from your cart');
      setTimeout(() => setMessage(''), 3000); 
    } catch (error) {
      console.error('Failed to delete cart item:', error);
    }
  };

  const handleQuantityChange = async (cartItemId, newQuantity) => {
    try {
      if (newQuantity < 1) return; 
      await dispatch(updateCartItemQuantityThunk(cartItemId, newQuantity));
    } catch (error) {
      console.error('Failed to update cart item quantity:', error);
    }
  };

  if (!sessionUser) {
    return (
      <div>
        <OpenModalButton
          buttonText='Log In'
          modalComponent={<LoginFormModal />}
        />
      </div>
    );
  }

  return (
    <>
      <div>
        <h1>Shopping Cart</h1>
        {message && <p className='cart-item-delete-success-message'>{message}</p>}
        <ul>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} id='cart-item-card'>
                {item.product ? (
                  <>
                    <div className='cart-item-image'>
                      <img src={item.product.image_url} alt={item.product.name} />
                    </div>
                    <div className='cart-item-description'>
                      <p>{item.product.name}</p>
                      <p>Price: ${typeof item.product.price === 'number' ? item.product.price.toFixed(2) : 'N/A'}</p>
                      <label>
                        Quantity:
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                          min="1"
                        />
                      </label>
                      <button onClick={() => handleDelete(item.id)}>Remove from cart</button>
                    </div>
                  </>
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
      <div>
        <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
        <OpenModalButton
          buttonText='Checkout'
          modalComponent={<CheckoutModal />}
        />
      </div>
    </>
  );
};

export default Cart;
