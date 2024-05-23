import React from 'react';

const LayoutCha = ({ children }) => {
    return (
        <div className="container bg-white">
            <div className='container flex-1' style={{backgroundColor:"#E2E2E2"}}>
                <div className='d-flex justify-content-end align-content-center py-2'>
                   <button className='btn btn-dark text-uppercase'>Log in</button>
                </div>
            </div>
            
            
        </div>

        
    );
};

export default LayoutCha;
