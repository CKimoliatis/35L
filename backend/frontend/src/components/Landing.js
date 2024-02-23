import React, { useState, useEffect  } from "react";
import NavigationBar from "./NavigationBar";

const Landing = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Retrieve userData from local storage
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      // Parse the storedUserData if it exists
      setUserData(JSON.parse(storedUserData));
    }
    console.log(userData);
  }, []);
  
  return (
    <div>
      <NavigationBar />
      <br></br>
      <br></br>
      <br></br>
      <p>This is the landing page</p>
    </div>
  );
};

export default Landing;
