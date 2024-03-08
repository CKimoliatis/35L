import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import PriceSelect from "./PriceSelect/PriceSelect.js";
import CategorySelect from "./CategorySelect/CategorySelect.js";
import Post from "./Posts/Post.js";
import Popup from "./Popup.js";
import Pagination from "./Pagination/Pagination.js";
import SearchBar from "./SearchBar/SearchBar.js";
import "./CategorySelect/CategorySelect.css";
import "./PriceSelect/PriceSelect.css";
import "./Posts/Post.css";
import "./Landing/Landing.css";
import "./Pagination/Pagination.css";
import logo from "../../static/frontend/images/YooniLogo.png";
import axios from "axios";

const Landing = () => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [userData,setUserData] = useState(null);
  let minPrice = null;
  let maxPrice = null;
  const [selectedPriceRange, setSelectedPriceRange] = useState([null, null]);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  
  useEffect(() => {
    // Retrieve userData from local storage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      // Parse the storedUserData if it exists
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get-item-price-range");
        minPrice = response.data.minPrice;
        maxPrice = response.data.maxPrice;
        console.log(minPrice,maxPrice);
        setSelectedPriceRange([response.data.minPrice, response.data.maxPrice]);
      } catch (error) {
        console.error("Error fetching min-max prices:", error);
      }
    };

    fetchData();
  }, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      if (userData) {
        const response = await axios.get("/api/parse-item", {
          params: {
           searchQuery,
           minPrice: selectedPriceRange[0],
           maxPrice: selectedPriceRange[1],
           userId: userData.id,
          },
        });


        setItems(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, [searchQuery, selectedPriceRange]);


  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const handlePriceChange = (newPriceRange) => {
      // Perform any actions you want with the updated price range
      setSelectedPriceRange(newPriceRange);
  };

  function printPosts(items) {
    return items.map((item) => (
      <Post
        key={item.id}
        id={item.id}
        image={logo}
        price={item.price}
        title={item.title}
        description={item.description}
      />
    ));
  }

  return (
    <div>
      <NavigationBar updateSearchQuery={updateSearchQuery} />
      <br />
      <br />
      <br />
      <div id="main-container">
        <div id="categories-container">
          <h3>Filter by Price</h3>
          <h6>
            Current Price Range: ${selectedPriceRange[0]} - $
            {selectedPriceRange[1]}
          </h6>
          <div id="price-select-container">
            <PriceSelect
              minPrice={minPrice}
              maxPrice={maxPrice}
              onPriceChange={handlePriceChange}
            />
          </div>
          <div id="category-select-container">
            <CategorySelect />
          </div>
        </div>
        <div id="right-side-container">
          <div id="posts-container">{printPosts(items)}</div>
          <div id="pagination-container">
            {[1, 2, 3, 4, 5].map((pageNumber) => (
              <Pagination key={pageNumber} pageNumber={pageNumber} />
            ))}
          </div>
        </div>
      </div>
      <Popup show={showLoginPopup} />
    </div>
  );
};

export default Landing;
