import { useModal } from "../../context/Modal";
import DeleteReview from "../DeleteReview/DeleteReview";
import './DeleteReviewModal.css';
import { useNavigate } from "react-router-dom";

function DeleteReviewModal({ productId }) {
    const navigate = useNavigate();
    const { closeModal } = useModal();

    function handleNoClick(e) {
        e.preventDefault();
        closeModal();
        navigate(`/products/${productId}`);
    }

    function handleYesClick(e) {
        e.preventDefault();
        closeModal();
        navigate(`/`);
    }

    return (
        <form className="delete-review-modal">
            <h2>Are you sure you want to delete?</h2>
            <div className="delete-review-buttons">
                <button
                    type='button'
                    onClick={handleNoClick}
                    className="no-button"
                >
                    No
                </button>
                <button
                    type='submit'
                    className="yes-button"
                    onClick={handleYesClick}
                >
                    <DeleteReview>
                        Yes
                    </DeleteReview>
                </button>
            </div>
        </form>
    );
}

export default DeleteReviewModal;
