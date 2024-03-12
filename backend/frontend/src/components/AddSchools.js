import React, { useState, useEffect } from "react";
import axios from "axios";

const AddSchools = () => {
  const [schools, setSchools] = useState([]);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const uploadSchools = async () => {
        const urls = [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/UCLA_Bruins_logo.svg/320px-UCLA_Bruins_logo.svg.png",
          "https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/University_of_Southern_California_logo.svg/320px-University_of_Southern_California_logo.svg.png",
          "https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Caltech_Seal.svg/320px-Caltech_Seal.svg.png",
          "https://upload.wikimedia.org/wikipedia/en/thumb/b/b7/Stanford_University_seal_2003.svg/320px-Stanford_University_seal_2003.svg.png",
          "https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Seal_of_University_of_California%2C_Berkeley.svg/320px-Seal_of_University_of_California%2C_Berkeley.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Seal_of_University_of_California%2C_Santa_Barbara.svg/320px-Seal_of_University_of_California%2C_Santa_Barbara.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Seal_of_University_of_California%2C_San_Diego.svg/320px-Seal_of_University_of_California%2C_San_Diego.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Seal_of_University_of_California%2C_Irvine.svg/320px-Seal_of_University_of_California%2C_Irvine.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Seal_of_University_of_California%2C_Davis.svg/320px-Seal_of_University_of_California%2C_Davis.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Seal_of_University_of_California%2C_Riverside.svg/320px-Seal_of_University_of_California%2C_Riverside.svg.png",
        ];

        try {
          const schoolsData = await Promise.all(
            urls.map(async (url) => {
              const response = await fetch(url);
              const school_logo = await response.blob();
              return { school_name: getNameFromUrl(url), school_logo };
            })
          );

          schoolsData.forEach((school) => {
            uploadSchool(school);
          });
        } catch (error) {
          setError("Failed to upload schools. Please try again.");
        }
      };

      uploadSchools();
    }
  }, [isActive]);

  const getNameFromUrl = (url) => {
    const parts = url.split("/");
    const name = parts[parts.length - 1].split(".")[0];
    return name.replace(/_/g, " ");
  };

  const uploadSchool = async (school) => {
    const formData = new FormData();
    formData.append("name", school.name);
    formData.append("logo", school.blob);

    try {
      const response = await axios.post("/add-school", formData);
      console.log("School uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading school:", error);
    }
  };

  const handleActivate = () => {
    setIsActive(true);
  };

  return (
    <div>
      {error && <div>{error}</div>}
      <button onClick={handleActivate} disabled={isActive}>
        Activate
      </button>
      <h2>{isActive ? "Uploading Schools..." : "Inactive"}</h2>
    </div>
  );
};

export default AddSchools;
