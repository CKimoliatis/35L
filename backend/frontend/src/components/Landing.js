import React, {useState} from 'react'
import NavigationBar from './NavigationBar'
import PriceSelect from './PriceSelect/PriceSelect.js'
import CategorySelect from './CategorySelect/CategorySelect.js'
import Post from './Posts/Post.js'
import Pagination from './Pagination/Pagination.js'
import SearchBar from './SearchBar/SearchBar.js'
import './CategorySelect/CategorySelect.css'
import './PriceSelect/PriceSelect.css'
import './Posts/Post.css'
import './Landing/Landing.css'
import './Pagination/Pagination.css'
import logo from '../../static/frontend/images/YooniLogo.png'

const Landing = () => {

    function printPosts(numPosts) {
        const posts = [];
        for(let i = 0; i < numPosts; i++) {posts.push(<Post image={logo} description="logo"></Post>)}
        return posts;
    }
    return (
    <div>
        <NavigationBar />
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
                <div id="posts-container">
                    {printPosts(20)};
                </div>
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
}

export default Landing