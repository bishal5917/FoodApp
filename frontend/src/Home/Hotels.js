import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'
export default function Hotels() {
    const PF = 'http://localhost:5000/raimages/'

    const usercurrentaddress = useSelector(state => state.user.curruser &&
        state.user.curruser.address)

    const [hotels, setHotels] = useState([])

    useEffect(() => {
        const fetchNearby = async () => {
            try {
                const getHotels = await axios.get(`/sellers/getnearby/?address=${usercurrentaddress}`)
                setHotels(getHotels.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchNearby()
    }, [usercurrentaddress]);
    return (
        <>
            <section class="nearby-restaurants">
                {
                    usercurrentaddress ? (<h2 class="section-introduction"> Restaurants Matching Your Location </h2>) :
                        (<h2 class="section-introduction">(Location not found) Login to see Restaurants Matching Your Location </h2>)
                }
                <div class="nearby-restaurants-container">
                    {hotels.map((x) => (
                        <div class="restaurant-card">
                            <img src={PF + x.image} alt="" />
                            <Link to={`/hotel/${x._id}`}>
                                <h4 className='NameOf'> {x.name} </h4>
                            </Link>
                            <p class="restaurant-speciality">Address : {x.address}</p>
                            <p class="restaurant-status"> Opens At : <span class="restaurant-status-open-close"> {x.opensAt} AM</span></p>
                            <p class="restaurant-status"> Closes At : <span class="restaurant-status-open-close"> {x.closesAt} PM</span></p>

                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
