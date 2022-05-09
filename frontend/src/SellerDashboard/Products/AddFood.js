import React, { useState } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios'
import { useSelector } from 'react-redux'
import './products.css'
import '../../SellerRegister/SR.css'

export default function AddFood() {
    //getting the logged in seller from redux store
    const seller = useSelector(state => state.seller.currseller)

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [file, setFile] = useState('')

    const handleAddFood = async (e) => {
        e.preventDefault()
        const newFood = {
            sellerId: seller._id, name, category, price, description
        }
        if (file) {
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            newFood.image = filename
            try {
                await axios.post('/upload', data)
            } catch (error) {
                setError(true)
                console.log(error)
            }
        }
        const resp = await axios.post('/products/create', newFood)
        if (resp.status === 200) {
            setSuccess(true)
            setName("")
            setCategory("")
            setPrice("")
            setDescription("")
            setFile("")
        }
        else {
            setError(true)
        }
    }

    return (
        <>
            <div className="mainbody">
                <div className="container">

                    <label className="my-3" htmlFor="fileInput">
                        <ImageIcon style={{ color: "green" }} />
                    </label>
                    <input type="file" name="file" id="fileInput"
                        onChange={e => setFile(e.target.files[0])} style={{ display: "none" }} />

                    {file && <img value={file}
                        className='uploadimg'
                        src={URL.createObjectURL(file)} alt="" />}
                    <div className="content">
                        <form action="#">
                            <div className="user-details">
                                <div className="input-box">
                                    <span className="details">Name</span>
                                    <input value={name}
                                        onChange={e => setName(e.target.value)} type="text" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Category</span>
                                    <input value={category}
                                        onChange={e => setCategory(e.target.value)} type="text" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Price</span>
                                    <input value={price}
                                        onChange={e => setPrice(e.target.value)} type="text" required />
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1" >Description</label>
                                <textarea value={description}
                                    onChange={e => setDescription(e.target.value)} className="form-control tarea" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            {
                                success && <div class="alert alert-success my-3" role="alert">
                                    Product Created Successfully !!!
                                </div>
                            }
                            {
                                error && <div class="alert alert-danger my-3" role="alert">
                                    Something Went wrong !!! please try again !!!
                                </div>
                            }
                            <div className="button">
                                <button onClick={handleAddFood} className="btn btn-primary">OK</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
