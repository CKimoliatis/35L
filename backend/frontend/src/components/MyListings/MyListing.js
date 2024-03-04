import React, { useState, useEffect } from "react";
import "../../CSS/styles.css";
import YooniLogo from "../../objects/YooniLogo.png";
import NavigationBar from "../NavigationBar";
//import UploadButton from "./UploadButton";
import MyListingPost from "./MyListingPost";
import EditMyListing from "./EditMyListing";
import Login from "../Login";
//import { Card, Button, Container, Col, Row} from "react-bootstrap";
import axios from 'axios'


const IsEditing=() => {
    const [editing, setEditing] = useState(false);
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    const handleEditClick = () => {
        setEditing(true);
    };
    const handleSaveClick = () => {
        setEditing(false);
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);    //set the title to the target value when typed in
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);   //set the description to the target value when typed in
    };


    useEffect(() => {
        console.log(searchQuery);
        const userDataString = localStorage.getItem("userData")
        const userData = JSON.parse(userDataString); // Parse the string into a JavaScript object
        const firstItem = userData[Object.keys(userData)[0]]; // Access the first item of the object

        console.log('First item', firstItem)
        const fetchData = async () => {
          try {
            // Make a GET request to your backend endpoint
            const response = await axios.get("/api/myitems", {
              params: { searchQuery: firstItem } // Pass searchQuery value directly
            });
            setItems(response.data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
        console.log(searchQuery)
      }, [searchQuery]);
    
    

    // useEffect(() => {
    //     axios.get('http://127.0.0.1:8000/api/myitems')
    //         .then(response => {
    //             setItems(response.data);
    //             console.log(response.data);
    //         })
    //         .catch(error => {
    //             console.error('Error fetching data:', error);
    //         });
    // }, []);

    function printPosts(items) {
        const posts = [];
        items.forEach(item => {
          // Assuming 'logo' is defined somewhere else
          posts.push(<MyListingPost key={item.id} image = {YooniLogo} price={item.price} title={item.title} description={item.description} category={item.category} onEditClick={handleEditClick}/>);
        });
        return posts;
    }

    function printEdit(){
        <EditMyListing onSaveClick={handleSaveClick}/>
    }
    

    return(
        <>
        {editing ? (
            <>
            {printEdit()}
            </>
            
        ) :(
            <>
            {printPosts(items)}
            </>
        )
        }
        </>
    );
};

const MyListing = () => {

    return(
        <>
            <NavigationBar />
            <br />
            <br />
            <br />     
            <IsEditing />
                      
        </>
    );

};

export default MyListing;

