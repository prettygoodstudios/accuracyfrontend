import React, {Component} from 'react';
import {connect} from 'react-redux';

function getOffset( el ) {
  var _x = 0;
  var _y = 0;
  while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
  }
  return { top: _y, left: _x };
}



class Header extends Component {

  constructor(){
    super();
    this.state = {
      mobileMenu: false
    }
  }

  componentDidMount(){
    const id = window.location.href.split("=")[1];
    if(id && id != ""){
      this.scrolling(id);
    }
    window.addEventListener('resize', () => {
      if(window.innerWidth > 700){
        this.setState({
          mobileMenu: false
        });
      }
    });
  }

  scrolling = async (id) => {
    console.log("Staff Length", this.props.staff.length);
    const element = document.getElementById(id);
    console.log(element);
    let set = false;
    const scrolling = () => {
      if(this.props.staff.length != 0 && !set){
        set = true;
        window.scrollTo({left: 0,top: getOffset(element).top - 100, behavior: 'smooth'});
      }
    }
    window.setTimeout(scrolling, 1500);
  }

  scrollTo = (id) => {
    const urlComponents = window.location.href.split("/");
    const path = urlComponents[urlComponents.length-1];
    if(path != "" && path.indexOf("=") == -1){
      window.location = urlComponents.slice(0,urlComponents.length-1).join("/")+"?scroll="+id;
    }
    const element = document.getElementById(id);
    console.log(element);
    window.scrollTo({left: 0,top: getOffset(element).top - 100, behavior: 'smooth'});
  }

  toggleMobileMenu = () => {
    this.setState({
      mobileMenu: !this.state.mobileMenu
    });
  }

  render(){
    const {title, items} = this.props;
    return(
      <div className="header">
        <div className="header__title">
          <a href="/">{title}</a>
        </div>
        <ul className={this.state.mobileMenu ? "header__menu header__show" : "header__menu"}>
          { items.map((li, i) => {
            return(
              <li key={i} className="header__menu__item">
                <a onClick={() => this.scrollTo(li.element)}>{li.title}</a>
              </li>
            )
          })
          }
        </ul>
        <div className="header__toggle">
          <button onClick={this.toggleMobileMenu}>Menu</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  const {staff, appointments} = state.schedule;
  return{
    staff,
    appointments
  }
}

export default connect(mapStateToProps, null)(Header);
