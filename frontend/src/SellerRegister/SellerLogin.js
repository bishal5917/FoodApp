import React, { useState } from 'react';
import './SR.css'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { sellerloginStart, sellerloginSuccess, sellerloginFailure } from "../Redux/ReduxSeller"

function SellerLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const loginSeller = async (e) => {
        e.preventDefault()
        dispatch(sellerloginStart())
        try {
            const res = await axios.post('/sellers/login', { email, password })
            dispatch(sellerloginSuccess(res.data))
            localStorage.setItem("foodappseller", JSON.stringify(res.data))
            if (res.status === 200) {
                navigate('/sellerdashboard')
            }
        } catch (error) {
            setError(true)
            setInterval(() => {
                setError(false)
            }, 3000);
            dispatch(sellerloginFailure())
        }
    }
    return (
        <>
            <div className="mainbody">
                <div className="container">
                    <Link to="/">
                        <div className="my-5 d-flex justify-content-center c-p">Khanajam</div>
                    </Link>
                    <div className="title">Seller Login</div>
                    <div className="content">
                        <form action="#">
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Enter Your Email</span>
                                    <input onChange={e => setEmail(e.target.value)} type="text" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Password</span>
                                    <input onChange={e => setPassword(e.target.value)} type="text" required />
                                </div>
                            </div>
                            {
                                error && <div class="alert alert-danger my-3" role="alert">
                                    Something Went wrong !!! please try again !!!
                                </div>
                            }
                            <Link to="/seller/resetpass">
                                <p class="error-show"> Forgot Password? </p>
                            </Link>
                            <div className="button">
                                <button onClick={loginSeller} className="btn btn-primary">Login</button>
                            </div>
                            <span>New Member ?</span>
                            <div className="button">
                                <Link to="/registerseller">
                                    <button className="btn btn-primary">Register</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>);
}

export default SellerLogin;
