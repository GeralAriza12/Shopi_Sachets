import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "../../Context/Context";
import './ProductDetail.css'

const ProductDetail = () => {
    const context = useContext(CartContext)

  return (
    <aside 
        className={`${context.isOpenDetail ? 'flex' : 'hidden'} product-detail flex-col fixed right-0 border bg-white border-black rounded-lg`}>
        <div className="p-5">
            <div className="flex justify-between items-center py-3">
                <h3 className="text-xl">Detail</h3>
                <div>
                    <FontAwesomeIcon icon={faCircleXmark} 
                    onClick={() => context.closeDetail()} 
                    className="cursor-pointer"/>
                </div>
            </div>
            <figure>
                <div className='flex justify-between'>
                    <h2 className='font-medium text-md'>{context.productToShow.title}</h2>
                    <h3 className='font-medium text-xl mb-2'>${context.productToShow.price}</h3>
                </div>
                <img 
                    src={context.productToShow.image} 
                    alt={context.productToShow.title} 
                    className='p-2 w-full h-3/5' />
                <h4 className='font-light text-sm'>{context.productToShow.description}</h4>
            </figure>
        </div>
    </aside>
    
  );
};

export default ProductDetail;
