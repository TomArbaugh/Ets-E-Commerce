import { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { thunkAuthenticate } from "../../redux/session.js";
import "./EditReview.css"

function EditReview() {
    const { productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(null);
    const [errors, setErrors] = useState({});
    const [err, setErr] = useState(null);
    const userId = user ? user.id : null;

    const validateForm = () => {
        const newErrors = {};
        if (review.length > 2000 || review.length < 2) newErrors.review = "Reviews must be between 2 and 2000 characters";
        if (stars < 1 || stars > 5) newErrors.stars = "Stars must be between 1 and 5";
        if (err) newErrors.noReview = "You do not have a review to edit";
        if (!userId) newErrors.user = "You must be logged in to edit a review.";
        return newErrors;
    };

    useEffect(() => {
        const setState = async () => {
            try {
                const fetchAllReviews = await fetch(`/api/reviews/${productId}/reviews`);
                const fetchedReviews = await fetchAllReviews.json();
                const userReview = userId ? fetchedReviews.find((review) => review.user_id === userId) : null;

                if (userReview) {
                    setReview(userReview.review);
                    setStars(userReview.stars);
                } else {
                    setErr("You do not have a review to edit");
                }
            } catch (err) {
                console.error('Request Error:', err);
            }
        };

        setState();
    }, [dispatch, userId, productId]);

    useEffect(() => {
        dispatch(thunkAuthenticate());
    }, [dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const reviewData = {
            review,
            stars,
        };

        try {
            const reviewRes = await fetch(`/api/reviews/${productId}/edit-review/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            if (reviewRes.ok) {
                navigate(`/products/${productId}`);
            } else {
                const errorData = await reviewRes.json();
                setErrors({ apiError: errorData.message || "An error occurred" });
            }
        } catch (err) {
            console.error('Request Error:', err);
            setErrors({ apiError: "An error occurred" });
        }
    };

    return (
        <div className="edit-review-container">
            <h1>Edit your review</h1>
            <form onSubmit={handleSubmit}>
                <h3>My Review</h3>
                {errors.user && <p className="error-message">{errors.user}</p>}
                <label className="edit-form-labels">
                    Stars
                    <select value={stars} onChange={(e) => setStars(Number(e.target.value))}>
                        <option value="">Select stars</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    {errors.stars && <p className="error-message">{errors.stars}</p>}
                    {errors.apiError && <p className="error-message">{errors.apiError}</p>}
                </label>
                <label className="edit-form-labels">
                    What did you think of this product?
                    <textarea value={review} type="text" onChange={(e) => setReview(e.target.value)} />
                    {errors.review && <p className="error-message">{errors.review}</p>}
                    {errors.noReview && <p className="error-message">{errors.noReview}</p>}
                </label>
                <button type='submit'>Leave Review</button>
            </form>
        </div>
    );
}

export default EditReview;
