import { faCalendarCheck, faCartShopping, faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const OrdersCard = ({ totalPrice, totalProducts }) => {
  OrdersCard.propTypes = {
    totalPrice: PropTypes.number,
    totalProducts: PropTypes.node,
  };

  let dates = new Date().toLocaleDateString()

  return (
    <div>
      <div className="flex w-80 justify-between items-center mb-2 border border-black rounded-lg p-3">
        <div className="flex items-center justify-between grow gap-2 px-4">
          <div className="flex items-center justify-center">
            <div className="flex flex-col">
              <div className="flex flex-row justify-center items-center gap-3">
                <FontAwesomeIcon icon={faCartShopping} style={{color: "#7c8088",}} />
                <h2 className="font-light text-lg">{`${totalProducts}`}</h2>
              </div>
              <h3 className="font-light">{`${totalProducts === 1 ? "Producto" : "Productos"}`}</h3>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <FontAwesomeIcon icon={faMoneyCheckDollar} style={{color: "#7c8088",}} />
            <h2 className="font-light">${totalPrice}</h2>
          </div>
          <div className="flex flex-col gap-2">
            <FontAwesomeIcon icon={faCalendarCheck} style={{color: "#7c8088",}} />
            <h2 className="font-light">{dates}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersCard;
