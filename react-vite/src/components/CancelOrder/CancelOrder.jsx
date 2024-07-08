import { useNavigate} from "react-router-dom";


function CancelOrder({orderId}) {
    // const {orderId} = useParams()
    const navigate = useNavigate()

    const setState = async (e) => {
        e.preventDefault()
        console.log("OrderId", orderId)
        try {
            const fetchAllOrders = await fetch(`/api/orders/`);
            const fetchedOrders = await fetchAllOrders.json();
            // console.log("FETCHED ORDERS: ", fetchedOrders)
            const order = fetchedOrders.find((order) => order.id == orderId)
            // console.log("ORDER: ", order)
            if (order.status === 'Pending') {
                const deleteFetch = await fetch(`/api/orders/${orderId}/delete-order`, {
                    method: 'DELETE'
                })
                const result = await deleteFetch.json()
                if (result) {
                    navigate('/orders/view')
                }
            }
        } catch (err) {
            console.error("Request Error:", err);
        }
    }

    return (
<<<<<<< HEAD

=======
        
>>>>>>> 3d688d1d738a286943a7db2fe0799b53b3e650fd
        <button className='yes-button' onClick={setState}>Cancel Order</button>
    )
}

export default CancelOrder;
