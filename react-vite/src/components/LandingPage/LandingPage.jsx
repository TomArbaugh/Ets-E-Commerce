import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllProducts } from '../../redux/products';
import './LandingPage.css';


const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const products = useSelector((state) => state.products.allProducts || []);

  useEffect(() => {
    console.log('Elya - landingPage component rendered twice error');
    dispatch(thunkGetAllProducts());
  }, [dispatch]);

  const handleAddListing = () => {
    navigate('/products/new');
  };

  return (
    <div className="landing-page">
      <div className="landing-page-header">
        <h1>Welcome to Our Marketplace</h1>
        <button className="add-listing-button" onClick={handleAddListing}>
          + Add a product listing
        </button>
      </div>
      <div className="products-list-container">
        {products.map((product) => (
          <Link 
            key={product.id}
            className="link-to-productDetails"
            to={`/products/${product.id}`}
          >
            <div className="product-card">
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
