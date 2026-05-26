import { useEffect, useState } from 'react';
import { fetchAdminStats } from '../../services/api';
import styles from './AdminDashboard.module.css';

const STATUS_COLOR = {
  placed: '#e8c87a', confirmed: '#64a0ff', processing: '#c88cff',
  shipped: '#64c8ff', delivered: '#4eae8a', cancelled: '#e05a4e',
};

const StatCard = ({ icon, label, value, sub, accent }) => (
  <div className={styles.statCard} style={{ borderColor: accent + '33' }}>
    <div className={styles.statIcon}>{icon}</div>
    <div className={styles.statLabel}>{label}</div>
    <div className={styles.statValue} style={{ color: accent }}>{value}</div>
    {sub && <div className={styles.statSub}>{sub}</div>}
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminStats()
      .then(({ data }) => setStats(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div>
      <div className={styles.pageTitle}>Dashboard</div>
      <div className={styles.statsGrid}>
        {[...Array(4)].map((_, i) => <div key={i} className={styles.skeletonCard} />)}
      </div>
    </div>
  );

  const delivered = stats?.statusBreakdown?.find(s => s._id === 'delivered')?.count || 0;
  const pending   = stats?.statusBreakdown?.filter(s => !['delivered','cancelled'].includes(s._id)).reduce((a, b) => a + b.count, 0) || 0;
  const cancelled = stats?.statusBreakdown?.find(s => s._id === 'cancelled')?.count || 0;

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSub}>Welcome back, here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className={styles.statsGrid}>
        <StatCard icon="📦" label="Total Orders" value={stats?.totalOrders ?? 0} accent="#e8c87a" />
        <StatCard icon="💰" label="Total Revenue" value={`₹${(stats?.totalRevenue || 0).toLocaleString()}`} sub="Excluding cancelled" accent="#4eae8a" />
        <StatCard icon="⏳" label="Active Orders" value={pending} sub="In progress" accent="#64a0ff" />
        <StatCard icon="✅" label="Delivered" value={delivered} sub={`${cancelled} cancelled`} accent="#4eae8a" />
      </div>

      <div className={styles.grid2}>
        {/* Status Breakdown */}
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Order Status Breakdown</h2>
          <div className={styles.statusList}>
            {(stats?.statusBreakdown || []).map(s => {
              const pct = stats.totalOrders > 0 ? Math.round((s.count / stats.totalOrders) * 100) : 0;
              return (
                <div key={s._id} className={styles.statusRow}>
                  <div className={styles.statusName}>
                    <span className={styles.statusDot} style={{ background: STATUS_COLOR[s._id] }} />
                    <span style={{ textTransform: 'capitalize' }}>{s._id}</span>
                  </div>
                  <div className={styles.statusBar}>
                    <div className={styles.statusBarFill} style={{ width: `${pct}%`, background: STATUS_COLOR[s._id] }} />
                  </div>
                  <span className={styles.statusCount}>{s.count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Products */}
        <div className={styles.panel}>
          <h2 className={styles.panelTitle}>Top Selling Products</h2>
          <div className={styles.topList}>
            {(stats?.topProducts || []).map((p, i) => (
              <div key={p._id} className={styles.topItem}>
                <span className={styles.topRank}>#{i + 1}</span>
                <div className={styles.topInfo}>
                  <div className={styles.topName}>{p._id}</div>
                  <div className={styles.topMeta}>{p.count} units · ₹{p.total.toLocaleString()}</div>
                </div>
              </div>
            ))}
            {(!stats?.topProducts?.length) && <p className={styles.emptyMsg}>No orders yet</p>}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className={styles.panel}>
        <h2 className={styles.panelTitle}>Recent Orders</h2>
        {(!stats?.recentOrders?.length) ? (
          <p className={styles.emptyMsg}>No orders placed yet.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map(order => (
                  <tr key={order._id}>
                    <td><span className={styles.orderNum}>{order.orderNumber}</span></td>
                    <td>
                      <div className={styles.custName}>{order.user?.name}</div>
                      <div className={styles.custEmail}>{order.user?.email}</div>
                    </td>
                    <td><span className={styles.amount}>₹{order.total.toLocaleString()}</span></td>
                    <td>
                      <span className={styles.statusPill} style={{ background: STATUS_COLOR[order.status] + '22', color: STATUS_COLOR[order.status] }}>
                        {order.status}
                      </span>
                    </td>
                    <td className={styles.dateCell}>{new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
