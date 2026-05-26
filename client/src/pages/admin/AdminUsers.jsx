import { useEffect, useState } from 'react';
import { fetchUsers } from '../../services/api';
import styles from './AdminUsers.module.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsers()
      .then(({ data }) => setUsers(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(u =>
    !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Users</h1>
          <p className={styles.pageSub}>{filtered.length} registered users</p>
        </div>
        <input className={styles.searchInput} type="text" placeholder="Search by name or email…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {loading ? (
        <div>{[...Array(5)].map((_, i) => <div key={i} className={styles.skeletonRow} />)}</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr key={u._id}>
                  <td className={styles.idxCell}>{i + 1}</td>
                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.avatar}>{u.name?.[0]?.toUpperCase()}</div>
                      <span className={styles.name}>{u.name}</span>
                    </div>
                  </td>
                  <td className={styles.email}>{u.email}</td>
                  <td>
                    <span className={u.role === 'admin' ? styles.roleAdmin : styles.roleCustomer}>
                      {u.role}
                    </span>
                  </td>
                  <td className={styles.dateCell}>{new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className={styles.empty}><span>👤</span><p>No users found.</p></div>}
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
