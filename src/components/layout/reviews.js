import React, {Component} from 'react';

class Reviews extends Component {
  render(){
    const reviews = [{client: "The Toyota Motor Company", message: "We love working with accuracy they make running our business a breeze"}, {client: "JP Morgan Chase", message: "Even though we are a financial powerhouse they make our lives easier."}]
    return(
      <div>
        <p><span className="start-phrase">Our reviews</span> we are highly regarded by the vast majority of our clients. Here is a collection of some of their opinions.</p>
        <div className="reviews-wrapper">
          {reviews.map((m, i) => {
            const {client, message} = m;
            return(
              <div className="reviews-wrapper__review" key={i}>
                <span className="reviews-wrapper__review__client">{client}</span>
                <div className="reviews-wrapper__review__message">
                  <span>"{message}"</span>
                  <div className="reviews-wrapper__review__message__carot"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Reviews;
