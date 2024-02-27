import { useContext } from "react";
import NavItem from "./NavItem";
import { CartContext } from "../../Context/Context";
import { NavLink } from "react-router-dom";


function Navbar() {
  const context = useContext(CartContext);
  const activeStyle = "underline";

  const navItemsLeft = [
    { name: "Sachet", to: "/", className: "font-semibold text-xl" },
    { name: "All", to: "/" },
    { name: "Clothing", to: "/clothing" },
    { name: "Electronics", to: "/electronics" },
    { name: "Jewelery", to: "/jewelery" },
    { name: "Toys", to: "/toys" },
    { name: "Others", to: "/others" },
  ];
  const navItemsRight = [
    { name: "My Orders", to: "/my-orders" },
    { name: "My Account", to: "/my-account" },
    { name: "Sign Out", to: "/sign-in"},
    { name: "🛒" + context.cartProducts.length, className: "font-medium text-xl" },
  ];
  
  // Sign Out 
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)
  const isUserSignOut = context.signOut || parsedSignOut

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(true)
  }

  const renderView = () => {
    if (isUserSignOut) {
      return (
        <ul className="flex justify-between items-center gap-3">
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => isActive ? activeStyle : undefined }
              onClick={() => handleSignOut()}>
              Sign out
            </NavLink>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className="flex justify-between items-center gap-3">
          {navItemsRight.map(({ to, className, name }) => (
            <NavItem
              key={name}
              to={to}
              onClick={() => handleSignOut()}
              className={className}
              navbarName={name}
              activeStyle={activeStyle}
            />
          ))}
        </ul>
      )
    }
  }

  return (  
    <nav className="flex justify-between py-2 px-5">
      <ul className="flex justify-between items-center gap-3">
        {navItemsLeft.map(({ to, className, name }) => (
          <NavItem
            key={name}
            to={to}
            onClick={() => context.setSearchByCategory(name)}
            className={className}
            navbarName={name}
            activeStyle={activeStyle}
          />
        ))}
      </ul>
      <ul className='flex items-center gap-3'>
        {renderView()}
      </ul>
    </nav>
  );
}

export default Navbar;
