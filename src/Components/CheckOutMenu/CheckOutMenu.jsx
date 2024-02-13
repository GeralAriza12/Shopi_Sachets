import { useContext } from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../../Context/Context";
import OrderCard from "../OrderCard/OrderCard";
import { totalPrice } from "../../utils/utils";

const CheckOutMenu = () => {
    const context = useContext(CartContext)

    const handleDelete = (id) => {
        const deleteProduct = context.cartProducts.filter(product => product.id != id)
        context.setCartProducts(deleteProduct)
    }

    const handleCheckout = () => {
        const orderToAdd = {
            date: new Date().toLocaleDateString(),
            products: context.cartProducts,
            totalProducts: context.cartProducts.length,
            totalPrice: totalPrice(context.cartProducts) 
        }

        context.setOrder([...context.order, orderToAdd])
        context.setCartProducts([])
        context.closeCheckOutSideM()
        context.setSearchByTitle(null)
    }

  return (
    <div className={`${context.isCheckOutSideMenuOpen ? 'flex' : 'hidden'} flex-col fixed top-14 right-0 border bg-white border-black rounded-lg w-[340px] h-[635px]`}>
        <aside className="p-5 overflow-auto">
            <div className="flex justify-between items-center py-3">
                <h3 className="text-xl">My Order</h3>
                <div>
                    <FontAwesomeIcon icon={faCircleXmark} 
                    onClick={() => context.closeCheckOutSideM()} 
                    className="cursor-pointer"/>
                </div>
            </div>
            <div className='flex-1'>
                {context.cartProducts.map(product => (
                    <OrderCard 
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        image={product.image}
                        price={product.price}
                        handleDelete={handleDelete}
                    />
                ))}
            </div>
            <div>
                <h4 className='flex justify-between items-center py-3'>
                    <span className='font-medium'>Total:</span>
                    <span className='font-medium text-lg'>${totalPrice(context.cartProducts)}</span>
                </h4>
                <Link to='/my-orders/last'>
                    <button className='w-full bg-black py-3 text-white font-medium rounded-lg'
                    onClick={() => handleCheckout()}>CHECKOUT</button>
                </Link>
            </div>
        </aside>
    </div>
  );
};

export default CheckOutMenu;
