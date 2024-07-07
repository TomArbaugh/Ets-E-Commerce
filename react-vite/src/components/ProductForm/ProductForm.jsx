import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreateNewProduct, thunkAddProductImage } from '../../redux/products';
import './ProductForm.css';

const ProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState('');
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const categories = [
    "Home & Living",
    "Clothing & Shoes",
    "Jewelry & Accessories",
    "Toys & Entertainment",
    "Art & Collectibles"
  ];

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
    setImageLoading(true);
    setHasSubmitted(true);

    if (errors.length > 0) return; // prevent submission if frontend errors exist
    const product = { name, category, description, price, stock};
    const response = await dispatch(thunkCreateNewProduct(product));

    if (response.errors) {
      setErrors(response.errors);
    } else {
      if (image) {
        setImageLoading(true);
        await dispatch(thunkAddProductImage(response.id, image));
        setImageLoading(false);
      }
      navigate('/your-listings');
    }
  };

  return (
    <>
      <Link to="/your-listings" className="back-to-listings-link">&larr; Back to Your Listings</Link>

      <form className='products-form' onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Tell us about your item and why we will love it</h2>
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
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>{cat}</option>
              ))}
            </select>
          </label>
        </div>

        <div className='photo-div'>
          <label>Photos and video *</label>
          <label className="custom-file-upload">
            Choose File
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          {(imageLoading) && <p>Loading...</p>}
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
              min="0"
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
              min="0"
              onChange={(e) => setStock(e.target.value)}
              required
              placeholder='product stock'
            />
          </label>
        </div>
        <button type="submit">Add a listing</button>
      </form>
    </>
  );
};

export default ProductForm;

