import "../styles/sidebar.css"

function Sidebar() {
    return (
        <aside className='sidebar-container'>
            <div className="categories">
                <div className="filter-section-title">Categories</div>
                <button className='cat-btn active'>All Products</button>
                <button className="cat-btn">⚡ Electronics</button>
                <button className="cat-btn">👗 Fashion</button>
                <button className="cat-btn">🏠 Home Appliances</button>
                <button className="cat-btn">📚 Books</button>
            </div>

            <div className="range">
                <div className="filter-section-title">Price Range</div>
                <div className="price-labels">Max: <span id="priceVal">₹5,000</span></div>
                <input type="range" className="range-slider" max="5000" min="100" step="100" />
            </div>

            <div>
                <div className="filter-section-title">Minimum Rating</div>
                <div className="rating-options">
                    <label className="rating-opt">
                        <input type="radio" name="rating" value="0" checked />
                        <span className="rating-radio"></span>
                        <span>All Ratings</span>
                    </label>
                    <label className="rating-opt">
                        <input type="radio" name="rating" value="4" />
                        <span className="rating-radio"></span>
                        <span className="stars">★★★★☆</span><span>4.0 & above</span>
                    </label>
                    <label className="rating-opt">
                        <input type="radio" name="rating" value="4.5"/>
                        <span className="rating-radio"></span>
                        <span className="stars">★★★★★</span><span>4.5 & above</span>
                    </label>
                </div>

            </div>

            <div>
                <div className="filter-section-title">Sort By</div>
                <select className="filter">
                    <option>Default</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Rating: High to Low</option>
                </select>
            </div>

            <button className="reset-btn">↺ Reset All Filters</button>

        </aside>
    )
}

export default Sidebar