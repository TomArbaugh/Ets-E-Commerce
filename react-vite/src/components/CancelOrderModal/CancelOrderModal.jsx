import { useModal } from "../../context/Modal";
import CancelOrder from "../CancelOrder/CancelOrder";
import { useNavigate } from "react-router-dom";
import './CancelOrderModal.css';

function CancelOrderModal({ orderId }) {
    const navigate = useNavigate();
    const { closeModal } = useModal();

    function handleNoClick(e) {
      e.preventDefault();
      closeModal();
      setTimeout(() => {
          navigate(`/orders/view`);
      }, 100); 
    }
    
    function handleYesClick(e) {
        e.preventDefault();
        closeModal();
        navigate(`/orders/view`);
    }

    return (
        <form className="cancel-order-modal">
            <h2>Are you sure you want to cancel?</h2>
            <div className="cancel-order-buttons">
                <button
                    type='button'
                    onClick={handleNoClick}
                    className="no-button"
                >
                    No (Keep Order)
                </button>
                <button
                    type='button'
                    onClick={handleYesClick}
                    className="yes-button"
                >
                    <CancelOrder orderId={orderId}>   
                    Yes
                    </CancelOrder> 
                </button>
            </div>
        </form>
    )
}

export default CancelOrderModal;
