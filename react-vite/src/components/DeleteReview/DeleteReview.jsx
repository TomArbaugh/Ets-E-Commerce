import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'


function DeleteReview() {
    const { productId } = useParams();

    const userId = useSelector(state => state.session.user.id)


    const setState = async (e) => {
        e.preventDefault()
        try {
            const fetchAllReviews = await fetch(`/api/reviews/${productId}/reviews`);
            const fetchedReviews = await fetchAllReviews.json()
            const review = fetchedReviews.find((review) => review.user_id === userId)

            if (review) {
                await fetch(`/api/review/${productId}/delete-review`, {
                    method: 'DELETE'
                })
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
