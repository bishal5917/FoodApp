import React, { useState, useEffect } from "react";
import "./HF.css";
import "./HF.css";
import Header from "../Home/Header";
import axios from "axios";
import { useParams } from "react-router";
import IndividualFoodCarousal from "./IndividualFoodCarousal";
import SearchedFood from "./SearchedFood";

function HotelFood() {
  const [hotel, setHotel] = useState("");
  const { hotelId } = useParams();
  console.log(hotelId)

  const PF = "http://localhost:5000/raimages/";

  //getting hotel info from its ID
  useEffect(() => {
    const getProd = async () => {
      try {
        const gotThat = await axios.get("/sellers/hotels/" + hotelId);
        setHotel(gotThat.data);
        console.log(hotel)
      } catch (error) {
        console.log(error);
      }
    };
    getProd();
  }, [hotelId]);

  //getting food products of hotel
  const [foods, setFoods] = useState([]);
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    const getFood = async () => {
      try {
        const gotThat = await axios.get(
          `/products?slid=${hotelId}&page=${page}`
        );
        setFoods(gotThat.data.data);
        setPages(gotThat.data.pages);
      } catch (error) {
        console.log(error);
      }
    };
    getFood();
  }, [hotelId, page]);

  const pagesToMap = new Array(pages).fill(null).map((v, i) => i);

  //previous and next pages
  const gotoNext = () => {
    setPage(Math.min(pages - 1, page + 1));
  };
  const gotoPrevious = () => {
    setPage(Math.max(0, page - 1));
  };

  //IMPLEMENTING SEARCHING A FOOD OF A PARTICULAR HOTEL !!!
  const [searchedfood, setSearchedFood] = useState([]);
  const [searchstart, setSearchStart] = useState(false);
  const [item, setItem] = useState("");
  const searchingItems = async (e) => {
    setSearchStart(true);
    e.preventDefault();
    try {
      if (item) {
        const response = await axios.get(
          `/products/search/${hotelId}?name=${item}`
        );
        setSearchedFood(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Header />
        <div className="container">
          <section className="pick-food-pick-hotel container">
            <form action="#" className="inside-pick-food-hotel">
              <div className="food-name">
                <label htmlFor="fname">
                  Search What You Want From {hotel.name} ...
                </label>
                <br />
                <input
                  onChange={(e) => setItem(e.target.value)}
                  type="text"
                  id="fname"
                />
                <br />
              </div>
              <button onClick={searchingItems} id="search">
                Search
              </button>
            </form>
          </section>

          {searchstart && (
            <span htmlFor="fname">{searchedfood.length} items found !!!</span>
          )}

          {searchedfood.map((sinfo) => (
            <SearchedFood key={sinfo._id} sfood={sinfo} />
          ))}

          {/* Main Section with Restaurant Decription */}
          <main className="restaurant-main-section">
            <div className="restaurant-description">
              <div className="restaurant-main-image"></div>
              <div className="restaurant-name">
                <div className="hotelsimages">
                  <div className="hotelimage">
                    <img src={PF + hotel.image} alt="" />
                  </div>
                </div>

                <div className="hotel-descp">
                  <div className="name-and-rating">
                    <h3>{hotel.name}</h3>
                    <div className="restaurant-rating">
                      <i className="fas fa-star" id="one" />
                      <i className="fas fa-star" id="two" />
                      <i className="fas fa-star" id="three" />
                      <i className="fas fa-star" id="four" />
                      <i className="fas fa-star" id="five" />
                    </div>
                  </div>
                  <p>{hotel.desc}</p>
                  <div className="main-restaurant-status">
                    <p> Address : {hotel.address} </p>
                    <p>{hotel.phone}</p>
                    <p>Opens At : {hotel.opensAt} AM</p>
                    <p>Closes At : {hotel.closesAt}AM</p>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
            <div className="restaurant-other-photos">
              <div className="restaurant-side-image1"></div>
              <div className="restaurant-side-image2"></div>
              <div className="restaurant-side-image3"></div>
              <div className="restaurant-side-text">
                <br />
                <br />
              </div>
            </div>
          </main>
          <br />
          <br />
          <h2 className="bold">
            {" "}
            You May Like <p className="t5">Pick a food and order</p>{" "}
          </h2>
          <div className="foodimages">
            {foods.map((infos) => (
              <IndividualFoodCarousal key={infos._id} foodInfo={infos} />
            ))}
          </div>
          <button onClick={gotoPrevious}>Previous</button>
          {pagesToMap.map((pageIndex) => (
            <button key={pageIndex} onClick={() => setPage(pageIndex)}>
              {pageIndex + 1}
            </button>
          ))}
          <button onClick={gotoNext}>Next</button>
        </div>
      </div>
    </>
  );
}

export default HotelFood;
