import React from "react"


function Post({image, price, title, description}) {
    return (
        <div className='post float-on-hover'>
            <img src={image} alt={description} className="post-images"></img>
            <h2>${price}</h2>
            <p className='description-text'>{title}</p>
        </div>
    );
}

export default Post;