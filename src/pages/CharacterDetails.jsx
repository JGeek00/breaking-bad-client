import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Modal from '../components/Modal';
import NavBar from '../components/NavBar';
import IconButton from '../components/IconButton';
import Spinner from '../components/Spinner';

import useStore from '../store/useStore';
import { fetchRandomQuote } from '../services/api-requests';

const CharacterDetails = () => {
    const {
        // CHARACTERS
        characters, 
        loadingCharacters,

        //MODALS
        setApiLimitModal,
        setNoConnectionModal,
        setUnknownErrorModal,

        // CONFIG
        screenWidth,
        apiRequestError,
        setApiRequestError
    } = useStore(state => state);

    const [selectedCharacter, setSelectedCharacter] = useState();
    const [quote, setQuote] = useState("");
    const [characterNotFound, setCharacterNotFound] = useState(false);
    const [loadingQuote, setLoadingQuote] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();

    const { t } = useTranslation();

    useEffect(() => {
        if (!loadingCharacters) {
            const character = characters.find(character => character.char_id.toString() === location.pathname.substring(1));
            if (character) {
                setSelectedCharacter(character);
            }
            else {
                if (!apiRequestError) {
                    setCharacterNotFound(true);
                }
            }
        }
    }, [characters, apiRequestError, loadingCharacters, location.pathname]); 

    const callFetchQuote = async () => {
        setLoadingQuote(true);
        setQuote("");
        const result = await fetchRandomQuote(selectedCharacter.name.replaceAll(" ", "+"));
        setLoadingQuote(false);
        switch (result.code) {
            case 200:
                setApiRequestError(false);
                if (result.data[0].quote) {
                    setQuote(result.data[0].quote);
                }
                else {
                    setQuote("");
                }
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

    useEffect(() => {
        if (selectedCharacter) {
            callFetchQuote();
        }
        // eslint-disable-next-line
    }, [selectedCharacter]);

    return (
        <>
            <Modal 
                open={characterNotFound} 
                title={t("characterNotFound")}
                content={t("characterDoesntExist")}
                defaultButtons={true}
                onClose={() => setCharacterNotFound(false)}
            />
            {   
                screenWidth <= 1100 ? (
                    <NavBar pageTitle={t("character")} goBack={() => navigate('/', {replace: true})} />
                ) : null
            }
            <div className='character-details-page'>
                {
                    !loadingCharacters ? (
                        selectedCharacter ? (
                            <div className='character'>
                                <div className='top'>
                                    <div className='left'>
                                        <div className='img-div'>
                                            <img src={selectedCharacter.img} alt="Character" />
                                        </div>
                                        <div className='name'>{selectedCharacter.name}</div>
                                    </div>
                                    <div className='right'>
                                        {
                                            !loadingQuote ? (
                                                quote ? (
                                                    <div className='quote-div'>
                                                        <div className='quote'>
                                                            <span className='quote-text'>"{quote}"</span>
                                                        </div>  
                                                        <div className='refresh-quote'>
                                                            <IconButton icon={<i className="bi bi-arrow-repeat"></i>} withBorder={true} onClick={() => callFetchQuote()}/>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className='no-quote'>{t("noQuoteAvailable")}</span>
                                                )
                                            ) : (
                                                <div className='loading-quote'>
                                                    <Spinner size='30px' />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='bottom'>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>{t("nickname")}</td>
                                                <td>{selectedCharacter.nickname}</td>
                                            </tr>
                                            <tr>
                                                <td>{t("portrayed")}</td>
                                                <td>{selectedCharacter.portrayed}</td>
                                            </tr>
                                            <tr>
                                                <td>{t("birthday")}</td>
                                                <td>{selectedCharacter.birthday}</td>
                                            </tr>
                                            <tr>
                                                <td>{t("occupation")}</td>
                                                <td>
                                                    {
                                                        selectedCharacter.occupation.map((item, index) => `${item}${index < selectedCharacter.occupation.length-1 ? ', ' : ''}`)
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{t("apperance")}</td>
                                                <td>
                                                    {
                                                        selectedCharacter.appearance.map((item, index) => `${item}${index < selectedCharacter.appearance.length-1 ? ', ' : ''}`)
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>{t("status")}</td>
                                                <td>{selectedCharacter.status}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : null
                    ) : (
                        <div className='loading'>
                            <Spinner size='60px' />
                        </div>
                    )
                }
            </div>
        </>
    );
}
 
export default CharacterDetails;