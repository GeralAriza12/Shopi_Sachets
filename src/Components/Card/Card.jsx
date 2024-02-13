import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CartContext } from "../../Context/Context"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faClipboardCheck } from "@fortawesome/free-solid-svg-icons";

const Card = ({ product }) => {
  const context = useContext(CartContext)

  const showProduct = (productDetail) => {
    context.openDetail(),
    context.setProductToShow(productDetail),
    context.closeCheckOutSideM()
  }

  const addProductsToCart = (event, productData) => {
    context.openCheckOutSideM(),
    event.stopPropagation(),
    context.setCount(context.count + 1),
    context.setCartProducts([...context.cartProducts, productData]),
    context.closeDetail()
  }

  const renderIcon = (id) => {
    const isInCart = context.cartProducts.filter(product => product.id === id).length > 0

    if (isInCart) {
      return(
        <button className="absolute top-0 right-0 flex justify-center items-center bg-slate-600 w-6 h-6 rounded-full m-2 p-1">
          <FontAwesomeIcon icon={faClipboardCheck} style={{color: "white",}} />
        </button>
      )
    } else {
      return(
        <button className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
          onClick={(event) => addProductsToCart(event, product)}>
          <FontAwesomeIcon icon={faCartPlus} bounce style={{color: "#4a515e",}} />
        </button>
      )
    }
  }
 
  return (
    <div className="bg-white cursor-pointer w-56 h-70 rounded-lg mt-4"
      onClick={() => showProduct(product)}>
        <figure className="relative mb-2 w-full h-4/5">
            <h2 className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">{product.title}</h2>
            <img src={product.image} alt={product.title} className="w-full h-full object-cover rounded-lg"/>
            {renderIcon(product.id)}
        </figure>
        <div className="flex justify-between">
          {/* API EN CONTEXT */}
            <h4 className="mb-2 ml-5 text-sm font-light">{product.category}</h4>
            <h3 className="mr-4 text-lg font-medium">$ {product.price}</h3>
        </div>
    </div>
  )
}

Card.propTypes = {
  product: PropTypes.object
}

export default Card;