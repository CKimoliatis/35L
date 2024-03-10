import React, { useState } from "react";

const CategorySelect = ({ updateCat }) => {
  // Define state to manage the list of items and their checked state
  const [items, setItems] = useState([
    { id: 1, name: "Clothing", checked: false },
    { id: 2, name: "Sports", checked: false },
    { id: 3, name: "Electronics", checked: false },
    { id: 4, name: "Home Goods", checked: false },
    { id: 5, name: "Office Supplies", checked: false },
    { id: 6, name: "Music", checked: false },
    { id: 7, name: "Entertainment", checked: false },
    { id: 8, name: "Furniture", checked: false },
    { id: 9, name: "Other", checked: false },
  ]);

  // Function to handle checkbox change
  const handleCheckboxChange = (id) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(updatedItems);
    const selectedCategories = updatedItems
      .filter((item) => item.checked)
      .map((item) => item.name);
    handleCatChange(selectedCategories);
  };

  const handleCatChange = (selectedCategories) => {
    updateCat(selectedCategories);
  };

  return (
    <div>
      <h3 id="price-select-header">Shop by Category</h3>
      {items.map((item) => (
        <div className="price-select-item" key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(item.id)}
            />
            {' '}{item.name}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CategorySelect;
