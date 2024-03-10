import React, { useState } from 'react';
import "./PriceSelect.css";

const PriceSelect = ({ handleFilter, handleReset }) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
  };

  const handleFilterClick = () => {
    const filter = {
      minPrice: parseFloat(minPrice),
      maxPrice: parseFloat(maxPrice),
    };
    handleFilter(filter);
  };

  const handleResetClick = () => {
    setMinPrice('');
    setMaxPrice('');
    handleReset();
  };

  return (
    <div className="price-select-container">
      <h4>Price Range</h4>
      <label>Min Price:</label>
      <input type="number" value={minPrice} onChange={handleMinPriceChange} />
      <label>Max Price:</label>
      <input type="number" value={maxPrice} onChange={handleMaxPriceChange} />
      <div className="button-container">
        <button onClick={handleFilterClick}>Apply Filter</button>
        <button onClick={handleResetClick}>Reset</button>
      </div>
    </div>
  );
};

export default PriceSelect;
