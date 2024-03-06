
// PriceSelect.js
import React, { useState, useEffect } from "react";
import MultiRangeSlider from "multi-range-slider-react";


// function PriceSelect() {
//   //   // Define state to manage the list of items and their checked state
//   const [items, setItems] = useState([
//     { id: 1, name: "$0 - $25", checked: false },
//     { id: 2, name: "$25 - $50", checked: false },
//     { id: 3, name: "$50 - $100", checked: false },
//   ]);

//   // Function to handle checkbox change
//   const handleCheckboxChange = (id) => {
//     setItems(
//       items.map((item) =>
//         item.id === id ? { ...item, checked: !item.checked } : item
//       )
//     );
//   };

//   return (
//     <div>
//       <h2 id="price-select-header">Shop by Price</h2>
//       {items.map((item) => (
//         <div className="price-select-item" key={item.id}>
//           <label>
//             <input
//               type="checkbox"
//               checked={item.checked}
//               onChange={() => handleCheckboxChange(item.id)}
//             />
//             {item.name}
//           </label>
//         </div>
//       ))}
//     </div>
//   );
// }




const PriceSelect = ({ minPrice, maxPrice, onPriceChange }) => {
  const [priceRange, setPriceRange] = useState([minPrice, maxPrice]);

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

