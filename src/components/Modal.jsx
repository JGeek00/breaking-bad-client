import React from 'react';

const Modal = ({open, title, content, closeClickOutside, defaultButtons, onClose}) => {
    return (
        <div className={open ? 'overlay open' : 'overlay'} onClick={closeClickOutside ? onClose : null}>
            <div className='modal'>
                {title ? <div className='title'>{title}</div> : null}
                <div className='content'>{content}</div>
                {
                    defaultButtons ? (
                        <div className='buttons'>
                            <button className='button' onClick={onClose}>Close</button>
                        </div>
                    ) : null
                }
            </div>
        </div>
    );
}
 
export default Modal;