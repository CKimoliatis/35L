import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import "./UploadButton";
import "../CSS/styles.css";
import UploadButton from "./UploadButton";

const PostItem = () => {
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
            <label htmlFor="category">Category</label>
            <select id="category">
              <option disabled selected>
                Select a category
              </option>
              <option>Clothing</option>
              <option>Sports</option>
              <option>Furniture</option>
              <option>Other</option>
            </select>
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
