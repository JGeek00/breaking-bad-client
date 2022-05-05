import React from 'react';

import Icon from '../assets/img/breaking-bad.png';

const NavBar = ({pageTitle}) => {
    return (
        <div className='navbar'>
            <div className='left-content'>
                <div className='page-title'>{pageTitle}</div>
            </div>
            <img className='icon' src={Icon} alt="Breaking Bad icon" />
        </div>
    );
}
 
export default NavBar;