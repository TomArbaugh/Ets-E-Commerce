import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkProductDetails, thunkUpdateProducts } from '../../redux/products';
import './UpdateProductForm.css';

const UpdateProductForm = () => {
  const { productId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(thunkProductDetails(productId));
  }, [dispatch, productId]);

  const product = useSelector(state => state.products.productDetails);

  console.log('what is productId', productId);
  console.log('what is state', useSelector(state => state));

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setDescription(product.description);
      setPrice(product.price);
      setStock(product.stock);
    }
  }, [product]);

  useEffect(() => {
    const errorArr = [];
    if (!name) errorArr.push('Name is required');
    if (!category) errorArr.push('Category is required');
    if (!description) errorArr.push('Description is required');
    if (!price) errorArr.push('Price is required');
    if (price <= 0) errorArr.push('Price must be a positive number');
    if (!stock) errorArr.push('Stock is required');
    if (stock <= 0) errorArr.push('Stock must be a positive number');
    setErrors(errorArr);
  }, [name, category, description, price, stock]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    const updatedProduct = { ...product, name, category, description, price, stock };

    const response = await dispatch(thunkUpdateProducts(updatedProduct));

    if (response.errors) {
      setErrors(response.errors);
    } else {
      navigate('/your-listings');
    }
  };

  if (!product) {
    return <div>Loading...</div>; // Display a loading state until the product is loaded
  }

  return (
    <form className='products-form' onSubmit={handleSubmit}>
      {!sessionUser && <Navigate to="/" />}
      <p>Update your product details below.</p>
      {hasSubmitted && errors.length > 0 && (
        <div className="error-list">
          {errors.map((error, idx) => (
            <p key={idx} className="error">{error}</p>
          ))}
        </div>
      )}
      <label>
        Name *
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {hasSubmitted && errors.includes('Name is required') && <p className="error">Name is required</p>}
        {hasSubmitted && errors.includes('Name cannot be more than 50 characters') && <p className="error">Name cannot be more than 50 characters</p>}
      </label>
      <label>
        Category *
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
        {hasSubmitted && errors.includes('Category is required') && <p className="error">Category is required</p>}
        {hasSubmitted && errors.includes('Category cannot be more than 50 characters') && <p className="error">Category cannot be more than 50 characters</p>}
      </label>
      <label>
        Description *
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {hasSubmitted && errors.includes('Description is required') && <p className="error">Description is required</p>}
        {hasSubmitted && errors.includes('Description cannot be more than 255 characters') && <p className="error">Description cannot be more than 255 characters</p>}
      </label>
      <h2>Price & Inventory</h2>
      <label>
        Price *
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        {hasSubmitted && errors.includes('Price is required') && <p className="error">Price is required</p>}
        {hasSubmitted && errors.includes('Price must be a positive number') && <p className="error">Price must be a positive number</p>}
      </label>
      <label>
        Stock *
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
        {hasSubmitted && errors.includes('Stock is required') && <p className="error">Stock is required</p>}
        {hasSubmitted && errors.includes('Stock must be a positive number') && <p className="error">Stock must be a positive number</p>}
      </label>
      <button type="submit">Update listing</button>
    </form>
  );
};

export default UpdateProductForm;