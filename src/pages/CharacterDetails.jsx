import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import useStore from '../store/useStore';
import QuoteIcon from '../assets/img/quote-icon.svg';
import { fetchRandomQuote } from '../services/api-requests';

const CharacterDetails = () => {
    const {characters} = useStore(state => state); 

    const [selectedCharacter, setSelectedCharacter] = useState();
    const [quote, setQuote] = useState("");
    const [loadingQuote, setLoadingQuote] = useState(true);

    const location = useLocation();

    useEffect(() => {
        const character = characters.find(character => character.char_id.toString() === location.pathname.substring(1));
        setSelectedCharacter(character);
    }, [characters, location.pathname]); 

    useEffect(() => {
        const callFetchQuote = async () => {
            setLoadingQuote(true);
            const result = await fetchRandomQuote(selectedCharacter.name.replaceAll(" ", "+"));
            setLoadingQuote(false);
            switch (result.code) {
                case 200:
                    setQuote(result.data[0].quote);
                    break;

                case 429:
                    
                    break;
            
                default:

                    break;
            }
        }
        if (selectedCharacter) {
            callFetchQuote();
        }
    }, [selectedCharacter]);

    return (
        <div className='character-details-page'>
            {
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
                                <div className='quote'>
                                    <img className='start-quote' src={QuoteIcon} alt="Quote icon" />
                                    <img className='end-quote' src={QuoteIcon} alt="Quote icon" />
                                    <span className='quote-text'>
                                        {
                                            loadingQuote ? (
                                                <div>Loading a famous quote...</div>
                                            ) : (quote)
                                        }
                                    </span>
                                </div>
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
            }
        </div>
    );
}
 
export default CharacterDetails;