import React, { useState, useEffect } from 'react';
import './products.css'
import { useSelector } from 'react-redux'
import '../../SellerRegister/SR.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import AddFood from './AddFood';
import SearchIcon from '@mui/icons-material/Search';

export default function Products() {

    //getting the logged in seller from redux store
    const seller = useSelector(state => state.seller.currseller)

    //simple state for toggling
    const [show, setShow] = useState(false)

    //gettings the products of seller
    const [prods, setProds] = useState([]);

    useEffect(() => {
        const getProdsOfSeller = async () => {
            try {
                const gotProds = await axios.get(`/products/getprods/${seller._id}`)
                setProds(gotProds.data)
            } catch (error) {
                console.log(error)
            }
        }
        getProdsOfSeller()
    }, [seller._id]);

    const handleToggle = () => {
        show ? setShow(false) : setShow(true)
    }

    //IMPLEMENTING SEARCHING A FOOD OF A PARTICULAR HOTEL !!!
    const [searchedfood, setSearchedFood] = useState([]);
    const [item, setItem] = useState("");
    const searchingItems = async (e) => {
        e.preventDefault();
        try {
            if (item) {
                const response = await axios.get(
                    `/products/search/${seller._id}?name=${item}`
                );
                setSearchedFood(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        { field: '_id', headerName: '_id', width: 250 },
        { field: 'name', headerName: 'name', width: 150 },
        {
            field: 'category',
            headerName: 'category',
            type: 'string',
            width: 170,
        },
        {
            field: 'price',
            headerName: 'price',
            type: 'number',
            width: 100,
        },
        {
            field: "Actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <div className="actionContainer">
                            <Link className="link" to={`/sellerdashboard/product/` + params.row._id}>
                                <EditOutlinedIcon className="eIcon" />
                                <DeleteOutlinedIcon className="dIcon" />
                            </Link>
                        </div>
                    </>
                )
            }
        }
    ];
    return (
        <>
            <>
                <div onClick={handleToggle} className="title_1">Create New Product</div>

                <div className={show ? "create_compo" : "not_show"}>
                    <AddFood />
                </div>

                <div className="searchBar">
                    <SearchIcon onClick={searchingItems} style={{ fontSize: "30", cursor: "pointer" }} />
                    <input onChange={e => setItem(e.target.value)}
                        type="search" name="" id="" placeholder='Search Your Product ... ' />
                </div>

                {
                    searchedfood.length > 0 &&
                    <div class="container">
                        <div class="row d-flex flex-wrap ">
                            {
                                searchedfood.map(fd => (
                                    <div class="col-sm border bg-light">
                                        <Link className="link" to={`/sellerdashboard/product/` + fd._id}>
                                            {fd.name}
                                        </Link>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }

                <div className="title_2">Our Products</div>
                <div style={{ height: 500, width: '100%' }}>
                    <DataGrid
                        getRowId={(prods) => prods._id}
                        rows={prods}
                        columns={columns}
                        pageSize={7}
                        rowsPerPageOptions={[5]}
                    />
                </div>
            </>
        </>
    );
}
