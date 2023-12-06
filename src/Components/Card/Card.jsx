import PropTypes from 'prop-types';
import { useContext } from 'react';
import { CartContext } from "../../Context/Context"

const Card = ({ product }) => {
  const context = useContext(CartContext)

  const showProduct = (productDetail) => {
    context.openDetail(),
    context.setProductToShow(productDetail)
  }

  return (
    <div className="bg-white cursor-pointer w-56 h-70 rounded-lg mt-4"
      onClick={() => showProduct(product)}>
        <figure className="relative mb-2 w-full h-4/5">
            <h2 className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">{product.title}</h2>
            <img src={product.images} alt={product.title} className="w-full h-full object-cover rounded-lg"/>
            <button className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
              onClick={() => context.setCount(context.count + 1)}>🛒</button>
        </figure>
        <div className="flex justify-between">
          {/* si uso la otra api debo quitar name y en la imagen quitar la s */}
            <h4 className="mb-2 ml-5 text-sm font-light">{product.category.name}</h4>
            <h3 className="mr-4 text-lg font-medium">$ {product.price}</h3>
        </div>
    </div>
  )
}

Card.propTypes = {
    product: PropTypes.object
}

export default Card;