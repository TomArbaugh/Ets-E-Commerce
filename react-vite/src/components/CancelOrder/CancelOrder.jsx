import { useNavigate} from "react-router-dom";


function CancelOrder({orderId}) {
    // const {orderId} = useParams()
    const navigate = useNavigate()

    const setState = async (e) => {
        e.preventDefault()
  
        try {
            const fetchAllOrders = await fetch(`/api/orders/`);
            const fetchedOrders = await fetchAllOrders.json();
            
            const order = fetchedOrders.find((order) => order.id == orderId)
       
            if (order.status === 'Pending') {
                const deleteFetch = await fetch(`/api/orders/${orderId}/delete-order`, {
                    method: 'DELETE'
                })
                const result = await deleteFetch.json()
                if (result) {
                    window.location.reload();
                    navigate('/orders/view')
                }
            }
        } catch (err) {
            console.error("Request Error:", err);
        }
    }

    return (
        
        <button className='yes-button' onClick={setState}>Cancel Order</button>
    )
}

export default CancelOrder;
