import React from 'react';

const Header = (props) => {
  const {title, items} = props;
  return(
    <div className="header">
      <div className="header__title">
        <a href="#">{title}</a>
      </div>
      <ul className="header__menu">
        { items.map((li, i) => {
          return(
            <li key={i} className="header__menu__item">
              <a href="#">{li.title}</a>
            </li>
          )
        })
        }
      </ul>
    </div>
  );
}

export default Header;
