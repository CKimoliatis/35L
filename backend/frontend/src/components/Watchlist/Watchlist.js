import React, { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar";
import PriceSelect from "../PriceSelect/PriceSelect.js";
import CategorySelect from "../CategorySelect/CategorySelect.js";
import Post from "../Posts/Post.js";
import Pagination from "../Pagination/Pagination.js";
import SearchBar from "../SearchBar/SearchBar.js";
import "../CategorySelect/CategorySelect.css";
import "../PriceSelect/PriceSelect.css";
import "../Posts/Post.css";
import "../Landing/Landing.css";
import "../Pagination/Pagination.css";
import logo from "../../objects/YooniLogo.png";
import axios from "axios";

const Landing = () => {
  const [userData, setUserData] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData && !userData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userData) {
          // Check if userData is not null
          const result = await getWatchlist(userData);
          console.log(result);
          setItems(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [userData]); // Add userData as dependency

  const getWatchlist = async (userData) => {
    try {
      const response = await axios.get("api/fetch-item-from-watchlist/", {
        params: {
          user_id: userData.id,
        },
      });
      return response.data; // Returning the response data
    } catch (error) {
      throw new Error(error); // Rethrowing the caught error
    }
  };

  function printPosts(items) {
    const posts = [];
    items.forEach((item) => {
      // Assuming 'logo' is defined somewhere else
      posts.push(
        <Post
          key={item.id}
          item_id={item.id}
          image={logo}
          price={item.price}
          title={item.title}
          description={item.description}
        />
      );
    });
    return posts;
  }
  return (
    <div>
      <NavigationBar/>
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
