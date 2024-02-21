import Login from "./Login";
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Signup from "./SignUp";
import Landing from "./Landing";
import PostItem from "./PostItem";
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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

// const handleSignup = () => {
//   const requestOptions = {
//     method: 'POST',
//     headers: {'Content-Type' : 'application/json'},
//     body: JSON.stringify({
//       first_name: firstName,
//       last_name: lastName,
//       email: email,
//       password: password,
//       school: school,
//       username: username
//     })
//   };
//   fetch("/api/create-user", requestOptions).then((response)=>
//     response.json()
//   ).then((data)=>console.log(data));
// }; 
