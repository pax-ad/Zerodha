import React from 'react';

function Pricing() {
    return ( 
        <div className="container mb-5" >
            <div className='row'>
                <div className='col-4'>
                    <h1 className ='mb-3'>Unbeatbale Pricing</h1>
                    <p> we pioneered the concept of discount broking and price transparenncy in India. Flat fees and no hidden charges.</p>
                    <a href='' style={{textDecoration: 'none'}}>See our pricing <i class="fa fa-arrows-h" aria-hidden="true"></i></a>
                </div>
                <div className='col-2'></div>
                <div className='col-6'>
                    <div className='row text-center'>
                         <div className='col  p-2 border border-solid rounded mb-3' style={{backgroundColor:"#f5f5f5"}}>
                                 <h1>0</h1>
                                 <p>free euity delivery and direct mtutal funds</p>
                         </div>
                                <div className='col p-2 border-solid rounded mb-3' style={{backgroundColor:"#f5f5f5"}}>
                                      <h1>Rs.20</h1>
                                      <p>Intraday and F&O</p>
                                </div>
                     </div>
                </div>




            </div>
        </div>
     );
}

export default Pricing;