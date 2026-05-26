import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { placeOrder } from '../services/api';
import toast from 'react-hot-toast';
import styles from './CheckoutPage.module.css';

const STATUS_STEPS = ['Cart', 'Shipping', 'Payment', 'Confirm'];

const CheckoutPage = () => {
  const { items, totalPrice, dispatch } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const [shipping, setShipping] = useState({
    name: user?.name || '', phone: '', street: '', city: '', state: '', pincode: '',
  });
  const [payment, setPayment] = useState('cod');

  const shippingFee = totalPrice >= 999 ? 0 : 49;
  const total = totalPrice + shippingFee;

  const handleShipping = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const { data } = await placeOrder({
        items: items.map(i => ({ productId: i._id, qty: i.qty })),
        shippingAddress: shipping,
        paymentMethod: payment,
      });
      setPlacedOrder(data.data);
      dispatch({ type: 'CLEAR' });
      setStep(3);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !placedOrder) {
    return (
      <div className={styles.empty}>
        <span>🛒</span>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {/* Progress */}
        <div className={styles.progress}>
          {STATUS_STEPS.map((s, i) => (
            <div key={s} className={`${styles.progressStep} ${i <= step ? styles.progressActive : ''}`}>
              <div className={styles.progressDot}>{i < step ? '✓' : i + 1}</div>
              <span>{s}</span>
              {i < STATUS_STEPS.length - 1 && <div className={`${styles.progressLine} ${i < step ? styles.progressLineActive : ''}`} />}
            </div>
          ))}
        </div>

        {/* Step 0: Cart Review */}
        {step === 0 && (
          <div className={styles.stepCard}>
            <h2 className={styles.stepTitle}>Review Your Cart</h2>
            <div className={styles.orderItems}>
              {items.map(item => (
                <div key={item._id} className={styles.orderItem}>
                  <span className={styles.itemEmoji}>{item.emoji}</span>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.name}</div>
                    <div className={styles.itemMeta}>Qty: {item.qty} × ₹{item.price.toLocaleString()}</div>
                  </div>
                  <div className={styles.itemTotal}>₹{(item.price * item.qty).toLocaleString()}</div>
                </div>
              ))}
            </div>
            <div className={styles.summary}>
              <div className={styles.summaryRow}><span>Subtotal</span><span>₹{totalPrice.toLocaleString()}</span></div>
              <div className={styles.summaryRow}><span>Shipping</span><span>{shippingFee === 0 ? <span className={styles.free}>FREE</span> : `₹${shippingFee}`}</span></div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            </div>
            <button className={styles.primaryBtn} onClick={() => setStep(1)}>Proceed to Shipping →</button>
          </div>
        )}

        {/* Step 1: Shipping */}
        {step === 1 && (
          <div className={styles.stepCard}>
            <h2 className={styles.stepTitle}>Shipping Details</h2>
            <form onSubmit={handleShipping} className={styles.form}>
              <div className={styles.formGrid}>
                <div className={styles.field}>
                  <label>Full Name *</label>
                  <input value={shipping.name} onChange={e => setShipping(p => ({ ...p, name: e.target.value }))} required placeholder="Recipient name" />
                </div>
                <div className={styles.field}>
                  <label>Phone *</label>
                  <input value={shipping.phone} onChange={e => setShipping(p => ({ ...p, phone: e.target.value }))} required placeholder="10-digit number" pattern="\d{10}" />
                </div>
                <div className={`${styles.field} ${styles.fullWidth}`}>
                  <label>Street Address *</label>
                  <input value={shipping.street} onChange={e => setShipping(p => ({ ...p, street: e.target.value }))} required placeholder="House/Flat, Street, Area" />
                </div>
                <div className={styles.field}>
                  <label>City *</label>
                  <input value={shipping.city} onChange={e => setShipping(p => ({ ...p, city: e.target.value }))} required placeholder="City" />
                </div>
                <div className={styles.field}>
                  <label>State *</label>
                  <input value={shipping.state} onChange={e => setShipping(p => ({ ...p, state: e.target.value }))} required placeholder="State" />
                </div>
                <div className={styles.field}>
                  <label>Pincode *</label>
                  <input value={shipping.pincode} onChange={e => setShipping(p => ({ ...p, pincode: e.target.value }))} required placeholder="6-digit pincode" pattern="\d{6}" />
                </div>
              </div>
              <div className={styles.btnRow}>
                <button type="button" className={styles.secondaryBtn} onClick={() => setStep(0)}>← Back</button>
                <button type="submit" className={styles.primaryBtn}>Continue to Payment →</button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div className={styles.stepCard}>
            <h2 className={styles.stepTitle}>Payment Method</h2>
            <div className={styles.paymentOptions}>
              {[
                { value: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when your order arrives' },
                { value: 'upi', label: 'UPI / QR Code', icon: '📱', desc: 'GPay, PhonePe, Paytm' },
                { value: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
              ].map(opt => (
                <label key={opt.value} className={`${styles.payOpt} ${payment === opt.value ? styles.payOptActive : ''}`}>
                  <input type="radio" name="payment" value={opt.value} checked={payment === opt.value} onChange={() => setPayment(opt.value)} />
                  <span className={styles.payIcon}>{opt.icon}</span>
                  <div>
                    <div className={styles.payLabel}>{opt.label}</div>
                    <div className={styles.payDesc}>{opt.desc}</div>
                  </div>
                  {payment === opt.value && <span className={styles.payCheck}>✓</span>}
                </label>
              ))}
            </div>

            <div className={styles.orderSummarySmall}>
              <div className={styles.summaryRow}><span>Items ({items.length})</span><span>₹{totalPrice.toLocaleString()}</span></div>
              <div className={styles.summaryRow}><span>Shipping</span><span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span></div>
              <div className={`${styles.summaryRow} ${styles.summaryTotal}`}><span>Total</span><span>₹{total.toLocaleString()}</span></div>
            </div>

            <div className={styles.btnRow}>
              <button className={styles.secondaryBtn} onClick={() => setStep(1)}>← Back</button>
              <button className={styles.primaryBtn} onClick={handlePlaceOrder} disabled={loading}>
                {loading ? 'Placing…' : `Place Order · ₹${total.toLocaleString()}`}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && placedOrder && (
          <div className={`${styles.stepCard} ${styles.successCard}`}>
            <div className={styles.successIcon}>🎉</div>
            <h2 className={styles.stepTitle}>Order Placed!</h2>
            <p className={styles.successMsg}>Your order <strong>{placedOrder.orderNumber}</strong> has been placed successfully.</p>
            <div className={styles.successDetails}>
              <div className={styles.summaryRow}><span>Order #</span><strong>{placedOrder.orderNumber}</strong></div>
              <div className={styles.summaryRow}><span>Total</span><strong>₹{placedOrder.total.toLocaleString()}</strong></div>
              <div className={styles.summaryRow}><span>Payment</span><strong className={styles.codBadge}>{placedOrder.paymentMethod.toUpperCase()}</strong></div>
              <div className={styles.summaryRow}><span>Status</span><strong className={styles.statusBadge}>Placed</strong></div>
            </div>
            <div className={styles.btnRow}>
              <button className={styles.secondaryBtn} onClick={() => navigate('/my-orders')}>View My Orders</button>
              <button className={styles.primaryBtn} onClick={() => navigate('/')}>Continue Shopping</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
