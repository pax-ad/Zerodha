import React from 'react';

function Stats() {
    return ( 
        <div className="container">
            <div className='row'>
                <div className='col-6 p-5'>
                    <h1 className='fs-1 mb-5'>Trust with confidence</h1>
                    <h2 className='fs-4 mb-2'>Customer-First always</h2>
                    
                    <p className='text-muted'>That's why 13+ crore cusstomers trust Zerodha with Rs.3.5+ lakh crores worth of equity investments.</p>
                    <h2 className='fs-4 mb-2'>No spam or gimmicks</h2>
                    <p className='text-muted'>We don't believe in spam or gimmicks. Just straightforward, transparent services.</p>
                    <h2 className='fs-4 mb-2'>The zerodha universe</h2>
                    <p className='text-muted'>From trading to investing, we've got you covered.</p>
                    <h2 className='fs-4 mb-2'>Do better with money</h2>
                    <p className='text-muted'>Maximize your returns with our intelligent investment solutions.</p>
                </div>
                <div className='col-6 p-5'>
                    <img src = 'media/images/ecosystem.png' alt="Stats Image mb-4"  style={{width:"80%", height:"auto"}} />
                    <div className='text-center'>
                        <a href='' className='mx-5' style={{textDecoration: 'none'}}>Explore our products <i class="fa fa-arrows-h" aria-hidden="true"></i></a>
                        <a href='' className='mx-5' style={{textDecoration: 'none'}}>try kite demo <i class="fa fa-arrows-h" aria-hidden="true"></i></a>

                    </div>
                </div>
            </div>        

        </div>
     );
}

export default Stats;