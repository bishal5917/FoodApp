import React from 'react'
import './Home.css'

export default function Highlight() {
    return (
        <>
        
            <section class="mostly-consumed-food">

                <div class="food-card">
                    <img src="images/small-pizza.jpg" alt="" />
                    <p> <a href="#"> Pizza </a></p>
                </div>

                <div class="food-card">
                    <img src="images/small-burger.jpg" alt="" />
                    <p> <a href="#"> Burger </a></p>
                </div>

                <div class="food-card">
                    <img src="images/small-chowmin.jpg" alt="" />
                    <p> <a href="#"> Chowmin </a></p>
                </div>

                <div class="food-card">
                    <img src="images/small-biryani.jpg" alt="" />
                    <p> <a href="#"> Biryani </a></p>
                </div>

                <div class="food-card">
                    <img src="images/small-roti.jpg" alt="" />
                    <p> <a href="#"> Roti </a></p>
                </div>

                <div class="food-card">
                    <img src="images/small-shake.jpg" alt="" />
                    <p> <a href="#"> Shake </a></p>
                </div>
            </section>
        </>
    )
}
