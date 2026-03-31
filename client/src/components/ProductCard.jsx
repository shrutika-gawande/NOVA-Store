import "../styles/productCard.css"

function ProductCard({ product }) {
    return (
        <div>
            <div className="product-card">
                <div className="product-img">{product.emoji}</div>
                <div className="product-info">
                    <div className="product-category">{product.cat}</div>
                    <div className="product-name">{product.name}</div>
                    <div className="product-review">
                        <div className="stars">★★★★★</div>
                        <div className="rating"> {product.rating}</div>
                        <div className="review">({product.reviews})</div>
                    </div>
                    <div className="product-prices">
                        <div>
                            {product.oldPrice && (<div className="oldPrice">&#8377;{product.oldPrice}</div>)}
                            <div className="newPrice">&#8377;{product.price}</div>
                        </div>
                        <button className="addBtn">+&nbsp;Add</button></div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard