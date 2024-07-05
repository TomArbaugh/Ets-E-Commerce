import { useState} from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { thunkAuthenticate } from "../../redux/session.js";
import { useDispatch, useSelector } from "react-redux";
// import DeleteReview from "../DeleteReview/DeleteReview"


function EditReview() {


    const { productId } = useParams();
// console.log('USER: ', user)

    // const [productId, setProductId] = useState(null);
    // const [userId, setUserId] = useState(null);
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(null);
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const validateForm = () => {
        const newErrors = {};
        if (review.length > 2000) newErrors.review = "Reviews must be less than 2000 characters";
        if (stars < 1 || stars > 5) newErrors.stars = "Stars must be between 1 and 5"
        return newErrors;
    }

    const userId = useSelector(state => state.session.user.id)

    useEffect(() => {
        const setState = async () => {

            try {
                const fetchAllReviews = await fetch(`/api/reviews/${productId}/reviews`);
                const fetchedReviews = await fetchAllReviews.json()
                // console.log("FETCHALLREVIEWS: ", fetchedReviews)
                const review = fetchedReviews.find((review) => review.user_id === userId)
                // console.log(fetchedReviews[0].user_id === userId)
                // console.log('REVIEW: ', review)
                if (review) {
                    setReview(review.review)
                    setStars(review.stars)
                }
            } catch (err) {
                console.error('Request Error:', err);
            }
        }

        setState()
    }, [dispatch, userId, productId])


    // console.log("USERID: ", userId)


    useEffect(() => {
         dispatch(thunkAuthenticate());
      }, [dispatch, productId]);



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
            const reviewRes = await fetch(`/api/reviews/${productId}/edit-review/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });
            // console.log("TRY")
            if (reviewRes.ok) {
                // const newReview = await reviewRes.json();
                navigate(`/products/${productId}`);
            }
        } catch (err) {
            console.error('Request Error:', err);
        }
        // console.log("TEST")

    }

    return (
        <div>
            <h1>Edit a review</h1>
            <form onSubmit={handleSubmit}>
                <h3>Hello Review</h3>
                <input value={review} type="text" onChange={(e) => setReview(e.target.value)} />
                {errors.review && <p className="error-message">{errors.review}</p>}
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

export default EditReview;
