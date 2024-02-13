import { BrowserRouter, useRoutes } from 'react-router-dom' ;

import Home from "../Home/Home";
import MyAccount from "../MyAccount/MyAccount";
import MyOrder from "../MyOrder/MyOrder";
import MyOrders from "../MyOrders/MyOrders";
import NotFound from "../NotFound/NotFound";
import SignIn from "../SignIn/SignIn";
import { CartProvider } from "../../Context/Context";

import Navbar from '../../Components/NavBar/Navbar';

import CheckOutMenu from '../../Components/CheckOutMenu/CheckOutMenu';  

import './App.css';

const AppRoutes = () => {
    let routes = useRoutes ([
        {path: "/", element: <Home />},
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