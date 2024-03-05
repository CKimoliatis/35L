import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import starFilled from "../../objects/starFilled.png";
import starUnfilled from "../../objects/starUnfilled.png";
import StarModal from "./StarModal";

const Post = ({ id, image, price, title, description }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);

  const handleClick = () => {
    navigate(
      `/post/${id}?image=${image}&price=${price}&title=${title}&description=${description}`
    );
  };
  const handleStarClick = (e) => {
    e.stopPropagation(); // Prevents the click event from bubbling to the parent div
    setShowModal(true);
    setInWatchlist(true);
    console.log("Star clicked for post:", id);
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
      />
    </div>
  );
};

export default Post;
