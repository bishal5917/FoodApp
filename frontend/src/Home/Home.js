import React, { useEffect, useState } from 'react'
import Food from './Food'
import Footer from './Footer'
import Header from './Header'
import './Home.css'
import axios from 'axios'
import Hotels from './Hotels'

function Home() {
    //IMPLEMENTING SEARCHING A FOOD !!!
    const [foods, setFoods] = useState([])
    const [searchedfood, setSearchedFood] = useState([])
    const [searchstart, setSearchStart] = useState(false)
    const [item, setItem] = useState("")
    const searchingItems = async (e) => {
        setSearchStart(true)
        e.preventDefault()
        try {
            if (item) {
                const response = await axios.get(`/products/search?name=${item}`)
                setSearchedFood(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        const handleFoods = async () => {
            try {
                let resp = await axios.get(`/products/getallprods`)
                setFoods(resp.data)
            } catch (error) {
                console.log(error)
            }
        }
        handleFoods()
    },[])
   
    return (
        <>
            <div className="container">
                <Header />
                <section className="pick-food-pick-hotel container">
                    <form action="#" className="inside-pick-food-hotel">
                        <div className="food-name">
                            <label htmlFor="fname">Search For Food You Seek ...</label>
                            <br />
                            <input onChange={e => setItem(e.target.value)}
                                type="text" id="fname" />
                            <br />
                        </div>
                        <button onClick={searchingItems} id="search"> Search </button>
                    </form>
                </section>
                <span className='p-0 m-5 mt-0 t3' > Searched Food will be here</span>
                
                <br/>
                {searchstart && <span htmlFor="fname">{searchedfood.length} items found !!!</span>}

                {searchedfood.map(sinfo => (
                    <Food key={sinfo._id} sinfo={sinfo} />
                ))}
                <br /><br />
                <span className='p-5 m-5 t2' >All Available Food List</span>
                <hr />
                <div class="parents">
                    {
                        foods.map(item => (
                            <Food key={item._id} sinfo={item} />
                        ))
                    }
                </div>
                <br />
                <hr />
                <Hotels />
                <Footer />
            </div>
        </>
    )
}


export default Home
