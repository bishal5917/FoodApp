import React, { useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import './IF.css'
import { useSelector, useDispatch } from 'react-redux'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { deleteReview, getReview } from "../Redux/Actions/reviewActions";

function Reviewtext({ rvs }) {

    const dispatch = useDispatch()

    //states for modal
    const [open, setOpen] = useState(false)

    //getting user if its logged in
    const loggedinuserId = useSelector(state => state.user.curruser && state.user.curruser._id)

    const noOfStars = []
    for (let i = 0; i < rvs.rating; i++) {
        noOfStars.push("0")
    }

    let { loading, fetched, error, reviews } = useSelector(
        (state) => state.reviews)

    const deleteReviewHandle = async () => {
        const granted = window.confirm("Are you sure to delete your review ? ")
        if (granted) {
            try {
                dispatch(deleteReview(rvs._id, loggedinuserId))
                setOpen(true)
                // !loading && dispatch(getReview(rvs._id))
            } catch (error) {
                console.log(error)
            }
        }
    }

    //for updating
    const [updatemode, setUpdateMode] = useState(false)
    const [text, setText] = useState(rvs.reviewText)
    const [editsuccess, setEditSuccess] = useState(false)
    const editStart = () => {
        updatemode ? (setUpdateMode(false)) : setUpdateMode(true)
    }

    const handleEditProcess = async () => {
        try {
            const updated = await axios.put('/reviews/edit/' + rvs._id, {
                userId: loggedinuserId,
                reviewText: text
            })
            if (updated.status === 200) {
                setEditSuccess(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="border m-3 p-3">
                <div className="d-flex justify-content-between ">
                    <span>
                        {noOfStars.map((x) => (
                            <i className="fa fa-star yellow"></i>
                        )
                        )}
                    </span>
                    <div className="lastOne">
                        {
                            loggedinuserId === rvs.reviewerId &&
                            (<>
                                <DeleteOutlineOutlinedIcon className="delIco"
                                    onClick={deleteReviewHandle}
                                    style={{ "color": "tomato" }} />
                                <EditIcon className="delIco"
                                    onClick={editStart}
                                    style={{ "color": "teal" }} />
                            </>)}
                        <span className="t5">Date : {rvs.createdAt.split("T")[0]} </span>
                    </div>
                </div>
                <div className="p-3 pt-0 pb-0">
                    <span className="t5">{rvs.reviewername}</span>
                    <br />
                    {
                        !updatemode ? (<span>{rvs.reviewText}</span>) :
                            (<textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="2"
                            ></textarea>)
                    }
                    {editsuccess && (
                        <div class="alert alert-primary" role="alert">
                            Edited SuccessFully !!!
                        </div>
                    )}
                </div>
                {
                    updatemode && (
                        <button
                            onClick={handleEditProcess}
                            type="button"
                            class="btn btn-success mx-3 my-3"
                        >
                            SAVE CHANGES
                        </button>
                    )
                }

            </div>

            <Modal isOpen={open}>
                <h2 className="title">Successful !!!</h2>
                <button onClick={() => setOpen(false)}>OK</button>
            </Modal>
        </>
    )
}

export default Reviewtext