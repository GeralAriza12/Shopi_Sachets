import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const CartContext = createContext()

export const CartProvider = ({children}) => {
    const [ count, setCount ] = useState(0);
    const [ isOpenDetail, setIsOpenDatail ] = useState(false);
    const [ productToShow, setProductToShow ] = useState({});

    const openDetail = () => setIsOpenDatail(true);
    const closeDetail = () => setIsOpenDatail(false);

    return (
        <CartContext.Provider value={{
            count,
            setCount,
            isOpenDetail,
            openDetail,
            closeDetail,
            productToShow,
            setProductToShow
        }}>
            {children}
        </CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: PropTypes.object
}