import { useState} from "react";
import { useEffect } from "react";
// import { useContext } from "react";
import { useNavigate, useParams } from 'react-router-dom'
// import { useModal } from '../../context/Modal.jsx'
import { thunkAuthenticate } from "../../redux/session.js";
import { useDispatch, useSelector } from "react-redux";


function EditReiew() {


    const { productId } = useParams();
    // const { user } = useModal
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
         dispatch(thunkAuthenticate());
      }, [dispatch, productId]);

    //   const getUser = async () => {
    //     const response = await fetch("/api/auth/");
    //     if (response.ok) {
    //         const data = await response.json();
    //         console.log(data)
    //   }
    // }
    // getUser()

    console.log("USER1: ", userId)
    // useEffect(() => {
    //     const getReview = async () => {
    //         const res = await fetch(`/api/reviews/${productId}/reviews/`)
    //         const reviews = await res.json()
    //         const review = reviews.find((review) => review.user_id === user.id)
    //         console.log(review)
    //         if (review) {
    //             setReview(review.review);
    //             setStars(review.stars);
    //         }
    //     }
    //     getReview()
    // }, [productId, user.id])
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

        console.log("REVIEWDATA: ", reviewData)

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
                navigate(`/reviews/${productId}`);
            }
        } catch (err) {
            console.error('Request Error:', err);
        }
    }

    return (
        <div>
            {/* <h1>{user}</h1> */}
            <h1>Create a new review</h1>
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

export default EditReiew
