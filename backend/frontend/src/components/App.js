import Login from "./Login";
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Signup from "./SignUp";
import Landing from "./Landing.js";
import PostItem from "./PostItem";
import Inventory from "./Inventory";
import MyListing from "./MyListing";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemPage from "./ItemPage/ItemPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Route index element={<Login />}></Route>  {/* has to be changed later */}
          <Route path="signup" element={<Signup />} />
          <Route path="landing" element={<Landing />} />
          <Route path="postItem" element={<PostItem />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="/post/:id" element={<ItemPage/>} />
          <Route path="my-listings" element={<MyListing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;