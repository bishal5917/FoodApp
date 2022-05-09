import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "reactstrap";
import Header from "../Home/Header";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./IF.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Reviewtext from "./Reviewtext";
import Orderconfirm from "./OrderConfirm";
import { getReview } from "../Redux/Actions/reviewActions";
import { createReview } from "../Redux/Actions/reviewActions";

// const breakPoints = [
//   { width: 1, itemsToShow: 1 },
//   { width: 600, itemsToShow: 2 },
//   { width: 868, itemsToShow: 3 },
// ];

function IndividualFood() {
  /* let men=items.filter(item=>item.gender=='male')
        console.log(men) */
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.user.curruser && state.user.curruser
  );
  const seller = useSelector(
    (state) => state.seller.currseller && state.seller.currseller
  );
  let { loading, fetched, error, reviews } = useSelector(
    (state) => state.reviews
  );

  const PF = "http://localhost:5000/raimages/";

  //getting that prod id from params
  const { foodId } = useParams();
  const [singlefood, setSingleFood] = useState("");
  const [hotelname, setHotelName] = useState("");
  console.log(singlefood.sellerId);
  useEffect(() => {
    const getProd = async () => {
      try {
        const gotThat = await axios.get("/products/" + foodId);
        setSingleFood(gotThat.data);
        const gothotel = await axios.get(
          "/sellers/hotels/" + singlefood.sellerId
        );
        setHotelName(gothotel.data);
        // console.log(hotelname)
      } catch (error) {
        console.log(error);
      }
    };
    getProd();
  }, [foodId, singlefood.sellerId]);

  //states for rating
  const [rate, setRate] = useState(1);

  const incRate = () => {
    rate < 5 && setRate(rate + 1);
  };

  const decRate = () => {
    rate === 1 ? setRate(rate) : setRate(rate - 1);
  };

  //states for toggling posting review container
  const [showreviewcont, setShowreviewcont] = useState(false);

  const toggleReview = () => {
    showreviewcont ? setShowreviewcont(false) : setShowreviewcont(true);
  };

  //dispatching the get reviews
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(0);
  useEffect(() => {
    dispatch(getReview(page, foodId));
  }, [dispatch, foodId, page]);

  //handling review add
  const [success, setSuccess] = useState(false);
  const [review, setReview] = useState("");
  const handlePostReview = async () => {
    if (!user) {
      navigate("/login");
    }
    try {
      dispatch(
        createReview(
          singlefood.sellerId,
          foodId,
          rate,
          user._id,
          user.name,
          review
        )
      );
      // setSuccess(true);
      dispatch(getReview(page, foodId));
      setShowreviewcont(false);
      setReview("");
      setRate(1);
    } catch (error) {
      console.log(error);
    }
  };

  //getting total stars received by a product
  const arr = [];
  if (fetched) {
    reviews.map((x) => {
      return arr.push(x.rating);
    });
  }

  let fullrating;
  if (fetched) {
    fullrating = reviews.length * 5;
  }

  const ratingsum = arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  //handling confirm order show or not
  const [ordered, setOrdered] = useState(false);
  const toggleOrder = () => {
    if (user) {
      ordered ? setOrdered(false) : setOrdered(true);
    } else {
      navigate("/login");
    }
  };

  //selected quantity
  const getInitialState = () => {
    const value = "1";
    return value;
  };

  const [qty, setQty] = useState(getInitialState);

  const handleChange = (e) => {
    setQty(e.target.value);
  };

  return (
    <>
      <Header />
      <div className="container men  ">
        <div className="row p-3">
          <hr />
        </div>
        <div className="d-flex flex-wrap">
          <div className="itemimage col-12 col-md-6 p-1">
            <img
              src={PF + singlefood.image}
              className="bg-secondary p-1"
              alt="pic"
            />
            <div className="itemotherdescp col-12 col-md-3 mt-2">
              <div className="itemsubimages"></div>
            </div>
          </div>
          <div className="itemdescp col-12 col-md-5 p-4 ">
            <div className="item-name t3">
              <span>{singlefood.name}</span>
            </div>
            <div className="item-rating ">
              <span>
                <i className="fa fa-star yellow"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star gray"></i>
              </span>
              <span className="m-3">{ratingsum} Ratings</span>
            </div>
            <br />
            <div className="brandname t4">
              From Hotel :
              <Link to={`/hotel/${hotelname._id}`}>{hotelname.name}</Link>
            </div>
            <br />
            <div className=" t3">
              About this :
              <br />
              <span className="t5">{singlefood.description}</span>
            </div>
            <br />
            <div className="price">
              <span className="t1">Rs: {singlefood.price}</span>
            </div>
            <br />
            <div className="smalltext t5">
              <div className="available">
                <span>Availability:</span>
                <span className="m-2"> Yes , We have this food </span>
              </div>
              <div className="available">
                <span>Category:</span>
                <span className="m-2"> {singlefood.category} </span>
              </div>
            </div>
            <br />
            <div className="select-color"></div>
            <br />
            <div className="d-flex flex-wrap">
              <div className="quantity t5">
                Quantity
                <span className="m-2">
                  <select onChange={handleChange}>
                    <option value="1" selected>
                      1
                    </option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </span>
              </div>
            </div>
            <div className=" m-2">
              {!seller && (
                <Button onClick={toggleOrder} className="bg-warning black bold">
                  Order now
                </Button>
              )}
              {ordered && (
                <Orderconfirm
                  name={singlefood.name}
                  prodId={singlefood._id}
                  price={singlefood.price}
                  category={singlefood.category}
                  quantity={qty}
                  seller={singlefood.sellerId}
                />
              )}
            </div>
          </div>
        </div>
        <br />
        <div className="review">
          <div className="ratingbox m-2 row  ">
            <div className="col-6 col-md-3 border p-5 pt-0 pb-0 text">
              <span className="t1 ">
                {ratingsum}/{fullrating}
              </span>
              <br />
              <span>
                <i className="fa fa-star yellow"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star"></i>
                <i className="fa fa-star gray"></i>
              </span>
              <br />
            </div>
            <div className="col-12 col-md-6"></div>

            {!seller && (
              <div
                onClick={toggleReview}
                className="col-6 cp col-md-3 border p-3 text-center"
              >
                <span className="t1 ">+</span>
                <br />
                <span className="t5 ">Add review</span>
              </div>
            )}
          </div>

          {showreviewcont && (
            <div class="form-group add">
              <div className="quantity">
                <div className="qs">
                  <span onClick={decRate} className="manipulators">
                    -
                  </span>
                  <span className="value">{rate}</span>
                  <span onClick={incRate} className="manipulators">
                    +
                  </span>
                  <span className="manipulators">OUT OF 5</span>
                </div>
              </div>
              <label for="exampleFormControlTextarea1">
                Write Your Review...
              </label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="2"
              ></textarea>
              <button
                onClick={handlePostReview}
                type="button"
                class="btn btn-success mx-3 my-3"
              >
                ADD
              </button>
              {success && (
                <div class="alert alert-primary" role="alert">
                  Review Added SuccessFully !!!
                </div>
              )}
            </div>
          )}

          <div className="col-12">
            {fetched && reviews.map((k) => <Reviewtext key={k._id} rvs={k} />)}
          </div>
        </div>

        <br />
        <br />
        <br />
        {/* <div className="row p-3">
          <div className=" col-md-6">
            <span className=" t2">See more</span>
          </div>
          <hr />
        </div> */}
      </div>
    </>
  );
}

export default IndividualFood;
