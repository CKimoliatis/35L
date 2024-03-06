import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import starFilled from "../../objects/starFilled.png";
import starUnfilled from "../../objects/starUnfilled.png";
import StarModal from "./StarModal";
import axios from "axios";

const Post = ({ item_id, image, price, title, description }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData && !userData) {
      setUserData(JSON.parse(storedUserData));
    }

    const fetchData = async () => {
      try {
        if (userData) {
          // Check if userData is not null
          const result = await getInWatchlist(userData);
          console.log(result.in_watchlist);
          setInWatchlist(result.in_watchlist);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userData]); // Add userData as dependency

  const getInWatchlist = async (userData) => {
    try {
      const response = await axios.get("api/fetch-in-watchlist", {
        params: {
          user_id: userData.id,
          item_id: item_id,
        },
      });
      return response.data; // Returning the response data
    } catch (error) {
      throw new Error(error); // Rethrowing the caught error
    }
  };

  const handleClick = () => {
    navigate(
      `/post/${item_id}?image=${image}&price=${price}&title=${title}&description=${description}`
    );
  };

  const updateInWatchlist = (val) => {
    setInWatchlist(val);
  };

  const handleStarClick = (e) => {
    e.stopPropagation(); // Prevents the click event from bubbling to the parent div
    setShowModal(true);
    console.log("Star clicked for post:", item_id);
  };

  return (
    <div>
      <div onClick={handleClick} className="post float-on-hover">
        <img src={image} alt={title} className="post-images" />
        <h2>${price}</h2>
        <p className="description-text">{title}</p>
        <div
          style={{ position: "absolute", top: 0, right: 0 }}
          onClick={handleStarClick}
        >
          {inWatchlist ? (
            <img
              src={starFilled}
              alt="Star"
              style={{ width: 30, height: 30 }}
            />
          ) : (
            <img
              src={starUnfilled}
              alt="Star"
              style={{ width: 30, height: 30 }}
            />
          )}
        </div>
      </div>
      <StarModal
        show={showModal}
        onHide={() => setShowModal(false)}
        itemTitle={title}
        updateInWatchlist={updateInWatchlist}
        inWatchlist={inWatchlist}
      />
    </div>
  );
};

export default Post;
