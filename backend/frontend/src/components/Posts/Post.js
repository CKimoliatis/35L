import React from "react"
import { useNavigate } from "react-router-dom";


const Post = ({image, price, title, description, id}) => {

    const navigate = useNavigate();

    const handleClick = () => {
        const data = { itemId: id, itemImage: image, itemPrice: price, itemTitle: title, itemDescription: description };
        const encodedData = encodeURIComponent(JSON.stringify(data));
        navigate(`/post/${encodedData}`);
      };

    return (
        <div onClick={handleClick} className='post float-on-hover'>
            <img src={image} alt={title} className="post-images"></img>
            <h2>${price}</h2>
            <p className='description-text'>{title}</p>
        </div>
    );
}

export default Post;