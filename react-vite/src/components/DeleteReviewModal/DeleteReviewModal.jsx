import { useModal } from "../../context/Modal";
import DeleteReview from "../DeleteReview/DeleteReview";
import './DeleteReviewModal.css'
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"

function DeleteReviewModal() {
    const navigate = useNavigate();
    // const { productId } = useParams();
    const { closeModal } = useModal();

    function onSubmit(e) {
        e.preventDefault();
        closeModal();
        navigate(`/`);
    }

    return (
        <form className="delete-review-modal" onSubmit={onSubmit}>
            <h2>Are you sure you want to delete?</h2>
            <div className="delete-review-buttons">
            <button
                type='button'
                onClick={onSubmit}
                className="no-button"
            >No</button>
            <button
                type='submit'
                className="yes-button"
            > <DeleteReview>
                    Yes
                </DeleteReview>
            </button>
            </div>
        </form>
    );
}

export default DeleteReviewModal;
