import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import axios from 'axios'

function OrderInfo() {

    const { orderId } = useParams()

    const sId = useSelector(state => state.seller.currseller && state.seller.currseller._id)

    //get order by its id 
    const [ord, setOrd] = useState("")
    useEffect(() => {
        const getThatOrder = async () => {
            try {
                const res = await axios.get('/ordered/getaboutorder/' + orderId)
                setOrd(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getThatOrder();
    }, [orderId]);

    //get userinfo that ordered that item
    const [userinfo, setUserInfo] = useState("")
    useEffect(() => {
        const getThatUser = async () => {
            try {
                const aboutuser = await axios.get('/users/getuser/' + ord.customerId)
                setUserInfo(aboutuser.data)
            } catch (error) {
                console.log(error)
            }
        }
        getThatUser();
    }, [ord.customerId]);

    const [status, setStatus] = useState();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false)

    //handling status updates
    const handleStatusUpdate = async (e) => {
        e.preventDefault()
        if (status) {
            try {
                const resp = await axios.put('/ordered/updateord/' + orderId, {
                    sellerId: sId,
                    status
                })
                if (resp.status === 200) {
                    setSuccess(true)
                }
            } catch (error) {
                console.log(error)
                setError(true)
            }
        }
        else {
            setError(true)
        }
    }


    return (
        <>
            <div className="mainbody">
                <div className="container">
                    <div className="title">Received Order Details</div>
                    {ord.cancelled &&
                        <div class="alert alert-danger mx-3 my-3" role="alert">
                            Note : This order has already been cancelled !
                        </div>
                    }
                    <div className="content">
                        <form action="#">
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Ordered Item</span>
                                    <input value={ord.productname} type="text" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Ordered By</span>
                                    <input value={userinfo.name} type="text" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Orderer Phone</span>
                                    <input value={userinfo.contact}
                                        type="text" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Quantity Ordered</span>
                                    <input value={ord.qty} type="text" required />
                                </div>

                                <div className="input-box">
                                    <span className="details">Total Price</span>
                                    <input value={ord.total} type="text" required />
                                </div>

                                <div className="input-box">
                                    <span className="details">Order Status</span>
                                    <select class="form-select"
                                        onChange={e => setStatus(e.target.value)}
                                        aria-label="Default select example">
                                        <option value={ord.status}>{ord.status}</option>
                                        <option value="pending">pending</option>
                                        <option value="prepared">prepared</option>
                                        <option value="served">served</option>
                                    </select>
                                </div>
                                {/* <div className="input-box">
                                    <span className="details">Payment Status</span>
                                    <select onChange={e => setPaid(e.target.value)}
                                        class="form-select" aria-label="Default select example">
                                        <option value={ord.isPaid} selected>{ord.isPaid}</option>
                                        <option value="unpaid" selected>unpaid</option>
                                        <option value="paid">paid</option>
                                    </select>
                                </div> */}
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1" >Order Description from orderer</label>
                                <textarea value={ord.description}
                                    className="form-control tarea" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            {
                                success && <div class="alert alert-success my-3" role="alert">
                                    Order Status Updated !!!
                                </div>
                            }
                            {
                                error && <div class="alert alert-danger my-3" role="alert">
                                    Please Change Status if you want to update it !
                                </div>
                            }
                            {
                                !ord.cancelled &&
                                <div className="button">
                                    <button onClick={handleStatusUpdate} className="btn btn-primary">Update Status</button>
                                </div>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderInfo