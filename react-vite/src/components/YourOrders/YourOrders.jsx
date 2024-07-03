// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { thunkGetOrders } from '../../redux/orders';
// import './YourOrders.css';

// const YourOrders = () => {
//   const dispatch = useDispatch();
//   const orders = useSelector(state => state.orders.allOrders);

//   useEffect(() => {
//     dispatch(thunkGetOrders());
//   }, [dispatch]);

//   return (
//     <div className="your-orders-page">
//       <h1>Orders</h1>
//       <div className="orders-section">
//         <h2>Pending</h2>
//         {orders.pending.length === 0 ? (
//           <p>No pending orders.</p>
//         ) : (
//           orders.pending.map(order => (
//             <div key={order.id} className="order-item">
//               <img src={order.image_url} alt={order.title} />
//               <div className="order-details">
//                 <p>{order.buyer} ${order.price} Order #{order.id} / Quantity({order.quantity})</p>
//                 <p>{order.title}</p>
//                 <button>Complete order</button>
//                 <button>Cancel order</button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//       <div className="orders-section">
//         <h2>Completed Orders</h2>
//         {orders.completed.length === 0 ? (
//           <p>No completed orders.</p>
//         ) : (
//           orders.completed.map(order => (
//             <div key={order.id} className="order-item">
//               <img src={order.image_url} alt={order.title} />
//               <div className="order-details">
//                 <p>{order.buyer} ${order.price} Order #{order.id} / Quantity({order.quantity})</p>
//                 <p>{order.title}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default YourOrders;
