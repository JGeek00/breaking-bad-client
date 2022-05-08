import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { HalfMalf } from 'react-spinner-animated';

import Modal from '../components/Modal';

import useStore from '../store/useStore';
import QuoteIcon from '../assets/img/quote-icon.svg';
import { fetchRandomQuote } from '../services/api-requests';

const CharacterDetails = () => {
    const {
        // CHARACTERS
        characters, 
        loadingCharacters,

        //MODALS
        setApiLimitModal,
        setNoConnectionModal,
        setUnknownErrorModal
    } = useStore(state => state);

    const [selectedCharacter, setSelectedCharacter] = useState();
    const [quote, setQuote] = useState("");
    const [characterNotFound, setCharacterNotFound] = useState(false);
    const [loadingQuote, setLoadingQuote] = useState(true);

    const location = useLocation();

    useEffect(() => {
        if (!loadingCharacters) {
            const character = characters.find(character => character.char_id.toString() === location.pathname.substring(1));
            if (character) {
                setSelectedCharacter(character);
            }
            else {
                console.log(characters)
                setCharacterNotFound(true);
            }
        }
    }, [characters, loadingCharacters, location.pathname]); 

    const callFetchQuote = async () => {
        setLoadingQuote(true);
        setQuote("");
        const result = await fetchRandomQuote(selectedCharacter.name.replaceAll(" ", "+"));
        setLoadingQuote(false);
        switch (result.code) {
            case 200:
                if (result.data[0].quote) {
                    setQuote(result.data[0].quote);
                }
                else {
                    setQuote("");
                }
                break;

            case 429:
                setApiLimitModal(true);
                break;
        
            default:
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
    }, [selectedCharacter]);

    return (
        <>
            <Modal 
                open={characterNotFound} 
                title="Character not found" 
                content="This character doesn't exist"
                defaultButtons={true}
                onClose={() => setCharacterNotFound(false)}
            />
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
                                                            <img className='start-quote' src={QuoteIcon} alt="Quote icon" />
                                                            <img className='end-quote' src={QuoteIcon} alt="Quote icon" />
                                                            <span className='quote-text'>{quote}</span>
                                                        </div>  
                                                        <button className='refresh-quote' onClick={() => callFetchQuote()}>
                                                            <i className="bi bi-arrow-repeat"></i>
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className='no-quote'>No quote available.</span>
                                                )
                                            ) : (
                                                <div className='loading-quote'>
                                                    <HalfMalf center={false} />
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <div className='bottom'>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Nickname</td>
                                                <td>{selectedCharacter.nickname}</td>
                                            </tr>
                                            <tr>
                                                <td>Portrayed</td>
                                                <td>{selectedCharacter.portrayed}</td>
                                            </tr>
                                            <tr>
                                                <td>Birthday</td>
                                                <td>{selectedCharacter.birthday}</td>
                                            </tr>
                                            <tr>
                                                <td>Occupation</td>
                                                <td>
                                                    {
                                                        selectedCharacter.occupation.map((item, index) => `${item}${index < selectedCharacter.occupation.length-1 ? ', ' : ''}`)
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Apperance</td>
                                                <td>
                                                    {
                                                        selectedCharacter.appearance.map((item, index) => `${item}${index < selectedCharacter.appearance.length-1 ? ', ' : ''}`)
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                <td>{selectedCharacter.status}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : null
                    ) : (
                        <div className='loading'>
                            <HalfMalf center={false} />
                        </div>
                    )
                }
            </div>
        </>
    );
}
 
export default CharacterDetails;