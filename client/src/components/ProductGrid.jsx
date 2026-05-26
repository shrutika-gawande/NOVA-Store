import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

const Skeleton = () => (
  <div className={styles.skeleton}>
    <div className={styles.skImgWrap} />
    <div className={styles.skBody}>
      <div className={styles.skLine} style={{ width: '40%', height: '10px' }} />
      <div className={styles.skLine} style={{ width: '85%', height: '14px' }} />
      <div className={styles.skLine} style={{ width: '60%', height: '10px' }} />
      <div className={styles.skFooter}>
        <div className={styles.skLine} style={{ width: '30%', height: '20px' }} />
        <div className={styles.skBtn} />
      </div>
    </div>
  </div>
);

const ProductGrid = ({ products, loading, error, listView }) => {
  if (error) {
    return (
      <div className={styles.error}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3>Could not load products</h3>
        <p>{error}</p>
        <p className={styles.hint}>Make sure the backend server is running on port 5000.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`${styles.grid} ${listView ? styles.listView : ''}`}>
        {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} />)}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>🔍</div>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search query.</p>
      </div>
    );
  }

  return (
    <div className={`${styles.grid} ${listView ? styles.listView : ''}`}>
      {products.map((p, i) => (
        <div key={p._id} style={{ animationDelay: `${i * 0.04}s` }}>
          <ProductCard product={p} listView={listView} />
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
