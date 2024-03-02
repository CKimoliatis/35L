import React from "react"
import { useNavigate } from "react-router-dom";


const Post = ({id, image, price, title, description}) => {

    const navigate = useNavigate();

    const handleClick = () =>{
        navigate(`/post/${id}?image=${image}&price=${price}&title=${title}&description=${description}`);
    }
    return (
        <div onClick={handleClick} className='post float-on-hover'>
            <img src={image} alt={title} className="post-images"></img>
            <h2>${price}</h2>
            <p className='description-text'>{title}</p>
        </div>
    );
}

export default Post;