import React, {useEffect} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import { postComment, postFeedback, fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  }
}

const mapDispatchToProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message)),
  fetchDishes: () =>  dispatch(fetchDishes()),
  resetFeedbackForm: () => { dispatch(actions.reset('feedback'))},
  fetchComments: () => dispatch(fetchComments()),
  fetchPromos: () => dispatch(fetchPromos()),
  fetchLeaders: () => dispatch(fetchLeaders()),
});


const Main = (props) => {
  const {dishes, comments, promotions, leaders, postComment, postFeedback, fetchDishes, resetFeedbackForm, fetchComments, fetchPromos, fetchLeaders } = props;
  const [selectedDish, setSelectedDish] = React.useState(null);
  
  const onDishSelect = (dishId) => {
    setSelectedDish(dishId);
  };

  useEffect(() => {
    fetchDishes();
    fetchComments();
    fetchPromos();
    fetchLeaders();
  },[]);
  
  const HomePage = () => {
    return(
      <Home 
        dish = {dishes.dishes.filter(dish => dish.featured)[0]}
        dishesLoading={dishes.isLoading}
        dishesErrMess={dishes.errMess}
        promotion = {promotions.promotions.filter(promo => promo.featured)[0]}
        promoLoading = {promotions.isLoading}
        promoErrMess = {promotions.errMess}
        leader ={leaders.leaders.filter(leader => leader.featured)[0]}
        leaderLoading = {leaders.isLoading}
        leaderErrMess = {leaders.errMess}
      />
    );
  }

  const DishWithId = ({match}) => {
    return(
      <DishDetail 
        dish={dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
        isLoading={dishes.isLoading}
        errMess={dishes.errMess}
        comments={comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess = {comments.errMess}
        postComment={postComment}
      />
    );
  };
  
  return (
    <div>
      <Header />
      <TransitionGroup>
        <CSSTransition key={props.location.key} classNames="page" timeout={300}>
          <Switch location={props.location}>
            <Route path='/home' component={HomePage} />
            <Route path='/aboutus' component={() => 
              <About 
                leaders={leaders.leaders} 
                leaderLoading ={leaders.isLoading}
                leaderErrMess = {leaders.errMess}
              />} />
            <Route exact path='/menu' component={() => <Menu dishes={dishes} />} />
            <Route exact path='/contact-us' component={() => 
              <Contact 
              postFeedback={postFeedback}
              resetFeedbackForm={resetFeedbackForm}
              />}/>
            <Route path='/menu/:dishId' component={DishWithId} />
            <Redirect to="/home" />
          </Switch>
        </CSSTransition>
        </TransitionGroup>
      <Footer />
    </div>
  )
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
