import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems} from '../../redux/cart';
import OpenModalButton from '../OpenModalButton';
import DeleteCartItemModal from './DeleteCartItemModal'
import './Cart.css';

const Cart = () => {
 const dispatch = useDispatch();
 const shoppingCartId = useSelector((state) => state.session.user.id);
 console.log('what is shopping cart id', shoppingCartId)
 const cartItems = useSelector((state) => state.cart.cartItems);
 console.log('what is cartItems', cartItems)
 useEffect(() => {
   if (shoppingCartId) {
     dispatch(fetchCartItems(shoppingCartId));
   }
 }, [dispatch, shoppingCartId]);

 return (
   <div>
     <h1>Shopping Cart</h1>
     <ul>
       {cartItems.length > 0 ? (
         cartItems.map((item) => (
           <li key={item.id}>
             {item.product ? (
               <div id='small-box'>
                 <p>{item.product.name}</p>
                 <p>Quantity: {item.quantity}</p>
                 <OpenModalButton id='delete-modal-button'
                        buttonText='Delete'
                        modalComponent={<DeleteCartItemModal catItemId={item.id} />}
                      />
               </div>
         ) : (
               <p>Product details not available</p>
             )}
           </li>
         ))
       ) : (
         <p>Your cart is empty</p>
       )}
     </ul>
   </div>
 );
};


export default Cart;