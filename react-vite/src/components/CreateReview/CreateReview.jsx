import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getReviewsByProductId } from "../../redux/reviews";

function CreateReview() {
    const { productId } = useParams();
    const dispatch = useDispatch()
    // const [productId, setProductId] = useState(null);
    // const [userId, setUserId] = useState(null);
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(null);
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getReviewsByProductId(productId))
      }, [dispatch, productId])

    const reviews = useSelector((state) => state.reviews.reviews)
    const user = useSelector((state) => state.session.user)

    let existingReview;
    reviews && user ? existingReview = reviews.find(review => review.user_id === user.id) : null

    // console.log(existingReview)

    const validateForm = () => {
        const newErrors = {};
        if (review.length > 2000) newErrors.review = "Reviews must be less than 2000 characters";
        if (stars < 1 || stars > 5) newErrors.stars = "Stars must be between 1 and 5";
        if (existingReview) newErrors.existingReview = "You can only leave one review per product."
        if (!user) newErrors.user = "You must be logged in to leave a review."
        return newErrors;
    }

    useEffect(() => {
        // console.log(productId)
    }, [productId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const reviewData = {
            // product_id: productId,
            // user_id: userId,
            review,
            stars,
        }

        // console.log("REVIEWDATA: ", reviewData)

        try {
            const reviewRes = await fetch(`/api/reviews/${productId}/create-review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            if (reviewRes.ok) {
                // const newReview = await reviewRes.json();
                navigate(`/products/${productId}`);
            }
        } catch (err) {
            console.error('Request Error:', err);
        }
    }

    return (
        <div>
            <h1>Create a new review</h1>
            <form onSubmit={handleSubmit}>
                <h3>Review</h3>
                {errors.user && <p className="error-message">{errors.user}</p>}
                <input value={review} type="text" onChange={(e) => setReview(e.target.value)} />
                {errors.review && <p className="error-message">{errors.review}</p>}
                {errors.existingReview && <p className="error-message">{errors.existingReview}</p>}
                <select value={stars} onChange={(e) => setStars(e.target.value)}>
                    <option value="">Select stars</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                {errors.stars && <p className="error-message">{errors.stars}</p>}
                <button type='submit'>Leave Review</button>
            </form>
        </div>
    )
}


export default CreateReview;
