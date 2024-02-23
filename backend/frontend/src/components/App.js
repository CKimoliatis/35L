import Login from "./Login";
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Signup from "./SignUp";
import Landing from "./Landing.js";
import PostItem from "./PostItem";
import Inventory from "./Inventory";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Route index element={<Login />}></Route>
          <Route path="signup" element={<Signup />} />
          <Route path="landing" element={<Landing />} />
          <Route path="postItem" element={<PostItem />} />
          <Route path="inventory" element={<Inventory />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;