import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function ResetPass() {
    const [oemail, setOEmail] = useState("")
    const [osucc, setOSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [code, setCode] = useState("")
    const [pass, setPass] = useState("")
    const [cpass, setCPass] = useState("")
    const [cerror, setCError] = useState(false)
    const [changesucc, setChangeSucc] = useState(false)
    const [nerror, setNError] = useState(false)

    const sendOTP = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post("/users/sendemail", {
                email: oemail
            })
            if (res.status === 200) {
                setOSuccess(true)
            }
        } catch (error) {
            console.log(error)
            setError(true)
            setTimeout(() => {
                setError(true)
            }, 3000);
        }
    }

    const handleResetPass = async (e) => {
        e.preventDefault()
        if (pass && cpass && pass === cpass) {
            try {

                const res = await axios.post("/users/resetpass", {
                    email, code, password: cpass
                })
                if (res.status === 200) {
                    setChangeSucc(true)
                }

            } catch (error) {
                console.log(error)
                setNError(true)
                setTimeout(() => {
                    setNError(false)
                }, 3000);
            }
        }
        else {
            setCError(true)
            setTimeout(() => {
                setCError(true)
            }, 3000);
        }
    }
    return (
        <>
            <div class="container">
                <Link to="/">
                    <div className="head">KHANAJAM</div>
                </Link>
                <div class="row">
                    <div class="col-md-4 offset-md-4 form login-form">
                        <form>
                            <h2 class="text-center">Reset Password</h2>
                            <div class="form-group">
                                <input onChange={e => setOEmail(e.target.value)}
                                    class="form-control" type="email" name="email" placeholder="Enter Valid Email Address" />
                            </div>
                            {
                                osucc && <span className="show">OTP sent successfully , Check your email !</span>
                            }
                            {
                                error && <span className="show">Please Enter Registered Email !!!</span>
                            }

                            <button onClick={sendOTP}
                                class="form-control button">Send OTP code</button>
                        </form>
                    </div>
                    <form>
                        <div class="form-group">
                            <input onChange={e => setCode(e.target.value)}
                                class="form-control" name="email" placeholder="Enter OTP Code" />
                        </div>
                        <div class="form-group">
                            <input onChange={e => setEmail(e.target.value)}
                                class="form-control" name="email" placeholder="Enter Your Email" />
                        </div>
                        <div class="form-group">
                            <input onChange={e => setPass(e.target.value)}
                                class="form-control" type="text" name="email" placeholder="Enter New Password" />
                        </div>
                        <div class="form-group">
                            <input onChange={e => setCPass(e.target.value)}
                                class="form-control" type="text" name="email" placeholder="Confirm New Password" />
                        </div>
                        <button onClick={handleResetPass}
                            class="form-control button">Change</button>
                        {
                            changesucc && <span className="show">Password Reset Successful !!!</span>
                        }
                        {
                            nerror && <span className="show">Please Enter Correct Email and OTP code !!!</span>
                        }
                        {
                            cerror && <span className="show">Please Confirm Your New Password !!!</span>
                        }
                    </form>
                </div>
            </div>
        </>
    )
}

export default ResetPass