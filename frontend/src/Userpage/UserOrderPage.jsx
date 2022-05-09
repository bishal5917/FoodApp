import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../Home/Header";
import "./userpage.css";
import { DataGrid } from "@mui/x-data-grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import axios from "axios";
import { Link } from "react-router-dom";

function UserOrderPage() {
  //getting the logged in user
  const luser = useSelector(
    (state) => state.user.curruser && state.user.curruser
  );

  //fetching orders of a user
  const [prods, setProds] = useState([]);

  useEffect(() => {
    const getUserOrders = async () => {
      try {
        const gotOrders = await axios.get("/ordered/getuserorder/" + luser._id);
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
  }, [luser._id]);

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
      width: 150,
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
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div className="actionContainer">
              {params.row.cancelled ? "Yes" : "No"}
            </div>
          </>
        );
      },
    },
    {
      field: "Actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div className="actionContainer">
              <Link to={`/orderstatus/${params.row._id}`}>
                <VisibilityOutlinedIcon style={{ color: "teal" }} />
              </Link>
            </div>
          </>
        );
      },
    },
  ];

  return (
    <>
      <Header />
      <div style={{ height: 500, width: "100%", padding: "5rem 5rem" }}>
        <h4 className="headOrder">
          Hello {luser.name} , Track Your Orders !!!{" "}
        </h4>
        <DataGrid
          getRowId={(prods) => prods._id}
          rows={prods}
          columns={columns}
          pageSize={7}
          rowsPerPageOptions={[5]}
        />
      </div>
    </>
  );
}

export default UserOrderPage;
