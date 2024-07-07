import { useModal } from "../../context/Modal";
<<<<<<< HEAD
import './DeleteReviewModal.css';
import { useNavigate } from "react-router-dom";

function DeleteReviewModal() {
    const navigate = useNavigate();
=======
import DeleteReview from "../DeleteReview/DeleteReview";
import './DeleteReviewModal.css'
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"

function DeleteReviewModal() {
    const navigate = useNavigate();
    // const { productId } = useParams();
>>>>>>> aaron2
    const { closeModal } = useModal();

    function handleCancel() {
        closeModal();
    }

    function onSubmit(e) {
        e.preventDefault();
        closeModal();
        navigate(`/`);
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Are you sure you want to delete?</h1>
            <button
                type='button'
<<<<<<< HEAD
                onClick={handleCancel}
=======
                onClick={onSubmit}
            >No</button>
            <button
                type='button'
                onClick={onSubmit}
>>>>>>> aaron2
            >
                No
            </button>
            <button
                type='submit'
            >
                Yes
            </button>
        </form>
    );
}

export default DeleteReviewModal;
