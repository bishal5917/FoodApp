import React, { useState, useEffect } from 'react'
import { useSelector } from "react-redux";
import './orders.css'
import '../Products/products.css'
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import axios from 'axios'
import SearchIcon from '@mui/icons-material/Search';

export default function Orders() {

    const lseller = useSelector(
        (state) => state.seller.currseller && state.seller.currseller
    );

    //fetching orders of a user
    const [prods, setProds] = useState([]);

    useEffect(() => {
        const getUserOrders = async () => {
            try {
                const gotOrders = await axios.get("/ordered/getsellerorder/" + lseller._id);
                setProds(
                    gotOrders.data.sort((a, b) => {
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    })
                );
            } catch (error) {
                console.log(error);
            }
        };
        getUserOrders();
    }, [lseller._id]);

    //handleorder search by unique orderId
    const [sorder, setSorder] = useState("")
    const [entered, setEntered] = useState("")
    const handleOrderSearch = async () => {
        try {
            const res = await axios.get('/ordered/getaboutorder/' + entered)
            setSorder(res.data)
        } catch (error) {
            console.log(error)
        }
    }


    const columns = [
        { field: "_id", headerName: "order_id", width: 225 },
        { field: "productname", headerName: "ITEM", width: 150 },
        {
            field: "qty",
            headerName: "QTY",
            type: "number",
            width: 70,
        },
        {
            field: "total",
            headerName: "TOTAL",
            type: "number",
            width: 70,
        },
        {
            field: "Ordered Date",
            headerName: "Ordered Date",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <div className="actionContainer">
                            <div>{params.row.createdAt.split("T")[0]}</div>
                        </div>
                    </>
                );
            },
        },
        {
            field: "Ordered Time",
            headerName: "Ordered Time",
            width: 125,
            renderCell: (params) => {
                return (
                    <>
                        <div className="actionContainer">
                            <div>{params.row.createdAt.split("T")[1].split(".")[0]}</div>
                        </div>
                    </>
                );
            },
        },
        {
            field: "status",
            headerName: "STATUS",
            type: "string",
            width: 100,
        },
        {
            field: "Cancelled",
            headerName: "Cancelled",
            width: 100,
            renderCell: (params) => {
                return (
                    <>
                        <div className="actionContainer">
                            {params.row.cancelled
                                ? "Yes"
                                : "No"}
                        </div>
                    </>
                );
            },
        },
        {
            field: "Action",
            headerName: "Action",
            width: 90,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/sellerdashboard/sellerorder/${params.row._id}`}>
                            <RemoveRedEyeOutlinedIcon style={{ color: "teal" }} />
                        </Link>
                    </>
                );
            },
        },
    ];



    return (
        <>
            <div className="searchBar">
                <SearchIcon onClick={handleOrderSearch}
                    style={{ fontSize: "30", cursor: "pointer" }} />
                <input onChange={e => setEntered(e.target.value)}
                    type="search" name="" id="" placeholder='Search Order By Id ... ' />
            </div>

            {sorder && <div class="alert alert-success" role="alert">
                Order Found : 
                <Link to={`/sellerdashboard/sellerorder/${sorder._id}`}>
                    {sorder._id}
                </Link>
            </div>}

            <h4 className="headOrder">Received Orders</h4>
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
    )
}
