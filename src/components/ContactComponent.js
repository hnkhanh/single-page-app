import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button, Row, Col, Label } from 'reactstrap';
import { Control, Form, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';

export const maxLength = len => val => !val || val.length <= len;
export const required = val => val && val.length;
export const minLength = len => val => val && val.length >= len;    
const isNumber = val => !isNaN(Number(val));
const validEmail = val => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

const Contact = ({ postFeedback, resetFeedbackForm}) => {
    
  const handleSubmit = (values) => {
    postFeedback(values.firstname, values.lastname, values.telnum, values.email, values.agree, values.contactType, values.message)
    resetFeedbackForm();
    }

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
            <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
            <BreadcrumbItem active>Contact Us</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
            <h3>Contact Us</h3>
            <hr />
        </div>                
      </div>
      <div className="row row-content">
          <div className="col-12 mb-3">
          <h3>Location Information</h3>
          </div>
          <div className="col-12 col-sm-7 mb-3">
              <h5>Map of our Location</h5>
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.1820296972073!2d114.2827867149549!3d22.308954485319077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404038194bfecc3%3A0x690e926322ef3ce4!2s121%20Clear%20Water%20Bay%20Rd%2C%20Clear%20Water%20Bay%2C%20Hong%20Kong!5e0!3m2!1sen!2s!4v1614161505352!5m2!1sen!2s" width= {'100%'} height={300} style={{border: 0}} allowFullScreen loading="lazy" />
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
                <h5>Our Address</h5>
                <address>
                121, Clear Water Bay Road<br />
                Clear Water Bay, Kowloon<br />
                HONG KONG<br />
                <i className="fa fa-phone"></i>: +852 1234 5678<br />
                <i className="fa fa-fax"></i>: +852 8765 4321<br />
                <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                </address>
                <div className="col-12 mt-3 p-0">
                <div className="btn-group" role="group">
                  <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                  <a role="button" className="btn btn-info" href="https://skype.com"><i className="fa fa-skype"></i> Skype</a>
                  <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
              </div>
          </div>
          </div>
          
          
      </div>
      <div className="row row-content">
          <div className="col-12">
            <h3>Send us your Feedback</h3>
          </div>
          <div className="col-12 col-md-9 mt-3">
          <Form model="feedback" onSubmit={ values => handleSubmit(values)}>
            <Row className="form-group">
                <Label htmlFor="firstname" md={2}>First Name</Label>
                <Col md={10}>
                    <Control.text model=".firstname" id="firstname" name="firstname"
                        placeholder="First Name"
                        className="form-control"
                        validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}  />
                    <Errors
                    className="text-danger"
                    model=".firstname"
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
                <Label htmlFor="lastname" md={2}>Last Name</Label>
                <Col md={10}>
                    <Control.text model=".lastname" id="lastname" name="lastname"
                        placeholder="Last Name"
                        className="form-control"
                        validators={{
                        required, minLength: minLength(3), maxLength: maxLength(15)
                    }}   />
                    <Errors
                    className="text-danger"
                    model=".lastname"
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
                <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                <Col md={10}>
                    <Control.text model=".telnum" id="telnum" name="telnum"
                        placeholder="Tel. Number"
                        className="form-control"
                        validators={{
                        required, minLength: minLength(7), maxLength: maxLength(15), isNumber
                    }}  />
                    <Errors
                    className="text-danger"
                    model=".telnum"
                    show="touched"
                    messages={{
                        required: 'Required. ',
                        minLength: 'Must be greater than 7 numbers. ',
                        maxLength: 'Must be 15 numbers or less. ',
                        isNumber: 'Must be a number'
                    }}
                    />
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="email" md={2}>Email</Label>
                <Col md={10}>
                    <Control.text model=".email" id="email" name="email"
                        placeholder="Email"
                        className="form-control" validators={{
                        required, validEmail
                    }}
                    />
                    <Errors
                    className="text-danger"
                    model=".email"
                    show="touched"
                    messages={{
                        required: 'Required. ',
                        validEmail: 'Invalid Email Address'
                    }}
                    />
                </Col>
            </Row>
            <Row className="form-group">
                <Col md={{size: 6, offset: 2}}>
                    <div className="form-check">
                        <Label check>
                            <Control.checkbox model=".agree" name="agree"
                                className="form-check-input"
                                /> {' '}
                                <strong>May we contact you?</strong>
                        </Label>
                    </div>
                </Col>
                <Col md={{size: 3, offset: 1}}>
                    <Control.select model=".contactType" name="contactType"
                        className="form-control">
                        <option>Tel.</option>
                        <option>Email</option>
                    </Control.select>
                </Col>
            </Row>
            <Row className="form-group">
                <Label htmlFor="message" md={2}>Your Feedback</Label>
                <Col md={10}>
                    <Control.textarea model=".message" id="message" name="message"
                        rows="6"
                        className="form-control" />
                </Col>
            </Row>
            <Row className="form-group">
                <Col md={{size:10, offset: 2}}>
                    <Button type="submit" color="primary">
                    Send Feedback
                    </Button>
                </Col>
            </Row>
        </Form>
        </div>
        </div>
    </div>
  )
}

export default Contact;