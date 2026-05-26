import { useEffect, useState } from 'react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../services/api';
import toast from 'react-hot-toast';
import styles from './AdminProducts.module.css';

const EMPTY_FORM = { name: '', category: 'Electronics', price: '', oldPrice: '', rating: 4.5, reviews: 0, badge: '', emoji: '📦', inStock: true };
const CATEGORIES = ['Electronics', 'Fashion', 'Home', 'Books'];
const BADGES = ['', 'Sale', 'New'];

const Modal = ({ product, onClose, onSave }) => {
  const [form, setForm] = useState(product || EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: Number(form.price), oldPrice: form.oldPrice ? Number(form.oldPrice) : null, rating: Number(form.rating), reviews: Number(form.reviews), badge: form.badge || null };
      await onSave(payload);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>{product?._id ? 'Edit Product' : 'Add Product'}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className={styles.modalForm}>
          <div className={styles.formGrid}>
            <div className={`${styles.field} ${styles.fullWidth}`}>
              <label>Product Name *</label>
              <input value={form.name} onChange={e => set('name', e.target.value)} required placeholder="e.g. Wireless Headphones" />
            </div>
            <div className={styles.field}>
              <label>Category *</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Badge</label>
              <select value={form.badge} onChange={e => set('badge', e.target.value)}>
                {BADGES.map(b => <option key={b} value={b}>{b || 'None'}</option>)}
              </select>
            </div>
            <div className={styles.field}>
              <label>Price (₹) *</label>
              <input type="number" value={form.price} onChange={e => set('price', e.target.value)} required min={0} placeholder="1999" />
            </div>
            <div className={styles.field}>
              <label>Old Price (₹)</label>
              <input type="number" value={form.oldPrice || ''} onChange={e => set('oldPrice', e.target.value)} min={0} placeholder="Leave blank if no discount" />
            </div>
            <div className={styles.field}>
              <label>Rating (0–5)</label>
              <input type="number" value={form.rating} onChange={e => set('rating', e.target.value)} min={0} max={5} step={0.1} />
            </div>
            <div className={styles.field}>
              <label>Reviews</label>
              <input type="number" value={form.reviews} onChange={e => set('reviews', e.target.value)} min={0} />
            </div>
            <div className={styles.field}>
              <label>Emoji</label>
              <input value={form.emoji} onChange={e => set('emoji', e.target.value)} placeholder="📦" maxLength={4} />
            </div>
            <div className={styles.field}>
              <label>In Stock</label>
              <select value={form.inStock ? 'yes' : 'no'} onChange={e => set('inStock', e.target.value === 'yes')}>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>
          <div className={styles.modalFooter}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>Cancel</button>
            <button type="submit" className={styles.saveBtn} disabled={saving}>{saving ? 'Saving…' : 'Save Product'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalProduct, setModalProduct] = useState(undefined); // undefined = closed
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');

  const load = () => {
    setLoading(true);
    fetchProducts()
      .then(({ data }) => setProducts(data.data))
      .catch(() => toast.error('Failed to load products'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (form) => {
    if (form._id) {
      const { data } = await updateProduct(form._id, form);
      setProducts(prev => prev.map(p => p._id === form._id ? data.data : p));
      toast.success('Product updated!');
    } else {
      const { data } = await createProduct(form);
      setProducts(prev => [data.data, ...prev]);
      toast.success('Product added!');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;
    try {
      await deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
      toast.success('Product deleted');
    } catch {
      toast.error('Delete failed');
    }
  };

  const filtered = products.filter(p => {
    const matchCat = catFilter === 'all' || p.category === catFilter;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      {modalProduct !== undefined && (
        <Modal product={modalProduct || null} onClose={() => setModalProduct(undefined)} onSave={handleSave} />
      )}

      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Products</h1>
          <p className={styles.pageSub}>{filtered.length} of {products.length} products</p>
        </div>
        <button className={styles.addBtn} onClick={() => setModalProduct(null)}>+ Add Product</button>
      </div>

      <div className={styles.filterBar}>
        <div className={styles.catTabs}>
          {['all', ...CATEGORIES].map(c => (
            <button key={c} className={`${styles.tab} ${catFilter === c ? styles.tabActive : ''}`} onClick={() => setCatFilter(c)}>
              {c === 'all' ? 'All' : c}
            </button>
          ))}
        </div>
        <input className={styles.searchInput} type="text" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      {loading ? (
        <div className={styles.tableWrap}>
          {[...Array(6)].map((_, i) => <div key={i} className={styles.skeletonRow} />)}
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Badge</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p._id}>
                  <td>
                    <div className={styles.productCell}>
                      <span className={styles.productEmoji}>{p.emoji}</span>
                      <span className={styles.productName}>{p.name}</span>
                    </div>
                  </td>
                  <td><span className={styles.catBadge}>{p.category}</span></td>
                  <td>
                    <div className={styles.priceCell}>
                      <span className={styles.price}>₹{p.price.toLocaleString()}</span>
                      {p.oldPrice && <span className={styles.oldPrice}>₹{p.oldPrice.toLocaleString()}</span>}
                    </div>
                  </td>
                  <td><span className={styles.rating}>★ {p.rating}</span></td>
                  <td>{p.badge ? <span className={`${styles.badge} ${p.badge === 'New' ? styles.badgeNew : styles.badgeSale}`}>{p.badge}</span> : <span className={styles.noBadge}>—</span>}</td>
                  <td><span className={p.inStock ? styles.inStock : styles.outStock}>{p.inStock ? 'In Stock' : 'Out'}</span></td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.editBtn} onClick={() => setModalProduct(p)}>✏️ Edit</button>
                      <button className={styles.delBtn} onClick={() => handleDelete(p._id, p.name)}>🗑</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className={styles.empty}><span>🔍</span><p>No products found.</p></div>}
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
