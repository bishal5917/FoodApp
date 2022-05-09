import React from 'react';
import './Food.css'
import './Home.css'
import { Link } from 'react-router-dom'

export default function Food({ sinfo }) {
    const PF = "http://localhost:5000/raimages/";
    return (
        <>
            <section class="foodSearchCont p-2">
                <div class="nearby-restaurants-container">
                    <div class="restaurant-card">
                        <img src={PF + sinfo.image} alt="" />
                        <Link to={`individualfood/${sinfo._id}`}>
                            <h4 className='NameOf'> {sinfo.name} </h4>
                        </Link>
                        <p class="restaurant-status">Category : {sinfo.category}</p>
                    </div>
                </div>
            </section>
        </>
    );
}
