// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function CategorySelect() {
//   // Define state to manage the list of items and their checked state
//   const [categories, setCategories] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   useEffect(() => {
//     fetchCategories();
//   }, []);

//   const fetchCategories = async () => {
//     try {
//       const response = await axios.get("/api/categories");
//       const categoriesData = response.data;
//       const categoryNames = categoriesData.map((category) => [
//         category.id,
//         category.category_name,
//       ]);
//       setCategories(categoryNames);
//     } catch (error) {
//       console.error("Error fetching categories:", error);
//     }
//   };

//   const toggleCategory = (categoryName) => {
//     if (selectedCategories.includes(categoryName)) {
//       setSelectedCategories(
//         selectedCategories.filter((c) => c !== categoryName)
//       );
//     } else {
//       setSelectedCategories([...selectedCategories, categoryName]);
//     }
//   };

//   return (
//     <div className="form-group" style={{ float: "left", width: "50%" }}>
//       <label>Categories</label>
//       <div
//         className="row"
//         style={{
//           display: "flex",
//           flexWrap: "wrap",
//           justifyContent: "space-between",
//         }}
//       >
//         {categories.map((category, index) => (
//           <div key={index} className="col-md-6 mb-3">
//             <div
//               className={
//                 "category btn btn-outline-primary btn-lg" +
//                 (selectedCategories.includes(category[1]) ? " selected" : "")
//               }
//               onClick={() => toggleCategory(category[1])}
//               style={{
//                 fontSize: "10px",
//                 padding: "5px 10px",
//                 marginBottom: "5px",
//                 width: "100px",
//               }}
//             >
//               {category[1]}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default CategorySelect;

import React, { useState } from "react";

function CategorySelect() {
  // Define state to manage the list of items and their checked state
  const [items, setItems] = useState([
    { id: 1, name: "Clothing", checked: false },
    { id: 2, name: "Sports", checked: false },
    { id: 3, name: "Electronics", checked: false },
    { id: 4, name: "Home Goods", checked: false },
    { id: 5, name: "Office Supplies", checked: false },
    { id: 6, name: "Music", checked: false },
    { id: 7, name: "Entertainment", checked: false },
  ]);

  // Function to handle checkbox change
  const handleCheckboxChange = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  return (
    <div>
      <h2 id="price-select-header">Shop by Category</h2>
      {items.map((item) => (
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
