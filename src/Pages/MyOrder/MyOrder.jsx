import { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import OrderCard from "../../Components/OrderCard/OrderCard";
import { CartContext } from "../../Context/Context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";

function MyOrder() {
  const context = useContext(CartContext);
  const currentPath = window.location.pathname
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if (index === 'last') index = context.order?.length - 1 

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 py-2">
        <Link to="/my-orders" className="absolute left-0">
          <FontAwesomeIcon className="pr-5 cursor-pointer"
            icon={faCircleChevronLeft}/>
        </Link>
        <h2>MY ORDER</h2>
      </div>

      <div className="flex flex-col p-5">
        {context.order?.[index]?.products.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </Layout>
  );
}

export default MyOrder;
