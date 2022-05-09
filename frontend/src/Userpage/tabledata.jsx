
import React from 'react'
import { Button } from 'reactstrap';

export function Tabledata() {
    return ( 
        <>
         <tr className='tabledata'>
            <td> 
                <div className="tableimage">
                    <img src="/images/burger.jpg" alt="pic" /> 
                </div> 
            </td>
            <td> Rs 100 </td>
            <td> 7 </td>
            <td >            
               {/*  <Button href="/checkout/:id" className='bg-info  bold btn-sm mb-1'> Add/Edit + </Button>
                <br /> 
                <Button href="/checkout/:id" className='bg-warning  bold btn-sm'> Checkout <i className='fa fa-arrow-right '></i> </Button> */}
                Rs 700
            </td>
        </tr>
        
        </>
       
     );
}


function Table(props) {
    console.log(props)
    return (
        <>
        <table>

            <thead>
                <tr>
                    <th>Foods</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price </th>
                </tr>
            </thead>
            
            <tbody>
                
                <Tabledata />
                <Tabledata />
                <Tabledata />
            
            
            </tbody>
        </table>

        </>
    )
}



export default Table
