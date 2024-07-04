import { thunkDeleteProducts } from '../../redux/products';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteProductModal.css';

export default function DeleteProductModal({ productId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const ClickYes = async (e) => {
    e.preventDefault();
    try {
      await dispatch(thunkDeleteProducts(productId));
      closeModal();
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  const ClickNo = (e) => {
    e.preventDefault();
    closeModal();
  };

  return (
    <div className="delete-box">
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this product from the listing?</h2>
      <button className='yes-button' onClick={ClickYes}>Yes(Delete Product)</button>
      <button className='no-button' onClick={ClickNo}>No(Delete Product)</button>
    </div>
  );
}

