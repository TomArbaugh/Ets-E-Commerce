import{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { thunkProductDetails } from '../../redux/products';
import './ProductDetails.css';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const product = useSelector((state) => state.products.productDetails);

  useEffect(() => {
    dispatch(thunkProductDetails(productId));
  }, [dispatch, productId]);

  return (
    <div className="product-details">
      <div className='top-detail'>
        <div className='left-div-image-container'>
          <img src={product.image_url} alt={product.name} />
        </div>
        <div className='right-div-product-description'>
          <p>${product.price}</p>
          <p>{product.name}</p>
          <p>{product.description}</p>
          {/* come back to do logic of how to access the products stock # from db */}
          <label htmlFor='quantity'>
          Quantity
          <select id='quantity'>
            <option>1</option>
            <option>2</option>
            <option>3</option>
          </select>
          </label>
          <button className='add-to-cart-button'>Add to cart</button>
        </div>
      </div>
      <div className='bottom-reviews'>
        {/* LEAVE THIS OPEN FOR A&T (Aaron & Thomas) */}
      </div>
    </div>
  );
};

export default ProductDetails

