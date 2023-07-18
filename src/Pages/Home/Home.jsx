import Layout from "../../Components/Layout/Layout";
import useFetch from "../../Hooks/UseFetch";
import Card from "../../Components/Card/Card"
import "./Home.css"

function Home() {
  const products = useFetch ('https://fakestoreapi.com/products');
  const products2 = useFetch ('https://fakestoreapi.com/products');

    return (
      <Layout>
        homes
        <div className='grid grid-cols-4 w-full max-w-[70%]'>
          {products.map((product) => {
            return <Card key={product.id} product={product} />
          })}
          {products2.map((product) => {
            return <Card key={product.id} product={product} />
          })}
        </div>
      </Layout>
    )
  }
  
export default Home;