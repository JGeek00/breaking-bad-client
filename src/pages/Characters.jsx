import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { HalfMalf } from 'react-spinner-animated';

import NavBar from '../components/NavBar';
import Search from '../components/Search';

import { fetchCharacters } from '../services/api-requests';
import useStore from '../store/useStore';

const Characters = () => {
    const [searchValue, setSearchValue] = useState("");
    const [displayCharacters, setDisplayCharacters] = useState([]);
    const [loadingList, setLoadingList] = useState(true);

    const {characters, setCharacters} = useStore(state => state);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const callGetCharacters = async () => {
            setLoadingList(true);
            const result = await fetchCharacters();
            setLoadingList(false);
            switch (result.code) {
                case 200:
                    setCharacters(result.data);
                    setDisplayCharacters(result.data);
                    break;

                case 429:
                    
                    break;
            
                default:

                    break;
            }
        }
        callGetCharacters();
    }, []);

    useEffect(() => {
        if (searchValue) {
            const filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(searchValue.toLowerCase()));
            setDisplayCharacters(filteredCharacters)
        }
        else {
            setDisplayCharacters(characters)
        }
    }, [searchValue]);

    const navigateCharacter = (characterId) => {
        navigate(`/${characterId}`);
    }

    return (
        <div className='characters-page'>
            <NavBar pageTitle="Breaking Bad" />
            <div className='page-content'>
                <div className='characters-col'>
                    <div className='col-header'>
                        <div className='title'>Characters</div>
                        {
                            !loadingList && characters.length > 0 ? (
                                <div className='search-field'>
                                    <Search icon="bi-search" allowClear={true} value={searchValue} placeholder="Search by name..." onChange={setSearchValue} />
                                </div>
                            ) : null
                        }
                    </div>
                    <div className='list'>
                        {
                            loadingList ? (
                                <div className='loading'>
                                    <HalfMalf center={false} />
                                </div>
                            ) : (
                                displayCharacters.length > 0 ? (
                                    displayCharacters.map(character => (
                                        <div key={character.char_id} className='character' onClick={() => navigateCharacter(character.char_id)}>
                                            <div className='character-data'>
                                                <div className='picture'>
                                                    <img src={character.img} alt="Character" />
                                                </div>  
                                                <div className='details'>
                                                    <div className='topLine'>{character.name}</div>
                                                    <div className='bottomLine'>{character.nickname}</div>
                                                </div>
                                            </div>
                                            <div className='end-arrow'>
                                                <i className="bi bi-caret-right"></i>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className='no-characters'>
                                        Nothing to show here...
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
                <div className='details-div'>
                    {
                        location.pathname.substring(1) ? (
                            <Outlet />
                        ) : (
                            <div className='no-char-selected'>
                                Select a character to display it's information here.
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Characters;