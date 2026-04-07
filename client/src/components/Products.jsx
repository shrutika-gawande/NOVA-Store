import ProductGrid from "./ProductGrid.jsx"
import Sidebar from "./Sidebar.jsx"
import "../styles/products.css"

function Products({ products, maxPrice, setMaxPrice, selectedCategory, setSelectedCategory, sortOption, setSortOption, minRating, setMinRating, onReset }) {
    return (
        <main className="productPage">
            <div className="sidebar">
                <Sidebar maxPrice={maxPrice}
                    setMaxPrice={setMaxPrice}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    minRating={minRating}
                    setMinRating={setMinRating}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                    onReset={onReset}
                />
            </div>
            <div className="products">
                <ProductGrid products={products} />
            </div>

        </main>
    )
}

export default Products