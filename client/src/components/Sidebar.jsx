import "../styles/sidebar.css"

function Sidebar({ maxPrice, setMaxPrice, selectedCategory, setSelectedCategory, sortOption, setSortOption, minRating, setMinRating, onReset }) {

    const handlePriceChange = (e) => {
        setMaxPrice(Number(e.target.value))
    }

    return (
        <aside className='sidebar-container'>
            <div className="categories">
                <div className="filter-section-title">Categories</div>
                <button className={`cat-btn ${selectedCategory === "All" ? "active" : ""}`}
                    onClick={() => setSelectedCategory("All")}>All Products</button>
                <button className={`cat-btn ${selectedCategory === "Electronics" ? "active" : ""}`}
                    onClick={() => setSelectedCategory("Electronics")}>⚡ Electronics</button>
                <button className={`cat-btn ${selectedCategory === "Fashion" ? "active" : ""}`}
                    onClick={() => setSelectedCategory("Fashion")}>👗 Fashion</button>
                <button className={`cat-btn ${selectedCategory === "Home" ? "active" : ""}`}
                    onClick={() => setSelectedCategory("Home")}>🏠 Home Appliances</button>
                <button className={`cat-btn ${selectedCategory === "Books" ? "active" : ""}`}
                    onClick={() => setSelectedCategory("Books")}>📚 Books</button>
            </div>

            <div className="range">
                <div className="filter-section-title">Price Range</div>
                <div className="price-labels">Max: <span id="priceVal">₹{maxPrice}</span></div>
                <input type="range" className="range-slider" max="5000" min="100" step="100" value={maxPrice} onChange={handlePriceChange} />
            </div>

            <div>
                <div className="filter-section-title">Minimum Rating</div>
                <div className="rating-options">
                    <label className="rating-opt">
                        <input
                            type="radio"
                            name="rating"
                            value="0"
                            checked={minRating === 0}
                            onChange={(e) => setMinRating(Number(e.target.value))}
                        />
                        <span className="rating-radio"></span>
                        <span>All Ratings</span>
                    </label>
                    <label className="rating-opt">
                        <input
                            type="radio"
                            name="rating"
                            value="4"
                            checked={minRating === 4}
                            onChange={(e) => setMinRating(Number(e.target.value))}
                        />
                        <span className="rating-radio"></span>
                        <span className="stars">★★★★☆</span><span>4.0 & above</span>
                    </label>
                    <label className="rating-opt">
                        <input
                            type="radio"
                            name="rating"
                            value="4.5"
                            checked={minRating === 4.5}
                            onChange={(e) => setMinRating(Number(e.target.value))}
                        />
                        <span className="rating-radio"></span>
                        <span className="stars">★★★★★</span><span>4.5 & above</span>
                    </label>
                </div>

            </div>

            <div>
                <div className="filter-section-title">Sort By</div>
                <select
                    className="filter"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="default">Default</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                    <option value="rating">Rating: High to Low</option>
                </select>
            </div>

            <button className="reset-btn" onClick={onReset}>↺ Reset All Filters</button>

        </aside>
    )
}

export default Sidebar