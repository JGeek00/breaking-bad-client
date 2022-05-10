import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import NavBar from '../components/NavBar';
import Search from '../components/Search';
import Spinner from '../components/Spinner';

import useStore from '../store/useStore';

const Characters = () => {
    const [searchValue, setSearchValue] = useState("");
    const [displayCharacters, setDisplayCharacters] = useState([]);

    const { characters, loadingCharacters } = useStore(state => state);

    const navigate = useNavigate();
    const location = useLocation();

    const { t } = useTranslation();

    useEffect(() => {
        if (searchValue) {
            const filteredCharacters = characters.filter(character => character.name.toLowerCase().includes(searchValue.toLowerCase()));
            setDisplayCharacters(filteredCharacters);
        }
        else {
            setDisplayCharacters(characters);
        }
    }, [searchValue, characters]);

    const navigateCharacter = (characterId) => {
        navigate(`/${characterId}`);
    }

    return (
        <div className='characters-page'>
            <NavBar pageTitle="Breaking Bad" />
            <div className='page-content'>
                <div className='characters-col'>
                    <div className='col-header'>
                        <div className='title'>{t("characters")}</div>
                        {
                            !loadingCharacters && characters.length > 0 ? (
                                <div className='search-field'>
                                    <Search icon="bi-search" allowClear={true} value={searchValue} placeholder={t("searchByName")} onChange={setSearchValue} />
                                </div>
                            ) : null
                        }
                    </div>
                    <div className='list'>
                        {
                            loadingCharacters ? (
                                <div className='loading'>
                                    <Spinner size='50px' />
                                </div>
                            ) : (
                                displayCharacters.length > 0 ? (
                                    displayCharacters.map(character => (
                                        <div key={character.char_id} className={location.pathname.substring(1) === character.char_id.toString() ? 'character selected' : 'character'} onClick={() => navigateCharacter(character.char_id)}>
                                            <div className='character-data'>
                                                <div className='picture'>
                                                    <img src={character.img} alt="Character" loading='lazy' />
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
                                        {t("nothingShowHere")}
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
                                {t("selectCharacter")}
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
 
export default Characters;