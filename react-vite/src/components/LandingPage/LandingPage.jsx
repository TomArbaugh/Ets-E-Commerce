import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllProducts } from '../../redux/products';
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import './LandingPage.css';

const LandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const products = useSelector((state) => state.products.allProducts || []);
  const sessionUser = useSelector((state) => state.session.user);



  useEffect(() => {
    dispatch(thunkGetAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (!products.length) {
      dispatch(thunkGetAllProducts());
    }
  }, [dispatch, products])

  const handleAddListing = () => {
    navigate('/products/new');
  };
  
  return (
    <div className="landing-page">
      <div className="landing-page-welcome-header">
        <div className="welcome-message">
          <h1>
            Welcome to Getsy<br />
            <span>Where our crafting skills are better than our Wi-Fi signal!</span>
          </h1>
        </div>
        {sessionUser && (
          <button 
            disabled={!sessionUser}
            className={sessionUser ? "add-listing-button" : "invisable"} 
            onClick={handleAddListing}
          >
            + Add a product listing
          </button>
        )}
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
              <p>${product.price}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className='footer'>
      <div id="Elya">
        <h4>Elya Le</h4>
                <div className="about-link-icons">
                <Link className="indi-link" to="https://www.linkedin.com/in/elyale/"><FaLinkedin className="about-links"/></Link>
                <Link className="indi-link" to="https://github.com/elya-le"><FaGithub className="about-links"/></Link>
                </div>
      </div>
      <div id="Hui">
        <h4>Hui (Sally) Wen</h4>
                <div className="about-link-icons">
                <Link className="indi-link" to="https://www.linkedin.com/in/hui-wen-49431943/"><FaLinkedin className="about-links"/></Link>
                <Link className="indi-link" to="https://github.com/Sally-HuiWen"><FaGithub className="about-links"/></Link>
                </div>
      </div>
      <div id="Aaron">
        <h4>Aaron Pollock</h4>
                <div className="about-link-icons">
                <Link className="indi-link" to="https://www.linkedin.com/in/aaron-pollock-276822320/"><FaLinkedin className="about-links"/></Link>
                <Link className="indi-link" to="https://github.com/aaronipollock"><FaGithub className="about-links"/></Link>
                </div>
      </div>
      <div id="Tom">
        <h4>Tom Arbaugh</h4>
                <div className="about-link-icons">
                <Link className="indi-link" to="https://www.linkedin.com/in/tomarbaugh/"><FaLinkedin className="about-links"/></Link>
                <Link className="indi-link" to="https://github.com/TomArbaugh/"><FaGithub className="about-links"/></Link>
                </div>
      </div>
      </div>
    </div>
  );
};

export default LandingPage;
