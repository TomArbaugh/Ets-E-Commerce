import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreateNewProduct } from '../../redux/products';
import './ProductForm.css';

const ProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errorArr = [];
    if (!name) errorArr.push('Name is required');
    if (name.length > 50) errorArr.push('Name cannot be more than 50 characters');
    if (!category) errorArr.push('Category is required');
    if (category.length > 50) errorArr.push('Category cannot be more than 50 characters');
    if (!description) errorArr.push('Description is required');
    if (description.length > 255) errorArr.push('Description cannot be more than 255 characters');
    if (!price) errorArr.push('Price is required');
    if (price <= 0) errorArr.push('Price must be a positive number');
    if (!stock) errorArr.push('Stock is required');
    if (stock <= 0) errorArr.push('Stock must be a positive number');
    setErrors(errorArr);
  }, [name, category, description, price, stock]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length > 0) return; // Prevent submission if frontend errors exist
    const product = { name, category, description, price, stock, image_url: imageUrl };
    const response = await dispatch(thunkCreateNewProduct(product));
    if (response.errors) {
      setErrors(response.errors);
    } else {
      const productId = response.id;
      navigate(`/products/${productId}`);
    }
  };

  return (
    <form className='products-form' onSubmit={handleSubmit}>
      <p>Tell the world all about your item and why they’ll love it.</p>
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
      </label>
      <label>
        Category *
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />
      </label>
      <label>
        Photos and video *
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />
      </label>
      <label>
        Description *
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
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
      </label>
      <label>
        Stock *
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
        />
      </label>
      <button type="submit">Add a listing</button>
    </form>
  );
};

export default ProductForm;
