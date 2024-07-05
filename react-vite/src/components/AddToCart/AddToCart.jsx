import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from '../../redux/cart';


const AddToCart = ({ productId }) => {
 const [quantity, setQuantity] = useState(1);
 const dispatch = useDispatch();


 const handleSubmit = (e) => {
   e.preventDefault();
   dispatch(addItemToCart(productId, quantity));
 };


 return (
   <form onSubmit={handleSubmit}>
     <label>
       Quantity:
       <input
         type="number"
         value={quantity}
         onChange={(e) => setQuantity(e.target.value)}
         min="1"
       />
     </label>
     <button type="submit">Add to Cart</button>
   </form>
 );
};


export default AddToCart;
