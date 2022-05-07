import React from 'react';

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

    return (
        <>
            <Modal 
                open={apiLimitModal} 
                title="API limit reached" 
                content="You have reached the maximum number of requests per day. Take a rest and come back tomorrow."
                defaultButtons={true}
                onClose={() => setApiLimitModal(null)} 
            />
            <Modal 
                open={noConnectionModal} 
                title="No connection" 
                content="There's no Internet connection available. Check your connection and reload the page."
                defaultButtons={true}
                onClose={() => setNoConnectionModal(null)} 
            />
            <Modal 
                open={unknownErrorModal} 
                title="Unknown error" 
                content="An unknown error occurred."
                defaultButtons={true}
                onClose={() => setUnknownErrorModal(null)} 
            />
        </>
    );
}
 
export default CommonModals;