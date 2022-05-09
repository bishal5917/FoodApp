import React, { useState } from 'react';
import Header from '../Home/Header';
import './ProfileEdit.css'
import LogoutIcon from '@mui/icons-material/Logout';
import { logoutUser } from "../Redux/ReduxUser"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfileEdit = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector(state => state.user.curruser && state.user.curruser)

    const handleLogout = () => {
        const decision = window.confirm("Are you sure you want to log out ?")
        if (decision) {
            dispatch(logoutUser())
            navigate('/')
        }
    }

    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)
    const [address, setAddress] = useState(user.address)
    const [phone, setPhone] = useState(user.contact)
    const [password, setPassword] = useState(user.password)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const updateAccount = async (e) => {
        e.preventDefault();
        try {
            axios.put(`/users/updateuser/${user._id}`, {
                name,
                email,
                address,
                contact: phone,
                password
            }, {
                headers: {
                    'token': `Bearer ${user.token}`
                }
            }
            );
            setSuccess(true)
        } catch (error) {
            console.log(error)
            setError(true)
        }
    }

    return (
        <>
            <Header />
            <div className="mainbody">
                <div className="container">
                    <div className="optionsA">
                        <div className="title">Edit Account</div>
                        <div onClick={handleLogout}
                            className="logoutOption"><LogoutIcon /> Logout</div>
                    </div>
                    <div className="content">
                        <form action="#">
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Name</span>
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
                                    <span className="details">Enter New Password Here If You Want to change </span>
                                    <input
                                        onChange={e => setPassword(e.target.value)} type="text" />
                                </div>
                            </div>
                            {
                                success && <div class="alert alert-success my-3" role="alert">
                                    Edited Successfully , Please Logout and Login Again to see changes !!!
                                </div>
                            }
                            {
                                error && <div class="alert alert-danger my-3" role="alert">
                                    Something Went wrong !!! please try again !!!
                                </div>
                            }
                            <div className="button">
                                <button onClick={updateAccount} className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}

export default ProfileEdit;
