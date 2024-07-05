import { removeItemFromCart } from '../../redux/cart';
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteCartItemModal.css';

export default function DeleteCartItemModal({ cartItemId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const ClickYes = async (e) => {
    e.preventDefault();
    try {
      await dispatch(removeItemFromCart(cartItemId))
      closeModal();
    } catch(error) {
      console.error('Fail to delete product:', error);
    }
  };

  const ClickNo = (e) => {
    e.preventDefault;
    closeModal();
  };

  return (
    <div className="delete-box">
      <h1>Confirm Delete</h1>
      <h2>Are you sure you want to remove this cart item from the listing?</h2>
      <button className='yes-button' onClick={(e) => ClickYes(e)}>Yes (Delete Cart Item)</button>
      <button className='no-button' onClick={(e) => ClickNo(e)}>No (Keep Cart Item)</button>
    </div>
  );
}
