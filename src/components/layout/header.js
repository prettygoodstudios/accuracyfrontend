import React, {Component} from 'react';

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
          <a href="#">{title}</a>
        </div>
        <ul className="header__menu" style={this.state.mobileMenu ? {display: "block"} : {}}>
          { items.map((li, i) => {
            return(
              <li key={i} className="header__menu__item">
                <a href="#">{li.title}</a>
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

export default Header;
