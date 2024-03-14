import { useContext } from 'react';
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom' ;

import Home from "../Home/Home";
import MyAccount from "../MyAccount/MyAccount";
import MyOrder from "../MyOrder/MyOrder";
import MyOrders from "../MyOrders/MyOrders";
import NotFound from "../NotFound/NotFound";
import SignIn from "../SignIn/SignIn";
import { CartContext, CartProvider, initializeLocalStorage } from "../../Context/Context";

import Navbar from '../../Components/NavBar/Navbar';

import CheckOutMenu from '../../Components/CheckOutMenu/CheckOutMenu';  

import './App.css';

const AppRoutes = () => {
  const context = useContext(CartContext)
  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  // Sign Out
  const signOut = localStorage.getItem('sign-out')
  const parsedSignOut = JSON.parse(signOut)
  // Has an account
  const withoutAccountInLStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const withoutAccountInLState = Object.keys(context.account).length === 0
  const hasUserAnAccount = !withoutAccountInLStorage || !withoutAccountInLState
  const isUserSignOut = context.signOut || parsedSignOut


    let routes = useRoutes ([
        {path: "/", element: hasUserAnAccount && !isUserSignOut ? <Home /> : <Navigate replace to={'/sign-in'}/>},
        {path: "/all", element: <Home />},
        {path: "/clothing", element: <Home />},
        {path: "/electronics", element: <Home />},
        {path: "/jewelery", element: <Home />},
        {path: "/toys", element: <Home />},
        {path: "/others", element: <Home />},
        
        {path: "/my-account", element: <MyAccount />},
        {path: "/my-order", element: <MyOrder />},
        {path: "/my-orders", element: <MyOrders />},
        {path: "/my-orders/last", element: <MyOrder />},
        {path: "/my-orders/:id", element: <MyOrder />},
        {path: "/*", element: <NotFound />},
        {path: "/sign-in", element: <SignIn />},
    ])

    return routes;
}

function App() {
  initializeLocalStorage()
  
    return (
      <div>
        <CartProvider>
          <BrowserRouter>
              <Navbar />  
              <AppRoutes/>
              <CheckOutMenu />
          </BrowserRouter>
        </CartProvider>
      </div>
    )
  }
  
  export default App;