import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Characters from './pages/Characters';
import CharacterDetails from './pages/CharacterDetails';

const App = () => {
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
