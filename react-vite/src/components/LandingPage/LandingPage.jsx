import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllProducts } from '../../redux/products';
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const products = useSelector((state) => state.products.allProducts || []);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkGetAllProducts());
  }, [dispatch]);

  const handleAddListing = () => {
    navigate('/products/new');
  };
  
  return (
    <div className="landing-page">
      <div className="landing-page-welcome-header">
        <h1>Welcome to Our Marketplace</h1>
        {sessionUser && (
          <button className="add-listing-button" onClick={handleAddListing}>
            + Add a product listing
          </button>
        )}
      </div>
      <div className='landing-page-faux-header'>
        <img src="../../images/header.png" alt="Faux Header" />
      </div>
      <div className="products-list-container">
        {products.map((product) => (
          <Link 
            key={product.id}
            className="link-to-productDetails"
            to={`/products/${product.id}`}
          >
            <div className="product-card">
            {product.images && product.images[0] && product.images[0].url && (
                <img src={product.images[0].url} alt={product.name} />
              )}
              {/* <p>{product.name}</p> */}
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;