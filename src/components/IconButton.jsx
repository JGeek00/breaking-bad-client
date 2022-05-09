import React from 'react';

const IconButton = ({ icon, withBorder, onClick }) => {
    return (
        <button className={withBorder ? 'icon-button with-border' : 'icon-button'} onClick={onClick}>
            {icon}
        </button>
    );
}
 
export default IconButton;