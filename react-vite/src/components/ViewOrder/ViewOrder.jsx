import { useSelector } from "react-redux"
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { thunkGetAllProducts } from "../../redux/products";
import { useState } from "react";


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



    console.log(orders)


    const ordersArr = []
    orders ? orders.map((order) => {
        const orderDetails = {}

        orderDetails.status = order.status
        orderDetails.total = order.total
        orderDetails.order_items = []
        console.log("ORDER: ", order.status)

        order.products_ordered.map((order_item) => {
           
            const orderItemObj = {}
            
            

            // const id = order_item.order_id
            
            orderItemObj.name = order_item.name,
            orderItemObj.price = order_item.price,
            // orderItemObj.quantity = order_item.quanity,
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
            {ordersArr.map((order) => (
                <>
                    {order.order_items.map((order_item) => (
                        <>
                            {/* <p>Order Id: {order_items.order_id}</p> */}
                            <p>Product Name: {order_item.name}</p>
                            <p>Price: {order_item.price}</p>
                            
                            <p></p>
                        </>

                    ))}
                    <p>Status: {order.status}</p>
                    <p>Total: {order.total}</p>
                    
                    <p></p>
                    <p></p>
                </>
            ))}

        </>
    )
}

export default ViewOrder
