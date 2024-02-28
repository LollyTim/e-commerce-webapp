import { products } from "@/utils/products";
import Container from "./components/Container";
import Homebanner from "./components/Homebanner";
import { truncateText } from "@/utils/trunkText";
import ProductCard from "./components/products/ProductCard";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <div>
          <Homebanner />
        </div>
        <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {products.map((product: any) => {
            return <div key={product.id}>
              <ProductCard data={product} />
            </div>
          })}
        </div>
      </Container>
    </div>
  )
}
