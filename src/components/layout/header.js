import React, {Component} from 'react';
import {connect} from 'react-redux';
import $ from "jquery";

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
    window.addEventListener('resize', () => {
      if(window.innerWidth > 700){
        this.setState({
          mobileMenu: false
        });
      }
    });
  }


  scrollTo = (id) => {
    const urlComponents = window.location.href.split("/");
    const path = urlComponents[urlComponents.length-1];
    if(path != "" && path.indexOf("=") == -1){
      window.location = urlComponents.slice(0,urlComponents.length-1).join("/")+"?scroll="+id;
    }
    const element = document.getElementById(id);
    console.log(element);
    const isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    const isEdge = !isIE && !!window.StyleMedia;
    const deprecatedBrowser = isSafari || isIE || isEdge;
    if(!deprecatedBrowser){
      window.scrollTo({left: 0,top: getOffset(element).top - 100, behavior: 'smooth'});
    }else{
      //element.scrollIntoView({block: "start"});
      $('html, body').animate({
          scrollTop: $(`#${id}`).offset().top - 100
      }, 400);
      //window.scroll(0, getOffset(element).top - 100);
    }
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
