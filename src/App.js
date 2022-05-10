import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Characters from './pages/Characters';
import CharacterDetails from './pages/CharacterDetails';
import CommonModals from './components/CommonModals';

import useStore from './store/useStore';
import { fetchCharacters } from './services/api-requests';

const App = () => {
    const {
        // CHARACTERS
        setCharacters, 
        setLoadingCharacters,

        //MODALS
        setApiLimitModal,
        setNoConnectionModal,
        setUnknownErrorModal,

        // CONFIG
        screenWidth,
        setScreenWidth,
        setApiRequestError,
        darkMode,
        setDarkMode
    } = useStore(state => state);

    useEffect(() => {
        const resizeListener = () => {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener('resize', resizeListener);
        return () => {
            window.removeEventListener('resize', resizeListener);
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const callGetCharacters = async () => {
            setLoadingCharacters(true);
            const result = await fetchCharacters();
            setLoadingCharacters(false);
            switch (result.code) {
                case 200:
                    setApiRequestError(false);
                    setCharacters(result.data);
                    break;
                    
                case 429:
                    setApiRequestError(true);
                    setApiLimitModal(true);
                    break;
            
                default:
                    setApiRequestError(true);
                    switch (result.error.code) {
                        case 'ERR_NETWORK':
                            setNoConnectionModal(true);
                            break;
                            
                        default:
                            setUnknownErrorModal(true);
                            break;
                    }
                    break;
            }
        }
        callGetCharacters();
        // eslint-disable-next-line
    }, []);

    return (
        <div data-theme={darkMode ? 'dark' : ''}>
            <CommonModals />
            <Routes>
                {
                    screenWidth > 1100 ? (
                        <Route path="/" element={<Characters />}>
                            <Route path=":characterId" element={<CharacterDetails />} />
                        </Route>
                    ) : (
                        <>
                            <Route path="/" element={<Characters />} />
                            <Route path=":characterId" element={<CharacterDetails />} />
                        </>
                    )
                }
            </Routes>
        </div>
    );
}

export default App;
