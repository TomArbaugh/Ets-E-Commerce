import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeReview } from '../../redux/reviews';

function DeleteReview() {

    const { productId } = useParams();
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)



        const newErrors = {};

    const setState = async (e) => {
        // e.preventDefault()
        try {
            const fetchAllReviews = await fetch(`/api/reviews/${productId}/reviews`);
            const fetchedReviews = await fetchAllReviews.json()
            const review = fetchedReviews.find((review) => review.user_id === userId)

            if (review) {
                await dispatch(removeReview(productId, review.id));
                navigate(`/product/${productId}`)
                // const deleteFetch = await fetch(`/api/reviews/${productId}/delete-review`, {
                //     method: 'DELETE'
                // })
                // const result = await deleteFetch.json()
                // if (result) {
                //     navigate(`/product/${productId}`);
                // }
            } else {
                newErrors.errors = "You do not have a review to delete"
            }

        } catch (err) {
            console.error('Request Error:', err);
        }
    }



    return (
        <>
        <button onClick={setState}>Delete Review</button>
        {newErrors.errors && <p className="error-message">{newErrors.errors}</p>}
        </>

    )
}

export default DeleteReview
