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
        <form onSubmit={onSubmit}>
            <h1>Are you sure you want to delete?</h1>
            <button
                type='button'
                onClick={onSubmit}
            >No</button>
            <button
                type='button'
                onClick={onSubmit}
            >
                No
            </button>
            <button
                type='submit'
            > <DeleteReview>
                    Yes
                </DeleteReview>
            </button>
        </form>
    );
}

export default DeleteReviewModal;
