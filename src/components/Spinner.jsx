import React from 'react';

const Spinner = ({ size }) => {
    return (
        <div className='spinnerContainer' style={{width: size, height: size}}>
            <div className='spin'></div>
        </div>
    );
}
 
export default Spinner;