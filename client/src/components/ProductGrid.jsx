import ProductCard from "../components/ProductCard"
import "../styles/productGrid.css"

function ProductGrid({ products }) {
  return (
    <div className="product-grid">
      {products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
      <p>No products found</p>  
    )}
    </div>
  )
}

export default ProductGrid