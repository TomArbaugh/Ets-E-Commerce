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
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

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

    if (errors.length > 0) {
      setImageLoading(false);
      return;
    }

    const product = { name, category, description, price, stock };
    const response = await dispatch(thunkCreateNewProduct(product));

    if (response.errors) {
      setErrors(response.errors);
      setImageLoading(false);
    } else {
      if (image) {
        const imageResponse = await dispatch(thunkAddProductImage(response.id, image));
        setImageUrl(imageResponse.url); // set the image URL
      }
      setImageLoading(false);
      navigate('/your-listings');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setImage(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    if (file && !['image/jpeg', 'image/png', 'image/gif', 'application/pdf'].includes(file.type)) {
      setErrors(['File does not have an approved extension: pdf, jpg, jpeg, png, gif']);
    } else {
      setImage(file);
      setErrors([]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to="/your-listings" className="back-to-listings-link">&larr; Back to Your Listings</Link>

      <form className='products-form' onSubmit={handleSubmit} encType="multipart/form-data">
        <h2>Tell us about your item and why we will love it</h2>
        <div className='name-div'>
          <label> Name *
            {hasSubmitted && errors.includes('Name is required') && <span className="error-message">Name is required</span>}
            {hasSubmitted && errors.includes('Name cannot be more than 50 characters') && <span className="error-message">Name cannot be more than 50 characters</span>}
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
            {hasSubmitted && errors.includes('Category is required') && <span className="error-message">Category is required</span>}

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
          <div className="dropzone" onDrop={handleDrop} onDragOver={handleDragOver}>
            {image ? image.name : 'Drag and drop an image'}
          </div> 
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={handleFileChange}
            id="image-upload"
            className="upload-button"
          />
          {imageUrl && <p>Image URL: <a href={imageUrl} target="_blank" rel="noopener noreferrer">{imageUrl}</a></p>}
          {(imageLoading) && <p>Loading...</p>}
        </div>

        <div className='category-div'>
          <label>Description *
            {hasSubmitted && errors.includes('Description is required') && <span className="error-message">Description is required</span>}
            {hasSubmitted && errors.includes('Description cannot be more than 255 characters') && <span className="error-message">Description cannot be more than 255 characters</span>}
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
            {hasSubmitted && errors.includes('Price is required') && <span className="error-message">Price is required</span>}
            {hasSubmitted && errors.includes('Price must be a positive number') && <span className="error-message">Price must be a positive number</span>}
            <input
              type="number"
              value={price}
              step="0.01"  // allow decimal values
              min="0"
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder='price'
            />
          </label>
          <label>Stock *
            {hasSubmitted && errors.includes('Stock is required') && <span className="error-message">Stock is required</span>}
            {hasSubmitted && errors.includes('Stock must be a positive number') && <span className="error-message">Stock must be a positive number</span>}
            <input
              type="number"
              value={stock}
              min="0"
              onChange={(e) => setStock(e.target.value)}
              required
              placeholder='stock'
            />
          </label>
        </div>
        <button type="submit">Add a listing</button>
      </form>
    </>
  );
};

export default ProductForm;
