import { useContext } from "react";
import Layout from "../../Components/Layout/Layout";
import Card from "../../Components/Card/Card";
import ProductDetail from "../../Components/ProductDetail/ProductDetail";
import { CartContext } from "../../Context/Context";

function Home() {
  const context = useContext(CartContext);

  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return (
        context.filteredItems?.map(products => (
        <Card key={products.id} product={products} />
        ))
      );
    } else {
      return (
        <h2>WE DON`T HAVE ANYTHING ...</h2>
      );
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <h1 className="font-medium text-xl m-2">Exclusive Products</h1>
        <input
          type="text"
          placeholder="Search a product"
          className="border border-black rounded-lg w-80 h-1 p-4 mb-4"
          onChange={(event) => context.setSearchByTitle(event.target.value)}
        />
      </div>
      <div className="grid grid-cols-4 w-full max-w-[70%]">{renderView()}</div>
      <ProductDetail />
    </Layout>
  );
}

export default Home;
