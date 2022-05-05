import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Characters from './pages/Characters';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Characters />} />
            </Routes>
        </div>
    );
}

export default App;
