import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { thunkProductDetails } from '../../redux/products';
import './ProductDetails.css';
import { getReviewsByProductId } from '../../redux/reviews';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => state.products.productDetails);

  const reviews = useSelector((state) => state.reviews.reviews)

  

  useEffect(() => {
    dispatch(thunkProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(getReviewsByProductId(productId))
  }, [dispatch, productId])

  const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : '';

  if (!reviews || reviews.length === 0) return null;
  
  return (
    <div className="product-details">
      <div className="top-detail">
        <div className="left-div-image-container">
          {imageUrl ? (
            <img src={imageUrl} alt={product.name} />
          ) : (
            <div className="placeholder-image">{product.name}</div>
          )}
        </div>
        <div className="right-div-product-description">
          <p>${product.price}</p>
          <p>{product.name}</p>
          <p>{product.description}</p>
          <label htmlFor="quantity">Quantity</label>
          <select id="quantity">
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          <button className="add-to-cart-button">Add to cart</button>
          <div className="bottom-reviews">
        {reviews.map((review) => (
          <>
          <li key={review.product_id}>{review.review}</li>
          <li>{review.stars}</li>
          </>
       
       
        ))}
     
      </div>
        </div>
      </div>
  
    </div>
  );
};

export default ProductDetails;