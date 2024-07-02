import{ useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllProducts } from '../../redux/products';
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.allProducts || []);

  useEffect(() => {
    dispatch(thunkGetAllProducts());
  }, [dispatch]);

  return (
    <div className="landing-page">
      <div className="products-list-container">
        {products.map((product) => (
          <Link 
           key={product.id}
           className="link-to-productDetails"
           to={`/products/${product.id}`}
           >
            <div key={product.id} className="product-card">
              <img src={product.image_url} alt={product.name} />
              <p>{product.name}</p>
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
