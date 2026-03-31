import ProductGrid from "../components/ProductGrid.jsx"
import Sidebar from "../components/Sidebar"
import "../styles/products.css"
import products from "../seed.js"

function Products() {
  return (
    <main className="productPage">
        <div className="sidebar">
            <Sidebar/>
        </div>
        <div className="products">
            <ProductGrid />
        </div>
        
    </main>
  )
}

export default Products