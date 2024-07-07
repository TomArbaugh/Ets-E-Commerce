import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkGetAllProducts } from "../../redux/products";
import { useState } from "react";
import OpenModalButton from "../OpenModalButton";
import CancelOrderModal from "../CancelOrderModal/CancelOrderModal";


function ViewOrder() {

    const dispatch = useDispatch()
    const [orders, setOrders] = useState([])
    const [orderItems, setOrderItems] = useState()
    // const [orderId, setId] = useState()

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
  

    
    let data;
    const getItems = async () => {

        // const id = orderId

        const items = await fetch(`/api/orders/order-items/2`)
        
        data = await items.json()
       
        setOrderItems(data)
    } 
    console.log("THIS IS IT ", orderItems)

    useEffect(() => {
        fetchOrders()
        getItems()
    }, [dispatch])

    const ordersArr = []
    orders ? orders.map((order) => {
        const orderDetails = {}

        orderDetails.status = order.status
        orderDetails.total = order.total
        orderDetails.id = order.id
        orderDetails.order_items = []
        // console.log("ORDER: ", order)

        order.products_ordered.map((order_item) => {

            const orderItemObj = {}
           
            console.log("THIS SHOULD BE THE ID", order_item.id)
            console.log("orderItems state:", orderItems)
            let quantitiyContainer = orderItems.find((orderItem) => order.id === orderItem.order_id)
            // for (let orderItem of orderItems) {
            //     if (orderItem.order_id === order_item.id) orderItemObj.quantity = orderItem.quantity
            //     console.log(orderItem.order_id === order.id)
            // }
            // console.log("container",quantitiyContainer)
            // const id = order_item.order_id
            
            orderItemObj.name = order_item.name,
            orderItemObj.price = order_item.price,
            orderItemObj.quantity = quantitiyContainer.quantity,
            orderItemObj.total = quantitiyContainer.quantity * order_item.price

            orderDetails.order_items.push(orderItemObj)
            console.log("HERE IS THE OBJ", orderItemObj)
        })
        ordersArr.push(orderDetails)
}) : null
    console.log("ORDERSARRAY: ", ordersArr)

    if (!ordersArr.length) return "no orders"
    return (
        <>
            <h1>Orders for {user.first_name}</h1>
            {ordersArr.map((order) => (
                <>
                    {order.order_items.map((order_item) => (
                        <>
                            {/* <p>Order Id: {order_items.order_id}</p> */}
                            <p>Product Name: {order_item.name}</p>
                            <p>Price: {order_item.price}</p>
                            <p>Quantity: {order_item.quantity}</p>
                        </>

                    ))}
                    <p>Status: {order.status}</p>
                    <p>Total: {Number(order.total).toFixed(2)}</p>
                    <p></p>
                    <p></p>
                    <OpenModalButton
            buttonText="Cancel Order"
            modalComponent={<CancelOrderModal orderId={order.id}/>}
            />
                </>
            ))}
          
        </>
    )
}

export default ViewOrder
