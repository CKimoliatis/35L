import React, { useState, useEffect } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import axios from "axios";

const PriceSelect = ({ minPrice, maxPrice, onPriceChange }) => {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get-item-price-range");
        minPrice = response.data.minPrice;
        maxPrice = response.data.maxPrice;
      } catch (error) {
        console.error("Error fetching min-max prices:", error);
      }
    };

    fetchData();
  }, []);


  const handlePriceChange = (event) => {
    const newPriceRange = [event.minValue, event.maxValue];
    setPriceRange(newPriceRange);
    onPriceChange(newPriceRange);
  };

  return (
    <div className="price-select-container">
      <MultiRangeSlider
        min={minPrice}
        max={maxPrice}
        range
        defaultValue={[minPrice, maxPrice]}
        onChange={handlePriceChange}
      />
    </div>
  );
};

export default PriceSelect;
