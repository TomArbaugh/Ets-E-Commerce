// import { useSelector } from "react-redux"
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { thunkGetAllProducts } from "../../redux/products";
// import { useState } from "react";


function ViewOrder() {

    // const dispatch = useDispatch()
    // const [orders, setOrders] = useState([])

    // useEffect(() => {
    //     dispatch(thunkGetAllProducts());
    //   }, [dispatch]);

    // const user = useSelector((state) => state.session.user)
    // // const products = useSelector((state) => state.products.allProducts || []);

    
    
    // let response;
    // const fetchOrders = async () => {

    //     try {
    //         response = await fetch(`/api/orders/`)
    //         const data = await response.json()
    //         setOrders(data)
    //         // console.log("27", orders)
    //     } catch (err) {
    //         console.error('Request Error:', err);
    //     }
        
    // }
    // useEffect(() => {
    //     fetchOrders()
    // }, [dispatch])
    


    // console.log(orders)

    
//     const ordersArr = []
//     orders ? orders.map((order) => {

//         // console.log(order)

//         // order.products_ordered.map((order_item) => {
//         //     const order = []
//         //     const orderItemObj = {}

//         //     const product = products.find((product) => order_item.product_id === product.id)

//         //     // const id = order_item.order_id

//         //     orderItemObj[name] = product.name,
//         //     orderItemObj.price = product.price,
//         //     orderItemObj.quantity = order_item.quanity,
//         //     orderItemObj.total = order_item.quantity * product.price

//         //     order.push(orderItemObj)
//         //     ordersArr.push(order)
//         // })

// }) : null
    // console.log("ORDERSARRAY: ", ordersArr)

    // if (!orders) return "no orders"
    return (
        <>
            {/* <h1>Orders for {user.first_name}</h1>
            {orders ? orders.map((order) => (
                <>
                    {order.products_ordered.map((order_items) => (
                        <>
                            <p>Order Id: {order_items.order_id}</p>
                            <p>Product Id: {order_items.product_id}</p>
                            <p>Quantity: {order_items.quantity}</p>
                        </>

                    ))}
                    <p>Total: {order.total}</p>
                    <p></p>
                    <p></p>
                    <p></p>
                </>
            )) : null} */}

        </>
    )
}

export default ViewOrder
