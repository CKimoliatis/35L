import React, { useState } from "react";
import "./PriceSelect.css";

const PriceSelect = ({ handleFilter, handleReset }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

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
    setMinPrice("");
    setMaxPrice("");
    handleReset();
  };

  return (
    <div className="price-select-container">
      <h4>Price Range</h4>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label style={{ marginRight: "5px" }}>Min</label>
        <input
          className="price-input"
          type="number"
          value={minPrice}
          onChange={handleMinPriceChange}
          style={{ width: "70px" }}
        />
        <label style={{ marginLeft: "10px", marginRight: "5px" }}>Max</label>
        <input
          className="price-input"
          type="number"
          value={maxPrice}
          onChange={handleMaxPriceChange}
          style={{ width: "70px" }}
        />
      </div>
      <div
        className="button-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          className="button-container"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            style={{
              width: "100%",
              transition: "background-color 0.3s",
              marginBottom: "5px",
            }}
            onClick={handleFilterClick}
          >
            Apply Filter
          </button>
          <button
            style={{ width: "100%", transition: "background-color 0.3s" }}
            onClick={handleResetClick}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default PriceSelect;
