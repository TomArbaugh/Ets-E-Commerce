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
   
    if (errors.length > 0) return; // prevent submission if frontend errors exist
    const product = { name, category, description, price, stock, imageUrl}; 
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
    <h2>Tell the world all about your item and why they’ll love it.</h2>
    <div className='name-div'>
      <label> Name *
        {hasSubmitted && errors.includes('Name is required') && <span className="error">Name is required</span>}
        {hasSubmitted && errors.includes('Name cannot be more than 50 characters') && <span className="error">Name cannot be more than 50 characters</span>}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder='product name'
        />
      </label>
    </div>
      
    <div className='category-div'>
      <label>Category *
        {hasSubmitted && errors.includes('Category is required') && <span className="error">Category is required</span>}
        {hasSubmitted && errors.includes('Category cannot be more than 50 characters') && <span className="error">Category cannot be more than 50 characters</span>}
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          placeholder='product category'
        />
      </label>
    </div>
    
    <div className='photo-div'>
      <label>
        Photos and video *
        <input
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
          placeholder='product image'
        />
      </label>
    </div>

    <div className='category-div'>
      <label>Description *
        {hasSubmitted && errors.includes('Description is required') && <span className="error">Description is required</span>}
        {hasSubmitted && errors.includes('Description cannot be more than 255 characters') && <span className="error">Description cannot be more than 255 characters</span>}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder='product description'
        />
      </label>
    </div>

    <div className='price-inventory-div'>
      <h2>Price & Inventory</h2>
      <label>Price *
        {hasSubmitted && errors.includes('Price is required') && <span className="error">Price is required</span>}
        {hasSubmitted && errors.includes('Price must be a positive number') && <span className="error">Price must be a positive number</span>}
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          placeholder='price description'
        />
      </label>
      <label>Stock *
        {hasSubmitted && errors.includes('Stock is required') && <span className="error">Stock is required</span>}
        {hasSubmitted && errors.includes('Stock must be a positive number') && <span className="error">Stock must be a positive number</span>}
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          required
          placeholder='product stock'
        />
      </label>
    </div>
    <button type="submit">Add a listing</button>
  </form>
  );
};


export default ProductForm;
