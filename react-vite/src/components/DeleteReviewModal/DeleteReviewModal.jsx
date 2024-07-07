import { useModal } from "../../context/Modal";
import './DeleteReviewModal.css';
import { useNavigate } from "react-router-dom";

function DeleteReviewModal() {
    const navigate = useNavigate();
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
                onClick={handleCancel}
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
