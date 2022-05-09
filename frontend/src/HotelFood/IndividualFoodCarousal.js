import React from 'react';
import { Link } from 'react-router-dom'

function IndividualFoodCarousal({ foodInfo }) {
    const PF = "http://localhost:5000/raimages/";
    return (
        <>

            <div className="food-image">
                <div className="food-image-only">
                    <img src={PF + foodInfo.image} alt="" />
                </div>
                <div className="food-descp-only">
                    <Link to={`/individualfood/${foodInfo._id}`}>
                        <h5>{foodInfo.name}</h5>
                    </Link>
                    <h6>{foodInfo.price}</h6>
                    <p className="t5">
                        {foodInfo.description}
                    </p>
                </div>
            </div>

        </>
    );
}

export default IndividualFoodCarousal;
