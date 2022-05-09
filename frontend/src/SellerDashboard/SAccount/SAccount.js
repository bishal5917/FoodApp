import React, { useState } from 'react'
import ImageIcon from '@mui/icons-material/Image';
import './SAccount.css'
import { useSelector } from 'react-redux';
import axios from 'axios'

function SAccount() {
    const PF = 'http://localhost:5000/raimages/'
    const sler = useSelector(state => state.seller.currseller && state.seller.currseller)

    const [name, setName] = useState(sler.name)
    const [email, setEmail] = useState(sler.email)
    const [address, setAddress] = useState(sler.address)
    const [phone, setPhone] = useState(sler.phone)
    const [opensAt, setOpensAt] = useState(sler.opensAt)
    const [closesAt, setClosesAt] = useState(sler.closesAt)
    const [password, setPassword] = useState(sler.password)
    const [desc, setDesc] = useState(sler.desc)
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [file, setFile] = useState('')

    const handleUpdate = async (e) => {
        e.preventDefault();
        const newAcc = {
            sellerId: sler._id, name, email, address, phone, opensAt, closesAt, password, desc
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            newAcc.image = filename
            try {
                await axios.post('/upload', data)
            } catch (error) {
                setError(true)
                console.log(error)
            }
        }
        const resp = await axios.put(`http://localhost:5000/api/sellers/updateseller/${sler._id}`, newAcc)

        if (resp.status === 200) {
            setSuccess(true)
        }
        else {
            setError(true)
        }
    }
    return (
        <>
            <>
                <div className="mainbody">
                    <div className="container">
                        <div className="title">Update Your Account</div>
                        <span className="info">Choose New Picture...</span>
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
                                        <img src={PF + sler.image} alt="" />
                                    </div>
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
                                        <span className="details">Opening Time</span>
                                        <input value={opensAt}
                                            onChange={e => setOpensAt(e.target.value)} type="text" required />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Closing Time</span>
                                        <input value={closesAt}
                                            onChange={e => setClosesAt(e.target.value)} type="text" required />
                                    </div>
                                    <div className="input-box">
                                        <span className="details">Enter new password only if you want to change it...</span>
                                        <input
                                            onChange={e => setPassword(e.target.value)} type="text" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlTextarea1" >Hotel Description</label>
                                    <textarea value={desc}
                                        onChange={e => setDesc(e.target.value)} className="form-control tarea" id="exampleFormControlTextarea1" rows="3"></textarea>
                                </div>
                                {
                                    success && <div class="alert alert-success my-3" role="alert">
                                        Changes Saved , Please Logout and Login again to see changes !!!
                                    </div>
                                }
                                {
                                    error && <div class="alert alert-danger my-3" role="alert">
                                        Something Went wrong !!! please try again !!!
                                    </div>
                                }
                                <div className="button">
                                    <button onClick={handleUpdate} className="btn btn-primary">Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        </>
    )
}

export default SAccount