import React from 'react';
import '../styles/searchBar.css'


const SearchBar = ({handleStyle, handleSearch, search}) => {


    return (                  
    <div className="search">
    <div className="searchProducts" >
        <div className="icon" onClick={handleStyle}></div>
        <div className="input">
            <input type="text" onChange={handleSearch} value={search} id="mySearch" placeholder='Rechercher ...' />
        </div>
    </div>
</div>);
}
 
export default SearchBar;