import React, {useState} from "react";
import { Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Col, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { required, maxLength, minLength } from "./ContactComponent";
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const CommentForm = ({ postComment, dishId }) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSubmit = (values) => {
    postComment(dishId, values.rating, values.author, values.comment)
  }

  return(
    <div className="col-12">
      <Button outline onClick={toggleModal} className="mt-3 mb-3 comment">
        Post Your Comment
      </Button>
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => handleSubmit(values)}>
            <Row className="form-group">
              <Label htmlFor="rating" md={12}>Rating
              </Label>
              <Col>
                    <Control.select model=".rating" name="rating"
                        className="form-control">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Control.select>
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="author" md={12}>Your Name</Label>
                <Col>
                    <Control.text model=".author" id="author" name="author"
                        placeholder="Your Name"
                        className="form-control"
                        validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}  />
                    <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                        required: 'Required. ',
                        minLength: 'Must be greater than 2 characters',
                        maxLength: 'Must be 15 characters or less'
                    }}
                    />
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="comment" md={12}>Your Comment</Label>
                <Col>
                    <Control.textarea model=".comment" 
                    id="comment" 
                    name="comment"
                    rows="6"
                    className="form-control" />
                </Col>
            </Row>
            <Row className="form-group">
              <Col>
                <Button type="submit" color="primary">
                Submit
                </Button>
              </Col>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
    </div>
  )
}
export const imageLink = (image) => {
  return image.replace('https://my-json-server.typicode.com/hnkhanh/single-page-app-db/','');
}
const RenderDish = (dish) => {
  return (
    <FadeTransform in transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)'}}>
      <Card>
        <CardImg top src={imageLink(dish.image)} alt={dish.name} />
        <CardBody>
          <CardTitle className="font-weight-bold">$ {dish.price}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
};

const RenderComments = ({comments}) => {
  if (comments != null) {
    let options = { year: "numeric", month: "short", day: "2-digit" };
    return (
      <div> 
        <Stagger in style={{minHeight: '392px'}}>
        {comments.map(comment => (
          <Fade in>
          <ul key={comment.id} className="list-unstyled">
            <li className="mb-2">{comment.comment}</li>
            <li>
              -- {comment.author}
              {", "}
              {new Date(comment.date).toLocaleDateString("en-US", options)}
            </li>
          </ul>
          </Fade>
        ))}
        </Stagger>
      </div>
    );
  } 
  else return <div />;
};

const Pagination = ({commentsPerPage, totalComments, onPageChange}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
    <ul className='pagination'>
      {pageNumbers.map(number => (
        <li key={number} 
        className='page-item' 
       >
           <a onClick={onPageChange} id={number} className='page-link'>
            {number}
          </a>
        </li>
      ))}
    </ul>
  </nav>
  )
}

const DishDetail = ({ dish, comments, postComment, isLoading, errMess }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const onPageChange = (e) => {
    setCurrentPage(Number(e.target.id))
    }

  if (isLoading) {
    return(
      <div className="container">
          <div className="row">            
              <Loading />
          </div>
      </div>
    );
  }
  else if (errMess) {
    return(
      <div className="container">
          <div className="row">            
              <h4>{errMess}</h4>
          </div>
      </div>
    );
  }
  else if (dish != null) {
    return(
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
          </div>                
        </div>
        <div className="row">
          <div className="col-11 col-md-5 m-3 ">
          {RenderDish(dish)}
          </div>
          <div className="col-11 col-md-5 mt-3 ml-3">
            <h4>Comments</h4>
            {<RenderComments
                comments={currentComments}
              />}
                {commentsPerPage < comments.length && <Pagination 
                commentsPerPage={commentsPerPage} 
                totalComments={comments.length}
                onPageChange={onPageChange}
              />}
              {<CommentForm 
                dishId={dish.id} 
                postComment={postComment}/>
              }
          </div>
        </div>
      </div>
    )
  }
};

export default DishDetail;
