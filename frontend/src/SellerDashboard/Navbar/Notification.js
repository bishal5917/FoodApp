import React from 'react';
import './notification.css'
import { useSelector } from 'react-redux'

const Notification = ({ showbox, notific }) => {
    const seller = useSelector(state => state.seller.currseller && state.seller.currseller)

    return (
        <>
            <div className={showbox ? "notifi-box" : "notifi-box-h"} id="box">
                <h2 className='headType'>Recent Notifications</h2>
                {notific.length > 0 &&
                    notific.map((r) => (
                        <div className="notifi-item">
                            <div className="text">
                                <h4>{r}</h4>
                            </div>
                        </div>
                    ))
                }
                <h2 className='headType'>Previous Notifications</h2>
                {
                    seller.notifications.slice(0).reverse().map((n) => (
                        <div className="notifi-item">
                            <div className="text">
                                <h4>{n}</h4>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default Notification;
