import { useModal } from "../../context/Modal";
import DeleteReview from "../DeleteReview/DeleteReview";
import './DeleteReviewModal.css'
// import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"

function DeleteReviewModal({productId}) {
    const navigate = useNavigate();
    // const { productId } = useParams();
    const { closeModal } = useModal();
    // console.log("PRODUCT ID: ", productId)
    function onSubmit(e) {
        e.preventDefault()
        closeModal()
    }

    
    navigate(`/`)

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
