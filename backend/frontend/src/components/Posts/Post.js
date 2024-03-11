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
    const data = {
      itemId: item_id,
      itemImage: image,
      itemPrice: price,
      itemTitle: title,
      itemDescription: description,
    };
    const encodedData = encodeURIComponent(JSON.stringify(data));
    navigate(`/post/${encodedData}`);
  };

  const updateInWatchlist = (val) => {
    setInWatchlist(val);
  };

  const handleStarClick = (e) => {
    e.stopPropagation(); // Prevents the click event from bubbling to the parent div
    setShowModal(true);
  };

  return (
    <div>
      <div onClick={handleClick} className="post float-on-hover">
        <div className="post-container">
            <div className="post-images-container"><img src={image} alt={title} className="post-images" /></div>
            <h4 className="post-text">${price}</h4>
            <p className="post-text">{title}</p>
            <div
            className="star-modal"
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
      </div>
      <StarModal
        show={showModal}
        onHide={() => setShowModal(false)}
        itemTitle={title}
        updateInWatchlist={updateInWatchlist}
        inWatchlist={inWatchlist}
        item_id={item_id}
      />
    </div>
  );
};

export default Post;
