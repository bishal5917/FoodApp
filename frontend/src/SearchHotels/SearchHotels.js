import React, { useState } from 'react';
import Header from '../Home/Header';
import Hotelcard from './HotelCard';
import axios from 'axios';
import './HotelCard.css'

const Searchhotels = () => {

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
            <div class="grand_parent">
                {searchstart && <div class="alert alert-primary mx-5" role="alert">
                    {sresult.length} items found !!!
                </div>}
                <div class="parents">
                    {
                        sresult.map(ha => (
                            <Hotelcard h={ha} />
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Searchhotels;
