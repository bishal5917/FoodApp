import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'
import './Main.css'
import { Outlet } from "react-router-dom";

export default function Main() {

    return (
        <>
            <div className="bars">
                <div className="side">
                    <Sidebar />
                </div>
                <div className="midones">
                    <Navbar />
                    <Outlet />
                </div>
            </div>
        </>
    )
}
