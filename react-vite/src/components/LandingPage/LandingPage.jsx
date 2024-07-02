import{ useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkFetchProducts } from '../../redux/products';
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  useEffect(() => {
    dispatch(thunkFetchProducts());
  }, [dispatch]);

  return (
    <div className="landing-page">
      <div className="products-list-container">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image_url} alt={product.name} />
            <p>{product.name}</p>
            <p>${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
