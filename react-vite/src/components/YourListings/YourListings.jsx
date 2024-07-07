import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkGetCurrentUsersProducts } from '../../redux/products';
import './YourListings.css';
import OpenModalButton from '../OpenModalButton';
import DeleteProductModal from './DeleteProductModal';
import { Link } from "react-router-dom";

const YourListings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.allProducts);
  if (!products.length) return null;
  
  useEffect(() => {
    dispatch(thunkGetCurrentUsersProducts());
  }, [dispatch]);

  const handleAddListing = () => {
    navigate('/products/new');
  };

  return (
    <div className="your-listings-page">
      <div className="your-listings-header">
        <h1>Your Listings</h1>
        <button className="add-listing-button" onClick={handleAddListing}>
          + Add a listing
        </button>
      </div>
      <div className="your-listings-content">
        {products.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          <ul>
            {products.map((product) => (
               <li key={product.id} className="listing-item">
               {product.images && product.images[0] && product.images[0].url ? (
                 <img src={product.images[0].url} alt={product.name} />
               ) : (
                 <p>No image available</p>
               )}
               <div className="listing-details">
                 <h2>{product.name}</h2>
                 <p>${product.price}</p>
                 <p>{product.quantity} in stock</p>
                 <p>{product.category}</p>
                 <p>{product.description}</p>
                 <div className="listing-actions">
                   <Link to={`/products/${product.id}/edit`}>
                     <button>Edit</button>
                   </Link>
                   <OpenModalButton
                     buttonText='Delete'
                     modalComponent={<DeleteProductModal productId={product.id} />}
                   />
                 </div>
               </div>
             </li>
           ))}
         </ul>
       )}
     </div>
   </div>
 );
};

export default YourListings;