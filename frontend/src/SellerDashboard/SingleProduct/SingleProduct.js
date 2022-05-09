import React, { useState, useEffect } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import './SingleProduct.css'
import axios from 'axios'
import { useSelector } from 'react-redux'
import '../Products/products.css'
import '../../SellerRegister/SR.css'
import { useParams } from 'react-router'
import { useNavigate } from 'react-router';

export default function SingleProduct() {

    const PF = 'http://localhost:5000/raimages/'

    //getting that prod id from params
    const { prodId } = useParams()

    const navigate = useNavigate()

    //getting the logged in seller from redux store
    const seller = useSelector(state => state.seller.currseller)

    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    const [file, setFile] = useState("")

    //getting info about that product
    const [img, setImg] = useState("")
    useEffect(() => {
        const getProd = async () => {
            try {
                const gotThat = await axios.get('/products/' + prodId)
                setName(gotThat.data.name)
                setCategory(gotThat.data.category)
                setPrice(gotThat.data.price)
                setDescription(gotThat.data.description)
                setImg(gotThat.data.image)
            } catch (error) {
                console.log(error)
            }
        }
        getProd();
    }, [prodId]);


    const handleUpdation = async (e) => {
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
        const resp = await axios.put(`http://localhost:5000/api/products/updateprod/${prodId}`, newFood)

        if (resp.status === 200) {
            setSuccess(true)
        }
        else {
            setError(true)
        }
    }

    const handleDeletion = async () => {
        const confirmDelete = window.confirm("Are you sure to delete ?")
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:5000/api/products/deleteprod/${prodId}`,
                    { data: { sellerId: seller._id } })
                navigate('/sellerdashboard/products')
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <>
            <div className="mainbody">
                <div className="container">
                    <div className="button">
                        <button onClick={handleDeletion} className="btn btn-danger">Delete This Product</button>
                    </div>
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
                                <img className="image_from_db" src={PF + img} alt="" />
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlTextarea1" >Description</label>
                                <textarea value={description}
                                    onChange={e => setDescription(e.target.value)} className="form-control tarea" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            {
                                success && <div class="alert alert-success my-3" role="alert">
                                    Product Updated Successfully !!!
                                </div>
                            }
                            {
                                error && <div class="alert alert-danger my-3" role="alert">
                                    Something Went wrong !!! please try again !!!
                                </div>
                            }
                            <div className="button">
                                <button onClick={handleUpdation} className="btn btn-primary">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>);
}
