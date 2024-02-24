import React from 'react'
import './SearchBar.css'
function SearchBar() {
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
          // Trigger search action when Enter key is pressed
            
        }
    }
    return (
        <div className="search-box">
            <input type="text" placeholder="Search" onKeyDown={handleKeyDown}></input>
            <button>🔍</button>
        </div>
    );
}

export default SearchBar;