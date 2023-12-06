import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { CartContext } from "../../Context/Context";

const ProductDetail = () => {
    const context = useContext(CartContext)

  return (
    <aside className={`${context.isOpenDetail ? 'flex' : 'hidden'} flex-col fixed right-0 border bg-white border-black rounded-lg w-[360px] h-full`}>
        <div className="flex justify-between items-center p-5">
            <h3 className="text-xl">Detail</h3>
            <div>
                <FontAwesomeIcon icon={faCircleXmark} onClick={() => context.closeDetail()} className="cursor-pointer"/>
            </div>
        </div>
        <figure>
            <div className="flex justify-between p-3">
                <h2>{context.productToShow.title}</h2>
                <h3>{context.productToShow.price}</h3>
            </div>
            <img src={context.productToShow.images} alt={context.productToShow.title} className="p-2 w-full h-4/5" />
            <h4 className="pl-3 pr-3">{context.productToShow.description}</h4>
        </figure>
    </aside>
  );
};

export default ProductDetail;
