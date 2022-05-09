import React from 'react';
import { useTranslation } from 'react-i18next';

import Modal from './Modal';

import useStore from '../store/useStore';

const CommonModals = () => {
    const {
        //MODALS
        apiLimitModal,
        setApiLimitModal,
        noConnectionModal,
        setNoConnectionModal,
        unknownErrorModal,
        setUnknownErrorModal
    } = useStore(state => state);

    const {t} = useTranslation();

    return (
        <>
            <Modal 
                open={apiLimitModal} 
                title={t("apiLimit")}
                content={t("maximumRequestsDay")}
                defaultButtons={true}
                onClose={() => setApiLimitModal(null)} 
            />
            <Modal 
                open={noConnectionModal} 
                title={t("noConnection")}
                content={t("noConnectionAvailable")}
                defaultButtons={true}
                onClose={() => setNoConnectionModal(null)} 
            />
            <Modal 
                open={unknownErrorModal} 
                title={t("unknownError")}
                content={t("unknownErrorOccured")}
                defaultButtons={true}
                onClose={() => setUnknownErrorModal(null)} 
            />
        </>
    );
}
 
export default CommonModals;