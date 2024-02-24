import React, { useState } from 'react';

function CategorySelect() {
  // Define state to manage the list of items and their checked state
  const [items, setItems] = useState([
    { id: 1, name: 'Clothing', checked: false },
    { id: 2, name: 'Sports', checked: false },
    { id: 3, name: 'Electronics', checked: false },
    { id: 4, name: 'Home Goods', checked: false },
    { id: 5, name: 'Office Supplies', checked: false },
    { id: 6, name: 'Music', checked: false },
    { id: 7, name: 'Entertainment', checked: false }
  ]);

  // Function to handle checkbox change
  const handleCheckboxChange = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div>
      <h2 id="price-select-header">Shop by Category</h2>
      {items.map(item => (
        <div className="price-select-item" key={item.id}>
          <label>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleCheckboxChange(item.id)}
            />
            {item.name}
          </label>
        </div>
      ))}
    </div>
  );
}

export default CategorySelect;