import React, { useState } from 'react';

import NavBar from '../components/NavBar';
import Search from '../components/Search';

const Characters = () => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <div className='characters-page'>
            <NavBar pageTitle="All characters" />
            <div className='page-content'>
                <div className='characters-col'>
                    <div className='col-header'>
                        <div className='title'>Characters</div>
                        <div className='search-field'>
                            <Search icon="bi-search" allowClear={true} value={searchValue} placeholder="Search..." onChange={setSearchValue} />
                        </div>
                    </div>
                    <div className='list'>

                    </div>
                </div>
                <div className='details-div'>
                    
                </div>
            </div>
        </div>
    );
}
 
export default Characters;