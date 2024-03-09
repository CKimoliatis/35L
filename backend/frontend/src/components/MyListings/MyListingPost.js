import React from "react"
import "../../CSS/styles.css";
import { Card, Button, Container, Col, Row} from "react-bootstrap";
import YooniLogo from "../../objects/YooniLogo.png";
import EditMyListing from "./EditMyListing";



function MyListingPost({image, price, title, description, category, item_id, is_editing, onEditClick}) {
    

    return (
        <>
        {!is_editing ? (
        <Container className="listing-container" style={{maxWidth: '66rem', marginInlineEnd: '25rem', marginLeft:'2 0%'}}>
            <Row>
                <Col style={{maxWidth:'16rem'}}>   
                    <Card style={{ width: '15rem', padding: '10px'}}>
                        <Card.Img className="listing-img" src={YooniLogo} />
                    </Card>
                </Col>
                <Col>
                    <Row>
                        <div className="form-group input" style={{width:'24rem'}}>
                            <div id="title">{title}</div>
                        </div>
                        <div className="form-group input" style={{width:'24rem'}}>
                            <div id="price" >${price}</div>
                        </div>
                    </Row>
                
                    <div className="form-group select">
                        <div id="selectedCategory">{category}</div>
                    </div>
                        <div className="form-group textarea">
                        <div className="description">{description}</div>
                    </div>
                </Col>
            </Row>
            <div className="d-flex justify-content-end">
                <Button variant="outline-primary" 
                style={{ marginRight: '20px', marginBottom:'5px' }} 
                onClick={onEditClick}>
                    Edit
                </Button>
            </div>

        </Container>
        ) : (
            <EditMyListing 
                    image_old={YooniLogo}
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