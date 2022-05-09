import React from 'react'
import './Home'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

export default function Header() {
    const user = useSelector(state => state.user.curruser && state.user.curruser)
    const seller = useSelector(state => state.seller.currseller && state.seller.currseller)

    return (
        <>
            <header class="restro-header container p-2">
                <Link className="link" to="/">
                    <img src='/logo512.png' className="khanajamlogo "  alt='pic'/>
                    <span id="restro-title  p-2">Khanajam</span>

                </Link>
    
                <nav class="restro-navigation">
                    <Link className="link" to="/hotels">
                        <li> Hotels </li>
                    </Link>
                  
                        {
                            !user && !seller && (
                                <UncontrolledDropdown nav>
                                <DropdownToggle tag="a" caret>
                                {
                                        <span> Login/Register </span>
                                   
                                }
                                    
                                </DropdownToggle>
                                <DropdownMenu>
                                {
                                    !user && !seller && (<DropdownItem className="link" href="/registerseller">
                                        <li> Seller registration </li>
                                    </DropdownItem>)
                                }
        
                                 {!user && !seller && (<DropdownItem className="link" href="/register">
                                    <li> Customer Register </li>
                                </DropdownItem>)}
                                
                                 {!user && !seller && (<DropdownItem className="link" href="/login">
                                    <li> Login <span className='t5'> (alreday have an account)</span> </li>
                                </DropdownItem>)}
                                   
                                </DropdownMenu>
                            </UncontrolledDropdown>
                           )
                        }
                  
                    {
                        user && (<Link className="link" to="/userorderpage">
                            <li>Track Orders</li>
                        </Link>)
                    }
                    {
                        user && (<Link className="link" to={`/useraccount/${user._id}`}>
                            <li>My Account</li>
                        </Link>)
                    }
                    {
                        seller && (<Link className="link" to="/sellerdashboard">
                            <li>Dashboard </li>
                        </Link>)
                    }
                   
                </nav>
            </header>
        </>
    )
}
