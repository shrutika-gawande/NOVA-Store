import { useState } from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import styles from './ProductCard.module.css';

const getStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? '½' : '';
  const empty = 5 - full - (half ? 1 : 0);
  return '★'.repeat(full) + half + '☆'.repeat(empty);
};

const ProductCard = ({ product, listView = false }) => {
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
    <div className={`${styles.card} ${listView ? styles.listView : ''}`}>
      <div className={styles.imgWrap}>
        {product.badge && (
          <span className={`${styles.badge} ${product.badge === 'New' ? styles.badgeNew : ''}`}>
            {product.badge}
          </span>
        )}
        <span className={styles.emoji}>{product.emoji}</span>
      </div>

      <div className={styles.body}>
        <div className={styles.cat}>{product.category}</div>
        <div className={styles.name}>{product.name}</div>
        <div className={styles.rating}>
          <span className={styles.stars}>{getStars(product.rating)}</span>
          <span className={styles.ratingNum}>{product.rating} ({product.reviews})</span>
        </div>
        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            {product.oldPrice && (
              <span className={styles.oldPrice}>₹{product.oldPrice.toLocaleString()}</span>
            )}
            <span className={styles.price}>₹{product.price.toLocaleString()}</span>
          </div>
          <button
            className={`${styles.addBtn} ${added ? styles.added : ''}`}
            onClick={handleAdd}
          >
            {added ? '✓ Added' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
