import React from 'react';

const Search = ({ value, icon, allowClear, placeholder, onChange }) => {
    return (
        <div className='search' data-testid="search-component">
            {icon ? <i className={`leading-icon bi ${icon}`} data-testid="leading-icon"></i> : null}
            <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} data-testid="search-field" />
            {allowClear && value ? <i className="trailing-icon bi bi-x" onClick={() => onChange("")} data-testid="trailing-icon"></i> : null}
        </div>
    );
}
 
export default Search;