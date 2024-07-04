import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkGetCurrentUsersProducts } from '../../redux/products';
import './YourListings.css';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DeleteProductModal from './DeleteProductModal';

const YourListings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.allProducts);

  useEffect(() => {
    dispatch(thunkGetCurrentUsersProducts());
  }, [dispatch]);

  const handleAddListing = () => {
    navigate('/products/new');
  };

  const handleEditListing = (productId) => {
    navigate(`/products/${productId}/edit`);
  };

  return (
    <div className='your-listings-page'>
      <div className='your-listings-header'>
        <h1>Your Listings</h1>
        <button className='add-listing-button' onClick={handleAddListing}>
          + Add a listing
        </button>
      </div>
      <div className='your-listings-content'>
        {products.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <div key={product.id} className='product-listing-card'>
                <div className='product-listing-image'>
                {console.log(product.image_url)} 
                <img src={product.image_url} alt={product.title} />
                </div>
                <div className='listing-details'>
                  <h2>{product.title}</h2>
                  <p>${product.price}</p>
                  <p>{product.quantity} in stock</p>
                  <p>{product.category}</p>
                  <p>{product.description}</p>
                  <div className='listing-buttons'>
                    <button onClick={() => handleEditListing(product.id)} className='edit-button'>Edit</button>
                    <OpenModalButton
                      buttonText="Delete"
                      modalComponent={<DeleteProductModal productId={product.id} />}
                    />
                  </div>
                </div>
              </div>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default YourListings;
