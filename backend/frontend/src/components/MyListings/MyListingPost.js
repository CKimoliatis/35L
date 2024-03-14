import React from "react";
import "../../CSS/styles.css";
import "./MyListings.css";
import { Card, Button, Container, Col, Row} from "react-bootstrap";
import EditMyListing from "./EditMyListing";



function MyListingPost({image, price, title, description, category, item_id, selling_price, sold_flag, show_sold, is_editing, onEditClick}) {

    
    return (
        <>
        {!is_editing && ((!show_sold && !sold_flag) || (show_sold && sold_flag)) && (
        <Container className="listing-container">  {/*style={{maxWidth: '66rem', marginInlineEnd: '25rem', marginLeft:'2 0%'}}*/}
            <Row>
                <Col style={{maxWidth:'16rem'}}>   
                    <Card style={{ width: '15rem', padding: '10px'}}>
                        <Card.Img className="listing-img" src={image} />
                    </Card>
                </Col>
                <Col>
                    <div className="listing-details">
                        <div className="listing-title">{title}</div>
                        <div className="listing-category">Category: {category}</div>
                        {!sold_flag && (
                            <div className="listing-price">${price}</div>
                        )}
                        {sold_flag && (
                            <>
                            <div className="listing-price">Listed Price: ${price}</div>
                            <div className="listing-price">Sold Price: ${selling_price}</div>
                            </>
                        )}
                        <div className="listing-description">{description}</div>
                    </div>
                </Col>
            </Row>
            {!sold_flag && (
            <div className="d-flex justify-content-end">
                <Button variant="outline-primary" 
                style={{ marginRight: '20px', marginBottom:'5px' }} 
                onClick={onEditClick}>
                    Edit
                </Button>
            </div>
            )}
            </Container>
            )}
            {is_editing && (
                <EditMyListing
                    image_old={image}
                    price_old={price}
                    title_old={title}
                    description_old={description}
                    category_old={category}
                    item_id={item_id}
                />
            )}

        </>
    );
}

export default MyListingPost;