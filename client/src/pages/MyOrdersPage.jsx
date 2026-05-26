import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMyOrders } from '../services/api';
import styles from './MyOrdersPage.module.css';

const STATUS_COLOR = {
  placed:      { bg: 'rgba(232,200,122,0.12)', color: '#e8c87a' },
  confirmed:   { bg: 'rgba(100,160,255,0.12)', color: '#64a0ff' },
  processing:  { bg: 'rgba(200,140,255,0.12)', color: '#c88cff' },
  shipped:     { bg: 'rgba(100,200,255,0.12)', color: '#64c8ff' },
  delivered:   { bg: 'rgba(78,174,138,0.12)',  color: '#4eae8a' },
  cancelled:   { bg: 'rgba(224,90,78,0.12)',   color: '#e05a4e' },
};

const StatusBadge = ({ status }) => {
  const s = STATUS_COLOR[status] || STATUS_COLOR.placed;
  return (
    <span style={{ background: s.bg, color: s.color, padding: '0.2rem 0.65rem', borderRadius: 6, fontSize: '0.72rem', fontWeight: 700, textTransform: 'capitalize', letterSpacing: '0.04em' }}>
      {status}
    </span>
  );
};

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyOrders()
      .then(({ data }) => setOrders(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <h1 className={styles.pageTitle}>My Orders</h1>
        {[...Array(3)].map((_, i) => (
          <div key={i} className={styles.skeletonCard} style={{ animationDelay: `${i * 0.1}s` }} />
        ))}
      </div>
    </div>
  );

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.pageTitle}>My Orders</h1>
            <p className={styles.pageSub}>{orders.length} order{orders.length !== 1 ? 's' : ''} placed</p>
          </div>
          <button className={styles.shopBtn} onClick={() => navigate('/')}>+ Continue Shopping</button>
        </div>

        {orders.length === 0 ? (
          <div className={styles.empty}>
            <span>📦</span>
            <h2>No orders yet</h2>
            <p>Your placed orders will appear here.</p>
            <button onClick={() => navigate('/')}>Start Shopping</button>
          </div>
        ) : (
          <div className={styles.orderList}>
            {orders.map(order => (
              <div key={order._id} className={styles.orderCard}>
                <div className={styles.orderHeader} onClick={() => setExpanded(expanded === order._id ? null : order._id)}>
                  <div className={styles.orderMeta}>
                    <span className={styles.orderNum}>{order.orderNumber}</span>
                    <StatusBadge status={order.status} />
                  </div>
                  <div className={styles.orderRight}>
                    <span className={styles.orderTotal}>₹{order.total.toLocaleString()}</span>
                    <span className={styles.orderDate}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <span className={styles.chevron}>{expanded === order._id ? '▲' : '▼'}</span>
                  </div>
                </div>

                {expanded === order._id && (
                  <div className={styles.orderBody}>
                    {/* Items */}
                    <div className={styles.sectionLabel}>Items</div>
                    <div className={styles.itemList}>
                      {order.items.map((item, i) => (
                        <div key={i} className={styles.item}>
                          <span className={styles.itemEmoji}>{item.emoji}</span>
                          <span className={styles.itemName}>{item.name}</span>
                          <span className={styles.itemQty}>×{item.qty}</span>
                          <span className={styles.itemPrice}>₹{(item.price * item.qty).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className={styles.detailsGrid}>
                      {/* Shipping */}
                      <div>
                        <div className={styles.sectionLabel}>Shipping Address</div>
                        <div className={styles.infoBox}>
                          <p><strong>{order.shippingAddress.name}</strong></p>
                          <p>{order.shippingAddress.street}</p>
                          <p>{order.shippingAddress.city}, {order.shippingAddress.state} — {order.shippingAddress.pincode}</p>
                          <p>📞 {order.shippingAddress.phone}</p>
                        </div>
                      </div>

                      {/* Payment & Summary */}
                      <div>
                        <div className={styles.sectionLabel}>Order Summary</div>
                        <div className={styles.infoBox}>
                          <div className={styles.summaryRow}><span>Subtotal</span><span>₹{order.subtotal.toLocaleString()}</span></div>
                          <div className={styles.summaryRow}><span>Shipping</span><span>{order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span></div>
                          <div className={styles.summaryRow}><span>Payment</span><span style={{ textTransform: 'uppercase' }}>{order.paymentMethod}</span></div>
                          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}><span>Total</span><span>₹{order.total.toLocaleString()}</span></div>
                        </div>
                      </div>
                    </div>

                    {/* Status History */}
                    {order.statusHistory?.length > 0 && (
                      <div>
                        <div className={styles.sectionLabel}>Status Timeline</div>
                        <div className={styles.timeline}>
                          {[...order.statusHistory].reverse().map((h, i) => (
                            <div key={i} className={styles.timelineItem}>
                              <div className={styles.timelineDot} />
                              <div>
                                <StatusBadge status={h.status} />
                                {h.note && <span className={styles.timelineNote}> — {h.note}</span>}
                                <div className={styles.timelineDate}>{new Date(h.updatedAt).toLocaleString('en-IN')}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;
