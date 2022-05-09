import React from 'react';
import { Link } from 'react-router-dom'

function SearchedFood({ sfood }) {
    const PF = "http://localhost:5000/raimages/";
    return <>
        <>
            <section class="foodSearchCont">
                <div class="nearby-restaurants-container">
                    <div class="restaurant-card">
                        <img src={PF + sfood.image} alt="" />
                        <Link to={`/individualfood/${sfood._id}`}>
                            <h4 className='NameOf'> {sfood.name} </h4>
                        </Link>
                        <p class="restaurant-status">Category : {sfood.category}</p>
                    </div>
                </div>
            </section>
        </>
    </>;
}

export default SearchedFood;
