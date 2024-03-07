import React, { useState,useEffect } from "react";
import NavigationBar from "../NavigationBar";
import UploadButton from "../UploadButton";
import ConfirmationModal from "../ConfirmationModal";
import "../../CSS/styles.css";
import axios from "axios";
import "./PostItem.css"

const PostItem = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // For the uploaded image
  const [errorMessage, setErrorMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
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
    if (!selectedCategories.length)
        errorMsg += "Categories are not selected. \n";
   // if (!category) errorMsg += 'Category is not selected. \n';
    if (!description) errorMsg += 'Description is blank. \n';

    if (errorMsg) {
      setErrorMessage(errorMsg);
      return;
    }

    const formData = new FormData();
    formData.append('user_id', userID);
    formData.append('title', title);
    formData.append('price', price);
    formData.append("category", selectedCategories.join(", "));
    formData.append('description', description);
    console.log(image);
    formData.append('image', image);

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
          setShowConfirmation(true);
              // Clear the form by resetting state variables
          setTitle('');
          setPrice('');
          setSelectedCategories([]);
          setDescription('');
          setImage(null);
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
      <br />
      <br />
      <br />
      <div className="form-container">
        <h2>Create a new listing</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a title..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="$"
            />
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
          {errorMessage && (
            <div className="error-message">Error: {errorMessage}</div>
          )}
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