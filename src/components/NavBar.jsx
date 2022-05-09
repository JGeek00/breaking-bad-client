import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import IconButton from './IconButton';
import Modal from './Modal';

import Icon from '../assets/img/breaking-bad.png';
import { languagesList } from '../constants/languagesList';

const NavBar = ({ pageTitle, goBack }) => {
    const [openSettings, setOpenSettings] = useState(false);

    const { t, i18n } = useTranslation();

    const handleChangeLanguage = (e) => {
        i18n.changeLanguage(e.target.value);
    }

    const settingsContent = (
        <div className='settings-content'>
            <div className='language-select'>
                <div className='label'>{t("language")}</div>
                <div className='select-div'>
                    <select value={i18n.language} onChange={handleChangeLanguage}>
                        {
                            languagesList.map((language, index) => (
                                <option key={index} value={language.value}>{t(language.i18nLabel)}</option>
                            ))
                        }
                    </select>
                    <i className="bi bi-caret-down"></i>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Modal 
                open={openSettings}
                title={t("settings")}
                defaultButtons={true}
                content={settingsContent}
                onClose={() => setOpenSettings(false)}
            />
            <div className='navbar'>
                <div className='left-content'>
                    {
                        goBack 
                            ? <div className='back-button'><IconButton icon={<i className="bi bi-arrow-left"></i>} onClick={goBack} /></div>
                            : <img className='icon' src={Icon} alt="Breaking Bad icon" />
                    }
                    <div className='page-title'>{pageTitle}</div>
                </div>
                <div className='settings-button'>
                    <IconButton icon={<i className="bi bi-gear-wide-connected"></i>} onClick={() => setOpenSettings(true)} />
                </div>
            </div>
        </>
    );
}
 
export default NavBar;