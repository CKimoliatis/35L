import React, { useState } from "react";
import MultiRangeSlider from "multi-range-slider-react";
import axios from "axios";

const PriceSelect = ({ minPrice, maxPrice, onPriceChange }) => {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);
  const [initPrice, setInitPrice] = useState([minPrice, maxPrice]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/get-item-price-range");
      const initialPrice = [response.data.minPrice, response.data.maxPrice];
      setInitPrice(initialPrice);
      setPriceRange(initialPrice);
    } catch (error) {
      console.error("Error fetching min-max prices:", error);
    }
  };

  // Call fetchData when component mounts
  useState(() => {
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
        min={priceRange[0]}
        max={priceRange[1]}
        range
        defaultValue={[initPrice[0], initPrice[1]]}
        onChange={handlePriceChange}
      />
    </div>
  );
};

export default PriceSelect;
