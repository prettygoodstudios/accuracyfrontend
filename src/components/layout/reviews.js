import React, {Component} from 'react';

class Reviews extends Component {
  render(){
    const reviews = [{client: "Joe's Mechanic Shop", message: "We love working with accuracy they make running our business a breeze."}, {client: "Mike's Barber Shop", message: "They generated valuable annual reports which guided our business to record setting sales."}]
    return(
      <div id="reviews">
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
