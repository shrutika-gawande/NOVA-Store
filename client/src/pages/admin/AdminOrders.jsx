import { useEffect, useState } from 'react';
import { fetchAllOrders, updateOrderStatus, deleteOrder } from '../../services/api';
import toast from 'react-hot-toast';
import styles from './AdminOrders.module.css';

const STATUSES = ['all', 'placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

const STATUS_COLOR = {
  placed: '#e8c87a', confirmed: '#64a0ff', processing: '#c88cff',
  shipped: '#64c8ff', delivered: '#4eae8a', cancelled: '#e05a4e',
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const load = (params = {}) => {
    setLoading(true);
    fetchAllOrders({ status: filter !== 'all' ? filter : undefined, search: search || undefined, ...params })
      .then(({ data }) => setOrders(data.data))
      .catch(() => toast.error('Failed to load orders'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter, search]);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus, `Status updated to ${newStatus}`);
      setOrders(prev => prev.map(o => o._id === orderId ? { ...o, status: newStatus } : o));
      toast.success(`Order status → ${newStatus}`);
    } catch {
      toast.error('Failed to update status');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (orderId, orderNum) => {
    if (!window.confirm(`Delete order ${orderNum}? This cannot be undone.`)) return;
    try {
      await deleteOrder(orderId);
      setOrders(prev => prev.filter(o => o._id !== orderId));
      toast.success('Order deleted');
    } catch {
      toast.error('Failed to delete order');
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Orders</h1>
        <p className={styles.pageSub}>{orders.length} orders found</p>
      </div>

      {/* Filters */}
      <div className={styles.filterBar}>
        <div className={styles.statusTabs}>
          {STATUSES.map(s => (
            <button
              key={s}
              className={`${styles.tab} ${filter === s ? styles.tabActive : ''}`}
              onClick={() => setFilter(s)}
              style={filter === s && s !== 'all' ? { color: STATUS_COLOR[s], borderColor: STATUS_COLOR[s] } : {}}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search order #…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className={styles.loadingWrap}>
          {[...Array(5)].map((_, i) => <div key={i} className={styles.skeletonRow} />)}
        </div>
      ) : orders.length === 0 ? (
        <div className={styles.empty}><span>📭</span><p>No orders match your filter.</p></div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th></th>
                <th>Order #</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <>
                  <tr key={order._id} className={expanded === order._id ? styles.expandedRow : ''}>
                    <td>
                      <button className={styles.expandBtn} onClick={() => setExpanded(expanded === order._id ? null : order._id)}>
                        {expanded === order._id ? '▼' : '▶'}
                      </button>
                    </td>
                    <td><span className={styles.orderNum}>{order.orderNumber}</span></td>
                    <td>
                      <div className={styles.custName}>{order.user?.name}</div>
                      <div className={styles.custEmail}>{order.user?.email}</div>
                    </td>
                    <td><span className={styles.itemCount}>{order.items?.length} item{order.items?.length !== 1 ? 's' : ''}</span></td>
                    <td><span className={styles.amount}>₹{order.total.toLocaleString()}</span></td>
                    <td><span className={styles.payBadge}>{order.paymentMethod?.toUpperCase()}</span></td>
                    <td>
                      <select
                        className={styles.statusSelect}
                        value={order.status}
                        disabled={updatingId === order._id}
                        onChange={e => handleStatusChange(order._id, e.target.value)}
                        style={{ color: STATUS_COLOR[order.status] }}
                      >
                        {STATUSES.filter(s => s !== 'all').map(s => (
                          <option key={s} value={s} style={{ color: STATUS_COLOR[s] }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                        ))}
                      </select>
                    </td>
                    <td className={styles.dateCell}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: '2-digit' })}</td>
                    <td>
                      <button className={styles.deleteBtn} onClick={() => handleDelete(order._id, order.orderNumber)}>🗑</button>
                    </td>
                  </tr>

                  {expanded === order._id && (
                    <tr className={styles.detailRow}>
                      <td colSpan={9}>
                        <div className={styles.detailInner}>
                          <div className={styles.detailGrid}>
                            <div>
                              <div className={styles.detailLabel}>Items</div>
                              {order.items?.map((item, i) => (
                                <div key={i} className={styles.detailItem}>
                                  <span>{item.emoji}</span>
                                  <span className={styles.detailItemName}>{item.name}</span>
                                  <span className={styles.detailItemQty}>×{item.qty}</span>
                                  <span className={styles.detailItemPrice}>₹{(item.price * item.qty).toLocaleString()}</span>
                                </div>
                              ))}
                            </div>
                            <div>
                              <div className={styles.detailLabel}>Shipping Address</div>
                              <div className={styles.addressBox}>
                                <strong>{order.shippingAddress?.name}</strong>
                                <span>{order.shippingAddress?.street}</span>
                                <span>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.pincode}</span>
                                <span>📞 {order.shippingAddress?.phone}</span>
                              </div>
                            </div>
                            <div>
                              <div className={styles.detailLabel}>Payment</div>
                              <div className={styles.addressBox}>
                                <span>Method: <strong>{order.paymentMethod?.toUpperCase()}</strong></span>
                                <span>Status: <strong style={{ color: order.paymentStatus === 'paid' ? '#4eae8a' : '#e8c87a' }}>{order.paymentStatus}</strong></span>
                                <span>Subtotal: ₹{order.subtotal?.toLocaleString()}</span>
                                <span>Shipping: {order.shippingFee === 0 ? 'FREE' : `₹${order.shippingFee}`}</span>
                                <strong style={{ color: '#e8c87a' }}>Total: ₹{order.total?.toLocaleString()}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
