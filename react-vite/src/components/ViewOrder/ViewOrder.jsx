import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetAllProducts } from "../../redux/products";
import OpenModalButton from "../OpenModalButton";
import CancelOrderModal from "../CancelOrderModal/CancelOrderModal";

function ViewOrder() {
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        dispatch(thunkGetAllProducts());
    }, [dispatch]);

    const user = useSelector((state) => state.session.user);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`/api/orders/`);
                const data = await response.json();
                setOrders(data);
            } catch (err) {
                console.error('Request Error:', err);
            }
        };

        fetchOrders();
    }, []);

    const ordersArr = orders.map((order) => {
        const orderDetails = {
            status: order.status,
            total: order.total,
            id: order.id,
            order_items: order.products_ordered.map((order_item) => ({
                name: order_item.name,
                price: order_item.price,
            }))
        };
        return orderDetails;
    });

    if (!ordersArr.length) return <p>No orders</p>;

    return (
        <>
            <h1>Orders for {user.first_name}</h1>
            {ordersArr.map((order) => (
                <div key={order.id}>
                    {order.order_items.map((order_item, index) => (
                        <div key={index}>
                            <p>Product Name: {order_item.name}</p>
                            <p>Price: {order_item.price}</p>
                            {/* Add Quantity if it exists */}
                            {order_item.quantity && <p>Quantity: {order_item.quantity}</p>}
                        </div>
                    ))}
                    <p>Status: {order.status}</p>
                    <p>Total: {Number(order.total).toFixed(2)}</p>
                    <OpenModalButton
                        buttonText="Cancel Order"
                        modalComponent={<CancelOrderModal orderId={order.id} />}
                    />
                </div>
            ))}
        </>
    );
}

export default ViewOrder;
