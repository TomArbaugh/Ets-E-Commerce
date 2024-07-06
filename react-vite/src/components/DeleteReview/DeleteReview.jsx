import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function DeleteReview() {
   
    const { productId } = useParams();
    const navigate = useNavigate()
    const userId = useSelector(state => state.session.user.id)


    const setState = async (e) => {
        e.preventDefault()
        try {
            const fetchAllReviews = await fetch(`/api/reviews/${productId}/reviews`);
            const fetchedReviews = await fetchAllReviews.json()
            const review = fetchedReviews.find((review) => review.user_id === userId)

            if (review) {
                const deleteFetch = await fetch(`/api/reviews/${productId}/delete-review`, {
                    method: 'DELETE'
                })
                const result = await deleteFetch.json()
                if (result) {
                    navigate(`/products/${productId}`);
                }
            }

        } catch (err) {
            console.error('Request Error:', err);
        }
    }



    return (
        <button onClick={setState}>Delete Review</button>
    )
}

export default DeleteReview
