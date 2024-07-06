const GET_REVIEWS = 'getReveiws'

const getReviews = (productId, data) => ({
    type: GET_REVIEWS,
    payload: data
})

export const getReviewsByProductId = (productId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${productId}/reviews`)
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            console.log(data.errors)
        }
        dispatch(getReviews(productId, data))
    }
    
}

const initialState = {}

function reviewsReducer(state = initialState, action) {
    switch (action.type) {
      case GET_REVIEWS:
        return { ...state, reviews: action.payload };
      default:
        return state;
    }
  }

export default reviewsReducer