import Login from "./Login";
import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Signup from "./SignUp";
import Landing from "./Landing.js";
import PostItem from "./PostItem/PostItem.js";
import Inventory from "./Inventory";
import MyListing from "./MyListings/MyListing.js";
import Chat from "./Chat/Chat.js";
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemPage from "./ItemPage/ItemPage";
import IntermediaryPage from "./Intermediary.js";
import ChatList from "./ChatList.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Login />}></Route>{" "}
          {/* has to be changed later */}
          <Route path="signup" element={<Signup />} />
          <Route path="landing" element={<Landing />} />
          <Route path="postItem" element={<PostItem />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="intermediary" element={<IntermediaryPage />} />
          <Route path="/post/:id" element={<ItemPage />} />
          <Route path="my-listings" element={<MyListing />} />
          <Route path="chat/:chatId" element={<Chat/>} />
          <Route path="chat" element={<ChatList />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
