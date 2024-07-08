import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import './CheckoutModal.css';

export default function CheckoutModal() {
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const ClickYes = async (e) => {
    e.preventDefault();
    try {
        await fetch('/api/orders/checkout', {
        method: ['POST'],
        headers: {
            'Content-Type': 'application/json'
        }
      })
      navigate('/orders/view')
      
      closeModal();
    } catch(error) {
      console.error('Fail to check out shopping cart:', error);
    }
  };

  const ClickNo = (e) => {
    e.preventDefault;
    closeModal();
  };

  return (
    <div className="delete-box">
      <h1>Review Your Order</h1>
      <h2>are you sure you want to order these items?</h2>
      <button className='yes-button' onClick={(e) => ClickYes(e)}>Yes (place order)</button>
      <button className='no-button' onClick={(e) => ClickNo(e)}>No</button>
    </div>
  );
}