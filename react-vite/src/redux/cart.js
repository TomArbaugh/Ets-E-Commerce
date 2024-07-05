const ADD_TO_CART = 'cart/ADD_TO_CART';
const SET_CART_ITEMS = 'cart/SET_CART_ITEMS';


const addToCart = (item) => ({
 type: ADD_TO_CART,
 item,
});


const setCartItems = (items) => ({
 type: SET_CART_ITEMS,
 items,
});




export const fetchCartItems = (shoppingCartId) => async (dispatch) => {
 const response = await fetch(`/api/shopping_carts/${shoppingCartId}/cart_items`);
 if (response.ok) {
   const data = await response.json();
   dispatch(setCartItems(data.cart_items));
 } else {
   console.error('Failed to fetch cart items');
 }
};


export const addItemToCart = (productId, quantity) => async (dispatch) => {
 const response = await fetch(`/api/cart_items/add/${productId}`, {
   method: 'POST',
   headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify({ quantity }),
 });
 if (response.ok) {
   const data = await response.json();
   dispatch(addToCart(data.cart_item));
 } else {
   console.error('Failed to add item to cart');
 }
};










const initialState = {
 items: [],
};




const cartReducer = (state = initialState, action) => {
 switch (action.type) {
   case ADD_TO_CART: {
     const existingItemIndex = state.items.findIndex(item => item.id === action.item.id);
     if (existingItemIndex !== -1) {
       const updatedItems = state.items.map((item, index) =>
         index === existingItemIndex ? { ...item, quantity: item.quantity + action.item.quantity } : item
       );
       return {
         ...state,
         items: updatedItems,
       };
     } else {
       return {
         ...state,
         items: [...state.items, action.item],
       };
     }
   }
   case SET_CART_ITEMS:
     return {
       ...state,
       items: action.items,
     };
   default:
     return state;
 }
};


export default cartReducer;