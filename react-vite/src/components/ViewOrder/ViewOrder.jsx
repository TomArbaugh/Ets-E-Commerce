import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkGetAllProducts } from "../../redux/products";
import { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import CancelOrderModal from "../CancelOrderModal/CancelOrderModal";
import './ViewOrder.css';


function ViewOrder() {

    const dispatch = useDispatch()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        dispatch(thunkGetAllProducts());
    }, [dispatch]);

    const user = useSelector((state) => state.session.user)




    let response;
    const fetchOrders = async () => {

        try {
            response = await fetch(`/api/orders/`)
            const data = await response.json()
            setOrders(data)
            // console.log("27", orders)
        } catch (err) {
            console.error('Request Error:', err);
        }

    }
    useEffect(() => {
        fetchOrders()
    }, [dispatch])



    console.log("This is orders", orders)


    const ordersArr = []
    orders ? orders.map((order) => {
        const orderDetails = {}

        orderDetails.status = order.status
        orderDetails.total = order.total
        orderDetails.order_items = []
        console.log("ORDER: ", order)

        order.products_ordered.map((order_item) => {

            const orderItemObj = {}



            // const id = order_item.order_id

            orderItemObj.name = order_item.name,
                orderItemObj.price = order_item.price,
                // orderItemObj.quantity = order_item.quantity,
                // orderItemObj.total = order_item.quantity * order_item.price

                orderDetails.order_items.push(orderItemObj)

        })
        ordersArr.push(orderDetails)
    }) : null
    console.log("ORDERSARRAY: ", ordersArr)

    if (!ordersArr.length) return "no orders"
    return (
        <>
            <h1>Orders for {user.first_name}</h1>
            {ordersArr.map((order, index) => (
                <div key={index} className="order-container">
                    {order.order_items.map((order_item, itemIndex) => (
                        <div key={itemIndex} className="order-item-container">
                            {/* <p>Order Id: {order_items.order_id}</p> */}
                            <p>Product Name: {order_item.name}</p>
                            <p>Price: {order_item.price}</p>
                            <p>Quantity: {order_item.quantity}</p>
                        </div>
                    ))}
                    <p>Total: {Number(order.total).toFixed(2)}</p>
                    <div className="cancel-order-container">
                        <OpenModalButton
                            buttonText="Cancel Order"
                            modalComponent={<CancelOrderModal />}
                        />
                        <p className="cancel-order-text">[order has not shipped yet]</p>
                    </div>
                </div>
            ))}
        </>
    );
}

            export default ViewOrder
