import React, { useState, useEffect } from "react";
import NavigationBar from "../NavigationBar";
import UploadButton from "../UploadButton";
import "../../CSS/styles.css";
import axios from "axios";
import "./PostItem.css";

const PostItem = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories");
      const categoriesData = response.data;
      const categoryNames = categoriesData.map(
        (category) => [category.id,category.category_name]
      );
      setCategories(categoryNames); 
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const toggleCategory = (categoryName) => {
    if (selectedCategories.includes(categoryName)) {
      setSelectedCategories(
        selectedCategories.filter((c) => c !== categoryName)
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryName]);
    }
  };

  return (
    <>
      <NavigationBar />
      <br />
      <br />
      <br />
      <div className="form-container">
        <h2>Create a new listing</h2>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" placeholder="Add a title..." />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="text" id="price" placeholder="$" />
          </div>
          <div className="form-group">
            <label>Categories</label>
            <div className="row">
              {categories.map((category, index) => (
                <div key={index} className="col-md-3 mb-3">
                  <div
                    className={
                      "category btn btn-outline-primary btn-lg" +
                      (selectedCategories.includes(category[1])
                        ? " selected"
                        : "")
                    }
                    onClick={() => toggleCategory(category[1])}
                    style={{ fontSize: "12px" }}
                  >
                    {category[1]}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Describe your item"
            ></textarea>
          </div>
          <div className="forum-group">
            <label htmlFor="images">Upload pictures</label>
            <br />
            <UploadButton />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default PostItem;
