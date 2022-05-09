import React, { useState, useEffect } from 'react'
import './navbar.css'
import './notification.css'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import axios from 'axios'
import { Link } from 'react-router-dom';
import FiberManualRecordRoundedIcon from '@mui/icons-material/FiberManualRecordRounded';

export default function Navbar() {
    const PF = 'http://localhost:5000/raimages/'
    const seller = useSelector(state => state.seller.currseller)
    const sellerId = seller._id
    const [showbox, setShowBox] = useState(false)
    const handleChangeState = () => {
        showbox ? setShowBox(false) : setShowBox(true)
    }

    //getting the notifications array of seller 
    const [notfromdb, setNotFromDb] = useState([])
    useEffect(() => {
        const getNotFromDb = async () => {
            try {
                const resp = await axios.get('/sellers/getnotifics/' + sellerId)
                console.log(resp.data)
                setNotFromDb(resp.data)
            } catch (error) {
                console.log(error)
            }
        }
        getNotFromDb();

    }, [sellerId]);

    //socket code
    const [socket, setSocket] = useState(null)

    useEffect(() => {
        //connecting to the socket server running on port 3050
        setSocket(io("http://localhost:3050"))
        // console.log(socket.id)
        //sending event to server using socket.emit
    }, []);

    useEffect(() => {
        socket && socket.emit('newUser', sellerId)
    }, [socket, sellerId])

    const [notifics, setNotifics] = useState([])

    //grabbing getNotification event emitted from the server
    //the data is the actual notification gotten and 
    //we pushed it into the array

    useEffect(() => {
        socket?.on("getNotification", (data) => {
            setNotifics((prev) => [...prev, data]);
            // console.log(notifics)
        });
    }, [socket, sellerId]);

    return (
        <>
            <nav class="nv navbar navbar-light bg-light">
                <div className="seller">
                    <span className="sellerspan">{seller.name}</span>
                </div>
                <div className="profile">
                    <NotificationsNoneIcon onClick={handleChangeState}
                        style={{ fontSize: "35", cursor: "pointer" }} />
                    {
                        notifics.length > 0 &&
                        <span className="num_ct">{notifics.length}</span>
                    }
                    {/* <Notification notific={notifics && notifics} showbox={showbox} /> */}
                    <div className={showbox ? "notifi-box" : "notifi-box-h"} id="box">
                        <h2 className='headType'>Recent Notifications</h2>
                        {
                            notifics.slice(0).reverse().map((nots) => (
                                <div className="notifi-item">
                                    <div className="text">
                                        <FiberManualRecordRoundedIcon style={{ fontSize: "15", color: "red" }} />
                                        {
                                            !nots.sender.ordId ? (
                                                <h4> {nots.sender.username} has ordered {nots.sender.quantity} {nots.sender.name} ! See orders section for more details !!!</h4>
                                            ) : <h4> {nots.sender.name} has cancelled order # {nots.sender.ordId} ! See orders section for more details !!!</h4>
                                        }
                                    </div>
                                </div>
                            ))
                        }
                        <h2 className='headType'>Previous Notifications</h2>
                        {
                            notfromdb.slice(0).reverse().map((n) => (
                                <div className="notifi-item">
                                    <div className="text">
                                        <FiberManualRecordRoundedIcon style={{ fontSize: "15", color: "teal" }} /> <h4>{n}</h4>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <Link to="/sellerdashboard/saccount">
                        <img className="postimg" src={PF + seller.image}
                            alt="" />
                    </Link>
                </div>
            </nav>

        </>
    )
}
