// action types
const ADD_TO_CART = 'cart/ADD_TO_CART';
const GET_CART_ITEMS = 'cart/GET_CART_ITEMS';
const DELETE_CART_ITEM = 'cart/DELETE_CART_ITEM';
const UPDATE_CART_ITEM_QUANTITY = 'cart/UPDATE_CART_ITEM_QUANTITY';

// action creators
export const addToCart = (item) => ({
    type: ADD_TO_CART,
    item,
});

export const getCartItems = (items) => ({
    type: GET_CART_ITEMS,
    items,
});

export const deleteCartItem = (itemId) => ({
    type: DELETE_CART_ITEM,
    itemId,
});

export const updateCartItemQuantity = (item) => ({
    type: UPDATE_CART_ITEM_QUANTITY,
    item,
});

// thunks
export const fetchCartItems = (shoppingCartId) => async (dispatch) => {
    const res = await fetch(`/api/cart_items/${shoppingCartId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getCartItems(data.cart_items));
    } else {
        const error = await res.json();
        return error;
    }
};

export const addItemToCart = (productId, quantity) => async (dispatch) => {
    const res = await fetch(`/api/cart_items/add/${productId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
    });
    if (res.ok) {
        const newItem = await res.json();
        dispatch(addToCart(newItem));
        return newItem;
    } else {
        const error = await res.json();
        return error;
    }
};

export const updateCartItemQuantityThunk = (cartItemId, quantity) => async (dispatch) => {
    const res = await fetch(`/api/cart_items/${cartItemId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
    });
    if (res.ok) {
        const updatedItem = await res.json();
        dispatch(updateCartItemQuantity(updatedItem));
        return updatedItem;
    } else {
        const error = await res.json();
        return error;
    }
};

export const removeItemFromCart = (itemId) => async (dispatch) => {
    const res = await fetch(`/api/cart_items/${itemId}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        dispatch(deleteCartItem(itemId));
    } else {
        const error = await res.json();
        return error;
    }
};

// reducer
const initialState = {
    cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.item],
            };
        case GET_CART_ITEMS:
            return {
                ...state,
                cartItems: action.items,
            };
        case UPDATE_CART_ITEM_QUANTITY:
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.item.id ? action.item : item
                ),
            };
        case DELETE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.itemId),
            };
        default:
            return state;
    }
};

export default cartReducer;
