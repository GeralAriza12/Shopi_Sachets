import PropTypes from 'prop-types';
import "./Card.css"

const Card = ({ product }) => {
    
    console.log("**+" + product);

  return (
    <div className="bg-white cursor-pointer w-56 h-70 rounded-lg mt-4">
        <figure className="relative mb-2 w-full h-4/5">
            <h2 className="absolute bottom-0 left-0 bg-white/60 rounded-lg text-black text-xs m-2 px-3 py-0.5">{product.title}</h2>
            <img src={product.image} alt={product.title} className="w-full h-full object-cover rounded-lg"/>
            <button className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1">🛒</button>
        </figure>
        <div className="flex justify-between">
            <h4 className="mb-2 ml-5 text-sm font-light">{product.category}</h4>
            <h3 className="mr-4 text-lg font-medium">{product.price}</h3>
        </div>
    </div>
  )
}

Card.propTypes = {
    product: PropTypes.object
}

export default Card;