import React, { useState, useEffect } from "react";
import NavigationBar from "./NavigationBar";
import PriceSelect from "./PriceSelect/PriceSelect.js";
import CategorySelect from "./CategorySelect/CategorySelect.js";
import Post from "./Posts/Post.js";
import Pagination from "./Pagination/Pagination.js";
import "./CategorySelect/CategorySelect.css";
import "./PriceSelect/PriceSelect.css";
import "./Posts/Post.css";
import "./Landing/Landing.css";
import "./Pagination/Pagination.css";
import logo from "../../static/frontend/images/YooniLogo.png";
import axios from "axios";

const Landing = () => {
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState(null);

  const userDataString = localStorage.getItem("userData");
  const userData = JSON.parse(userDataString); // Parse the string into a JavaScript object
  var userData_id = userData.id.toString();

  const updateCat = (val) => {
    setCat(val);
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (fil) => {
    setFilter(fil);
  };

  const handleReset = () => {
    setFilter(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request to your backend endpoint
        const response = await axios.get("/api/parse-item", {
          params: { searchQuery }, // Optional: Pass search query as a parameter
        });
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  function printPosts(items) {
    const posts = [];
    items.forEach((item) => {
      // Assuming 'logo' is defined somewhere else
      if (item.image) {
        var itemImage = item.image;
      } else {
        var itemImage = logo;
      }
      if (
        item.user_id != userData_id &&
        !item.sold_flag &&
        (cat.length === 0 || cat.includes(item.category)) &&
        (!filter ||
          ((!filter.minPrice || item.price >= filter.minPrice) &&
            (!filter.maxPrice || item.price <= filter.maxPrice)))
      ) {
        posts.push(
          <Post
            key={item.id}
            item_id={item.id}
            user_id={item.user_id}
            image={itemImage}
            price={item.price}
            title={item.title}
            description={item.description}
          />
        );
      }
    });
    return posts.reverse();
  }

  return (
    <div>
      <NavigationBar updateSearchQuery={updateSearchQuery} showSearch={true} />
      <br></br>
      <br></br>
      <br></br>
      <div id="main-container">
        {/* {printFilters()} */}
        <div id="categories-container">
          <div id="price-select-container">
            <PriceSelect
              handleFilter={handleFilter}
              handleReset={handleReset}
            />
          </div>
          <div id="category-select-container">
            <CategorySelect updateCat={updateCat} />
          </div>
        </div>
        <div id="right-side-container">
          <div id="posts-container">{printPosts(items)}</div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
