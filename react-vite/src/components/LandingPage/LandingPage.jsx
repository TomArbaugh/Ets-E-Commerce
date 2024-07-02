import{ useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllProducts } from '../../redux/products';
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const products = Object.values(useSelector((state) => state.products.products));

  useEffect(() => {
    dispatch(thunkGetAllProducts());
  }, [dispatch]);

  return (
    <div className="landing-page">
      <div className="products-list-container">
        {products.map((product) => (
          <link
           className="link-to-productDetails"
           to={`/products/${product.id}`}
           >
            <div key={product.id} className="product-card">
              <img src={product.image_url} alt={product.name} />
              <p>{product.name}</p>
              <p>${product.price}</p>
            </div>
          </link>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
