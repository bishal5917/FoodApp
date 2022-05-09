import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useSelector } from 'react-redux'
import { io } from 'socket.io-client'

const Orderconfirm = ({ name, price, category, quantity, seller, prodId }) => {

    const loggeduser = useSelector(state => state.user.curruser)
    const username = loggeduser.name

    const [socket, setSocket] = useState(null)

    useEffect(() => {
        //connecting to the socket server running on port 3050
        setSocket(io("http://localhost:3050"))
        // console.log(socket.id)
        //sending event to server using socket.emit
    }, []);

    useEffect(() => {
        socket && socket.emit('newUser', loggeduser._id)
    }, [socket, loggeduser._id])

    const totalprice = price * quantity
    const [description, setDescription] = useState("")
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const ConfirmOrder = async (e) => {
        e.preventDefault();
        try {
            const placed = await axios.post('/ordered/create', {
                productId: prodId,
                productname: name,
                customerId: loggeduser._id,
                sellerId: seller,
                qty: quantity,
                total: totalprice,
                description
            })
            if (placed.status === 200) {
                setSuccess(true)
                const sender = { name, username, quantity, description };
                const receiver = seller
                //creating an event when ordered
                socket.emit('sendNotification', {
                    sender, receiver
                })
            }
            setDescription("")
            const addNotification = async () => {
                const orderedDate = new Date()
                let notfic = `${username} has ordered ${quantity} ${name} on ${orderedDate}`
                // notfic = `${data.sender.name} has cancelled order #${data.sender.ordId} on ${orderedDate}`

                try {
                    await axios.put(`/sellers/updatenotfics/${seller}`, {
                        notification: notfic
                    })
                } catch (error) {
                    console.log(error)
                }
            }
            addNotification()
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }
    return (
        <>
            <div className="mainbody">
                <div className="container">
                    <div className="title">Order Details</div>
                    <div className="content">
                        <form action="#">
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Name</span>
                                    <input value={name}
                                        type="text" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Category</span>
                                    <input value={category}
                                        type="text" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Price</span>
                                    <input value={price}
                                        type="text" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Quantity</span>
                                    <input value={quantity}
                                        type="text" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Total</span>
                                    <input value={price * quantity}
                                        type="text" required />
                                </div>
                            </div>
                            <div class="form-group">
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1" >Describe Your Order in detail here !!!</label>
                                <textarea value={description}
                                    onChange={e => setDescription(e.target.value)} className="form-control tarea" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            {
                                success && <div class="alert alert-success my-3" role="alert">
                                    Order Placed Successfully !!!
                                </div>
                            }
                            {
                                error && <div class="alert alert-danger my-3" role="alert">
                                    Something Went wrong !!! please try later !!!
                                </div>
                            }
                            <div className="button">
                                <button onClick={ConfirmOrder} className="btn btn-info">Place Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Orderconfirm;
