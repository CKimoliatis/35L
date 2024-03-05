import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [userData, setUserData] = useState(null);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Retrieve userData from local storage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      // Parse the storedUserData if it exists
      setUserData(JSON.parse(storedUserData));
    }
    console.log(userData);
  }, []);

  const updateSearchQuery = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    console.log(searchQuery);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/parse-item");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  
  function printPosts(items) {
    const posts = [];
    items.forEach((item) => {
      // Assuming 'logo' is defined somewhere else
      posts.push(
        <Post
          key={item.id}
          id={item.id}
          image={logo}
          price={item.price}
          title={item.title}
          description={item.description}
        />
      );
    });
    // onClick={() => handleClickPost(item.id, logo, item.price, item.title, item.description)}
    return posts.reverse();
  }
  return (
    <div>
      <NavigationBar updateSearchQuery={updateSearchQuery} />
      <br></br>
      <br></br>
      <br></br>
      <div id="main-container">
        <div id="categories-container">
          <div id="price-select-container">
            <PriceSelect></PriceSelect>
          </div>
          <div id="category-select-container">
            <CategorySelect></CategorySelect>
          </div>
        </div>
        <div id="right-side-container">
          <div id="posts-container">{printPosts(items)}</div>
          <div id="pagination-container">
            <Pagination pageNumber={1}></Pagination>
            <Pagination pageNumber={2}></Pagination>
            <Pagination pageNumber={3}></Pagination>
            <Pagination pageNumber={4}></Pagination>
            <Pagination pageNumber={5}></Pagination>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
