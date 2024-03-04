import React from "react";
import "./SearchBar.css";
const SearchBar = ({handleSearchQueryChange}) => {
    const handleInputChange = (event) => {
        const query = event.target.value;
        handleSearchQueryChange(query); // Call handleSearchQueryChange function from props
      };
  return (
    <div className="search-box">
      <input type="text" placeholder="Search.." onChange={handleInputChange}></input>
      <button>🔍</button>
    </div>
  );
}

export default SearchBar;
