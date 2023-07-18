import NavItem from "./NavItem";

function Navbar() {
  const navItemsLeft = [
    { name: "Achets", to: "/", className: "font-semibold text-xl" },
    { name: "All", to: "/" },
    { name: "Clothes", to: "/clothes" },
    { name: "Electronics", to: "/electronics" },
    { name: "Furnitures", to: "/furnitures" },
    { name: "Toys", to: "/toys" },
    { name: "Others", to: "/others" },
  ];
  const navItemsRight = [
    { name: "My Orders", to: "/my-orders" },
    { name: "My Account", to: "/my-account" },
    { name: "Sign In", to: "/sign-in" },
  ];

  const activeStyle = "underline";

  return (
    <nav className="flex justify-between py-3 px-5">
      <ul className="flex justify-between items-center gap-3">
        {navItemsLeft.map(({ to, className, name }) => (
          <NavItem
            key={name}
            to={to}
            className={className}
            navbarName={name}
            activeStyle={activeStyle}
          />
        ))}
      </ul>
      <ul className="flex justify-between items-center gap-3">
        {navItemsRight.map(({ to, className, name }) => (
          <NavItem
            key={name}
            to={to}
            className={className}
            navbarName={name}
            activeStyle={activeStyle}
          />
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
