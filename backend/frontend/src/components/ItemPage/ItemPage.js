import React from 'react'
import NavigationBar from '../NavigationBar'
import { useParams, useLocation } from 'react-router-dom';
import './ItemPage.css'

const ItemPage = () => {
    // {image, price, title, description}
    const { id } = useParams();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    
    // Extract values from query parameters
    const image = query.get('image');
    const price = query.get('price');
    const title = query.get('title');
    const description = query.get('description');

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

export default ItemPage