import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import CartDrawer from './CartDrawer';
import styles from './Header.module.css';

const Header = ({ search, onSearch }) => {
  const { totalItems } = useCart();
  const { user, logout } = useAuth();
  const [cartOpen, setCartOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>NO<span>VA</span></Link>

          <div className={styles.searchBar}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search products…" value={search} onChange={e => onSearch(e.target.value)} />
          </div>

          <div className={styles.actions}>
            {user ? (
              <>
                <Link to="/my-orders" className={styles.linkBtn}>My Orders</Link>
                {user.role === 'admin' && <Link to="/admin" className={styles.adminBtn}>Admin ↗</Link>}
                <button className={styles.linkBtn} onClick={() => { logout(); navigate('/'); }}>Sign Out</button>
              </>
            ) : (
              <Link to="/login" className={styles.linkBtn}>Sign In</Link>
            )}
            <button className={styles.cartBtn} onClick={() => setCartOpen(true)}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Cart
              {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
            </button>
          </div>
        </div>
      </header>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
