import React from 'react'
import NavigationBar from '../NavigationBar'
import { useState, useParams, useLocation } from 'react-router-dom';
import './ItemPage.css'
import axios from 'axios';

const ItemPage = () => {
    // {image, price, title, description}
    const { encodedData } = useParams();
    const decodedData = JSON.parse(decodeURIComponent(encodedData));

    // Now 'decodedData' contains your original object
    console.log(decodedData);

    const id = decodedData['itemId']
    const image = decodedData['itemImage']
    const price = decodedData['itemPrice']
    const title = decodedData['itemTitle']
    const description = decodedData['itemDescription']

    return (
    <div id='item-page-container'>
        <NavigationBar />
        <br></br>
        <br></br>
        <br></br>
        <div>
            <div id='item-page-image-container'><img id='item-page-image' src={image} alt={title}></img></div>
            <h2>{title}</h2>
            <h3>${price}</h3>
            <p>{description}</p>
        </div>
    </div> 

    
    );
}

export default ItemPage;