import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { thunkProductDetails } from '../../redux/products';
import { addItemToCart } from '../../redux/cart';
import './ProductDetails.css';
import { getReviewsByProductId } from '../../redux/reviews';
import EditReview from '../EditReview/EditReview';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
import OpenModalButton from '../OpenModalButton';
import { FaStar } from 'react-icons/fa';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => state.products.productDetails);
  const [quantity, setQuantity] = useState(1);
  const [AddToCardMessage, setAddToCartMessage] = useState('');
  const reviews = useSelector((state) => state.reviews.reviews);
  const user = useSelector((state) => state.session.user);
  const deletedReview = useSelector((state) => state.reviews.deletedReview)
  const editedReview = useSelector((state) => state.reviews.editedReview)

  useEffect(() => {
    dispatch(thunkProductDetails(productId));
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(getReviewsByProductId(productId))
  }, [dispatch, productId, deletedReview, editedReview])


  const handleAddToCart = async () => {
    const result = await dispatch(addItemToCart(productId, quantity));
    if (!result.errors) {
      setAddToCartMessage('Item added to cart!');
    } else if (!user) {
      setAddToCartMessage('Please login to add items to cart.');
    } else {
      setAddToCartMessage('Failed to add item to cart.');
    }
    setTimeout(() => {
      setAddToCartMessage('');
    }, 5000);
  };

  const imageUrl = product.images && product.images.length > 0 ? product.images[0].url : '';

  const alreadyReviewed = reviews && reviews.some(review => review.user_id === user?.id);

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
          <select id="quantity" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to cart</button>

          <div className='confirmation-message-container'>
            {AddToCardMessage && <p className={AddToCardMessage === 'Item added to cart!' ? "confirmation-message" : "error-message"}>{AddToCardMessage}</p>}
          </div>

          {/* <div className='confirmation-message-container'>
            {AddToCardMessage !== 'Item added to cart!' && <p className="error-message">{AddToCardMessage}</p>}
          </div> */}

          <div className="bottom-reviews">
            <h2>Reviews</h2>
            {reviews ? (
              <ul className="reviews-list">
                {reviews.map((review) => (
                  <li key={review.user_id} className="review">
                    <div>{review.review}</div>
                    <div>{review.stars} <FaStar color="#ffc107" /></div>
                    <div className="reviewed-by"><strong>{review.first_name} {review.last_name}</strong> <em>{review.createdAt}</em></div>
                    {user && review.user_id === user.id && (
                      <>
                        <div className="button-pad-edit">
                          {user && alreadyReviewed && <OpenModalButton
                            buttonText='Edit Review'
                            modalComponent={<EditReview productId={product.id} />}
                          />}
                        </div>
                        <div className="button-pad-delete">
                          {user && alreadyReviewed && <OpenModalButton
                            buttonText='Delete Review'
                            modalComponent={<DeleteReviewModal productId={product.id} />}
                          />}
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : <p>No reviews yet</p>}
            {user && !alreadyReviewed && (
              <div className='create-button-pad'>
                You have not left a review yet <br /> <br></br>
                <Link to={`/products/${product.id}/create-review`} className='create-review-link'>Create Review</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails
