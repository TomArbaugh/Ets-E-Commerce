import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems } from '../../redux/cart';


const Cart = () => {
 const dispatch = useDispatch();
 const shoppingCartId = useSelector((state) => state.session.user.shoppingCartId);


 useEffect(() => {
   if (shoppingCartId) {
     dispatch(fetchCartItems(shoppingCartId));
   }
 }, [dispatch, shoppingCartId]);


 const items = useSelector((state) => state.cart.items);


 return (
   <div>
     <h1>Shopping Cart</h1>
     <ul>
       {items.length > 0 ? (
         items.map((item) => (
           <li key={item.id}>
             {item.product ? (
               <>
                 <p>{item.product.name}</p>
                 <p>Quantity: {item.quantity}</p>
               </>
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