const GET_ALL_PRODUCTS = 'products/all';
const PRODUCT_DETAILS = 'products/details';
const CREATE_NEW_PRODUCT = 'products/new';
const CURRENT_USERS_PRODUCTS = 'products/current';
const UPDATE_PRODUCT = 'products/update';
const DELETE_PRODUCT = 'products/delete';
const ADD_PRODUCT_IMAGE = 'products/addImage';
// const UPDATE_PRODUCT_IMAGE = 'products/updateImage';
// const DELETE_PRODUCT_IMAGE = 'products/deleteImage';

const getAllProducts = (products) => ({
  type: GET_ALL_PRODUCTS,
  products,
});

const productDetails = (product) => ({
  type: PRODUCT_DETAILS,
  payload: product,
});

const createNewProduct = (product) => ({
  type: CREATE_NEW_PRODUCT,
  product,
});

const currentUsersProducts = (products) => ({
  type: CURRENT_USERS_PRODUCTS,
  products,
});

const updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

const deleteProduct = (productId) => ({
  type: DELETE_PRODUCT,
  productId,
});

const addProductImage = (productId, image) => ({
  type: ADD_PRODUCT_IMAGE,
  productId, 
  image
});

export const thunkGetAllProducts = () => async (dispatch) => {
  const res = await fetch('/api/products');
  if (res.ok) {
    const allProducts = await res.json();
    dispatch(getAllProducts(allProducts))
  } 
};

export const thunkProductDetails = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`);
  if (res.ok) {
    const product = await res.json();
    dispatch(productDetails(product))
  } else {
    const error = await res.json()
    return error;
  }
};

export const thunkCreateNewProduct = (product) => async (dispatch) => {
  const res = await fetch('/api/products', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  });
  if (res.ok) {
    const newProduct = await res.json();
    dispatch(createNewProduct(newProduct))
  }
};

export const thunkAddProductImage = (productId, image) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}/images`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: json.stringify(image),
  });
  if (res.ok) {
    const productImage = await res.json();
    dispatch(addProductImage(productId, productImage))
  } else {
    const error = await res.json()
    return error;
  }
};

export const thunkGetCurrentUsersProducts = () => async (dispatch) => {
  const res = await fetch('/api/products/current');
  if (res.ok) {
    const usersProducts = await res.json();
    dispatch(currentUsersProducts(usersProducts))
  } else {
    const error = await res.json()
    return error;
  }
};

export const thunkUpdateProducts = (product) => async (dispatch) => {
  const res = await fetch(`/api/products/${product.id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: json.stringify(product),
  });
  if (res.ok) {
    const updatedProduct = await res.json();
    dispatch(updateProduct(updatedProduct))
  } else {
    const error = await res.json()
    return error;
  }
};

export const thunkDeleteProducts = (productId) => async (dispatch) => {
  const res = await fetch(`/api/products/${productId}`, {
    method: 'DELETE',
  });
  if (res.ok) {
    dispatch(deleteProduct(productId))
  } else {
    const error = await res.json()
    return error;
  }
};

const initialState = {
  allProducts: [],
  productDetails: {},
}

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      newState = {
        ...state,
        allProducts: action.products,
      };
      return newState;
    case PRODUCT_DETAILS:
      newState = {
        ...state,
        productDetails: action.products,
      };
      return newState;
    case CREATE_NEW_PRODUCT:
      newState = {
        ...state,
        allProducts: [...state.allProducts, action.product],
      };
      return newState;
    case CURRENT_USERS_PRODUCTS:
      newState = { ...state, 
        allProducts: action.products
      };
      return newState;
    case UPDATE_PRODUCT:
      newState = {
        ...state,
      };
      return newState;
    case DELETE_PRODUCT:
      newState = {
        ...state,
        allProducts: state.products.filter(product=> product.id !== action.productId)
      };
      return newState;
    // case ADD_PRODUCT_IMAGE:
    //   const { productId, image } = action;
    //   const product = state[productId];
    //   if (!product) return state; 
    //   return {
    //     ...state,
    //     productDetails: pass
    //   };
    default:
      return state;
  }
}
