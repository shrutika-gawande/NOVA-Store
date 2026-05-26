import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Sidebar from '../components/Sidebar';
import ProductGrid from '../components/ProductGrid';
import useProducts from '../hooks/useProducts';
import { fetchCategories } from '../services/api';
import styles from './HomePage.module.css';

const HomePage = () => {
  const { products, loading, error, filters, updateFilter, resetFilters } = useProducts();
  const [listView, setListView] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState({});

  useEffect(() => {
    fetchCategories()
      .then(({ data }) => {
        const map = {};
        data.data.categories.forEach(c => { map[c._id] = c.count; });
        setCategoryCounts(map);
      })
      .catch(() => {});
  }, []);

  const handleSearch = (val) => updateFilter('search', val);

  return (
    <div className={styles.page}>
      <Header search={filters.search} onSearch={handleSearch} />
      <Hero />

      <div className={styles.main}>
        <Sidebar
          filters={filters}
          onFilter={updateFilter}
          onReset={resetFilters}
          categoryCounts={categoryCounts}
        />

        <section className={styles.content}>
          <div className={styles.contentHeader}>
            <h2 className={styles.sectionTitle}>
              {filters.category === 'all' ? 'All Products' : filters.category}
              <span className={styles.count}> ({products.length})</span>
            </h2>
            <div className={styles.viewToggle}>
              <button
                className={`${styles.viewBtn} ${!listView ? styles.active : ''}`}
                onClick={() => setListView(false)}
                title="Grid View"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                  <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
                </svg>
              </button>
              <button
                className={`${styles.viewBtn} ${listView ? styles.active : ''}`}
                onClick={() => setListView(true)}
                title="List View"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
                  <line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/>
                  <line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
              </button>
            </div>
          </div>

          <ProductGrid
            products={products}
            loading={loading}
            error={error}
            listView={listView}
          />
        </section>
      </div>

      <footer className={styles.footer}>
        <p>© 2025 NOVA Store — MERN Stack Internship Project &nbsp;|&nbsp;
          <a href="https://github.com" target="_blank" rel="noreferrer">GitHub</a>
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
