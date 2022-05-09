import React, { useState } from 'react';
import './login.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from "../Redux/ReduxUser"


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)

    const loginHandle = async () => {
        dispatch(loginStart())
        try {
            const res = await axios.post('/users/login', { name, password })
            dispatch(loginSuccess(res.data))
            localStorage.setItem("foodappuser", JSON.stringify(res.data))
            if (res.data) {
                navigate('/')
            }
        } catch (error) {
            setError(true)
            setInterval(() => {
                setError(false)
            }, 3000);
            dispatch(loginFailure())
        }

    }
    return (
        <><div className='MainBody'>
            <div class="lines">
                <div class="line1"> </div>
                <div class="line2"> </div>
                <div class="line3"> </div>
                <div class="line4"> </div>
            </div>
            <div class="container">
                <Link to="/">
                    <header id="restroaround-header-login"> Khanajam </header>
                </Link>
                <section class="login-page-intro">
                    <h2 id="login-restroaround"> Login <i class="fas fa-check-circle"></i></h2>
                    <p class="sign-in-intro"> Sign in with your credentials</p>
                </section>
                <section class="login-page-main">
                    <form class="user-credentials">
                        <span for="user-email"> Enter Your Username </span> <br /> <br />
                        <input onChange={e => setName(e.target.value)}
                            type="email" id="user-email" /> <br /> <br /> <br /> <br />

                        <span for="user-password"> Password </span> <br /> <br />
                        <input onChange={e => setPassword(e.target.value)}
                            type="password" id="user-password" /> <br /> <br /> <br /> <br />
                    </form>
                    {error && <span className="error-show">LOGIN ERROR : Please Enter Correct Credentials !!!</span>}
                    <button onClick={loginHandle}
                        type="button" id="login-button"> Login </button>
                    <Link to="/user/resetpass">
                        <p class="error-show"> Forgot Password? </p>
                    </Link>
                </section>
            </div>
        </div>
        </>
    );
}

export default Login;
