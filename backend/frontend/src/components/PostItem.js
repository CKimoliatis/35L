import React, { useState } from "react";
import NavigationBar from "./NavigationBar";
import UploadButton from "./UploadButton";
import ConfirmationModal from "./ConfirmationModal";
import "../CSS/styles.css";

const PostItem = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // For the uploaded image
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  //get the user ID to link post to user
  const userDataString = localStorage.getItem("userData"); 
    const userData = JSON.parse(userDataString); 

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
    formData.append('user_id', userData.id);
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
          console.log('Item posted successfully');
        // Clear the form by resetting state variables
          setTitle('');
          setPrice('');
          setCategory('');
          setDescription('');
          setImage(null);
          setErrorMessage('');
          setShowConfirmation(true);
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
      <br /><br /><br /><br /><br />
      <div className="form-container">
        <h2>Post a New Item</h2>
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
              <option value="Electronics">Electronics</option>
              <option value="Home Goods">Home Goods</option>
              <option value="Office Supplies">Office Supplies</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Music">Music</option>
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
          <button type="submit" className="btn btn-outline-primary">Submit</button>
          {errorMessage && <div className="error-message">Error: {errorMessage}</div>}
        </form>
      </div>
      <ConfirmationModal
        show={showConfirmation}
        onHide={() => setShowConfirmation(false)}
        itemTitle={title}
        />
    </>
  );
};

export default PostItem;