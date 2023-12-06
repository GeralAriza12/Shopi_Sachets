import { BrowserRouter, useRoutes } from 'react-router-dom' ;

import Home from "../Home/Home";
import MyAccount from "../MyAccount/MyAccount";
import MyOrder from "../MyOrder/MyOrder";
import MyOrders from "../MyOrders/MyOrders";
import NotFound from "../NotFound/NotFound";
import SignIn from "../SignIn/SignIn";
import { CartProvider } from "../../Context/Context";

import Navbar from "../../Components/NavBar/NavBar";

import './App.css';

const AppRoutes = () => {
    let routes = useRoutes ([
        {path: "/", element: <Home />},
        {path: "/my-account", element: <MyAccount />},
        {path: "/my-order", element: <MyOrder />},
        {path: "/my-orders", element: <MyOrders />},
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
              <AppRoutes />
          </BrowserRouter>
        </CartProvider>
        

      </div>
    )
  }
  
  export default App;