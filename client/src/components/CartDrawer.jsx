import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styles from './CartDrawer.module.css';

const CartDrawer = ({ open, onClose }) => {
  const { items, totalItems, totalPrice, dispatch } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <div className={`${styles.overlay} ${open ? styles.visible : ''}`} onClick={onClose} />
      <aside className={`${styles.drawer} ${open ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2>Your Cart <span>({totalItems})</span></h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🛒</div>
            <p>Your cart is empty</p>
            <button className={styles.shopBtn} onClick={onClose}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {items.map(item => (
                <div key={item._id} className={styles.item}>
                  <div className={styles.emoji}>{item.emoji}</div>
                  <div className={styles.info}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.price}>
                      ₹{item.price.toLocaleString()} × {item.qty}
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <span className={styles.subtotal}>
                      ₹{(item.price * item.qty).toLocaleString()}
                    </span>
                    <button
                      className={styles.removeBtn}
                      onClick={() => dispatch({ type: 'REMOVE', id: item._id })}
                    >✕</button>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.total}>
                <span>Total</span>
                <span className={styles.totalAmt}>₹{totalPrice.toLocaleString()}</span>
              </div>
              <button className={styles.checkoutBtn} onClick={() => { onClose(); navigate('/checkout'); }}>
                Proceed to Checkout →
              </button>
              <button
                className={styles.clearBtn}
                onClick={() => dispatch({ type: 'CLEAR' })}
              >Clear Cart</button>
            </div>
          </>
        )}
      </aside>
    </>
  );
};

export default CartDrawer;
