import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import '../Login/login.css'
import axios from 'axios'

export default function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [addr, setAddr] = useState("")
    const [contact, setContact] = useState("")
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const registerHandle = async () => {
        try {
            if (name && email && password && contact && addr) {
                await axios.post('/users/register', {
                    name, email, password, contact, address: addr
                })
                setSuccess(true)
            }
            setName("")
            setEmail("")
            setPassword("")
            setAddr("")
            setContact("")
        } catch (error) {
            setError(true)
            console.log(error)
        }
    }
    return (
        <>
            <div className='MainBody'>
                <div class="lines">
                    <div class="line1"> </div>
                    <div class="line2"> </div>
                    <div class="line3"> </div>
                    <div class="line4"> </div>
                </div>
                <div class="container">
                    <Link to="/">
                        <header id="restroaround-header-login"> RestroAround </header>
                    </Link>
                    <section class="login-page-intro">
                        <h2 id="login-restroaround"> Register <i class="fas fa-check-circle"></i></h2>
                        <p class="sign-in-intro">Please Fill all the details to Register !</p>
                    </section>
                    <section class="login-page-main">
                        <form class="user-credentials">
                            <span for="user-email"> Name </span> <br /> <br />
                            <input value={name}
                                onChange={e => setName(e.target.value)}
                                type="text" id="user-email" /> <br /> <br /> <br /> <br />

                            <span for="user-email"> Email </span> <br /> <br />
                            <input value={email}
                                onChange={e => setEmail(e.target.value)}
                                type="email" id="user-email" /> <br /> <br /> <br /> <br />

                            <span for="user-email"> Address </span> <br /> <br />
                            <input value={addr}
                                onChange={e => setAddr(e.target.value)}
                                type="text" id="user-email" /> <br /> <br /> <br /> <br />

                            <span for="user-password"> Password </span> <br /> <br />
                            <input value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password" id="user-password" /> <br /> <br /> <br /> <br />

                            <span for="user-email"> Contact </span> <br /> <br />
                            <input value={contact}
                                onChange={e => setContact(e.target.value)}
                                type="text" id="user-email" /> <br /> <br /> <br /> <br />
                        </form>
                        {error && <span className="error-show">Something Went Wrong , Please try Again !!!</span>}
                        {success && <span className="error-show">Registered Successfully !!!</span>}
                        <button onClick={registerHandle}
                            type="button" id="login-button"> Register </button>
                        <p class="forgot-password">Already A Member ?</p>
                        <Link to="/login">
                            <button
                                type="button" id="login-button"> Login </button>
                        </Link>
                    </section>
                </div>
            </div>
        </>
    );
}
