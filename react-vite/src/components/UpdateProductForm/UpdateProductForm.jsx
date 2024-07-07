import { useState, useEffect } from 'react';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkProductDetails, thunkUpdateProducts, thunkAddProductImage } from '../../redux/products';
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

    if (errors.length > 0) return;

    const updatedProduct = { ...product, name, category, description, price, stock };

    const response = await dispatch(thunkUpdateProducts(updatedProduct));

    if (response.errors) {
      setErrors(response.errors);
    } else {
      if (image) {
        setImageLoading(true);
        await dispatch(thunkAddProductImage(productId, image));
        setImageLoading(false);
      }
      navigate('/your-listings');
    }
  };

  if (!product) {
    return <div>Loading...</div>; // display a loading state until the product is loaded
  }

  return (
    <>
      <Link to="/your-listings" className="back-to-listings-link">&larr; Back to Your Listings</Link>
      <form className='products-form' onSubmit={handleSubmit} encType="multipart/form-data">
        {!sessionUser && <Navigate to="/" />}
        <h2>Update your product details</h2>
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
          {imageLoading && <p>Loading...</p>}
        </div>
        <h2>Price & Inventory</h2>
        <label>
          Price *
          <input
            type="number"
            value={price}
            min="0"
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
            min="0"
            onChange={(e) => setStock(e.target.value)}
            required
          />
          {hasSubmitted && errors.includes('Stock is required') && <p className="error">Stock is required</p>}
          {hasSubmitted && errors.includes('Stock must be a positive number') && <p className="error">Stock must be a positive number</p>}
        </label>
        <button type="submit">Update listing</button>
      </form>
    </>
  );
};

export default UpdateProductForm;
