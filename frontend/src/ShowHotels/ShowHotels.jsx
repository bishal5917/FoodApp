import React, { useEffect, useState } from 'react';
import Header from '../Home/Header';
import Hotelcard from './ShowHotelCard';
import axios from 'axios';
import './HotelCard.css'

const Hotels = () => {

    const [hotels, setHotel] = useState([])
    const [sresult, setSresult] = useState([])
    const [address, setAddress] = useState("")
    const [name, setName] = useState("")
    const [searchstart, setSearchStart] = useState(false)

    const handleThisSearch = async (e) => {
        setSearchStart(true)
        e.preventDefault()
        try {
            let resp;
            if (name) {
                resp = await axios.get(`/sellers/?name=${name}`)
            }
            if (address) {
                resp = await axios.get(`/sellers/?address=${address}`)
            }
            setSresult(resp.data)
        } catch (error) {
            console.log(error)
        }
    }

    
    useEffect(()=>{

        const handleThis = async () => {
            try {
                let resp = await axios.get(`/sellers/allhotels`)
                setHotel(resp.data)
            } catch (error) {
                console.log(error)
            }
        }
        handleThis()
    },[])
   


    return (
        <>
            <Header />
            <section className="pick-food-pick-hotel container">
                <form action="#" className="inside-pick-food-hotel">
                    <div className="food-name">
                        <label htmlFor="fname">Pick Address</label>
                        <br />
                        <input onChange={e => setAddress(e.target.value)}
                            type="text" />
                        <br />
                    </div>
                    <div className="food-name">
                        <label htmlFor="fname">Pick Hotel</label>
                        <br />
                        <input onChange={e => setName(e.target.value)}
                            type="text" />
                        <br />
                    </div>
                    <button onClick={handleThisSearch}
                        id="search"> Search </button>
                </form>
            </section>
            <div class="grand_parent p-4 pt-0">
                {searchstart && <div class="alert alert-primary mx-5" role="alert">
                    {sresult.length} items found !!!
                </div>}
                <span className='p-5 m-5 t3' >Search list will be shown here </span>
                <hr />
                <div class="parents searchresult">
                    {
                        sresult.map(ha => (
                            <Hotelcard h={ha} />
                        ))
                    }
                </div>

                <br /><br />
                <span className='p-5 m-5 t2' >All hotels List</span>
                <div class="parents">
                    {
                        hotels.map(ha => (
                            <Hotelcard h={ha} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Hotels;
