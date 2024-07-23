import {useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { thunkGetAllProducts } from "../../redux/products";
import OpenModalButton from "../OpenModalButton";
import CancelOrderModal from "../CancelOrderModal/CancelOrderModal";
import './ViewOrder.css';

function ViewOrder() {

    const dispatch = useDispatch()
    const [orders, setOrders] = useState([])
    const [orderItems, setOrderItems] = useState()
    // const [orderId, setId] = useState()

    useEffect(() => {
        dispatch(thunkGetAllProducts());
    }, [dispatch]);

    // const user = useSelector((state) => state.session.user);




    let response;
    const fetchOrders = async () => {

        try {
            response = await fetch(`/api/orders/`)
            const data = await response.json()
            setOrders(data)
      
        } catch (err) {
            console.error('Request Error:', err);
        }

    }



    let data;
    const getItems = async () => {

        // const id = orderId

        const items = await fetch(`/api/orders/order-items/2`)

        data = await items.json()

        setOrderItems(data)
    }


    useEffect(() => {
        fetchOrders()
        getItems()
    }, [dispatch])

    const ordersArr = []
    orders ? orders.map((order) => {
        const orderDetails = {}

        orderDetails.status = order.status
        orderDetails.total = order.total
        orderDetails.order_items = []

        orderDetails.order_id = order.id
        order.products_ordered.map((order_item) => {

            const orderItemObj = {}

        

            let quantitiyContainer;
            orderItems ? quantitiyContainer  = orderItems.find((orderItem) => order.id === orderItem.order_id && orderItem.product_id === order_item.id) : null
            // for (let orderItem of orderItems) {
            //     if (orderItem.order_id === order_item.id) orderItemObj.quantity = orderItem.quantity
            
            // }
          
            orderItemObj.id = order_item.id
            
            orderItemObj.name = order_item.name,
            orderItemObj.price = order_item.price,
            quantitiyContainer ? orderItemObj.quantity = quantitiyContainer.quantity : null,
            quantitiyContainer ? orderItemObj.total = quantitiyContainer.quantity * order_item.price : null

            orderDetails.order_items.push(orderItemObj)
        
        })
        ordersArr.push(orderDetails)
}) : null
 

    if (!ordersArr.length) return <p>No orders</p>;

    return (
        <>
            <h1>Your Orders</h1>
            {ordersArr.map((order, index) => (
                <div key={index} className="order-container">
                    {order.order_items.map((order_item, itemIndex) => (
                        <div key={itemIndex} className="order-item-container">
                           <p>Order {order.order_id}</p>
                            <p>Product Name: {order_item.name}</p>
                            <p>Price: {order_item.price}</p>
                            {/* Add Quantity if it exists */}
                            {order_item.quantity ? <p>Quantity: {order_item.quantity}</p> : null}
                            
                        </div>
                        
                    ))}
                    {/* <p>Quantity: {order.products_ordered.id}</p> */}
                    <p>Total: {Number(order.total).toFixed(2)}</p>
                    <div className="cancel-button">
                    <p className="cancel-label">Product Not Shipped Yet</p>
                    <OpenModalButton
                        buttonText="Cancel Order"
                        modalComponent={<CancelOrderModal orderId={order.order_id} />}
                    />
                    </div>
                    
                     {/* <p>OrderId: {order.purchaser_id}</p> */}
                </div>
            ))}
        </>
    );

}

export default ViewOrder;
