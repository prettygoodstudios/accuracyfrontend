import React, {Component} from 'react';
import {connect} from 'react-redux';

import * as actions from '../../actions';

import Modal from "../widgets/modal";
import Error from "../widgets/error";

class Reviews extends Component {

  constructor(){
    super();
    this.state = {
      score: undefined,
      message: "",
      show: true,
      succesModal: false,
      error: ""
    }
  }

  componentDidMount(){
    this.props.getReviews();
  }

  updateInput = (field, text) => {
    let tempState = {}
    tempState[field] = text.target.value;
    this.setState({
      ...tempState
    });
  }

  leaveReview = () => {
    const {session} = this.props;
    const {score, message} = this.state;
    if(score && score != 0){
      if(message.length >= 6){
        this.props.leaveReview({token: session, score, message}, this.hideReviewForm, (e) => this.setState({error: e}));
      }else{
        this.setState({error: "You must enter in a message atleast six characters long."});
      }
    }else{
      this.setState({error: "You must enter in a score!"});
    }
  }

  approveReview = (id) => {
    const {session} = this.props;
    this.props.approveReview({token: session, id}, () => alert("Approved!"), () => alert("You do not have permission to perform this action."));
  }

  hideReviewForm = () => {
    this.setState({
      show: false,
      succesModal: true
    });

  }

  render(){
    const {message, score, show, succesModal, error} = this.state;
    const {session, user, reviews} = this.props;

    const myReviews = reviews.filter((r) => r.user_id === user.id);
    const elligible = (myReviews.length == 0);

    return(
      <div id="reviews">
        <p><span className="start-phrase">Our reviews</span> confirm our firm's precision and accuracy. We are highly regarded by the vast majority of our clients. Here is a collection of some of their opinions.</p>
        { (reviews.filter((r) => r.approved == 1).length > 0 || user.role == "admin") ?
          <div className="reviews-wrapper">
            {reviews.map((m, i) => {
              const {company, message, score, approved, id} = m;
              if(approved == 0 && user.role !== "admin"){
                return <div key={i}></div>;
              }
              return(
                <div className="reviews-wrapper__review" key={i}>
                  <span className="reviews-wrapper__review__client">{company}</span>
                  <div className="reviews-wrapper__review__message">
                    <span>"{message}"</span>
                    <div className="reviews-wrapper__review__message__score">
                      <span>Rating: {score}/5</span>
                      <div className="reviews-wrapper__review__message__score__money">
                        {[1,2,3,4,5].map((s) => {
                          return(
                            <img src={s <= score ? "https://s3-us-west-2.amazonaws.com/staticgeofocus/Bill.png" : "https://s3-us-west-2.amazonaws.com/staticgeofocus/GrayBill.png"}/>
                          );
                        })
                       }
                      </div>
                    </div>
                    { (approved == 0 && user.role == "admin") && 
                      <div>
                        <a className="button" onClick={() => this.approveReview(id)}>Approve</a>
                      </div>
                    }
                    <div className="reviews-wrapper__review__message__carot"></div>
                  </div>
                </div>
              )
            })}
          </div>
          :
          <p>There are currently no reviews.</p>
        }
        { (session && show && elligible) &&
          <div className="review-form">
            <h1>Leave us a review!</h1>
            <label for="message">Message</label>
            <input name="message" id="message" onChange={(t) => this.updateInput("message", t)} value={message}/>
            <label for="score">Score</label>
            <select name="score" id="score" value={score} onChange={(t) => this.updateInput("score", t)}>
                <option value="" disabled selected>Select a Score</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
            <center style={{marginTop: 10, marginBottom: 10}}><Error error={error}/></center>
            <a className="button" onClick={() => this.leaveReview()}>Submit</a>
          </div>
        }
        { succesModal && 
          <Modal dismissModal={() => this.setState({succesModal: false})}>
            <h1>You successively left a review!</h1>
            <p>Your review will not be visible to the public until it has been approved by a site administrator.</p>
          </Modal>
        }
        { !session && 
          <center style={{marginBottom: 10}}><a onClick={() => this.props.logInModal(true)} className="button">Leave a Review!</a></center>
        }
      </div>
    )
  }
}

function mapStateToProps(state){
  const {session, user} = state.auth;
  const {reviews} = state.reviews;
  return{
    session,
    user,
    reviews
  }
}

export default connect(mapStateToProps, actions)(Reviews);
