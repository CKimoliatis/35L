import Login from "./Login";
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Signup from "./SignUp";
import Landing from "./Landing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/'>
          <Route index element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="landing" element={<Landing />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
