// import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function CancelOrder() {
    const { orderId } = useParams();

    // const userId = useSelector(state => state.session.user.id)

    const setState = async (e) => {
        e.preventDefault()
        try {
            const fetchAllOrders = await fetch(`/api/orders`);
            const fetchedOrders = await fetchAllOrders.json();
            console.log("FETCHED ORDERS: ", fetchedOrders[0])
            const order = fetchedOrders.find((order) => order.id == orderId)
            console.log("ORDER: ", order)
            if (order.status === 'pending') {
                const deleteFetch = await fetch(`/api/orders/${orderId}/delete-order`, {
                    method: 'DELETE'
                })
                const result = await deleteFetch.json()
                console.log(result)
            }
        } catch (err) {
            console.error("Request Error:", err);
        }
    }

    return (
        <button onClick={setState}>Cancel Order</button>
    )
}

export default CancelOrder;
