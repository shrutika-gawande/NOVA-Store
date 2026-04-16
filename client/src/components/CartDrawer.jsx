import { createPortal } from "react-dom";
import "../styles/cartDrawer.css";
import { useEffect } from "react";
import { useCart } from '../context/CartContext';

function CartDrawer({ isOpen, onClose }) {
  const { items, totalItems, totalPrice, dispatch } = useCart();
  // Prevent background scroll
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return createPortal(
    <>
      {/* Overlay */}
      <div
        className={`overlay ${isOpen ? "visible" : ""}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`drawer ${isOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header">
          <h2>Your Cart <span>({totalItems})</span></h2>
          <button className="closeBtn" onClick={onClose}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="empty">
            <div className="emptyIcon">🛒</div>
            <p>Your cart is empty</p>
            <button className="shopBtn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="items">
              {items.map(item => (
                <div key={item.id} className="item">
                  <div className="emoji">{item.emoji}</div>
                  <div className="info">
                    <div className="name">{item.name}</div>
                    <div className="price">
                      ₹{item.price.toLocaleString()} × {item.qty}
                    </div>
                  </div>
                  <div className="actions">
                    <span className="subtotal">
                      ₹{(item.price * item.qty).toLocaleString()}
                    </span>
                    <button
                      className="removeBtn"
                      onClick={() => dispatch({ type: 'REMOVE', id: item.id })}
                    >✕</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="footer">
              <div className="total">
                <span>Total</span>
                <span className="totalAmt">₹{totalPrice.toLocaleString()}</span>
              </div>
              <button className="checkoutBtn" onClick={() => { onClose();}}>
                Proceed to Checkout →
              </button>
              <button
                className="clearBtn"
                onClick={() => dispatch({ type: 'CLEAR' })}
              >Clear Cart</button>
            </div>
          </>
        )}

      </aside>
    </>,
    document.body
  );
}

export default CartDrawer;