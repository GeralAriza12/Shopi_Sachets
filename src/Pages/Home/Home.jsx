import Layout from "../../Components/Layout/Layout";
import useFetch from "../../Hooks/UseFetch";
import Card from "../../Components/Card/Card"
import ProductDetail from "../../Components/ProductDetail/ProductDetail";

function Home() {
  // const products = useFetch ('https://fakestoreapi.com/products');
  const products = useFetch ('https://api.escuelajs.co/api/v1/products');

    return (
      <Layout>
        homes
        <div className='grid grid-cols-4 w-full max-w-[70%]'>
          {products.map((products) => {
            return <Card key={products.id} product={products} />
          })}
        </div>
        <ProductDetail/>
      </Layout>
    )
  }
  
export default Home;