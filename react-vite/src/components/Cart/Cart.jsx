import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems} from '../../redux/cart';


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
             {item.product_id ? (
               <div id='small-box'>
                 <p>{item.product_id}</p>
                 <p>Quantity: {item.quantity}</p>
                 <p>Delete</p>
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