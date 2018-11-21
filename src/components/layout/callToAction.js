import React, {Component} from "react";

let tmpBill = new Image();
tmpBill.src = "https://s3-us-west-2.amazonaws.com/staticgeofocus/Bill.png";
const bill = tmpBill;
let bills = [];

class CallToAction extends Component {

  constructor(){
    super();
  }

  componentDidMount(){
    window.setInterval(this.updateCanvas ,1000/60);
  }

  updateCanvas = () => {
    const canvas = document.getElementById("animationWrapper");
    const cxt = canvas.getContext("2d");
    const {innerWidth, innerHeight} = window;
    if(Math.floor(Math.random()*10) == 3){
      let newBill = {
        x: Math.floor(Math.random()*innerWidth-125),
        y: -300,
        degrees: Math.floor(Math.random()*90-45)
      }
      bills.push(newBill);
    }
    cxt.fillStyle = "white";
    cxt.clearRect(0,0,canvas.width,canvas.height);
    bills.forEach((b) => {
      const {x, y, degrees} = b;
      b.y += 5;
      cxt.save();
      cxt.translate(canvas.width/2,canvas.height/2);
      cxt.rotate(degrees*Math.PI/180);
      cxt.drawImage(bill, x-250/2, y-250/2, 250, 125);
      cxt.restore();
    });
  }

  render(){
    const {title, subtitle} = this.props;
    const {innerWidth, innerHeight} = window;
    return(
      <div className="call-to-action">
        <div className="call-to-action__title-wrapper">
          <h1>{title}</h1>
          <h3>{subtitle}</h3>
        </div>
        <canvas id="animationWrapper" className="call-to-action__canvas" width={innerWidth} height={innerHeight*0.8}></canvas>
      </div>
    )
  }
}

export default CallToAction;
