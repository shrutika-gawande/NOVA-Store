import "../styles/productCard.css"
import { useState } from "react";
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';

function ProductCard({ product }) {
    const { dispatch } = useCart();
    const [added, setAdded] = useState(false);

    const handleAdd = (e) => {
        e.stopPropagation();
        dispatch({ type: 'ADD', product });
        setAdded(true);
        toast.success(`Added "${product.name.slice(0, 22)}…" to cart!`, {
            style: {
                background: '#1f1f1f',
                color: '#f0ece4',
                border: '1px solid #e8c87a',
                fontSize: '0.85rem',
            },
            iconTheme: { primary: '#e8c87a', secondary: '#0d0d0d' },
        });
        setTimeout(() => setAdded(false), 1800);
    };

    return (
        <div>
            <div className="product-card">
                <div className="imgWrap">
                    {product.badge && (
                        <span className={`badge ${product.badge === 'New' ? 'badgeNew' : ''}`}>
                            {product.badge}
                        </span>
                    )}
                    <div className="product-img">{product.emoji}</div>
                </div>
                
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
                        <button className={`addBtn ${added ? "addedBtn" : ""}`} onClick={handleAdd}>{added ? '✓ Added' : '+ Add'}</button></div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard