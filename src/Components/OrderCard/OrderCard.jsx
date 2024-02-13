import { useState } from 'react';
import PropTypes from 'prop-types';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const OrderCard = ({ id, title, image, price, handleDelete }) => {
    let renderTrashCanIcon
    if (handleDelete) {
        renderTrashCanIcon = <FontAwesomeIcon onClick={() => handleDelete(id)} icon={faTrashCan} style={{color: "#4a515e",}} className="cursor-pointer pl-9"/>
    }

    const [imageLoaded, setImageLoaded] = useState(false);
    OrderCard.propTypes = {
      id: PropTypes.node,
      title: PropTypes.string.isRequired,
      image: PropTypes.node,
      price: PropTypes.number.isRequired,
      handleDelete: PropTypes.func
    }

    return (
        <div className='flex justify-between items-center mb-2'>
            {/* gap - espacio entre ellos */}
            <div className='flex items-center gap-2'>
                <figure className='w-20 h-20'>
                    <img className='w-full h-full rounded-lg object-cover' 
                        src={image}
                        alt={id}
                        onLoad={() => setImageLoaded(true)}
                        />
                        {!imageLoaded && <div>Loading...</div>}
                </figure>
                <h3 className='text-sm font-light '>{title}</h3>
            </div>
            <div className='flex flex-col items-end'>
                <h2 className='text-lg font-medium pl-3'>{price}</h2>
                {renderTrashCanIcon}
            </div>
        </div>
    )
}

export default OrderCard