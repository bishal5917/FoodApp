import React from 'react';
import './HotelCard.css'
import { Link } from 'react-router-dom'

const Hotelcard = ({ h }) => {
    const PF = "http://localhost:5000/raimages/";
    return (
        <>
            <section style={{ margin: "1rem", padding: "1rem 1rem" }} class="foodSearchCont">
                <div class="nearby-restaurants-container">
                    <div class="restaurant-card">
                        <img src={PF + h.image} alt="" />
                        <Link to={`/hotel/${h._id}`}>
                            <h4 className='NameOf'> {h.name} </h4>
                        </Link>
                        <p class="restaurant-status">Address : {h.address} </p>
                        <p class="restaurant-status">Opens At : {h.opensAt} </p>
                        <p class="restaurant-status">Closes At : {h.closesAt} </p>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Hotelcard;
