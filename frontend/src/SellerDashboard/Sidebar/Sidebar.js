import React from 'react'
import './sidebar.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logoutSeller } from "../../Redux/ReduxSeller"
import MenuIcon from '@mui/icons-material/Menu';

export default function Sidebar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSellerLogout = () => {
        const decision = window.confirm("Are you sure you want to log out ?")
        if (decision) {
            dispatch(logoutSeller())
            navigate('/')
        }
    }

    return (
        <>
            <div className="sidebarContainer">
                <ul>
                    <li className="menuIcon">
                        <MenuIcon style={{ fontSize: "30" }} />
                    </li>
                    <Link className="link" to="/">
                        <li className="lists">
                            <HomeOutlinedIcon className="Icons" />
                            <span className="what">Home</span>
                        </li>
                    </Link>
                    <Link className="link" to="/sellerdashboard/analytics">
                        <li className="lists">
                            <ShowChartIcon className="Icons" /><span className="what">Analytics</span>
                        </li>
                    </Link>
                    <Link className="link" to="/sellerdashboard/products">
                        <li className="lists">
                            <LocalDiningIcon className="Icons" />
                            <span className="what">Products</span>
                        </li>
                    </Link>
                    <Link className="link" to="/sellerdashboard/orders">
                        <li className="lists">
                            <ShoppingCartOutlinedIcon className="Icons" />
                            <span className="what">Orders</span>
                        </li>
                    </Link>
                    <li onClick={handleSellerLogout} className="lists">
                        <LogoutIcon className="Icons" />
                        <span className="what">Log Out</span>
                    </li>
                </ul>
            </div>
        </>
    )
}
