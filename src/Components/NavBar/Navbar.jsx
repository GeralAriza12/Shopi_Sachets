import { useContext } from "react";
import NavItem from "./NavItem";
import { CartContext } from "../../Context/Context";
import { NavLink } from "react-router-dom";


function Navbar() {
  const context = useContext(CartContext);
  const activeStyle = "underline";

  const navItemsLeft = [
    // { name: "Sachet", to: "/", className: "font-semibold text-xl" },
    // { name: "All", to: "/" },
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

  // Account 
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)

  // Has an account
  const withoutAccountInLStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const withoutAccountInLState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAcount = !withoutAccountInLStorage || !withoutAccountInLState 

  const handleSignOut = () => {
    const stringifiedSignOut = JSON.stringify(true)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(true)
  }

  const renderView = () => {
    if (hasUserAnAcount && !isUserSignOut) {
      return (
        <div className='flex items-center'>
          <li className='text-black/60 pr-3'>
            <h4>Welcome, {parsedAccount?.name} </h4>
          </li>
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
        </div>
        
      )
    } else {
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
    }
  }

  return (  
    <nav className="flex justify-between py-2 px-5">
      <ul className="flex justify-between items-center gap-3">
        <li className='font-semibold text-xl'>
          <NavLink 
            to={`${isUserSignOut ? '/sign-in' : '/'}`}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            Sachet
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/all'
            onClick={() => context.setSearchByCategory()}
            className={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>
            All
          </NavLink>
        </li>
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
