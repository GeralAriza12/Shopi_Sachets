import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

function NavItem ({onClick, to, navbarName, className, activeStyle}) {
  
  return (
    <li onClick={onClick} className={(className)}>
      <NavLink 
        to={to} 
        className={({isActive}) => (isActive? activeStyle : null)}
      >
        {navbarName}  
      </NavLink>
    </li>
  )
}

NavItem.propTypes = {
  onClick: PropTypes.func,
  to: PropTypes.string,
  navbarName: PropTypes.string.isRequired,
  className: PropTypes.string,
  activeStyle: PropTypes.string,
};

export default NavItem;