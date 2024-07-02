import { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'

function CreateReview() {
    const { productId } = useParams();
    // const [product_id, setProductId] = useState(null);
    // const [userId, setUserId] = useState(null);
    const [review, setReview] = useState('');
    const [stars, setStars] = useState(null);
    const [errors, setErrors] = useState({})
    const navigate = useNavigate();


    const validateForm = () => {
        const newErrors = {};
        if (review.length > 2000) newErrors.review = "Reviews must be less than 2000 characters";
        if (stars < 1 || stars > 5) newErrors.stars = "Stars must be between 1 and 5"
        return newErrors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const reviewData = { review, stars }

        try {
            const reviewRes = fetch(`/api/reviews/${productId}/create-reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(reviewData)
            });

            if (reviewRes.ok) {
                const newReview = await reviewRes.json();
                navigate(`/reviews/${newReview.id}`);
            }
        } catch (err) {
            console.error('Request Error:', err);
        }
    }

    return (
        <div>
            <h1>Create a new review</h1>
            <form onSubmit={handleSubmit}>
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
            </form>
        </div>
    )
}


export default CreateReview;
