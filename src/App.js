import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import Characters from './pages/Characters';
import CharacterDetails from './pages/CharacterDetails';

import useStore from './store/useStore';
import { fetchCharacters } from './services/api-requests';

const App = () => {
    const {setCharacters, setLoadingCharacters} = useStore(state => state);

    useEffect(() => {
        const callGetCharacters = async () => {
            setLoadingCharacters(true);
            const result = await fetchCharacters();
            setLoadingCharacters(false);
            switch (result.code) {
                case 200:
                    setCharacters(result.data);
                    break;

                case 429:
                    
                    break;
            
                default:

                    break;
            }
        }
        callGetCharacters();
    }, []);

    return (
        <div>
            <Routes>
                <Route path="/" element={<Characters />}>
                    <Route path=":characterId" element={<CharacterDetails />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
