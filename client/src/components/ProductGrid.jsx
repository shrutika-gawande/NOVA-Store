import ProductCard from "../components/ProductCard"
import products from "../seed.js"
import "../styles/productGrid.css"

function ProductGrid() {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid