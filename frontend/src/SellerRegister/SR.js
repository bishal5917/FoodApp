import React, { useState } from 'react';
import './SR.css'
import ImageIcon from '@mui/icons-material/Image';
import { Link } from 'react-router-dom'
import axios from 'axios'

function SR() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [opensAt, setOpensAt] = useState("")
    const [closesAt, setClosesAt] = useState("")
    const [password, setPassword] = useState("")
    const [desc, setDesc] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [file, setFile] = useState('')

    const regSeller = async (e) => {
        e.preventDefault()
        const newHotel = {
            name, email, password, address, phone, desc, opensAt, closesAt
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            //date is used here to create a unique name
            data.append("name", filename)
            data.append("file", file)
            newHotel.image = filename
            try {
                await axios.post('/upload', data)
            } catch (error) {
                setError(true)
                console.log(error)
            }
        }
        const resp = await axios.post('/sellers/register', newHotel)
        if (resp.status === 200) {
            setSuccess(true)
            setName("")
            setEmail("")
            setAddress("")
            setPhone("")
            setOpensAt("")
            setClosesAt("")
            setPassword("")
            setDesc("")
        }
        else {
            setError(true)
        }
    }
    return (
        <>
            <div className="mainbody">
                <div className="container">
                    <Link to="/">
                        <div className="my-5 d-flex justify-content-center c-p">Khanajam</div>
                    </Link>
                    <div className="title">Seller Registration</div>
                    <label className="my-3" htmlFor="fileInput">
                        <ImageIcon style={{ color: "green" }} />
                    </label>
                    <input type="file" name="file" id="fileInput"
                        onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />

                    {file && <img className='uploadimg'
                        src={URL.createObjectURL(file)} alt="" />}
                    <div className="content">
                        <form action="#">
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Hotel Name</span>
                                    <input value={name}
                                        onChange={e => setName(e.target.value)} type="text" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Email</span>
                                    <input value={email}
                                        onChange={e => setEmail(e.target.value)} type="email" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Address</span>
                                    <input value={address}
                                        onChange={e => setAddress(e.target.value)} type="text" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Phone Number</span>
                                    <input value={phone}
                                        onChange={e => setPhone(e.target.value)} type="text" required />
                                </div>
                                <div className="input-box">
                                    <div class="md-form mx-5 my-5">
                                        <input value={opensAt}
                                            onChange={e => setOpensAt(e.target.value)}
                                            type="time" id="inputMDEx1" class="form-control" />
                                        <label for="inputMDEx1">Choose Opening Time</label>
                                    </div>
                                </div>
                                <div className="input-box">
                                    <div class="md-form mx-5 my-5">
                                        <input value={closesAt}
                                            onChange={e => setClosesAt(e.target.value)}
                                            type="time" id="inputMDEx1" class="form-control" />
                                        <label for="inputMDEx1">Choose Closing Time</label>
                                    </div>
                                </div>
                                <div className="input-box">
                                    <span className="details">Password</span>
                                    <input value={password}
                                        onChange={e => setPassword(e.target.value)} type="text" required />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1" >Hotel Description</label>
                                <textarea value={desc}
                                    onChange={e => setDesc(e.target.value)} className="form-control tarea" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            {
                                success && <div class="alert alert-success my-3" role="alert">
                                    Registered Successfully,You can Login now !!!
                                </div>
                            }
                            {
                                error && <div class="alert alert-danger my-3" role="alert">
                                    Something Went wrong !!! please try again !!!
                                </div>
                            }
                            <div className="button">
                                <button onClick={regSeller} className="btn btn-primary">Register</button>
                            </div>
                            <span>Already a seller ?</span>
                            <div className="button">
                                <Link to="/loginseller">
                                    <button className="btn btn-primary">Login</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SR;
