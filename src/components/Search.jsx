import React from 'react';

const Search = ({value, icon, allowClear, placeholder, onChange}) => {
    return (
        <div className='search'>
            {icon ? <i className={`leading-icon bi ${icon}`}></i> : null}
            <input type="text" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
            {allowClear && value ? <i className=" trailing-icon bi bi-x" onClick={() => onChange("")}></i> : null}
        </div>
    );
}
 
export default Search;