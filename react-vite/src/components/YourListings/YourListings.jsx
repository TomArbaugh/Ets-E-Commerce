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
  const products = useSelector((state) => state.products.allProducts || []);
  console.log('what are the products', products)
  useEffect(() => {
    dispatch(thunkGetCurrentUsersProducts());
  }, [dispatch]);

  const handleAddListing = () => {
    navigate('/products/new');
  };

  // Sort products by created_at date in descending order
  const sortedProducts = [...products].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  return (
    <div className="your-listings-page">
      <div className="your-listings-header">
        <h1>Your Listings</h1>
        <button className="add-listing-button" onClick={handleAddListing}>
          + Add a listing
        </button>
      </div>
      <div className="your-listings-content">
        {sortedProducts.length === 0 ? (
          <p>No listings found.</p>
        ) : (
          <ul>
            {sortedProducts.map((product) => (
              <li key={product?.id} className="listing-item">
                <div className='listing-image'>
                  {product?.images? (
                    <img src={product?.images[0]?.url} alt={product?.name} />
                  ) : (
                    <p>No image available</p>
                  )}
                </div>
                <div className="listing-details">
                  <h2>{product?.name}</h2>
                  <p>${product?.price}</p>
                  <p>{product?.stock} in stock</p>
                  <p>{product?.category}</p>
                  <p>{product?.description}</p>
                  <div className="listing-actions">
                    <Link to={`/products/${product?.id}/edit`}>
                      <button>Edit</button>
                    </Link>
                    <OpenModalButton
                      buttonText='Delete'
                      modalComponent={<DeleteProductModal productId={product?.id} />}
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
