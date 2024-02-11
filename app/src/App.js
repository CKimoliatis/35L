import Login from "./login_signup/Login.js";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Signup from "./login_signup/SignUp.js";
import Landing from "./landing/Landing.js";

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
