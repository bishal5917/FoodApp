import React, { useState, useEffect } from "react";
import Header from "../Home/Header";
import "./orderstatus.css";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";

function Orderstatus() {
  const { ordId } = useParams();
  const PF = "http://localhost:5000/raimages/";

  const user = useSelector(
    (state) => state.user.curruser && state.user.curruser
  );

  const uId = user._id;
  const name = user.name;

  //get order by its id
  const [ord, setOrd] = useState("");
  const [hotel, setHotel] = useState("");
  const [prod, setProd] = useState("");
  useEffect(() => {
    const getThatOrder = async () => {
      try {
        const res = await axios.get("/ordered/getaboutorder/" + ordId);
        setOrd(res.data);
        const resp = await axios.get("/products/" + ord.productId);
        setProd(resp.data);
        const respp = await axios.get("/sellers/" + ord.sellerId);
        setHotel(respp.data);
      } catch (error) {
        console.log(error);
      }
    };
    getThatOrder();
  }, [ordId, ord.productId, ord.sellerId]);

  //for cancelling an order

  const [socket, setSocket] = useState(null);

  useEffect(() => {
    //connecting to the socket server running on port 3050
    setSocket(io("http://localhost:3050"));
    // console.log(socket.id)
    //sending event to server using socket.emit
  }, []);

  useEffect(() => {
    socket && socket.emit("newUser", uId);
  }, [socket, uId]);

  const [success, setsuccess] = useState(false);

  const cancelOrder = async () => {
    const granted = window.confirm("Are you sure to cancel this order !!!");
    if (granted) {
      try {
        const resp = await axios.put("/ordered/cancl/" + ordId, {
          customerId: uId,
          cancelled: true,
        });
        if (resp.status === 200) {
          setsuccess(true);
          const sender = { name, ordId };
          const receiver = ord.sellerId;
          socket.emit("sendNotification", {
            sender,
            receiver,
          });
        }
        const addNotification = async () => {
          const orderedDate = new Date();
          // let notfic = `${username} has ordered ${quantity} ${name} on ${orderedDate}`
          let notfic = `${name} has cancelled order #${ordId} on ${orderedDate}`;

          try {
            await axios.put(`/sellers/updatenotfics/${ord.sellerId}`, {
              notification: notfic,
            });
          } catch (error) {
            console.log(error);
          }
        };
        addNotification();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        {ord.cancelled && (
          <div class="alert alert-danger" role="alert">
            Note : This order was cancelled !!!
          </div>
        )}
        <div className="row">
          <div className="currentOrder ">
            <div className="userFood">
              <div className="userboxdescp">
                <p>{ord.productname}</p>
                <p>
                  {" "}
                  Order Status : {ord.cancelled ? "Cancelled" : ord.status}{" "}
                </p>
                <p> Ordered time : {ord.createdAt}</p>
                {/* <p> Hotel Name: {hotel.name} </p> */}
                <p> Quantity: {ord.qty} </p>
                <p> Price per piece: {prod.price} </p>
              </div>
              <br />
              {!ord.cancelled && ord.status !== "pending" && (
                <h6>Made Ready in time: {ord.updatedAt} </h6>
              )}
            </div>
            <div className="userHotel">
              <div className="userboximage">
                <img src={PF + prod.image} alt="" />
              </div>
              <h5> Total Price : {ord.total} </h5>
              {!ord.cancelled && ord.status === "pending" && (
                <button
                  onClick={cancelOrder}
                  type="button"
                  class="btn btn-outline-danger"
                >
                  Cancel This Order
                </button>
              )}
              {success && (
                <div class="alert alert-primary mx-3 my-3" role="alert">
                  Your Order Was Cancelled Successfully !!!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const Chatapp = () => {
  return (
    <>
      <div className="container"></div>

      <div className=" ">
        <div className="chatbox">
          <div className="chatapp ">
            <Messages left={true} />
            <Messages left={true} />
            <Messages left={true} />
            <Messages left={false} />
            <Messages left={false} />
            <Messages left={false} />
          </div>
          <form className="sendform">
            <input type="text" placeholder="send message" />
            <button type="submit"> Send </button>
          </form>
        </div>
      </div>
    </>
  );
};

function Messages(props) {
  return (
    <>
      {props.left ? (
        <div className="left ">
          <div className="chatimage">
            <img src="/images/burger.jpg" alt="pic" />
          </div>
          <div className="myside ">
            Hello this is a message
            <div className="">Last seen: 3min ago</div>
          </div>
        </div>
      ) : (
        <>
          <div className="rightside ">
            <div className="otherside">
              <div className=" ">Hello this is a message</div>
              Last seen: Just now
            </div>

            <div className="chatimage">
              <img src="/images/burger.jpg" alt="pic" />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Orderstatus;
