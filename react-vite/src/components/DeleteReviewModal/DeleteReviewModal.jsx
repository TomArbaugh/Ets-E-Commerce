import { useModal } from "../../context/Modal";
import DeleteReview from "../DeleteReview/DeleteReview";
import './DeleteReviewModal.css'
function DeleteReviewModal() {

    const { closeModal } = useModal();
    function onSubmit(e) {
        e.preventDefault()
        closeModal()

    }
    return (
        <form>
        <h1>Are you sure you want to delete?</h1>
        <button 
        type='submit'
        onClick={onSubmit}
        >No</button>
        <button
        type='submit'
        onClick={onSubmit}
        >
        <DeleteReview id="delete-review"/>
        </button>
       
        </form>
    )
}

export default DeleteReviewModal