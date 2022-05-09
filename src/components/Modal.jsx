import React from 'react';
import { useTranslation } from 'react-i18next';

const Modal = ({ open, title, content, closeClickOutside, defaultButtons, onClose }) => {
    const { t } = useTranslation();

    return (
        <div className={open ? 'overlay open' : 'overlay'} onClick={closeClickOutside ? onClose : null}>
            <div className='modal'>
                {title ? <div className='title'>{title}</div> : null}
                <div className='content'>{content}</div>
                {
                    defaultButtons ? (
                        <div className='buttons'>
                            <button className='button' onClick={onClose}>{t("close")}</button>
                        </div>
                    ) : null
                }
            </div>
        </div>
    );
}
 
export default Modal;