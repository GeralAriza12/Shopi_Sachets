import { useContext } from "react";
import { Link } from "react-router-dom";
import Layout from "../../Components/Layout/Layout";
import OrdersCard from "../../Components/OrdersCard/OrdersCard";
import { CartContext } from "../../Context/Context";

function MyOrders() {
  const context = useContext(CartContext);

    return (
      <Layout>
        <div className='flex items-center justify-center relative mt-11 w-90 pb-3'>
            <h2>MY ORDERS</h2>
        </div>
        {context.order.map((order, index) => (
          <Link key={index} to={`/my-orders/${index}`}>
            <OrdersCard 
            totalPrice={order.totalPrice} 
            totalProducts={order.totalProducts}/>
          </Link>
        ))}
      </Layout>
    )
  }
  
export default MyOrders;