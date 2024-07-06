import { useModal } from "../../context/Modal";
import CancelOrder from "../CancelOrder/CancelOrder";
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"


function CancelOrderModal({orderId}) {
    const navigate = useNavigate();
    // const { orderId } = useParams();
    const { closeModal } = useModal();
    
    
    function onSubmit(e) {
        e.preventDefault()
        closeModal()
    }

    navigate(`/`)

    return (

    
        <form>
        <h1>Are you sure you want to cancel?</h1>
        <button
        type='submit'
        onClick={onSubmit}
        >No</button>
          <button
        type='submit'
        onClick={onSubmit}
        >
        <CancelOrder orderId={orderId}/>
        </button>
        </form>
      
    
     
    )
}

export default CancelOrderModal