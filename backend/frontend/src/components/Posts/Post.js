import React from "react"


function Post({image, description}) {
    return (
        <div className='post float-on-hover'>
            <img src={image} alt={description} className="post-images"></img>
            <p className='description-text'>post description</p>
        </div>
    );
}

export default Post;