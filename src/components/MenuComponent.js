import React from "react";
import {
  Card, CardImg,
    CardTitle, Breadcrumb, BreadcrumbItem
} from "reactstrap";
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import {imageLink} from './DishDetailComponent';

const RenderMenuItem = ({ dish }) => {
  return (
    <Card className=" mt-2 ml-4">
      <Link to={`/menu/${dish.id}`} className="text-center text-reset text-info" style={{fontSize: "20px"}}>
        <CardImg width="100%" src={imageLink(dish.image)} alt={dish.name} />
        <CardTitle>{dish.name}</CardTitle>
      </Link>
    </Card>
  );
}

const Menu = ({ dishes, onClick }) => {

  const menu = dishes.dishes.map((dish) => {
    return (
      <div className="col-11 col-md-5" key={dish.id}>
        <RenderMenuItem dish={dish} onClick={onClick} />
      </div>
    );
  });

  if (dishes.isLoading) {
    return(
        <div className="container">
            <div className="row">            
                <Loading />
            </div>
        </div>
    );
  }
  else if (dishes.errMess) {
    return(
        <div className="container">
            <div className="row"> 
                <div className="col-12">
                    <h4>{dishes.errMess}</h4>
                </div>
            </div>
        </div>
    );
  }
  else return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
            <BreadcrumbItem>
            <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Menu</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
            <h3>Menu</h3>
            <hr />
        </div>                
    </div>
      <div className="row">{menu}</div>
    </div>
  );
};

export default Menu;
