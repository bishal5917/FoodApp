import React, { useState, useEffect } from 'react'
import './Analytics.css'
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import FeedbackIcon from '@mui/icons-material/Feedback';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import axios from 'axios'
import { useSelector } from 'react-redux';

export default function Analytics() {

    const sellerId = useSelector(state => state.seller.currseller._id)

    const [reviews, setReviews] = useState([])
    const [served, setServed] = useState([])

    useEffect(() => {
        const getTotalReviewInfo = async () => {
            try {
                const gotThat = await axios.get("/reviews/getrvs/" + sellerId);
                setReviews(gotThat.data);
                const getServ = await axios.get("/ordered/getserved/" + sellerId);
                setServed(getServ.data);
            } catch (error) {
                console.log(error);
            }
        };
        getTotalReviewInfo();
    }, [sellerId]);

    //getting the total stars received
    const arr = []
    reviews.map((x) => {
        return arr.push(x.rating)
    })

    const ratingsum = arr.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
    }, 0)

    return (
        <>
            <div className="parent">
                <div className="dailyviews">
                    <div className="numandname">
                        <span className="num">{ratingsum}</span>
                        <span className="names">Total Ratings</span>
                    </div>
                    <div>
                        <GradeOutlinedIcon style={{ fontSize: "70", color: "orange" }} />
                    </div>
                </div>
                <div className="dailyviews">
                    <div className="numandname">
                        <span className="num">{reviews.length}</span>
                        <span className="names">Reviews</span>
                    </div>
                    <div>
                        <FeedbackIcon style={{ fontSize: "70", color: "teal" }} />
                    </div>
                </div>
                <div className="dailyviews">
                    <div className="numandname">
                        <span className="num">{served.length}</span>
                        <span className="names">Served</span>
                    </div>
                    <div>
                        <RestaurantIcon style={{ fontSize: "70", color: "green" }} />
                    </div>
                </div>
            </div>
        </>
    )
}
