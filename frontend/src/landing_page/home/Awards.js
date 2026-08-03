import React from 'react';

function Awards() {
    return ( 
        //<h1>Awards</h1>
        <div className="container mt-5" >
            <div className='row'>
                <div className='col-6 p-5 '>
                    <img src = 'media/images/largestBroker.svg' alt="Awards Image mb-4" />
                </div>
                    <div className='col-6 p-5 mt-3'>
                        <h1 >Largest stock broker in India</h1>
                        <p classname ='mb-5'> 2+ milllion clients contribute to our success</p>
                        <div className='row'>
                            <div className='col-6 '>
                                 <ul>
                                         <li><p>future and Options</p></li>
                                         <li><p>commodity dervatives</p></li>
                                         <li><p>currency derivatives</p></li>
                                 </ul>
                                </div>
                                <div className='col-6'>
                                 <ul>
                                          <li><p>Stocks & IPO </p></li>
                                          <li><p>commodity dervatives</p></li>
                                          <li><p>currency derivatives</p></li>
                                 </ul>
                                 </div>

                            <img src = 'media/images/pressLogos.png' alt="press logo  Image"  style={{width:"90%", height:"auto"}} />

                        </div>
                    </div>
             </div>
        </div>
     );
}

export default Awards;