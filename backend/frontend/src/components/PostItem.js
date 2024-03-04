import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import UploadButton from "./UploadButton";
import "../CSS/styles.css";

const PostItem = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // For the uploaded image
  const [errorMessage, setErrorMessage] = useState('');

  //get the user ID to link post to user
  const userDataString = localStorage.getItem("userData")
        const userData = JSON.parse(userDataString); // Parse the string into a JavaScript object
        const userID = userData[Object.keys(userData)[0]]; // Access the user ID

  // This function will be passed to UploadButton to update the image state
  const handleFileSelect = (file) => {
    setImage(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Validation
    let errorMsg = '';
    if (!title) errorMsg += 'Title is blank. \n';
    if (!price) errorMsg += 'Price is blank. \n';
    if (!category) errorMsg += 'Category is not selected. \n';
    if (!description) errorMsg += 'Description is blank. \n';
    if (!image) errorMsg += 'Image is not uploaded.';

    if (errorMsg) {
      setErrorMessage(errorMsg);
      return;
    }

    const formData = new FormData();
    formData.append('user_id', userID);
    formData.append('title', title);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', image); // Append the file

    // API request options
    const requestOptions = {
      method: 'POST',
      body: formData, 
    };

    // Perform the API request
    fetch('/api/create-item', requestOptions)
      .then((response) => {
        if (response.ok) {
          // Assuming you want to redirect or clear form here
          console.log('Item posted successfully');
          // Clear form or redirect
        } else {
          // Handle different kinds of errors
          setErrorMessage('An error occurred while posting the item.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('An error occurred while posting the item.');
      });
  };

  return (
    <>
      <NavigationBar />
      <br /><br /><br />
      <div className="form-container">
        <h2>Create a new listing</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a title..." />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input type="text" id="price" value={price} 
            onChange={(e) => setPrice(e.target.value)} placeholder="$" />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
              <option value="" disabled>Select a category</option>
              <option value="Clothing">Clothing</option>
              <option value="Sports">Sports</option>
              <option value="Furniture">Furniture</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
            id="description" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            placeholder="Describe your item"
            ></textarea>
          </div>
          <div>
            <label htmlFor="images">Upload pictures</label>
            <UploadButton onFileSelect={handleFileSelect} />
          </div>
          <button type="submit">Submit</button>
          {errorMessage && <div className="error-message">Error: {errorMessage}</div>}
        </form>
      </div>
    </>
  );
};

export default PostItem;
