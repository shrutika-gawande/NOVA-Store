import styles from './Sidebar.module.css';

const CATEGORIES = [
  { value: 'all', label: 'All Products', icon: '🛍️' },
  { value: 'Electronics', label: 'Electronics', icon: '⚡' },
  { value: 'Fashion', label: 'Fashion', icon: '👗' },
  { value: 'Home', label: 'Home Appliances', icon: '🏠' },
  { value: 'Books', label: 'Books', icon: '📚' },
];

const RATINGS = [
  { value: 0, label: 'All Ratings' },
  { value: 4, label: '4.0 & above', stars: '★★★★☆' },
  { value: 4.5, label: '4.5 & above', stars: '★★★★★' },
];

const Sidebar = ({ filters, onFilter, onReset, categoryCounts = {} }) => {
  const getCount = (cat) => {
    if (cat === 'all') return Object.values(categoryCounts).reduce((a, b) => a + b, 0);
    return categoryCounts[cat] ?? 0;
  };

  return (
    <aside className={styles.sidebar}>
      {/* Categories */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Categories</div>
        <div className={styles.catList}>
          {CATEGORIES.map(cat => (
            <button
              key={cat.value}
              className={`${styles.catBtn} ${filters.category === cat.value ? styles.active : ''}`}
              onClick={() => onFilter('category', cat.value)}
            >
              <span>{cat.icon} {cat.label}</span>
              <span className={styles.count}>{getCount(cat.value)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Price Range</div>
        <div className={styles.priceLabels}>
          <span>₹0</span>
          <span className={styles.priceVal}>₹{Number(filters.maxPrice).toLocaleString()}</span>
        </div>
        <input
          type="range"
          className={styles.rangeSlider}
          min={0}
          max={5000}
          step={100}
          value={filters.maxPrice}
          onChange={e => onFilter('maxPrice', Number(e.target.value))}
        />
        <div className={styles.priceHint}>Max: ₹5,000</div>
      </div>

      {/* Rating */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Minimum Rating</div>
        <div className={styles.ratingList}>
          {RATINGS.map(r => (
            <label key={r.value} className={styles.ratingOpt}>
              <input
                type="radio"
                name="rating"
                value={r.value}
                checked={Number(filters.minRating) === r.value}
                onChange={() => onFilter('minRating', r.value)}
              />
              <span className={styles.radio} />
              <span className={styles.ratingLabel}>
                {r.stars && <span className={styles.stars}>{r.stars}</span>}
                <span className={styles.ratingText}>{r.label}</span>
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Sort */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Sort By</div>
        <select
          className={styles.select}
          value={filters.sort}
          onChange={e => onFilter('sort', e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </div>

      <button className={styles.resetBtn} onClick={onReset}>↺ Reset All Filters</button>
    </aside>
  );
};

export default Sidebar;
