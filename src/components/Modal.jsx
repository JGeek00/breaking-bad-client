import React from 'react';
import { useTranslation } from 'react-i18next';

const Modal = ({ open, title, content, closeClickOutside, defaultButtons, onClose }) => {
    const { t } = useTranslation();

    return (
        <div className={open ? 'overlay open' : 'overlay'} onClick={closeClickOutside ? onClose : null} data-testid="modal">
            <div className='modal'>
                {title ? <div className='title' data-testid="title">{title}</div> : null}
                <div className='content' data-testid="content">{content}</div>
                {
                    defaultButtons ? (
                        <div className='buttons' data-testid="default-buttons">
                            <button className='button' onClick={onClose}>{t("close")}</button>
                        </div>
                    ) : null
                }
            </div>
        </div>
    );
}
 
export default Modal;