import React from 'react';

import Icon from '../assets/img/breaking-bad.png';

const NavBar = ({pageTitle, goBack}) => {
    return (
        <div className='navbar'>
            <div className='left-content'>
                {
                    goBack ? (
                        <button className='back-button' onClick={goBack}>
                            <i className="bi bi-arrow-left"></i>
                        </button>
                    ) : null
                }
                <div className='page-title'>{pageTitle}</div>
            </div>
            <img className='icon' src={Icon} alt="Breaking Bad icon" />
        </div>
    );
}
 
export default NavBar;