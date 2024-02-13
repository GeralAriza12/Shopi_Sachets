import { createContext, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../Hooks/UseFetch";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Shopping cart - increment
  const [count, setCount] = useState(0);

  // Product Detail - Open/Close
  const [isOpenDetail, setIsOpenDatail] = useState(false);
  const openDetail = () => setIsOpenDatail(true);
  const closeDetail = () => setIsOpenDatail(false);

  // CheckOut Side - Open/Close
  const [isCheckOutSideMenuOpen, setIsCheckOutSideMenuOpen] = useState(false);
  const openCheckOutSideM = () => setIsCheckOutSideMenuOpen(true);
  const closeCheckOutSideM = () => setIsCheckOutSideMenuOpen(false);

  // Product Detail - Show product
  const [productToShow, setProductToShow] = useState({});

  // Shopping cart - Add products to cart & order
  const [cartProducts, setCartProducts] = useState([]);
  const [order, setOrder] = useState([]);

  // Get products Title
  const products = useFetch("https://fakestoreapi.com/products");
  const [searchByTitle, setSearchByTitle] = useState('');

  // Filter Products
  const [filteredItems, setFilteredItems] = useState(null);
  // Get products category
  const [searchByCategory, setSearchByCategory] = useState(null);

  const filteredItemsByTitle = (products, searchByTitle) => {
    return products?.filter((product) =>
      product.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  const filteredItemsByCategory = (products, searchByCategory) => {
    return products?.filter((product) =>
      product.category.toLowerCase().includes(searchByCategory.toLowerCase())
    );
  };

  const filterBy = (searchType, products, searchByTitle, searchByCategory) => {
    if (searchType === "BY_TITLE") {
      return filteredItemsByTitle(products, searchByTitle);
    }
    
    if (searchType === "BY_CATEGORY") {
      return filteredItemsByCategory(products, searchByCategory);
    }

    if (searchType === "BY_TITLE_AND_CATEGORY") {
      return filteredItemsByCategory(products, searchByCategory).filter(
        (product) => product.title.toLowerCase().includes(searchByTitle.toLowerCase())
      );
    }

    if (!searchType) {
      return products;
    }
  };

  const filterCondition = useMemo(() => {
    if (searchByTitle) return "BY_TITLE";
    if (searchByCategory) return "BY_CATEGORY";
    if (searchByTitle && searchByCategory) return "BY_TITLE_AND_CATEGORY";
    return null;
   }, [searchByTitle, searchByCategory]);
   
   useEffect(() => {
    setFilteredItems(filterBy( filterCondition, products, searchByTitle, searchByCategory));
   }, [ filterCondition, products, searchByTitle, searchByCategory ]);
   

  return (
    <CartContext.Provider
      value={{
        count,
        setCount,
        isOpenDetail,
        openDetail,
        closeDetail,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckOutSideMenuOpen,
        openCheckOutSideM,
        closeCheckOutSideM,
        order,
        setOrder,
        products,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        searchByCategory,
        setSearchByCategory,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.object,
};
