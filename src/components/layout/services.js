import React, {Component} from 'react';

const CarouselItem = (props) => {
  const {title, icon, description, pricing} = props;
  return(
    <div className="carousel__item">
      <i className={icon}></i>
      <h3>{title}</h3>
      <span>${pricing}/Hour</span>
    </div>
  );
}

class Carousel extends Component {

  constructor(){
    super();
    this.state = {
      items: [{icon: "fas fa-book", pricing: 20, title: "Bookeeping", description: "Bookeeping is maintaining formal financial reports and filing tax reports."}, {icon: "fas fa-file-invoice-dollar", title: "Taxes", pricing: 20, description: "We can file your tax returns so you don't have to. Our experiened staff can also help you discover deductions that software or an untrained invidual can't find."}, {icon: "fas fa-search", title: "Audits", pricing: 35, description: "An audit examines your business's financial records to verify they are accurate. This is done through a systematic review of your transactions. Audits look at things like your financial statements and accounting books for small business. Many businesses have routine audits once per year."}, {icon: "fas fa-pen-alt", title: "Annual Reports", pricing: 50, description: "Annual reports are formal financial statements that are published yearly and sent to company stockholders and various other interested parties."}],
      currentItem: 0
    }
  }

  componentDidMount(){

  }

  updateItem = (delta) => {
    const {currentItem, items} = this.state;
    let newVal = 0;
    if(currentItem + delta > items.length - 1){
      newVal = 0;
    }else if (currentItem + delta < 0){
      newVal = items.length - 1;
    }else{
      newVal = currentItem + delta;
    }
    this.setState({
      currentItem: newVal
    });
  }

  render(){
    const {items, currentItem} = this.state;
    return(
      <div className="carousel">
        <a onClick={() => this.updateItem(-1)}><i className="fas fa-chevron-left"></i></a>
        {CarouselItem(items[currentItem])}
        <a onClick={() => this.updateItem(1)}><i className="fas fa-chevron-right"></i></a>
        <p>{items[currentItem].description}</p>
      </div>
    );
  }
}

const Services = (props) => {
  return(
    <div id="services">
      <p><span className="start-phrase">Our services</span> are quite comprehensive and can suit the needs of most entrepreneurs and small businesses. Here is a complete list of the various accounting services we provide. Since we charge by the hour, schedule an appointment with one of our friendly staff members in order to get an accurate quote for your project.</p>
      <Carousel />
    </div>
  );
}

export default Services;
