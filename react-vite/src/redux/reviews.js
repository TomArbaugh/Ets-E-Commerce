const GET_REVIEWS = 'getReveiws'
<<<<<<< HEAD

=======
>>>>>>> be9acb02c14570ac3cdab2f6d57f105c29bcb5a1
const getReviews = (productId, data) => ({
    type: GET_REVIEWS,
    payload: data
})
<<<<<<< HEAD

=======
>>>>>>> be9acb02c14570ac3cdab2f6d57f105c29bcb5a1
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
<<<<<<< HEAD

const initialState = {}

=======
const initialState = {}
>>>>>>> be9acb02c14570ac3cdab2f6d57f105c29bcb5a1
function reviewsReducer(state = initialState, action) {
    switch (action.type) {
      case GET_REVIEWS:
        return { ...state, reviews: action.payload };
      default:
        return state;
    }
  }
<<<<<<< HEAD

=======
>>>>>>> be9acb02c14570ac3cdab2f6d57f105c29bcb5a1
export default reviewsReducer